// Mock API for resume analysis
export interface AnalysisResult {
  score: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
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

// Extract text content from file
const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // For demo purposes, we'll simulate text extraction from different file types
    // In a real app, you'd use libraries like pdf-parse, mammoth, etc.
    
    if (file.type === 'application/pdf') {
      // Simulate PDF text extraction with common resume content
      const mockPdfContent = `
        John Doe
        Software Engineer
        Experience:
        Senior Software Developer at Tech Company (2020-2023)
        - Developed web applications using React, Node.js, and TypeScript
        - Led a team of 5 developers on multiple projects
        - Implemented CI/CD pipelines using Docker and AWS
        
        Education:
        Bachelor of Science in Computer Science
        University of Technology (2016-2020)
        
        Skills:
        JavaScript, Python, React, Node.js, AWS, Docker, Git
        Leadership, Team Management, Problem Solving
        
        Projects:
        E-commerce Platform - Built using React and Node.js
        Mobile App - Developed using React Native
      `;
      resolve(mockPdfContent.toLowerCase());
      return;
    }
    
    if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      // Simulate Word document text extraction
      const mockWordContent = `
        Jane Smith
        Product Manager
        
        Professional Experience:
        Senior Product Manager - StartupXYZ (2021-Present)
        - Managed product roadmap for B2B SaaS platform
        - Collaborated with engineering and design teams
        - Increased user engagement by 40%
        
        Product Manager - TechCorp (2019-2021)
        - Led product development for mobile applications
        - Conducted user research and market analysis
        
        Education:
        MBA in Business Administration
        Business School (2017-2019)
        
        Bachelor of Arts in Marketing
        State University (2013-2017)
        
        Skills:
        Product Management, Agile, Scrum, Analytics
        Leadership, Communication, Strategic Planning
      `;
      resolve(mockWordContent.toLowerCase());
      return;
    }
    
    // For text files, read normally
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text.toLowerCase());
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Validate if the uploaded file is actually a resume
const validateResume = (content: string): { isValid: boolean; confidence: number; error?: string } => {
  if (!content || content.trim().length < 50) {
    return { 
      isValid: false, 
      confidence: 0, 
      error: "File appears to be too short or empty to be a resume" 
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

  RESUME_INDICATORS.forEach(indicator => {
    if (content.includes(indicator)) {
      resumeScore += 1;
    }
  });

  NON_RESUME_INDICATORS.forEach(indicator => {
    if (content.includes(indicator)) {
      nonResumeScore += 2; // Weight non-resume indicators more heavily
    }
  });

  const confidence = Math.max(0, Math.min(100, (resumeScore * 10) - (nonResumeScore * 5)));
  
  // Only reject if there are many cooking/recipe indicators
  if (nonResumeScore > 5) {
    return { 
      isValid: false, 
      confidence, 
      error: "This appears to be a recipe, manual, or other non-resume document" 
    };
  }

  // Be more lenient - only require 1 resume indicator instead of 3
  if (resumeScore < 1 && nonResumeScore > 2) {
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
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'express',
    'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
    'git', 'github', 'typescript', 'html', 'css', 'sass', 'tailwind', 'bootstrap',
    'redux', 'graphql', 'rest', 'api', 'microservices', 'agile', 'scrum',
    'leadership', 'management', 'communication', 'teamwork', 'problem-solving',
    'analytical', 'creative', 'detail-oriented', 'self-motivated', 'collaborative'
  ];

  const jobLower = jobDescription.toLowerCase();
  return commonSkills.filter(skill => 
    jobLower.includes(skill) || jobLower.includes(skill.replace('.', ''))
  );
};

// Find matching keywords between resume and job description
const findMatchingKeywords = (resumeContent: string, jobKeywords: string[]): string[] => {
  const resumeLower = resumeContent.toLowerCase();
  return jobKeywords.filter(keyword => 
    resumeLower.includes(keyword.toLowerCase())
  );
};

export const analyzeResume = async (
  resumeFile: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    // Extract text from file
    const resumeContent = await extractTextFromFile(resumeFile);
    
    // Validate if it's actually a resume
    const validation = validateResume(resumeContent);
    
    if (!validation.isValid) {
      return {
        score: 0,
        foundKeywords: [],
        missingKeywords: [],
        suggestions: ["Please upload a valid resume document"],
        isValidResume: false,
        error: validation.error
      };
    }

    // Extract keywords from job description
    const jobKeywords = extractJobKeywords(jobDescription);
    
    if (jobKeywords.length === 0) {
      return {
        score: 0,
        foundKeywords: [],
        missingKeywords: [],
        suggestions: ["Please provide a more detailed job description with specific requirements"],
        isValidResume: true,
        error: "Job description doesn't contain enough technical requirements to analyze"
      };
    }

    // Find matching keywords
    const foundKeywords = findMatchingKeywords(resumeContent, jobKeywords);
    const missingKeywords = jobKeywords.filter(keyword => !foundKeywords.includes(keyword));
    
    // Calculate score based on keyword matches
    const matchPercentage = (foundKeywords.length / jobKeywords.length) * 100;
    const baseScore = Math.round(matchPercentage);
    
    // Add some variation based on resume quality indicators
    const qualityBonus = Math.min(10, validation.confidence / 10);
    const finalScore = Math.min(95, Math.max(15, baseScore + qualityBonus));

    // Generate intelligent suggestions
    const suggestions = [];
    
    if (missingKeywords.length > 0) {
      suggestions.push(`Add experience with: ${missingKeywords.slice(0, 3).join(', ')}`);
    }
    
    if (finalScore < 50) {
      suggestions.push("Consider highlighting more relevant technical skills");
      suggestions.push("Add specific examples of projects using the required technologies");
    }
    
    if (finalScore < 30) {
      suggestions.push("This resume may not be a good fit for this position - consider applying for roles that better match your background");
    }
    
    if (foundKeywords.length > 0) {
      suggestions.push(`Great! Your experience with ${foundKeywords.slice(0, 2).join(' and ')} aligns well with the job requirements`);
    }

    return {
      score: finalScore,
      foundKeywords: foundKeywords.slice(0, 10), // Limit to top 10
      missingKeywords: missingKeywords.slice(0, 8), // Limit to top 8
      suggestions,
      isValidResume: true
    };

  } catch (error) {
    return {
      score: 0,
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

export const getStoredAnalysisResult = (): AnalysisResult | null => {
  const stored = localStorage.getItem('analysisResult');
  return stored ? JSON.parse(stored) : null;
};
