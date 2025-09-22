// Mock API for resume analysis
export interface AnalysisResult {
  score: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export const analyzeResume = async (
  resumeFile: File,
  jobDescription: string
): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // In a real implementation, we would process the resumeFile and jobDescription
  // For now, we'll use them to vary the mock response slightly
  const baseScore = 75 + Math.floor(Math.random() * 20);
  const hasReact = jobDescription.toLowerCase().includes('react');
  const fileSize = resumeFile.size; // Use file size to add some variation
  
  // Mock analysis result with some variation based on inputs
  return {
    score: Math.min(95, baseScore + (fileSize > 50000 ? 2 : 0)), // Slight bonus for larger files
    foundKeywords: hasReact 
      ? ["React", "JavaScript", "Node.js", "TailwindCSS", "TypeScript"]
      : ["JavaScript", "HTML", "CSS", "Node.js", "Git"],
    missingKeywords: hasReact
      ? ["GraphQL", "Docker", "AWS"]
      : ["React", "TypeScript", "MongoDB"],
    suggestions: [
      "Add more relevant experience to match job requirements",
      "Mention specific projects or deployments in your experience",
      "Highlight technical skills mentioned in the job description",
      "Emphasize leadership and teamwork skills more prominently"
    ]
  };
};

// Store analysis results in localStorage for demo purposes
export const storeAnalysisResult = (result: AnalysisResult) => {
  localStorage.setItem('analysisResult', JSON.stringify(result));
};

export const getStoredAnalysisResult = (): AnalysisResult | null => {
  const stored = localStorage.getItem('analysisResult');
  return stored ? JSON.parse(stored) : null;
};
