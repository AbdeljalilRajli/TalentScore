import express from 'express';

import multer from 'multer';

import pdfParse from 'pdf-parse';

import mammoth from 'mammoth';

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';



const app = express();



const upload = multer({

  storage: multer.memoryStorage(),

  limits: {

    fileSize: 15 * 1024 * 1024,

  },

});



app.get('/api/health', (_req, res) => {

  res.json({ ok: true });

});



app.post('/api/extract', upload.single('file'), async (req, res) => {

  try {

    const file = req.file;

    if (!file) {

      return res.status(400).json({ error: 'Missing file' });

    }

    console.log('[Extract] File received:', file.originalname, 'Size:', file.size, 'Type:', file.mimetype);

    const originalName = (file.originalname ?? '').toLowerCase();

    const mime = (file.mimetype ?? '').toLowerCase();



    const isPdf = mime === 'application/pdf' || originalName.endsWith('.pdf');

    const isDocx =

      mime ===

        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||

      originalName.endsWith('.docx');



    if (!isPdf && !isDocx) {

      return res.status(400).json({

        error: 'Unsupported file type. Please upload a PDF or DOCX.',

      });

    }



    let text = '';



    if (isPdf) {

      console.log('[Extract] Processing as PDF...');

      try {

        const data = await pdfParse(file.buffer);

        text = data.text ?? '';

        console.log('[Extract] pdf-parse result length:', text.length);

      } catch (pdfErr) {

        console.error('[Extract] pdf-parse error:', pdfErr.message);

      }



      // Fallback: some PDFs (e.g., certain exports) return almost empty text via pdf-parse.

      if ((text ?? '').trim().length < 50) {

        console.log('[Extract] Using pdfjs fallback...');

        try {

          const doc = await pdfjs.getDocument({ data: file.buffer }).promise;

          const parts = [];

          for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {

            const page = await doc.getPage(pageNum);

            const content = await page.getTextContent();

            const items = content.items ?? [];

            for (const it of items) {

              if (it && typeof it.str === 'string' && it.str.trim()) {

                parts.push(it.str);

              }

            }

          }

          text = parts.join(' ');

          console.log('[Extract] pdfjs fallback result length:', text.length);

        } catch (pdfjsErr) {

          console.error('[Extract] pdfjs error:', pdfjsErr.message);

        }

      }

    } else {

      console.log('[Extract] Processing as DOCX...');

      try {

        const result = await mammoth.extractRawText({ buffer: file.buffer });

        text = result.value ?? '';

        console.log('[Extract] mammoth result length:', text.length);

      } catch (docxErr) {

        console.error('[Extract] mammoth error:', docxErr.message);

        throw docxErr;

      }

    }



    text = String(text)

      .replace(/\r\n/g, '\n')

      .replace(/\t/g, ' ')

      .replace(/[ ]{2,}/g, ' ')

      .trim();



    console.log('[Extract] Final text length:', text.length);



    if (!text || text.trim().length < 50) {

      return res.status(422).json({

        error:

          'Could not extract enough text from this document. If it was exported from a design tool (e.g., Figma), the text may be outlined (vector shapes). Export a text-based PDF or upload a DOCX.',

        textLength: (text ?? '').trim().length,

      });

    }



    return res.json({ text });

  } catch (e) {

    console.error('[Extract] Unhandled error:', e);

    const msg = e instanceof Error ? e.message : String(e);

    return res.status(500).json({ error: 'Failed to extract text', details: msg });

  }

});



const PORT = process.env.PORT ? Number(process.env.PORT) : 5174;

app.listen(PORT, () => {

  // eslint-disable-next-line no-console

  console.log(`TalentScore API listening on http://localhost:${PORT}`);

});

