import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, Briefcase, Sparkles, Loader2, 
  Copy, Check, Download, RefreshCw, Wand2
} from 'lucide-react';
import { generateWithGemini, buildGeminiPrompt } from '../utils/gemini';

interface CoverLetter {
  id: string;
  company: string;
  role: string;
  content: string;
  createdAt: Date;
}

const CoverLetterGenerator: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [tone, setTone] = useState<'professional' | 'enthusiastic' | 'confident'>('professional');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [savedLetters, setSavedLetters] = useState<CoverLetter[]>(() => {
    const saved = localStorage.getItem('talentscore_coverletters');
    return saved ? JSON.parse(saved).map((l: CoverLetter) => ({ ...l, createdAt: new Date(l.createdAt) })) : [];
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    
    setIsGenerating(true);
    setError('');
    setGeneratedLetter('');

    try {
      const toneInstruction = tone === 'enthusiastic' 
        ? ' Show genuine excitement for the opportunity.'
        : tone === 'confident'
        ? ' Project confidence and leadership.'
        : ' Keep it polished and business-appropriate.';

      const prompt = buildGeminiPrompt({
        resumeText: resumeText + toneInstruction,
        jobDescription: companyName ? `Company: ${companyName}\nRole: ${roleTitle}\n\n${jobDescription}` : jobDescription,
        task: 'cover_letter'
      });

      const letter = await generateWithGemini(prompt);
      setGeneratedLetter(letter);

      // Auto-save
      const newLetter: CoverLetter = {
        id: Date.now().toString(),
        company: companyName || 'Unknown Company',
        role: roleTitle || 'Unknown Role',
        content: letter,
        createdAt: new Date()
      };
      const updated = [newLetter, ...savedLetters].slice(0, 10);
      setSavedLetters(updated);
      localStorage.setItem('talentscore_coverletters', JSON.stringify(updated));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cover_Letter_${companyName || 'Company'}_${roleTitle || 'Role'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSavedLetter = (letter: CoverLetter) => {
    setGeneratedLetter(letter.content);
    setCompanyName(letter.company);
    setRoleTitle(letter.role);
  };

  const hasRequiredFields = resumeText.trim().length >= 100 && jobDescription.trim().length >= 50;

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(72,122,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(72,122,145,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Back</span>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-sm flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-neutral-900 font-medium text-sm">Cover Letter Generator</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20 relative">
        <div className="container-premium">
          {/* Page Header */}
          <div className="mb-12">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Generator</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">Generate tailored cover letters</h1>
            <p className="text-neutral-600 max-w-lg">
              Transform your resume and job description into a compelling cover letter that gets interviews.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-error-50 border border-error-200 rounded-xl"
                  >
                    <p className="text-error-700 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Company & Role */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-tertiary-50 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-tertiary-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold">Job Details</h3>
                    <p className="text-neutral-500 text-sm">Target company and role</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name (e.g., Stripe)"
                    className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                  />
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="Role title (e.g., Senior Frontend Engineer)"
                    className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-500" />
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
                  className="w-full h-40 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                />
              </div>

              {/* Resume */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold">Your Resume</h3>
                    <p className="text-neutral-500 text-sm">Paste your resume text</p>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-48 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none"
                />
              </div>

              {/* Tone Selector */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="w-5 h-5 text-primary-500" />
                  <h3 className="text-neutral-900 font-semibold">Tone</h3>
                </div>
                <div className="flex gap-2">
                  {(['professional', 'enthusiastic', 'confident'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                        tone === t 
                          ? 'bg-primary-500 text-white shadow-soft' 
                          : 'bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!hasRequiredFields || isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-4 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 shadow-soft hover:shadow-medium"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Crafting your letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Cover Letter
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Output */}
            <div className="lg:col-span-3">
              {!generatedLetter ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-neutral-200 border-dashed shadow-soft">
                  <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-10 h-10 text-primary-400" />
                  </div>
                  <h3 className="text-neutral-900 font-semibold mb-2 text-xl">Ready to generate</h3>
                  <p className="text-neutral-500 max-w-xs">
                    Fill in the job details and your resume, then click Generate to create your cover letter.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-6">
                    <div>
                      <h3 className="text-neutral-900 font-semibold">
                        {companyName || 'Company'} — {roleTitle || 'Role'}
                      </h3>
                      <p className="text-neutral-500 text-sm">Generated just now</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 bg-neutral-100 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-5 h-5 text-success-500" /> : <Copy className="w-5 h-5 text-neutral-500" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 bg-neutral-100 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        title="Download as file"
                      >
                        <Download className="w-5 h-5 text-neutral-500" />
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className={`w-5 h-5 text-white ${isGenerating ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
                    <pre className="text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {generatedLetter}
                    </pre>
                  </div>

                  <div className="mt-6 flex gap-6 text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-success-400 rounded-full" />
                      Tailored to job
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-success-400 rounded-full" />
                      ATS-friendly
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-400 rounded-full" />
                      {generatedLetter.split(' ').length} words
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Saved Letters */}
              {savedLetters.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft">
                  <h4 className="text-neutral-900 font-semibold mb-4">Recent Letters</h4>
                  <div className="space-y-3">
                    {savedLetters.slice(0, 5).map((letter) => (
                      <button
                        key={letter.id}
                        onClick={() => loadSavedLetter(letter)}
                        className="w-full text-left p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-neutral-900 font-medium">{letter.company}</p>
                            <p className="text-neutral-500 text-sm">{letter.role}</p>
                          </div>
                          <span className="text-neutral-400 text-sm">
                            {letter.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterGenerator;
