import mammoth from 'mammoth';

// PDF.js will be loaded dynamically with local worker
let pdfjsLib: any = null;
const PDF_WORKER_URL = '/pdf.worker.min.mjs';

// Mock API for resume analysis
export interface AnalysisResult {
  score: number;
  breakdown?: {
    skills: number;
    experience: number;
    impact: number;
    quality: number;
  };
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  evidence?: Array<{
    keyword: string;
    snippet: string;
  }>;
  isValidResume: boolean;
  error?: string;
}

// Resume validation keywords - these should appear in a real resume
const RESUME_INDICATORS = [
  'experience', 'education', 'skills', 'work', 'employment', 'job', 'position',
  'university', 'college', 'degree', 'bachelor', 'master', 'phd', 'certification',
  'project', 'responsibility', 'achievement', 'accomplishment', 'objective',
  'summary', 'profile', 'career', 'professional', 'internship', 'volunteer',
  'award', 'honor', 'publication', 'language', 'software', 'technology',
  'management', 'leadership', 'team', 'client', 'customer', 'sales', 'marketing',
  'development', 'design', 'analysis', 'research', 'training', 'presentation'
];

const RESUME_INDICATORS_FR = [
  'expérience', 'experience', 'formation', 'éducation', 'education', 'compétences', 'competences',
  'parcours', 'profil', 'résumé', 'resume', 'objectif', 'projets', 'projet', 'réalisations',
  'réalisation', 'responsabilités', 'responsabilite', 'emploi', 'poste', 'stage',
  'université', 'universite', 'école', 'ecole', 'diplôme', 'diplome', 'certification',
  'langues', 'langue', 'logiciels', 'technologies', 'management', 'leadership',
  'clients', 'client', 'vente', 'marketing', 'développement', 'developpement', 'conception'
];

// Common non-resume content indicators
const NON_RESUME_INDICATORS = [
  'recipe', 'cooking', 'ingredient', 'instruction', 'bake', 'cook', 'oven',
  'temperature', 'minute', 'hour', 'cup', 'tablespoon', 'teaspoon', 'salt',
  'pepper', 'sugar', 'flour', 'oil', 'butter', 'milk', 'egg', 'water',
  'invoice', 'receipt', 'payment', 'total', 'tax', 'subtotal', 'discount',
  'purchase', 'transaction', 'cashier', 'store', 'shop', 'retail',
  'menu', 'restaurant', 'food', 'drink', 'beverage', 'appetizer', 'dessert',
  'manual', 'instruction', 'step', 'procedure', 'guide', 'tutorial'
];

// Extract text from PDF file
const extractTextFromPDF = async (file: File): Promise<string> => {
  // Dynamically import pdfjs-dist
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist');
    pdfjsLib = pdfjs;
    // Use local worker file
    pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n';
  }
  
  return text;
};

// Extract text from DOCX file
const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

// Extract text content from file
const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const extractResumeTextFromFile = async (file: File): Promise<string> => {
  const lowerName = file.name.toLowerCase();
  const isTextLike = file.type === 'text/plain' || lowerName.endsWith('.txt');
  const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
  const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    lowerName.endsWith('.docx');
  
  if (isPdf) {
    return extractTextFromPDF(file);
  } else if (isDocx) {
    return extractTextFromDOCX(file);
  } else if (isTextLike) {
    return extractTextFromFile(file);
  } else {
    throw new Error('Unsupported file type. Please use PDF, DOCX, or TXT.');
  }
};

const normalizeText = (text: string) =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .trim()
    .toLowerCase();

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const splitLines = (text: string) =>
  normalizeText(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

// Validate if the uploaded file is actually a resume
const validateResume = (content: string): { isValid: boolean; confidence: number; error?: string } => {
  if (!content || content.trim().length < 50) {
    return { 
      isValid: false, 
      confidence: 0, 
      error: "Extracted text appears to be too short or empty. If you uploaded a PDF, it may be scanned (image-only). Try exporting a text-based PDF or uploading a DOCX." 
    };
  }

  const words = content.split(/\s+/);
  if (words.length < 20) {
    return { 
      isValid: false, 
      confidence: 0, 
      error: "File doesn't contain enough content to be a resume" 
    };
  }

  // Count resume indicators
  let resumeScore = 0;
  let nonResumeScore = 0;

  [...RESUME_INDICATORS, ...RESUME_INDICATORS_FR].forEach(indicator => {
    if (content.includes(indicator)) {
      resumeScore += 1;
    }
  });

  NON_RESUME_INDICATORS.forEach(indicator => {
    if (content.includes(indicator)) {
      nonResumeScore += 1;
    }
  });

  const confidence = Math.max(0, Math.min(100, (resumeScore * 10) - (nonResumeScore * 3)));
  
  // Only reject if there are strong indicators this is definitely NOT a resume
  // Require many non-resume keywords and very few/no resume keywords
  if (nonResumeScore > 15 && resumeScore < 2) {
    return { 
      isValid: false, 
      confidence, 
      error: "This appears to be a recipe, manual, or other non-resume document" 
    };
  }

  // Very lenient check - allow if there's any reasonable content
  // Most uploaded files with sufficient length should pass unless clearly wrong
  if (resumeScore === 0 && nonResumeScore > 8) {
    return { 
      isValid: false, 
      confidence, 
      error: "This doesn't appear to be a resume. Please upload a proper resume document." 
    };
  }

  return { isValid: true, confidence: Math.max(50, confidence) };
};

// Extract skills and keywords from job description
const extractJobKeywords = (jobDescription: string): string[] => {
  const jobLower = normalizeText(jobDescription);

  const stopwords = new Set([
    'and','or','the','a','an','to','of','in','for','with','on','at','by','from','as','is','are','be','will','you','your',
    'we','our','they','their','this','that','these','those','role','position','responsibilities','requirements','skills'
  ]);

  const curated = [
    'javascript', 'typescript', 'python', 'java', 'c#', 'c++', 'go', 'golang', 'ruby', 'php',
    'react', 'react native', 'angular', 'vue', 'node', 'node.js', 'express',
    'mongodb', 'postgresql', 'mysql', 'redis',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes',
    'git', 'github', 'gitlab',
    'html', 'css', 'tailwind', 'sass',
    'graphql', 'rest', 'api', 'microservices',
    'agile', 'scrum',
    'leadership', 'management', 'communication', 'teamwork', 'problem solving'
  ];

  const found = new Set<string>();
  curated.forEach((k) => {
    const variants = [k, k.replace(/\./g, ''), k.replace(/\s+/g, '')];
    if (variants.some((v) => v && jobLower.includes(v))) found.add(k);
  });

  const tokens = jobLower
    .replace(/[^a-z0-9+#.\n ]/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => t.length >= 2 && t.length <= 24)
    .filter((t) => !stopwords.has(t));

  const phraseCounts = new Map<string, number>();
  for (let i = 0; i < tokens.length; i += 1) {
    const one = tokens[i];
    phraseCounts.set(one, (phraseCounts.get(one) ?? 0) + 1);

    if (i + 1 < tokens.length) {
      const two = `${tokens[i]} ${tokens[i + 1]}`;
      phraseCounts.set(two, (phraseCounts.get(two) ?? 0) + 1);
    }
  }

  const candidates = Array.from(phraseCounts.entries())
    .filter(([p]) => p.includes(' ') || /^[a-z0-9+#.]+$/.test(p))
    .filter(([p]) => !stopwords.has(p))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([p]) => p);

  candidates.forEach((p) => {
    if (p.length >= 3) found.add(p);
  });

  return Array.from(found).slice(0, 20);
};

// Find matching keywords between resume and job description
const findMatchingKeywords = (resumeContent: string, jobKeywords: string[]): string[] => {
  const resumeLower = normalizeText(resumeContent);
  return jobKeywords.filter((keyword) => {
    const k = normalizeText(keyword);
    const variants = [k, k.replace(/\./g, ''), k.replace(/\s+/g, '')];
    return variants.some((v) => v && resumeLower.includes(v));
  });
};

const buildEvidence = (resumeContent: string, foundKeywords: string[]) => {
  const lines = splitLines(resumeContent);
  return foundKeywords.slice(0, 10).map((keyword) => {
    const k = normalizeText(keyword);
    const matchLine = lines.find((l) => l.includes(k)) ?? lines.find((l) => l.includes(k.replace(/\./g, '')));
    return {
      keyword,
      snippet: matchLine ? matchLine.slice(0, 200) : 'Matched in resume text'
    };
  });
};

const scoreQuality = (resumeContent: string, validationConfidence: number) => {
  const t = normalizeText(resumeContent);
  const sections = {
    experience: /(experience|employment|work history)/.test(t),
    education: /(education|university|college|degree)/.test(t),
    skills: /(skills|technologies|tools)/.test(t),
  };

  const presentCount = Object.values(sections).filter(Boolean).length;
  const sectionScore = presentCount === 3 ? 100 : presentCount === 2 ? 70 : presentCount === 1 ? 40 : 20;

  const length = t.length;
  const lengthScore = length > 4000 ? 85 : length > 2000 ? 100 : length > 1000 ? 70 : 40;

  const quality = Math.round((sectionScore * 0.6) + (lengthScore * 0.2) + (validationConfidence * 0.2));
  return clamp(quality, 0, 100);
};

const scoreImpact = (resumeContent: string) => {
  const t = normalizeText(resumeContent);
  const hasNumbers = /\b\d+(?:[\.,]\d+)?\b/.test(t);
  const hasPercent = /\d+\s*%/.test(t);
  const hasMoney = /\$\s*\d+|\b(usd|eur|gbp)\b/.test(t);
  const base = (hasNumbers ? 60 : 20) + (hasPercent ? 20 : 0) + (hasMoney ? 20 : 0);
  return clamp(base, 0, 100);
};

const scoreExperience = (resumeContent: string, jobDescription: string) => {
  const r = normalizeText(resumeContent);
  const j = normalizeText(jobDescription);
  const titleSignals = ['engineer','developer','designer','manager','analyst','consultant','product','marketing','sales','data'];
  const foundInJob = titleSignals.filter((t) => j.includes(t));
  const match = foundInJob.filter((t) => r.includes(t)).length;
  const score = foundInJob.length === 0 ? 60 : Math.round((match / foundInJob.length) * 100);
  return clamp(score, 0, 100);
};

export const analyzeResumeText = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  try {
    const resumeContent = normalizeText(resumeText);
    const validation = validateResume(resumeContent);

    if (!validation.isValid) {
      return {
        score: 0,
        breakdown: { skills: 0, experience: 0, impact: 0, quality: 0 },
        foundKeywords: [],
        missingKeywords: [],
        suggestions: ["Please paste a valid resume text"],
        isValidResume: false,
        error: validation.error
      };
    }

    const jobKeywords = extractJobKeywords(jobDescription);
    if (jobKeywords.length === 0) {
      return {
        score: 0,
        breakdown: { skills: 0, experience: 0, impact: 0, quality: 0 },
        foundKeywords: [],
        missingKeywords: [],
        suggestions: ["Please provide a more detailed job description with specific requirements"],
        isValidResume: true,
        error: "Job description doesn't contain enough requirements to analyze"
      };
    }

    const foundKeywords = findMatchingKeywords(resumeContent, jobKeywords);
    const missingKeywords = jobKeywords.filter((keyword) => !foundKeywords.includes(keyword));

    const skillsScore = clamp(Math.round((foundKeywords.length / jobKeywords.length) * 100), 0, 100);
    const expScore = scoreExperience(resumeContent, jobDescription);
    const impactScore = scoreImpact(resumeContent);
    const qualityScore = scoreQuality(resumeContent, validation.confidence);

    const overall = Math.round((skillsScore * 0.4) + (expScore * 0.3) + (impactScore * 0.15) + (qualityScore * 0.15));
    const finalScore = clamp(overall, 0, 100);

    const suggestions: string[] = [];
    if (missingKeywords.length > 0) {
      suggestions.push(`Add evidence for: ${missingKeywords.slice(0, 3).join(', ')}`);
    }
    if (impactScore < 60) {
      suggestions.push('Add measurable impact (numbers, %, $, time saved, users impacted) to your bullet points');
    }
    if (qualityScore < 70) {
      suggestions.push('Ensure your resume clearly includes sections like Experience, Education, and Skills');
    }
    if (finalScore < 50) {
      suggestions.push('Move the most relevant experience and skills closer to the top');
    }
    if (foundKeywords.length > 0) {
      suggestions.push(`Strong match signals: ${foundKeywords.slice(0, 2).join(' and ')}`);
    }

    return {
      score: finalScore,
      breakdown: {
        skills: skillsScore,
        experience: expScore,
        impact: impactScore,
        quality: qualityScore,
      },
      foundKeywords: foundKeywords.slice(0, 12),
      missingKeywords: missingKeywords.slice(0, 10),
      suggestions,
      evidence: buildEvidence(resumeContent, foundKeywords),
      isValidResume: true
    };
  } catch (error) {
    return {
      score: 0,
      breakdown: { skills: 0, experience: 0, impact: 0, quality: 0 },
      foundKeywords: [],
      missingKeywords: [],
      suggestions: ["Error processing resume text."],
      isValidResume: false,
      error: "Failed to process the resume text"
    };
  }
};

export const analyzeResume = async (
  resumeFile: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    const lowerName = resumeFile.name.toLowerCase();
    const isTextLike = resumeFile.type === 'text/plain' || lowerName.endsWith('.txt');
    if (!isTextLike) {
      return {
        score: 0,
        breakdown: { skills: 0, experience: 0, impact: 0, quality: 0 },
        foundKeywords: [],
        missingKeywords: [],
        suggestions: ["Paste your resume text for PDF/DOC/DOCX files"],
        isValidResume: false,
        error: 'This file type cannot be analyzed in the browser. Please paste your resume text instead.'
      };
    }

    // Extract text from file
    const resumeContent = await extractTextFromFile(resumeFile);
    return analyzeResumeText(resumeContent, jobDescription);
  } catch (error) {
    return {
      score: 0,
      breakdown: { skills: 0, experience: 0, impact: 0, quality: 0 },
      foundKeywords: [],
      missingKeywords: [],
      suggestions: ["Error processing file. Please ensure you've uploaded a valid text-based document."],
      isValidResume: false,
      error: "Failed to process the uploaded file"
    };
  }
};

// Store analysis results in localStorage for demo purposes
export const storeAnalysisResult = (result: AnalysisResult) => {
  localStorage.setItem('analysisResult', JSON.stringify(result));
};

export const storeAnalysisContext = (context: { resumeText: string; jobDescription: string }) => {
  localStorage.setItem('analysisContext', JSON.stringify(context));
};

export const getStoredAnalysisResult = (): AnalysisResult | null => {
  const stored = localStorage.getItem('analysisResult');
  return stored ? JSON.parse(stored) : null;
};

export const getStoredAnalysisContext = (): { resumeText: string; jobDescription: string } | null => {
  const stored = localStorage.getItem('analysisContext');
  return stored ? JSON.parse(stored) : null;
};
