import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, XCircle, CheckCircle, Play, Search, Cpu, Terminal, Fingerprint, ChevronDown } from 'lucide-react';
import { analyzeResumeText, extractResumeTextFromFile, type AnalysisResult } from '../utils/mockApi';
import { generateWithGemini, buildGeminiPrompt, type GeminiTask } from '../utils/gemini';

const Analyze: React.FC = () => {
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

  // --- Handlers for Input ---
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
      setResumeInputMode('file');
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const canAnalyze =
    !!jobDescription.trim() &&
    ((resumeInputMode === 'file' && !!resumeFile) ||
      (resumeInputMode === 'text' && resumeText.trim().length >= 50));

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
        const isDocx =
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          lowerName.endsWith('.docx');

        if (isPdf || isDocx) {
          const form = new FormData();
          form.append('file', file);
          const res = await fetch('/api/extract', { method: 'POST', body: form });
          if (!res.ok) {
            let msg = '';
            const rawText = await res.text();
            try {
              const data = JSON.parse(rawText);
              msg = data.details ? `${data.error}: ${data.details}` : data.error;
            } catch {
              msg = rawText;
            }
            throw new Error(msg || 'Failed to extract text');
          }
          const data = await res.json();
          extractedText = data.text ?? '';
          if (extractedText.trim().length < 50) {
            throw new Error('Not enough text could be extracted.');
          }
        } else if (isTextLike) {
          extractedText = await extractResumeTextFromFile(file);
        } else {
          throw new Error('Unsupported file type. Need PDF, DOCX, or TXT.');
        }

        const res = await analyzeResumeText(extractedText, jobDescription);
        setResult(res);
      }

      setContextText(extractedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setTimeout(() => setIsAnalyzing(false), 500);
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

  const breakdown = result?.breakdown ?? { skills: 0, experience: 0, impact: 0, quality: 0 };

  return (
    <div className="min-h-screen bg-wallet-bg text-wallet-text">
      
      {/* HEADER SECTION */}
      <div className="w-full border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full -mr-80 -mt-80 animate-pulse"></div>
        <div className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[1] mb-8">Structural <br/><span className="text-wallet-purple">Optimization.</span></h1>
              <p className="text-xl text-white/40 max-w-2xl font-bold leading-relaxed">Advanced analysis of your core technical experience mapped against recruiter expectations.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: INPUT */}
          <div className="xl:col-span-5 flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 shadow-xl border border-white/10">
                 <Fingerprint className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Resume Mapping</span>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 bg-red-400/5 border border-red-400/20 rounded-[2rem] text-red-400 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <XCircle className="w-6 h-6" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Analysis Error</span>
                </div>
                <p className="text-base font-bold leading-relaxed opacity-80">{error}</p>
              </motion.div>
            )}

            {/* Input Card */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5 relative z-10">
                <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Upload CV</h3>
                <div className="flex bg-black/40 p-1.5 rounded-2xl ring-1 ring-white/5 shadow-inner">
                  <button onClick={() => setResumeInputMode('file')} className={`text-[10px] font-bold uppercase tracking-[0.1em] px-6 py-3 rounded-xl transition-all ${resumeInputMode === 'file' ? 'bg-white text-wallet-bg shadow-xl' : 'text-white/30 hover:text-white'}`}>Document</button>
                  <button onClick={() => setResumeInputMode('text')} className={`text-[10px] font-bold uppercase tracking-[0.1em] px-6 py-3 rounded-xl transition-all ${resumeInputMode === 'text' ? 'bg-white text-wallet-bg shadow-xl' : 'text-white/30 hover:text-white'}`}>Plain Text</button>
                </div>
              </div>

              {resumeInputMode === 'file' ? (
                <div className="relative group/zone z-10">
                  <label className={`block border-2 border-dashed rounded-[2rem] p-20 text-center cursor-pointer transition-all duration-700 ${dragActive ? 'border-wallet-purple bg-wallet-purple/5' : resumeFile ? 'border-emerald-400/40 bg-emerald-400/5' : 'border-white/10 hover:border-wallet-purple/40 hover:bg-white/5'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                    <input type="file" ref={fileInputRef} accept=".pdf,.docx,.txt" onChange={(e) => { const file = e.target.files?.[0]; if (file) setResumeFile(file); }} className="hidden" />
                    {resumeFile ? (
                      <div className="flex flex-col items-center gap-8">
                        <div className="w-20 h-20 bg-white/10 flex items-center justify-center rounded-[1.5rem] text-white shadow-2xl border border-white/10"><FileText className="w-10 h-10" /></div>
                        <div>
                          <p className="text-lg font-bold text-white tracking-tight truncate max-w-[300px]">{resumeFile.name}</p>
                          <p className="text-[11px] font-bold text-white/40 uppercase mt-3 tracking-[0.1em]">{(resumeFile.size / 1024).toFixed(1)} KB Loaded</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-8">
                        <div className="w-20 h-20 bg-white/5 flex items-center justify-center rounded-[1.5rem] text-white/20 group-hover/zone:text-white group-hover/zone:scale-110 transition-all duration-500 shadow-inner"><Upload className="w-10 h-10" /></div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-[0.2em]">Select Document</p>
                          <p className="text-[10px] text-white/20 uppercase mt-4 tracking-[0.1em] font-medium italic">PDF / DOCX Recommended</p>
                        </div>
                      </div>
                    )}
                  </label>
                  {resumeFile && (
                    <button onClick={clearFile} className="absolute -top-4 -right-4 w-10 h-10 bg-[#1b1c1e] text-white border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all shadow-2xl group/btn active:scale-90 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      <XCircle className="w-6 h-6 relative z-10" />
                    </button>
                  )}
                </div>
              ) : (
                <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="PASTE_RAW_DATA_STREAM_HERE..." className="w-full h-64 bg-[#1b1c1e] text-emerald-400 font-mono text-[13px] p-8 rounded-[2rem] border border-white/5 focus:ring-4 focus:ring-emerald-400/10 focus:outline-none transition-all resize-none shadow-inner selection:bg-emerald-400 selection:text-black leading-relaxed relative z-10" />
              )}
            </div>

            {/* Requirement Card */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group">
               <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-10 pb-6 border-b border-white/5">Target Requirements</h3>
               <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="PASTE_TARGET_RECRUITER_REQUIREMENTS..." className="w-full h-80 bg-black/40 text-white/80 font-bold text-base p-8 rounded-[2rem] border border-white/5 focus:ring-4 focus:ring-white/10 focus:outline-none transition-all resize-none shadow-inner leading-relaxed placeholder-white/5" />
               <div className="flex justify-between items-center mt-8">
                <div className="flex gap-3">
                   {[...Array(4)].map((_, i) => <div key={i} className={`w-2 h-6 rounded-full transition-all duration-700 ${jobDescription.length > (i+1)*200 ? 'bg-wallet-yellow shadow-[0_0_12px_rgba(248,213,126,0.6)]' : 'bg-white/5'}`} />)}
                </div>
                <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em] italic font-mono">{jobDescription.length} Units Synthesized</p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="relative group">
              <div className="absolute inset-x-0 -bottom-4 h-12 bg-wallet-yellow/10 blur-[40px] rounded-full group-hover:bg-wallet-yellow/20 transition-all duration-500"></div>
              <button onClick={handleAnalyze} disabled={!canAnalyze || isAnalyzing} className="w-full py-10 bg-wallet-yellow text-wallet-bg rounded-[2rem] text-sm font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-6 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100 shadow-[0_32px_64px_-12px_rgba(248,213,126,0.3)] hover:shadow-wallet-yellow/40 relative z-10">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing_Feed...</span>
                  </>
                ) : (
                  <>
                    <span>Ignite Analyzer</span>
                    <div className="bg-wallet-bg/10 rounded-full p-2">
                       <Play className="w-5 h-5 fill-wallet-bg" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="xl:col-span-7 flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 shadow-xl border border-emerald-400/10">
                 <Terminal className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/20">Response Protocol</span>
            </div>

            {!result ? (
              <div className="h-full min-h-[850px] bg-white/5 border border-white/10 rounded-[3rem] p-16 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-wallet-purple/5 to-transparent opacity-30"></div>
                <div className="w-32 h-32 bg-black rounded-[2.5rem] flex items-center justify-center mb-10 border border-white/10 shadow-inner relative overflow-hidden group-hover:scale-110 transition-transform duration-700 ring-1 ring-white/5">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Search className="w-12 h-12 text-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-[0.3em] mb-6">Scan Ready</h3>
                <p className="text-sm text-white/20 max-w-sm font-bold uppercase tracking-[0.2em] leading-relaxed italic">
                  Upload your CV and the requirements to begin mapping.
                </p>
                <div className="mt-12 flex gap-3">
                   {[...Array(3)].map((_, i) => <div key={i} className={`w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10 animate-pulse`} style={{ animationDelay: `${i*0.2}s` }} />)}
                </div>
              </div>
            ) : !result.isValidResume ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-400/5 border-2 border-red-400/20 rounded-[3rem] p-20 text-center shadow-2xl">
                 <div className="w-24 h-24 bg-red-400 text-wallet-bg rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-[0_24px_48px_-12px_rgba(248,113,113,0.4)]">
                    <XCircle className="w-12 h-12" />
                 </div>
                 <h3 className="text-5xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">Mapping Failed.</h3>
                 <p className="text-red-400 text-xl font-bold leading-relaxed max-w-md mx-auto">{result.error}</p>
              </motion.div>
            ) : (
              <div className="space-y-10 pb-40">
                {/* Score Section */}
                <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-16 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-xl group">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wallet-purple/5 blur-[150px] rounded-full -mr-40 -mt-40 animate-pulse opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
                  <div className="relative z-10 flex flex-col xl:flex-row items-center gap-24">
                    <div className="relative w-72 h-72 shrink-0">
                      <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_30px_rgba(198,181,249,0.3)]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <motion.circle cx="50" cy="50" r="44" fill="none" stroke="#c6b5f9" strokeWidth="8" strokeLinecap="round" initial={{ strokeDasharray: "0 276" }} animate={{ strokeDasharray: `${result.score * 2.76} 276` }} transition={{ duration: 2.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-9xl font-bold text-white tracking-tighter tabular-nums leading-none mb-2 font-mono">{result.score}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 italic">Match Protocol</span>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-12 py-8 w-full border-t xl:border-t-0 xl:border-l border-white/5 xl:pl-28">
                       {[
                         { label: 'Skills Density', val: breakdown.skills, color: '#c6b5f9' },
                         { label: 'Exp Delta', val: breakdown.experience, color: '#f8d57e' },
                         { label: 'Velocity', val: breakdown.impact, color: '#34d399' },
                         { label: 'Signal Qual', val: breakdown.quality, color: '#60a5fa' }
                       ].map((item) => (
                         <div key={item.label} className="space-y-6">
                           <div className="flex justify-between items-end">
                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{item.label}</span>
                             <span className="text-xl font-bold text-white tabular-nums font-mono">{Math.round(item.val)}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner ring-1 ring-white/5">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 2, delay: 0.5 }} className="h-full rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)]" style={{ backgroundColor: item.color }} />
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] shadow-2xl relative group overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-3">
                        <CheckCircle className="w-5 h-5" /> 
                        Verified Signals
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400/40 uppercase tracking-widest">{result.foundKeywords.length} Detected</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 relative z-10">
                       {result.foundKeywords.map(kw => (
                         <span key={kw} className="px-5 py-2.5 bg-emerald-400/5 text-emerald-400 text-[11px] font-bold rounded-xl border border-emerald-400/10 shadow-sm hover:border-emerald-400/30 hover:bg-emerald-400/10 transition-all cursor-default">{kw}</span>
                       ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] shadow-2xl relative group overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em] flex items-center gap-3">
                        <XCircle className="w-5 h-5" /> 
                        Blocked/Missing
                      </h4>
                      <span className="text-[10px] font-mono text-red-500/40 uppercase tracking-widest">{result.missingKeywords.length} Logic_Gap</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5 relative z-10">
                       {result.missingKeywords.map(kw => (
                         <span key={kw} className="px-5 py-2.5 bg-red-400/5 text-red-500 text-[11px] font-bold rounded-xl border border-red-400/10 shadow-sm hover:border-red-500/30 hover:bg-red-400/10 transition-all cursor-default">{kw}</span>
                       ))}
                    </div>
                  </div>
                </div>

                {/* AI DIRECTIVES */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-16 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl">
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] opacity-20"></div>
                   <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-14 flex items-center gap-3 border-b border-white/5 pb-8">
                     Optimization Directives
                   </h3>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                      {result.suggestions.map((sug, i) => (
                        <div key={i} className="flex gap-8 group">
                          <span className="text-4xl font-bold text-wallet-purple/40 group-hover:text-wallet-purple transition-colors duration-500 tabular-nums font-mono">
                            {String(i+1).padStart(2, '0')}
                          </span>
                          <p className="text-lg font-medium leading-relaxed text-white/80 group-hover:text-white transition-colors duration-500">{sug}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* GEMINI SUITE */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-1.5 shadow-2xl backdrop-blur-xl">
                   <div className="bg-black/60 rounded-[2.8rem] p-12 ring-1 ring-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] opacity-10"></div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 relative z-10">
                        <div>
                          <h3 className="text-4xl font-bold text-white tracking-tighter mb-4 leading-none">AI Refinement</h3>
                          <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.2em] italic leading-none">Advanced Protocol Suite</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-xl">
                          <Cpu className="w-10 h-10 text-white animate-pulse" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                        <div className="lg:col-span-8">
                           <div className="relative group">
                             <select value={geminiTask} onChange={(e) => setGeminiTask(e.target.value as GeminiTask)} className="w-full h-20 bg-white/5 border border-white/10 text-white px-10 rounded-[1.5rem] text-sm font-bold uppercase tracking-[0.1em] focus:ring-4 focus:ring-wallet-purple/20 focus:border-wallet-purple/50 focus:outline-none appearance-none transition-all cursor-pointer shadow-inner pr-16 group-hover:bg-white/10">
                                <option value="tailor" className="bg-[#1b1c1e] py-4">Suggest Strategic Optimization</option>
                                <option value="rewrite_bullets" className="bg-[#1b1c1e] py-4">Rewrite Experience Bullets</option>
                                <option value="summary" className="bg-[#1b1c1e] py-4">Generate Executive Summary</option>
                             </select>
                             <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-hover:text-white/60 transition-colors">
                                <ChevronDown className="w-6 h-6" />
                             </div>
                           </div>
                        </div>
                        <div className="lg:col-span-4">
                          <button onClick={handleGenerateAI} disabled={isGenerating} className="w-full h-20 bg-wallet-purple text-wallet-bg px-12 rounded-[1.5rem] text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 shadow-2xl shadow-wallet-purple/20 flex items-center justify-center gap-4 group">
                             {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                               <>
                                 <span className="text-sm">Execute Protocol</span>
                               </>
                             )}
                          </button>
                        </div>
                      </div>

                      {geminiError && <div className="mt-10 p-8 bg-black/40 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl relative z-10 font-mono">Pipeline_Error: {geminiError}</div>}
                      
                      <AnimatePresence>
                         {geminiOutput && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-12 relative pt-14 overflow-hidden z-10">
                             <div className="absolute top-0 left-0 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] italic">Output Stream_Generated</div>
                             <div className="bg-white/5 rounded-[2rem] p-10 border border-white/10 shadow-2xl backdrop-blur-md ring-1 ring-white/5">
                               <pre className="text-[15px] font-medium text-white/90 whitespace-pre-wrap leading-relaxed opacity-95 tracking-tight font-sans selection:bg-white/20">{geminiOutput}</pre>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
