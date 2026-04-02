import { useAuth } from '../firebase/AuthContext';
import { addApplication } from '../firebase/trackerService';
import React, { useState, useRef, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Loader2, X, Check, 
  Sparkles, AlertCircle, Terminal, ChevronDown,
  FileUp, Briefcase, Zap, Copy
} from 'lucide-react';
import { analyzeResumeText, extractResumeTextFromFile, type AnalysisResult } from '../utils/mockApi';
import { generateWithGemini, buildGeminiPrompt, type GeminiTask } from '../utils/gemini';
import { useToast } from '../components/Toast';

// API URL: production uses same domain (Vercel serverless), dev uses Vite proxy
const API_BASE = import.meta.env.PROD ? '' : '';

// Memoized result sections for performance
const ScoreCircle = memo(({ score }: { score: number }) => (
  <div className="relative w-48 h-48 shrink-0">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(72,122,145,0.1)" strokeWidth="6" />
      <motion.circle 
        cx="50" cy="50" r="42" fill="none" stroke="#487A91" strokeWidth="6" strokeLinecap="round"
        initial={{ strokeDasharray: "0 264" }}
        animate={{ strokeDasharray: `${score * 2.64} 264` }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-6xl font-semibold text-neutral-900 tracking-tight">{score}</span>
      <span className="text-xs text-neutral-500 mt-1">ATS Score</span>
    </div>
  </div>
));

const KeywordTag = memo(({ keyword, type }: { keyword: string; type: 'found' | 'missing' }) => (
  <span className={`px-3 py-1.5 text-xs font-medium transition-colors rounded-lg border ${
    type === 'found' 
      ? 'border-success-200 text-success-700 bg-success-50' 
      : 'border-neutral-200 text-neutral-600 bg-neutral-100'
  }`}>
    {keyword}
  </span>
));

const Analyze: React.FC = () => {
  const { showToast } = useToast();
  
  // Input State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeInputMode, setResumeInputMode] = useState<'file' | 'text'>('file');
  const [jobDescription, setJobDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [contextText, setContextText] = useState('');

  // Gemini State
  const [geminiTask, setGeminiTask] = useState<GeminiTask>('tailor');
  const [geminiOutput, setGeminiOutput] = useState<string>('');
  const [geminiError, setGeminiError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Interview Prep State
  const [interviewQuestions, setInterviewQuestions] = useState('');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);

  // Salary Estimate State
  const [salaryEstimate, setSalaryEstimate] = useState<{
    range_low: number;
    range_high: number;
    currency: string;
    period: string;
    confidence: string;
    factors: string[];
    notes: string;
  } | null>(null);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [isGeneratingSalary, setIsGeneratingSalary] = useState(false);

  // Cover Letter State
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tracker Modal State
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [trackerForm, setTrackerForm] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    url: '',
    notes: ''
  });

  // Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setResumeFile(e.dataTransfer.files[0]);
      setResumeInputMode('file');
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const canAnalyze = !!jobDescription.trim() && (
    (resumeInputMode === 'file' && !!resumeFile) ||
    (resumeInputMode === 'text' && resumeText.trim().length >= 50)
  );

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setError('');
    setIsAnalyzing(true);
    setResult(null);
    setContextText('');
    setGeminiOutput('');

    try {
      let extractedText = '';

      if (resumeInputMode === 'text') {
        extractedText = resumeText;
        const res = await analyzeResumeText(resumeText, jobDescription);
        setResult(res);
      } else {
        const file = resumeFile as File;
        const lowerName = file.name.toLowerCase();
        const isTextLike = file.type === 'text/plain' || lowerName.endsWith('.txt');
        const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
        const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          lowerName.endsWith('.docx');

        if (isPdf || isDocx || isTextLike) {
          extractedText = await extractResumeTextFromFile(file);
        } else {
          throw new Error('Unsupported file type. Please use PDF, DOCX, or TXT.');
        }

        const res = await analyzeResumeText(extractedText, jobDescription);
        setResult(res);
      }

      setContextText(extractedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!contextText || !jobDescription) return;
    setGeminiError('');
    setIsGenerating(true);
    try {
      const prompt = buildGeminiPrompt({
        resumeText: contextText,
        jobDescription,
        task: geminiTask,
      });
      const output = await generateWithGemini(prompt);
      setGeminiOutput(output);
    } catch (e) {
      setGeminiError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!contextText || !jobDescription) return;
    setIsGeneratingCoverLetter(true);
    try {
      const prompt = buildGeminiPrompt({
        resumeText: contextText,
        jobDescription,
        task: 'cover_letter',
      });
      const letter = await generateWithGemini(prompt);
      setCoverLetter(letter);
      setShowCoverLetterModal(true);
    } catch (e) {
      // Silently fail - error not critical
      console.error('Cover letter generation failed:', e);
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleGenerateInterviewQuestions = async () => {
    if (!contextText || !jobDescription) return;
    setIsGeneratingInterview(true);
    try {
      const prompt = buildGeminiPrompt({
        resumeText: contextText,
        jobDescription,
        task: 'interview_questions',
      });
      const questions = await generateWithGemini(prompt);
      setInterviewQuestions(questions);
      setShowInterviewModal(true);
    } catch (e) {
      console.error('Interview questions generation failed:', e);
    } finally {
      setIsGeneratingInterview(false);
    }
  };

  const handleGenerateSalaryEstimate = async () => {
    if (!jobDescription) return;
    setIsGeneratingSalary(true);
    try {
      const prompt = buildGeminiPrompt({
        resumeText: contextText || '',
        jobDescription,
        task: 'salary_estimate',
      });
      const response = await generateWithGemini(prompt);
      
      // Try to parse the JSON response
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setSalaryEstimate(parsed);
        } else {
          setSalaryEstimate(null);
        }
      } catch {
        setSalaryEstimate(null);
      }
      setShowSalaryModal(true);
    } catch (e) {
      console.error('Salary estimate generation failed:', e);
    } finally {
      setIsGeneratingSalary(false);
    }
  };

  const { user, isAuthenticated } = useAuth();

  // Restore pending tracker form data after returning from login
  useEffect(() => {
    const pendingForm = localStorage.getItem('pending_tracker_form');
    if (pendingForm && isAuthenticated) {
      try {
        const formData = JSON.parse(pendingForm);
        setTrackerForm(formData);
        setShowTrackerModal(true);
        localStorage.removeItem('pending_tracker_form');
      } catch {
        // Ignore invalid JSON
      }
    }
  }, [isAuthenticated]);

  const handleSaveToTracker = async () => {
    if (!isAuthenticated || !user) {
      // Store form data before redirecting
      localStorage.setItem('pending_tracker_form', JSON.stringify(trackerForm));
      localStorage.setItem('pending_tracker_redirect', 'true');
      showToast('Please sign in to save applications to your tracker', 'info');
      window.location.href = '/login';
      return;
    }
    
    try {
      await addApplication(user.uid, {
        company: trackerForm.company,
        role: trackerForm.role,
        location: trackerForm.location,
        salary: trackerForm.salary,
        url: trackerForm.url,
        notes: trackerForm.notes,
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0]
      });
      
      setShowTrackerModal(false);
      setTrackerForm({ company: '', role: '', location: '', salary: '', url: '', notes: '' });
      // Clear any pending data
      localStorage.removeItem('pending_tracker_form');
      localStorage.removeItem('pending_tracker_redirect');
      showToast('Application saved to tracker!', 'success');
    } catch (err) {
      console.error('Failed to save application:', err);
      showToast('Failed to save application. Please try again.', 'error');
    }
  };

  const breakdown = result?.breakdown ?? { skills: 0, experience: 0, impact: 0, quality: 0 };

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(72,122,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(72,122,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Main Content */}
      <main className="pb-20 pt-24 relative">
        <div className="container-premium">
          {/* Page Header */}
          <div className="mb-12">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Analysis</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">Analyze your resume</h1>
            <p className="text-neutral-600 max-w-lg">
              Upload your resume and job description to identify gaps and get AI-powered optimization suggestions.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-error-50 border border-error-200 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-error-500 shrink-0 mt-0.5" />
                    <p className="text-error-700 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Resume Input */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      <FileUp className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-neutral-900 font-semibold">Resume</h3>
                      <p className="text-neutral-500 text-sm">PDF, DOCX, or TXT</p>
                    </div>
                  </div>
                  <div className="flex bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setResumeInputMode('file')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        resumeInputMode === 'file' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      File
                    </button>
                    <button
                      onClick={() => setResumeInputMode('text')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        resumeInputMode === 'text' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                      }`}
                    >
                      Text
                    </button>
                  </div>
                </div>

                {resumeInputMode === 'file' ? (
                  <div className="relative">
                    <label
                      className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                        dragActive 
                          ? 'border-primary-400 bg-primary-50/50' 
                          : resumeFile 
                            ? 'border-success-300 bg-success-50/30' 
                            : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => e.target.files?.[0] && setResumeFile(e.target.files[0])}
                        className="hidden"
                      />
                      {resumeFile ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-success-600" />
                          </div>
                          <div>
                            <p className="text-neutral-900 font-medium truncate max-w-[200px]">
                              {resumeFile.name}
                            </p>
                            <p className="text-neutral-500 text-sm">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center">
                            <Upload className="w-6 h-6 text-neutral-400" />
                          </div>
                          <div>
                            <p className="text-neutral-700 font-medium">Drop file or click to upload</p>
                            <p className="text-neutral-500 text-sm mt-1">PDF, DOCX, or TXT</p>
                          </div>
                        </div>
                      )}
                    </label>
                    {resumeFile && (
                      <button
                        onClick={clearFile}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:border-error-300 hover:bg-error-50 transition-colors shadow-soft"
                      >
                        <X className="w-3 h-3 text-neutral-400 hover:text-error-500" />
                      </button>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    className="w-full h-48 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-xl border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                  />
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-tertiary-50 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-tertiary-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold">Job Description</h3>
                    <p className="text-neutral-500 text-sm">Paste the full description</p>
                  </div>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-48 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-xl border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-2 rounded-full transition-colors ${
                          jobDescription.length > (i + 1) * 150 ? 'bg-primary-400' : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-neutral-500 text-sm font-medium">{jobDescription.length} chars</span>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-medium"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-3">
              {!result ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-neutral-200 border-dashed">
                  <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                    <Terminal className="w-10 h-10 text-primary-400" />
                  </div>
                  <h3 className="text-neutral-900 font-semibold mb-2 text-xl">Ready to analyze</h3>
                  <p className="text-neutral-500 max-w-xs">
                    Upload your resume and job description to see your match score and optimization suggestions.
                  </p>
                </div>
              ) : !result.isValidResume ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-error-200 p-12 text-center"
                >
                  <div className="w-16 h-16 bg-error-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-error-500" />
                  </div>
                  <h3 className="text-neutral-900 text-xl mb-3 font-semibold">Invalid Resume</h3>
                  <p className="text-error-600">{result.error}</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-soft">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <ScoreCircle score={result.score} />
                      <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: 'Skills', val: breakdown.skills, color: 'bg-primary-500' },
                            { label: 'Experience', val: breakdown.experience, color: 'bg-primary-500' },
                            { label: 'Impact', val: breakdown.impact, color: 'bg-primary-500' },
                            { label: 'Quality', val: breakdown.quality, color: 'bg-primary-500' },
                          ].map((item) => (
                            <div key={item.label}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-neutral-500 text-sm font-medium">{item.label}</span>
                                <span className="text-neutral-900 text-sm font-semibold">{Math.round(item.val)}%</span>
                              </div>
                              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.val}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className={`h-full ${item.color} rounded-full`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-success-200 p-6 shadow-soft">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success-500 rounded-full" />
                          <h4 className="text-neutral-900 font-semibold">Found Keywords</h4>
                        </div>
                        <span className="bg-success-100 text-success-700 px-2 py-1 rounded-lg text-xs font-semibold">{result.foundKeywords.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.foundKeywords.map((kw) => (
                          <KeywordTag key={kw} keyword={kw} type="found" />
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                          <h4 className="text-neutral-900 font-semibold">Missing Keywords</h4>
                        </div>
                        <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg text-xs font-semibold">{result.missingKeywords.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((kw) => (
                          <KeywordTag key={kw} keyword={kw} type="missing" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                    <h4 className="text-neutral-900 font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary-500" />
                      Suggestions
                    </h4>
                    <ul className="space-y-3">
                      {result.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-6 h-6 bg-primary-50 text-primary-600 rounded-lg font-semibold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                          <span className="text-neutral-700 leading-relaxed">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI Assistant */}
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="text-neutral-900 font-semibold">AI Assistant</h4>
                        <p className="text-neutral-500 text-sm">Get personalized improvements</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <div className="relative flex-1">
                        <select
                          value={geminiTask}
                          onChange={(e) => setGeminiTask(e.target.value as GeminiTask)}
                          className="w-full h-11 bg-neutral-50 text-neutral-900 text-sm px-4 pr-10 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 appearance-none"
                        >
                          <option value="tailor">Tailor to job description</option>
                          <option value="rewrite_bullets">Rewrite bullet points</option>
                          <option value="summary">Generate summary</option>
                          <option value="interview_questions">Interview prep questions</option>
                          <option value="salary_estimate">Salary estimate</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <button
                        onClick={handleGenerateAI}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white h-11 px-6 text-sm font-semibold rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:translate-y-0 shadow-soft"
                      >
                        {isGenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate
                          </>
                        )}
                      </button>
                    </div>

                    {geminiError && (
                      <div className="p-3 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm mb-4">
                        {geminiError}
                      </div>
                    )}

                    <AnimatePresence>
                      {geminiOutput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                            <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed">
                              {geminiOutput}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateInterviewQuestions}
                        disabled={isGeneratingInterview}
                        className="flex items-center gap-2 p-3 bg-tertiary-50 rounded-xl border border-tertiary-200 hover:bg-tertiary-100 transition-colors text-left"
                      >
                        <div className="w-10 h-10 bg-tertiary-100 rounded-lg flex items-center justify-center shrink-0">
                          {isGeneratingInterview ? (
                            <Loader2 className="w-5 h-5 text-tertiary-600 animate-spin" />
                          ) : (
                            <span className="text-lg">🎯</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 text-sm">Interview Prep</p>
                          <p className="text-neutral-500 text-xs">10 questions + answers</p>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateSalaryEstimate}
                        disabled={isGeneratingSalary}
                        className="flex items-center gap-2 p-3 bg-success-50 rounded-xl border border-success-200 hover:bg-success-100 transition-colors text-left"
                      >
                        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center shrink-0">
                          {isGeneratingSalary ? (
                            <Loader2 className="w-5 h-5 text-success-600 animate-spin" />
                          ) : (
                            <span className="text-lg">💰</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 text-sm">Salary Insight</p>
                          <p className="text-neutral-500 text-xs">Market rate estimate</p>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Next Steps - Cover Letter & Tracker */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Generate Cover Letter */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenerateCoverLetter()}
                      disabled={isGeneratingCoverLetter}
                      className="bg-white rounded-2xl border border-neutral-200 p-6 text-left hover:border-primary-300 hover:shadow-medium transition-all group shadow-soft"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                          {isGeneratingCoverLetter ? (
                            <Loader2 className="w-7 h-7 text-primary-500 animate-spin" />
                          ) : (
                            <FileText className="w-7 h-7 text-primary-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-900 font-semibold mb-1">
                            {isGeneratingCoverLetter ? 'Writing your letter...' : 'Generate Cover Letter'}
                          </h4>
                          <p className="text-neutral-500 text-sm">
                            Transform your resume and this job into a tailored cover letter
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* Save to Tracker */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowTrackerModal(true)}
                      className="bg-white rounded-2xl border border-neutral-200 p-6 text-left hover:border-success-300 hover:shadow-medium transition-all group shadow-soft"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-success-50 rounded-xl flex items-center justify-center group-hover:bg-success-100 transition-colors">
                          <Briefcase className="w-7 h-7 text-success-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-neutral-900 font-semibold mb-1">Save to Job Tracker</h4>
                          <p className="text-neutral-500 text-sm">
                            Track this application and follow up at the right time
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Cover Letter Modal */}
      <AnimatePresence>
        {showCoverLetterModal && coverLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCoverLetterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-neutral-200 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-strong"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 rounded-t-2xl">
                <div>
                  <h3 className="text-neutral-900 font-semibold text-lg">Your Cover Letter</h3>
                  <p className="text-neutral-500 text-sm">Generated from your resume and job description</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetter);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-2 bg-white border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-5 h-5 text-success-500" /> : <Copy className="w-5 h-5 text-neutral-500" />}
                  </button>
                  <button
                    onClick={() => setShowCoverLetterModal(false)}
                    className="p-2 bg-white border border-neutral-200 rounded-lg hover:border-error-300 hover:bg-error-50 transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {coverLetter}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save to Tracker Modal */}
      <AnimatePresence mode="wait">
        {showTrackerModal && (
          <motion.div
            key="tracker-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTrackerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full shadow-strong"
            >
              <div className="p-6 border-b border-neutral-200 bg-neutral-50 rounded-t-2xl">
                <h3 className="text-neutral-900 font-semibold text-lg">Save to Job Tracker</h3>
                <p className="text-neutral-500 text-sm">Track this application</p>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Company name *"
                  value={trackerForm.company}
                  onChange={e => setTrackerForm({...trackerForm, company: e.target.value})}
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                />
                <input
                  type="text"
                  placeholder="Role / Position *"
                  value={trackerForm.role}
                  onChange={e => setTrackerForm({...trackerForm, role: e.target.value})}
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                />
                <input
                  type="text"
                  placeholder="Location (optional)"
                  value={trackerForm.location}
                  onChange={e => setTrackerForm({...trackerForm, location: e.target.value})}
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                />
                <input
                  type="text"
                  placeholder="Salary range (optional)"
                  value={trackerForm.salary}
                  onChange={e => setTrackerForm({...trackerForm, salary: e.target.value})}
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                />
                <input
                  type="url"
                  placeholder="Job posting URL (optional)"
                  value={trackerForm.url}
                  onChange={e => setTrackerForm({...trackerForm, url: e.target.value})}
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                />
                <textarea
                  placeholder="Notes (optional) - Interview dates, recruiter name, etc."
                  value={trackerForm.notes}
                  onChange={e => setTrackerForm({...trackerForm, notes: e.target.value})}
                  className="w-full h-24 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                />
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveToTracker}
                    disabled={!trackerForm.company?.trim() || !trackerForm.role?.trim()}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 text-sm font-semibold rounded-lg transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50"
                  >
                    <Briefcase className="w-4 h-4" />
                    Save Application
                  </button>
                  <button
                    onClick={() => setShowTrackerModal(false)}
                    className="px-6 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Interview Questions Modal */}
      <AnimatePresence>
        {showInterviewModal && interviewQuestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInterviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-neutral-200 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-strong"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-tertiary-50 rounded-t-2xl">
                <div>
                  <h3 className="text-neutral-900 font-semibold text-lg">🎯 Interview Preparation</h3>
                  <p className="text-neutral-500 text-sm">10 common questions with answer frameworks</p>
                </div>
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="p-2 bg-white border border-neutral-200 rounded-lg hover:border-error-300 hover:bg-error-50 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
              <div className="p-6">
                <pre className="text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed text-sm">
                  {interviewQuestions}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Salary Estimate Modal */}
      <AnimatePresence>
        {showSalaryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSalaryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full shadow-strong"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-success-50 rounded-t-2xl">
                <div>
                  <h3 className="text-neutral-900 font-semibold text-lg">💰 Salary Insight</h3>
                  <p className="text-neutral-500 text-sm">Market rate estimate for this role</p>
                </div>
                <button
                  onClick={() => setShowSalaryModal(false)}
                  className="p-2 bg-white border border-neutral-200 rounded-lg hover:border-error-300 hover:bg-error-50 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                {salaryEstimate ? (
                  <>
                    <div className="text-center">
                      <p className="text-neutral-500 text-sm mb-2">Estimated Range</p>
                      <p className="text-3xl font-semibold text-neutral-900">
                        {salaryEstimate.currency} {salaryEstimate.range_low.toLocaleString()} - {salaryEstimate.range_high.toLocaleString()}
                      </p>
                      <p className="text-neutral-400 text-xs mt-1 capitalize">per {salaryEstimate.period}</p>
                      <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                        salaryEstimate.confidence === 'high' ? 'bg-success-100 text-success-700' :
                        salaryEstimate.confidence === 'medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                        {salaryEstimate.confidence} confidence
                      </span>
                    </div>
                    
                    {salaryEstimate.factors?.length > 0 && (
                      <div>
                        <p className="text-neutral-500 text-sm mb-3">Factors affecting salary:</p>
                        <ul className="space-y-2">
                          {salaryEstimate.factors.map((factor, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                              <span className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 shrink-0" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {salaryEstimate.notes && (
                      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                        <p className="text-neutral-600 text-sm">{salaryEstimate.notes}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-500">Unable to generate estimate. Job description may not contain enough salary information.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Analyze;
