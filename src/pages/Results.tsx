import React, { useState, useEffect } from 'react';
import { getStoredAnalysisContext, getStoredAnalysisResult, type AnalysisResult } from '../utils/mockApi';
import { generateWithOllama, isOllamaAvailable, listOllamaModels } from '../utils/ollama';

// Default mock data in case no stored result is found
const defaultResults: AnalysisResult = {
  score: 82,
  breakdown: { skills: 80, experience: 75, impact: 70, quality: 85 },
  foundKeywords: ["React", "JavaScript", "Node.js", "TailwindCSS", "TypeScript"],
  missingKeywords: ["GraphQL", "Docker", "AWS"],
  suggestions: [
    "Add more GraphQL experience to match job requirements",
    "Mention Docker projects or deployments in your experience",
    "Highlight AWS cloud experience if you have any",
    "Emphasize leadership and teamwork skills more prominently"
  ],
  evidence: [
    { keyword: 'React', snippet: 'Developed web applications using React and TypeScript' },
    { keyword: 'Node.js', snippet: 'Built REST APIs with Node.js and Express' },
  ],
  isValidResume: true
};

const Results: React.FC = () => {
  const [results, setResults] = useState<AnalysisResult>(defaultResults);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [ollamaModel, setOllamaModel] = useState<string>('');
  const [ollamaTask, setOllamaTask] = useState<'tailor' | 'rewrite_bullets' | 'summary'>('tailor');
  const [ollamaOutput, setOllamaOutput] = useState<string>('');
  const [ollamaError, setOllamaError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const breakdown = results.breakdown ?? {
    skills: results.score,
    experience: results.score,
    impact: results.score,
    quality: results.score,
  };

  useEffect(() => {
    // Try to get stored analysis result
    const storedResult = getStoredAnalysisResult();
    if (storedResult) {
      setResults(storedResult);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await isOllamaAvailable();
      if (cancelled) return;
      if (!ok) {
        setOllamaStatus('unavailable');
        return;
      }

      setOllamaStatus('available');
      const models = await listOllamaModels();
      if (cancelled) return;
      setOllamaModels(models);
      if (!ollamaModel && models.length > 0) {
        setOllamaModel(models[0]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ollamaModel]);

  const buildPrompt = (args: { resumeText: string; jobDescription: string }) => {
    const maxResumeChars = 3500;
    const maxJdChars = 2500;
    const header =
      'You are a resume reviewer. Be concise, practical, and ATS-friendly. Do not invent experience.\n\n';
    const resumeText = args.resumeText.slice(0, maxResumeChars);
    const jobDescription = args.jobDescription.slice(0, maxJdChars);
    const resume = `RESUME:\n${resumeText}\n\n`;
    const jd = `JOB DESCRIPTION:\n${jobDescription}\n\n`;

    if (ollamaTask === 'summary') {
      return (
        header +
        resume +
        jd +
        'Task: Write a professional resume summary (3-5 lines) tailored to the job description.\n' +
        'Output: Plain text only.'
      );
    }

    if (ollamaTask === 'rewrite_bullets') {
      return (
        header +
        resume +
        jd +
        'Task: Rewrite up to 6 strongest experience bullets to better match the job description.\n' +
        'Rules: Keep them truthful, add metrics only if present, use action verbs, one bullet per line.\n' +
        'Output: Bullets only.'
      );
    }

    return (
      header +
      resume +
      jd +
      'Task: Provide 8 tailored improvements to increase match for this job.\n' +
      'Output format:\n- Missing keywords to add (max 8)\n- Where to add them\n- 5 bullet rewrite suggestions\n- 3 formatting/ATS suggestions'
    );
  };

  const handleGenerate = async () => {
    setOllamaError('');
    setOllamaOutput('');

    if (ollamaStatus !== 'available') {
      setOllamaError('Ollama is not available. Start Ollama locally and try again.');
      return;
    }

    if (!ollamaModel) {
      setOllamaError('No Ollama model selected.');
      return;
    }

    const ctx = getStoredAnalysisContext();
    if (!ctx || !ctx.resumeText || !ctx.jobDescription) {
      setOllamaError('Missing analysis context. Please analyze a resume first.');
      return;
    }

    if (ctx.resumeText.trim().length < 50) {
      setOllamaError('Resume text is missing or too short. Use Paste text mode or upload a .txt resume.');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = buildPrompt({ resumeText: ctx.resumeText, jobDescription: ctx.jobDescription });
      const output = await generateWithOllama({ model: ollamaModel, prompt });
      setOllamaOutput(output);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setOllamaError(msg || 'Failed to generate with Ollama. Ensure the model is downloaded and Ollama is running.');
    } finally {
      setIsGenerating(false);
    }
  };

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

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(
              [
                { label: 'Skills Match', value: breakdown.skills, color: 'from-emerald-500 to-emerald-700' },
                { label: 'Experience Match', value: breakdown.experience, color: 'from-sky-500 to-sky-700' },
                { label: 'Impact & Metrics', value: breakdown.impact, color: 'from-amber-500 to-amber-700' },
                { label: 'Resume Quality', value: breakdown.quality, color: 'from-violet-500 to-violet-700' },
              ] as const
            ).map((item) => (
              <div key={item.label} className="rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-neutral-800">{item.label}</span>
                  <span className="font-bold text-neutral-900">{Math.round(item.value)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${Math.max(0, Math.min(100, item.value))}%` }}
                  />
                </div>
              </div>
            ))}
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

        {/* Evidence */}
        {results.evidence && results.evidence.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Evidence (Where matches were found)</h2>
            <div className="space-y-4">
              {results.evidence.map((e, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-neutral-900">{e.keyword}</span>
                  </div>
                  <p className="text-sm text-neutral-700">{e.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local AI (Ollama) */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Local AI (Ollama)</h2>
          <p className="text-sm text-neutral-600 mb-6">
            Uses a model running on your machine via Ollama. Nothing is sent to a paid API.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:items-end mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-neutral-800 mb-2">Status</label>
              <div className="px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-sm">
                {ollamaStatus === 'checking' && 'Checking…'}
                {ollamaStatus === 'available' && 'Available'}
                {ollamaStatus === 'unavailable' && 'Not detected (start Ollama locally: http://localhost:11434)'}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-neutral-800 mb-2">Model</label>
              <select
                value={ollamaModel}
                onChange={(e) => setOllamaModel(e.target.value)}
                disabled={ollamaStatus !== 'available' || ollamaModels.length === 0}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white"
              >
                {ollamaModels.length === 0 ? (
                  <option value="">No models found</option>
                ) : (
                  ollamaModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-neutral-800 mb-2">Task</label>
              <select
                value={ollamaTask}
                onChange={(e) => setOllamaTask(e.target.value as typeof ollamaTask)}
                disabled={ollamaStatus !== 'available'}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white"
              >
                <option value="tailor">Tailored improvements</option>
                <option value="rewrite_bullets">Rewrite bullets</option>
                <option value="summary">Write a summary</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={ollamaStatus !== 'available' || isGenerating}
              className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-[#124170] to-[#26667F] text-white disabled:opacity-50"
            >
              {isGenerating ? 'Generating…' : 'Generate'}
            </button>
          </div>

          {ollamaError && (
            <div className="mb-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm">
              {ollamaError}
            </div>
          )}

          {ollamaOutput && (
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50">
              <pre className="whitespace-pre-wrap text-sm text-neutral-800">{ollamaOutput}</pre>
            </div>
          )}
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
