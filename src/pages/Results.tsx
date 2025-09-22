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
  ]
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Analysis Results
          </h1>
          <p className="text-xl text-gray-600">
            Here's how your resume performs against the job description
          </p>
        </div>

        {/* Dashboard Grid */}
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
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${results.score * 2.51} ${(100 - results.score) * 2.51}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
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
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
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
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                📄 Export PDF Report
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                📤 Share Results
              </button>
              <a
                href="/analyze"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 inline-block"
              >
                🔄 Analyze Another Resume
              </a>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Want More Detailed Analysis?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get personalized career coaching and detailed resume optimization strategies
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
