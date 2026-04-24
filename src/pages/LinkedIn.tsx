import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, Copy, Check, Sparkles, TrendingUp, 
  User, Briefcase, Wrench, FileText,
  AlertCircle, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import type { ResumeData } from '../firebase/resumeService';
import { getResumes } from '../firebase/resumeService';

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
  score: number;
  tips: string[];
}

const LinkedInOptimizer: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [isAuthenticated, loading]);

  // Load saved resumes from Firebase
  useEffect(() => {
    const loadResumes = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      
      try {
        const resumes = await getResumes(user.uid);
        setSavedResumes(resumes);
        // Auto-select first resume if available
        if (resumes.length > 0 && !selectedResumeId) {
          setResumeData(resumes[0]);
          setSelectedResumeId(resumes[0].id || null);
        }
      } catch (error) {
        console.error('Failed to load resumes:', error);
      }
      setLoading(false);
    };

    if (isAuthenticated) {
      loadResumes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Generate headline based on resume data
  const generateHeadline = (data: ResumeData): string => {
    const title = data.professionalTitle || data.experience[0]?.role || 'Professional';
    const company = data.experience[0]?.company;
    const skills = data.skills.slice(0, 3).map(s => s.name).join(' | ');
    
    if (company && skills) {
      return `${title} at ${company} | ${skills}`;
    } else if (skills) {
      return `${title} | ${skills}`;
    }
    return `${title} | Helping teams build great products`;
  };

  // Generate About/Summary section
  const generateAbout = (data: ResumeData): string => {
    const exp = data.experience[0];
    const years = data.experience.length;
    
    let about = `I'm a ${data.professionalTitle || 'professional'} with experience in `;
    
    if (exp) {
      about += `${exp.role.toLowerCase()} at ${exp.company}`;
    }
    
    about += `. Over the past ${years}+ years, I've `;
    
    if (exp?.bullets?.[0]) {
      about += exp.bullets[0].toLowerCase().replace(/^\W+/, '').split(' ').slice(0, 8).join(' ');
    } else {
      about += 'delivered impactful results across multiple projects';
    }
    
    about += `.\n\n`;
    
    if (data.skills.length > 0) {
      about += `Core expertise: ${data.skills.slice(0, 5).map(s => s.name).join(', ')}. `;
    }
    
    about += `I'm passionate about leveraging technology to solve complex problems and drive business outcomes.\n\n`;
    about += `Let's connect! I'm always open to discussing new opportunities, industry trends, or potential collaborations.`;
    
    return about;
  };

  // Generate experience bullet for LinkedIn
  const generateExperienceBullet = (exp: { company: string; role: string; bullets: string[] }): string => {
    if (exp.bullets?.[0]) {
      return exp.bullets[0];
    }
    return `Responsible for key initiatives at ${exp.company}`;
  };

  // Calculate profile strength score
  const calculateStrengthScore = (data: ResumeData): number => {
    let score = 0;
    
    // Headline (15 points)
    if (data.professionalTitle) score += 15;
    
    // About section (20 points)
    if (data.summary && data.summary.length > 100) score += 20;
    else if (data.summary) score += 10;
    
    // Experience (25 points)
    if (data.experience.length >= 3) score += 25;
    else if (data.experience.length >= 1) score += 15;
    
    // Skills (20 points)
    if (data.skills.length >= 10) score += 20;
    else if (data.skills.length >= 5) score += 15;
    else if (data.skills.length > 0) score += 10;
    
    // Education (10 points)
    if (data.education.length > 0) score += 10;
    
    // Full name (10 points)
    if (data.fullName) score += 10;
    
    return Math.min(score, 100);
  };

  // Get score color
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-warning-500';
    return 'text-error-500';
  };

  // Get score bg color
  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-success-500';
    if (score >= 60) return 'bg-warning-500';
    return 'bg-error-500';
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate optimized sections
  const generateSections = (data: ResumeData): ProfileSection[] => {
    return [
      {
        id: 'headline',
        title: 'Headline',
        icon: User,
        content: generateHeadline(data),
        score: data.professionalTitle ? 15 : 5,
        tips: [
          'Use your current title and company',
          'Add 2-3 key skills separated by pipes (|)',
          'Keep it under 120 characters',
          'Avoid buzzwords like "passionate" or "driven"'
        ]
      },
      {
        id: 'about',
        title: 'About / Summary',
        icon: FileText,
        content: generateAbout(data),
        score: data.summary ? (data.summary.length > 100 ? 20 : 10) : 5,
        tips: [
          'Start with your current role and expertise',
          'Include metrics and achievements (%, $, #)',
          'Add a call-to-action at the end',
          'Aim for 3-5 short paragraphs',
          'Use first person (I, me, my)'
        ]
      },
      {
        id: 'experience',
        title: 'Experience Highlights',
        icon: Briefcase,
        content: data.experience.map(exp => 
          `${exp.role} at ${exp.company}\n${generateExperienceBullet(exp)}`
        ).join('\n\n'),
        score: data.experience.length >= 3 ? 25 : (data.experience.length >= 1 ? 15 : 0),
        tips: [
          'Focus on achievements, not responsibilities',
          'Start bullets with action verbs',
          'Include numbers and metrics',
          'Customize for each position'
        ]
      },
      {
        id: 'skills',
        title: 'Skills to Highlight',
        icon: Wrench,
        content: data.skills.map(s => s.name).join(', '),
        score: data.skills.length >= 10 ? 20 : (data.skills.length >= 5 ? 15 : data.skills.length * 2),
        tips: [
          'List 10-20 relevant skills',
          'Include both technical and soft skills',
          'Order by proficiency level',
          'Get endorsements from colleagues'
        ]
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            <div className="h-32 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show saved resumes selection if no resume selected but resumes exist
  if (!resumeData) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Linkedin className="w-8 h-8 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            No Saved Resumes
          </h1>
          <p className="text-neutral-600 mb-6">
            Create and save a resume in our Templates section first, then return here to optimize your LinkedIn profile.
          </p>
          <a
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Create & Save Resume
          </a>
        </div>
      </div>
    );
  }

  // Guard: resumeData should not be null at this point
  if (!resumeData) {
    return null;
  }

  const sections = generateSections(resumeData);
  const overallScore = calculateStrengthScore(resumeData);

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                LinkedIn Optimizer
              </h1>
              <p className="text-neutral-600">
                Sync your resume data to create a standout LinkedIn profile
              </p>
            </div>
          </div>
        </motion.div>

        {/* Saved Resumes Selector */}
        {savedResumes.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-neutral-200 p-4 mb-6"
          >
            <h3 className="text-sm font-medium text-neutral-700 mb-3">
              Select Resume to Optimize
            </h3>
            <div className="flex flex-wrap gap-2">
              {savedResumes.map((resume) => (
                <button
                  key={resume.id}
                  onClick={() => {
                    setResumeData(resume);
                    setSelectedResumeId(resume.id || null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedResumeId === resume.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {resume.fullName || 'Untitled Resume'}
                  {resume.professionalTitle && (
                    <span className="text-xs opacity-75">
                      - {resume.professionalTitle}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profile Strength Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBgColor(overallScore)} bg-opacity-10`}>
                <TrendingUp className={`w-6 h-6 ${getScoreColor(overallScore)}`} />
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900">Profile Strength Score</h2>
                <p className="text-sm text-neutral-500">
                  {overallScore >= 80 ? 'Excellent! Your profile is optimized.' : 
                   overallScore >= 60 ? 'Good progress. Keep improving!' : 
                   'Let\'s build up your profile strength.'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <span className="text-neutral-400">/100</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getScoreBgColor(overallScore)}`}
              style={{ width: `${overallScore}%` }}
            />
          </div>

          {/* Quick wins */}
          {overallScore < 100 && (
            <div className="mt-4 p-4 bg-primary-50 rounded-xl">
              <h3 className="font-medium text-primary-700 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Quick Wins to Boost Your Score
              </h3>
              <ul className="space-y-1 text-sm text-primary-600">
                {overallScore < 90 && resumeData.skills.length < 10 && (
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    Add {10 - resumeData.skills.length} more skills to reach the recommended 10+
                  </li>
                )}
                {overallScore < 80 && (!resumeData.summary || resumeData.summary.length < 100) && (
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    Expand your About section to 100+ characters
                  </li>
                )}
                {resumeData.experience.length < 3 && (
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    Add more work experiences (aim for 3+)
                  </li>
                )}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Optimized Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-neutral-900">{section.title}</h3>
                    <span className={`text-sm ${getScoreColor(section.score)}`}>
                      {section.score}/25 points
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(section.content, section.id);
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedId === section.id ? (
                      <Check className="w-4 h-4 text-success-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedSection === section.id && (
                <div className="border-t border-neutral-100">
                  {/* Generated Content */}
                  <div className="p-4 bg-neutral-50">
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                      Generated Content
                    </label>
                    <textarea
                      value={section.content}
                      readOnly
                      rows={section.id === 'about' ? 6 : 4}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 resize-none"
                    />
                  </div>

                  {/* Tips */}
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-neutral-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      Optimization Tips
                    </h4>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://linkedin.com/in/me/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-lg font-medium hover:bg-[#006396] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Open LinkedIn Profile
          </a>
          <a
            href="/templates"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Update Resume Data
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkedInOptimizer;
