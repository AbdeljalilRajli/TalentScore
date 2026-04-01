import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return { error: 'Expected multipart/form-data' };
  }

  const boundary = contentType.split('boundary=')[1];
  if (!boundary) return { error: 'No boundary found' };

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  // Simple multipart parser
  const boundaryBuffer = Buffer.from('--' + boundary);
  const parts = [];
  let start = 0;
  
  while (true) {
    const idx = buffer.indexOf(boundaryBuffer, start);
    if (idx === -1) break;
    
    const nextIdx = buffer.indexOf(boundaryBuffer, idx + boundaryBuffer.length);
    if (nextIdx === -1) break;
    
    let part = buffer.slice(idx + boundaryBuffer.length, nextIdx);
    // Remove leading \r\n
    if (part.slice(0, 2).toString() === '\r\n') {
      part = part.slice(2);
    }
    // Remove trailing \r\n--
    if (part.slice(-4).toString().startsWith('\r\n--')) {
      part = part.slice(0, -4);
    } else if (part.slice(-2).toString() === '\r\n') {
      part = part.slice(0, -2);
    }
    
    parts.push(part);
    start = nextIdx;
  }

  // Find file part
  for (const part of parts) {
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;
    
    const header = part.slice(0, headerEnd).toString();
    const content = part.slice(headerEnd + 4);
    
    if (header.includes('filename=')) {
      const nameMatch = header.match(/filename="([^"]+)"/);
      const originalname = nameMatch ? nameMatch[1] : 'file';
      return { file: { originalname, buffer: content } };
    }
  }
  
  return { error: 'No file found' };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const parsed = await parseMultipartForm(req);
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const file = parsed.file;
    console.log('[Extract] File:', file.originalname, 'Size:', file.buffer.length);

    const originalName = file.originalname.toLowerCase();
    const isPdf = originalName.endsWith('.pdf');
    const isDocx = originalName.endsWith('.docx');

    if (!isPdf && !isDocx) {
      return res.status(400).json({ error: 'Unsupported file type. Use PDF or DOCX.' });
    }

    let text = '';

    if (isPdf) {
      try {
        const data = await pdfParse(file.buffer);
        text = data.text ?? '';
        console.log('[Extract] pdf-parse length:', text.length);
      } catch (e) {
        console.error('[Extract] pdf-parse error:', e.message);
      }

      // Fallback
      if (text.trim().length < 50) {
        try {
          const doc = await pdfjs.getDocument({ data: file.buffer }).promise;
          const parts = [];
          for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            for (const item of content.items) {
              if (item.str?.trim()) parts.push(item.str);
            }
          }
          text = parts.join(' ');
          console.log('[Extract] pdfjs fallback length:', text.length);
        } catch (e) {
          console.error('[Extract] pdfjs error:', e.message);
        }
      }
    } else {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value ?? '';
      console.log('[Extract] mammoth length:', text.length);
    }

    text = text.replace(/\r\n/g, '\n').replace(/\t/g, ' ').replace(/[ ]{2,}/g, ' ').trim();

    if (text.length < 50) {
      return res.status(422).json({
        error: 'Could not extract enough text. If exported from Figma/Canva, text may be outlined. Use a text-based PDF.',
        textLength: text.length,
      });
    }

    return res.json({ text });
  } catch (e) {
    console.error('[Extract] Error:', e);
    return res.status(500).json({ error: 'Failed to extract text', details: e.message });
  }
}
