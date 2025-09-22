import React, { useState } from 'react';
import { analyzeResume, storeAnalysisResult } from '../utils/mockApi';

const Analyze: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and provide a job description.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Call mock API
      const result = await analyzeResume(resumeFile, jobDescription);
      
      // Store result for results page
      storeAnalysisResult(result);
      
      // Navigate to results page
      window.location.href = '/results';
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tips = [
    "Use a clean, professional format",
    "Include relevant keywords from the job description",
    "Quantify your achievements with numbers",
    "Keep it concise (1-2 pages max)",
    "Use action verbs to describe your experience",
    "Proofread for spelling and grammar errors"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste the job description to get AI-powered insights 
            and recommendations for improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-8">
                {/* Resume Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    1. Upload Your Resume
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="text-6xl text-gray-400 mb-4">📄</div>
                      {resumeFile ? (
                        <div>
                          <p className="text-lg font-medium text-green-600 mb-2">
                            ✓ {resumeFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Drop your resume here or click to browse
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports PDF, DOC, DOCX, and TXT files
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    2. Paste Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here. Include requirements, responsibilities, and preferred qualifications..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {jobDescription.length} characters
                  </p>
                </div>

                {/* Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Resume...
                      </div>
                    ) : (
                      'Analyze Resume'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Resume Tips
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🚀 How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    1
                  </div>
                  <span className="text-sm text-gray-600">Upload your resume</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    2
                  </div>
                  <span className="text-sm text-gray-600">Paste job description</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    3
                  </div>
                  <span className="text-sm text-gray-600">Get AI analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    ✓
                  </div>
                  <span className="text-sm text-gray-600">Improve your resume</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                📊 Success Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Resumes Analyzed</span>
                  <span className="font-semibold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Average Improvement</span>
                  <span className="font-semibold">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">User Satisfaction</span>
                  <span className="font-semibold">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
