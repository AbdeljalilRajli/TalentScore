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
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-800/50">
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="flex items-center gap-3 text-neutral-400 hover:text-neutral-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-neutral-100 font-medium">Cover Letter Generator</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20">
        <div className="container-premium">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-neutral-50 mb-3">Generate tailored cover letters</h1>
            <p className="text-neutral-400 text-lg max-w-2xl">
              Transform your resume and job description into a compelling cover letter that gets interviews.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-error-500/10 border border-error-500/20 rounded-xl"
                  >
                    <p className="text-error-400 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Company & Role */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-medium">Job Details</h3>
                    <p className="text-neutral-500 text-sm">Target company and role</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name (e.g., Stripe)"
                    className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="Role title (e.g., Senior Frontend Engineer)"
                    className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-medium">Job Description</h3>
                    <p className="text-neutral-500 text-sm">Paste the full description</p>
                  </div>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full h-40 bg-neutral-800/50 text-neutral-100 text-sm p-4 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none resize-none"
                />
              </div>

              {/* Resume */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-medium">Your Resume</h3>
                    <p className="text-neutral-500 text-sm">Paste your resume text</p>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-48 bg-neutral-800/50 text-neutral-100 text-sm p-4 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none resize-none"
                />
              </div>

              {/* Tone Selector */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="w-5 h-5 text-primary-400" />
                  <h3 className="text-neutral-100 font-medium">Tone</h3>
                </div>
                <div className="flex gap-2">
                  {(['professional', 'enthusiastic', 'confident'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        tone === t 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
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
                className="w-full btn-primary py-4 text-base"
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
                <div className="card h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-800/50 flex items-center justify-center mb-6">
                    <FileText className="w-10 h-10 text-neutral-600" />
                  </div>
                  <h3 className="text-neutral-300 font-medium mb-2">Ready to generate</h3>
                  <p className="text-neutral-500 text-sm max-w-xs">
                    Fill in the job details and your resume, then click Generate to create your cover letter.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-neutral-100 font-medium">
                        {companyName || 'Company'} — {roleTitle || 'Role'}
                      </h3>
                      <p className="text-neutral-500 text-sm">Generated just now</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-success-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                        title="Download as file"
                      >
                        <Download className="w-4 h-4 text-neutral-400" />
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="p-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className={`w-4 h-4 text-white ${isGenerating ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-800/30 rounded-lg border border-neutral-700/50 p-6">
                    <pre className="text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed text-sm">
                      {generatedLetter}
                    </pre>
                  </div>

                  <div className="mt-6 flex gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Tailored to job
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      ATS-friendly
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {generatedLetter.split(' ').length} words
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Saved Letters */}
              {savedLetters.length > 0 && (
                <div className="mt-6 card p-6">
                  <h4 className="text-neutral-100 font-medium mb-4">Recent Letters</h4>
                  <div className="space-y-3">
                    {savedLetters.slice(0, 5).map((letter) => (
                      <button
                        key={letter.id}
                        onClick={() => loadSavedLetter(letter)}
                        className="w-full text-left p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-neutral-200 font-medium">{letter.company}</p>
                            <p className="text-neutral-500 text-sm">{letter.role}</p>
                          </div>
                          <span className="text-neutral-600 text-xs">
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
