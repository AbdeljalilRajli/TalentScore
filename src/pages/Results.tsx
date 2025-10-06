import React, { useState, useEffect } from 'react';
import { getStoredAnalysisResult, type AnalysisResult } from '../utils/mockApi';

// Default mock data in case no stored result is found
const defaultResults: AnalysisResult = {
  score: 82,
  foundKeywords: ["React", "JavaScript", "Node.js", "TailwindCSS", "TypeScript"],
  missingKeywords: ["GraphQL", "Docker", "AWS"],
  suggestions: [
    "Add more GraphQL experience to match job requirements",
    "Mention Docker projects or deployments in your experience",
    "Highlight AWS cloud experience if you have any",
    "Emphasize leadership and teamwork skills more prominently"
  ],
  isValidResume: true
};

const Results: React.FC = () => {
  const [results, setResults] = useState<AnalysisResult>(defaultResults);

  useEffect(() => {
    // Try to get stored analysis result
    const storedResult = getStoredAnalysisResult();
    if (storedResult) {
      setResults(storedResult);
    }
  }, []);

  // Simple pie chart component (we'll replace with Recharts later)
  const PieChart = () => {
    const foundPercentage = (results.foundKeywords.length / (results.foundKeywords.length + results.missingKeywords.length)) * 100;
    const missingPercentage = 100 - foundPercentage;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#f87171"
            strokeWidth="10"
            strokeDasharray={`${missingPercentage} ${foundPercentage}`}
            strokeDashoffset="25"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#4ade80"
            strokeWidth="10"
            strokeDasharray={`${foundPercentage} ${missingPercentage}`}
            strokeDashoffset={`${25 - missingPercentage}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{results.foundKeywords.length}</div>
            <div className="text-sm text-gray-500">Found</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full blob" style={{ background: 'radial-gradient(circle at 40% 40%, rgba(221,244,231,0.9), rgba(221,244,231,0.0) 60%)' }} />
          <div className="absolute -bottom-20 right-[-120px] w-[520px] h-[520px] rounded-full blob" style={{ background: 'radial-gradient(circle at 70% 60%, rgba(103,192,144,0.35), rgba(103,192,144,0.0) 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="page-kicker mb-6">
              <span className="w-2 h-2 bg-ocean-600 rounded-full mr-3"></span>
              Analysis Complete
            </div>
            <h1 className="page-title mb-4 leading-tight">Resume Analysis Results</h1>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto font-body leading-relaxed">
              Here's how your resume performs against the job description
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Error Message for Invalid Resume */}
        {!results.isValidResume && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800 font-heading">Invalid Document Detected</h3>
                <p className="text-red-700 font-body">{results.error}</p>
              </div>
            </div>
            <div className="bg-red-100 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 mb-2">What to do:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Upload a proper resume document (PDF, DOC, or TXT)</li>
                <li>• Ensure your resume contains sections like Experience, Education, and Skills</li>
                <li>• Avoid uploading recipes, manuals, or other non-resume documents</li>
              </ul>
            </div>
            <div className="flex gap-4">
              <a href="/analyze" className="btn-primary">
                Try Again
              </a>
              <a href="/about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        )}

        {/* Dashboard Grid - Only show if valid resume */}
        {results.isValidResume && (
          <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Match Score Card */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Match Score</h2>
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="url(#brandGradient)"
                    strokeWidth="8"
                    strokeDasharray={`${results.score * 2.51} ${(100 - results.score) * 2.51}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#26667F" />
                      <stop offset="100%" stopColor="#67C090" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{results.score}%</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              Your resume matches {results.score}% of the job requirements
            </p>
          </div>

          {/* Keywords Found */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keywords Found</h2>
            <div className="space-y-3">
              {results.foundKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700 font-medium">{keyword}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">
                ✓ Great! These keywords strengthen your application
              </p>
            </div>
          </div>

          {/* Keywords Missing */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keywords Missing</h2>
            <div className="space-y-3">
              {results.missingKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  <span className="text-gray-700 font-medium">{keyword}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 text-sm">
                ⚠ Consider adding these skills to improve your match
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Keyword Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Keyword Distribution</h2>
            <PieChart />
            <div className="flex justify-center space-x-6 mt-6">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded mr-2"></span>
                <span className="text-sm text-gray-600">Found ({results.foundKeywords.length})</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded mr-2"></span>
                <span className="text-sm text-gray-600">Missing ({results.missingKeywords.length})</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Suggestions</h2>
            <div className="space-y-4">
              {results.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-6 h-6 bg-sky-200 text-ocean-700 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#124170] to-[#26667F] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                📄 Export PDF Report
              </button>
              <button className="border-2 border-neutral-300 text-neutral-700 px-8 py-3 rounded-lg font-semibold hover:border-ocean-600 hover:text-ocean-600 transition-all duration-200">
                📤 Share Results
              </button>
              <a
                href="/analyze"
                className="bg-sage-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-600 transition-all duration-200 inline-block"
              >
                🔄 Analyze Another Resume
              </a>
            </div>
          </div>
        </div>
        </>
        )}

        {/* Additional Insights */}
        <div className="mt-8 bg-gradient-to-r from-[#124170] to-[#26667F] text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Want More Detailed Analysis?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get personalized career coaching and detailed resume optimization strategies
            </p>
            <button className="bg-white text-ocean-700 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
