const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
  };
}

export const generateWithGemini = async (prompt: string): Promise<string> => {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!res.ok) {
    let errorMsg = `Gemini API error (${res.status})`;
    try {
      const data = (await res.json()) as GeminiResponse;
      if (data.error?.message) errorMsg = data.error.message;
    } catch {
      // ignore parse error
    }
    throw new Error(errorMsg);
  }

  const data = (await res.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No response generated. Try again.');
  }

  return text.trim();
};

export type GeminiTask = 'tailor' | 'rewrite_bullets' | 'summary' | 'cover_letter';

export const buildGeminiPrompt = (args: {
  resumeText: string;
  jobDescription: string;
  task: GeminiTask;
}): string => {
  const header =
    'You are an expert resume reviewer and career coach. Be concise, practical, and ATS-friendly. Do not invent experience the candidate does not have.\n\n';
  const resume = `RESUME:\n${args.resumeText.slice(0, 4000)}\n\n`;
  const jd = `JOB DESCRIPTION:\n${args.jobDescription.slice(0, 3000)}\n\n`;

  if (args.task === 'summary') {
    return (
      header +
      resume +
      jd +
      'Task: Write a professional resume summary (3-5 lines) tailored to the job description above.\n' +
      'The summary should highlight the candidate\'s most relevant experience and skills for this specific role.\n' +
      'Output: Plain text only, no markdown formatting.'
    );
  }

  if (args.task === 'rewrite_bullets') {
    return (
      header +
      resume +
      jd +
      'Task: Rewrite the 6 strongest experience bullet points from the resume to better match the job description.\n' +
      'Rules:\n' +
      '- Keep them truthful — do not add experience the candidate doesn\'t have\n' +
      '- Add metrics and numbers only if they exist in the original\n' +
      '- Use strong action verbs\n' +
      '- Make them ATS-friendly\n' +
      '- One bullet per line, prefixed with •\n' +
      'Output: Bullets only, no headers or explanations.'
    );
  }

  if (args.task === 'cover_letter') {
    return (
      header +
      resume +
      jd +
      'Task: Write a compelling cover letter tailored to this job.\n\n' +
      'Structure:\n' +
      '1. Hook: Why this specific company/role excites you (be specific)\n' +
      '2. Value proposition: 2-3 key achievements from resume that match requirements\n' +
      '3. Fit: Why your skills align with their needs\n' +
      '4. Close: Confident call to action\n\n' +
      'Tone: Professional but personable, not generic\n' +
      'Length: 250-350 words\n' +
      'Output: Full cover letter as plain text, no markdown, no signature block.'
    );
  }
  return (
    header +
    resume +
    jd +
    'Task: Provide specific, actionable improvements to increase the resume\'s match for this job.\n\n' +
    'Output format:\n' +
    '## Missing Keywords\n' +
    'List up to 8 keywords from the job description that are missing from the resume, and where to add them.\n\n' +
    '## Bullet Rewrites\n' +
    'Rewrite 5 existing bullets to better match the job requirements.\n\n' +
    '## ATS & Formatting Tips\n' +
    '3 specific formatting or structural suggestions to improve ATS compatibility.'
  );
};
