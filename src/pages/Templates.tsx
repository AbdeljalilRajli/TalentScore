import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutTemplate, FileText, User, Briefcase, GraduationCap, 
  Wrench, Download, Eye, X, Plus,
  ChevronRight, Check, Sparkles, ArrowLeft, Lock
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../firebase/AuthContext';

interface ResumeData {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
}

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  graduationDate: string;
  description: string;
}

interface SkillEntry {
  id: string;
  name: string;
}

interface ProjectEntry {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  associatedExperience: string;
  description: string;
}

interface CertificationEntry {
  id: string;
  name: string;
  dateAcquired: string;
  description: string;
}

type SectionType = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';

interface SectionOrderItem {
  id: SectionType;
  label: string;
  icon: React.ElementType;
}

const initialResumeData: ResumeData = {
  fullName: '',
  professionalTitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  summary: '',
  experience: [{ id: '1', company: '', role: '', startDate: '', endDate: '', bullets: [''] }],
  education: [{ id: '1', school: '', degree: '', graduationDate: '', description: '' }],
  skills: [],
  projects: [],
  certifications: []
};

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean two-column layout with accent sidebar. ATS-friendly with visual appeal.',
    color: 'bg-primary-500',
    preview: 'modern'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional single-column format. Timeless and universally accepted.',
    color: 'bg-neutral-700',
    preview: 'classic'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Whitespace-focused design. Emphasizes content over style.',
    color: 'bg-success-500',
    preview: 'minimal'
  },
  {
    id: 'technical',
    name: 'Technical Skills',
    description: 'Skills-forward layout optimized for tech roles.',
    color: 'bg-warning-500',
    preview: 'technical'
  }
];

export default function Templates() {
  const { isAuthenticated } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showPreview, setShowPreview] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<SectionOrderItem[]>([
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: LayoutTemplate },
    { id: 'certifications', label: 'Certifications', icon: Check },
  ]);
  const [draggedItem, setDraggedItem] = useState<SectionType | null>(null);
  const [dragOverItem, setDragOverItem] = useState<SectionType | null>(null);

  const handleDragStart = (sectionId: SectionType) => {
    setDraggedItem(sectionId);
  };

  const handleDragOver = (e: React.DragEvent, sectionId: SectionType) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== sectionId) {
      setDragOverItem(sectionId);
    }
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: SectionType) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newOrder = [...sectionOrder];
    const draggedIndex = newOrder.findIndex(s => s.id === draggedItem);
    const targetIndex = newOrder.findIndex(s => s.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, removed);
      setSectionOrder(newOrder);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Restore resume data from localStorage after login
  useEffect(() => {
    const savedResume = localStorage.getItem('pendingResumeData');
    const savedTemplate = localStorage.getItem('pendingResumeTemplate');
    if (savedResume && savedTemplate) {
      setResumeData(JSON.parse(savedResume));
      setSelectedTemplate(savedTemplate);
      localStorage.removeItem('pendingResumeData');
      localStorage.removeItem('pendingResumeTemplate');
      // Auto-download after restore if authenticated
      setTimeout(() => {
        if (isAuthenticated && resumeRef.current) {
          downloadResume();
        }
      }, 500);
    }
  }, [isAuthenticated]);

  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceEntry, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addBullet = (expIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex] = {
      ...newExperience[expIndex],
      bullets: [...(newExperience[expIndex].bullets || []), '']
    };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperience = [...resumeData.experience];
    const newBullets = [...(newExperience[expIndex].bullets || [])];
    newBullets[bulletIndex] = value;
    newExperience[expIndex] = { ...newExperience[expIndex], bullets: newBullets };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExperience = [...resumeData.experience];
    const newBullets = (newExperience[expIndex].bullets || []).filter((_, i) => i !== bulletIndex);
    newExperience[expIndex] = { ...newExperience[expIndex], bullets: newBullets };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { 
        id: Date.now().toString(), 
        school: '', 
        degree: '', 
        graduationDate: '',
        description: ''
      }]
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        id: Date.now().toString(), 
        company: '', 
        role: '', 
        startDate: '', 
        endDate: '', 
        bullets: [''] 
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: '' }]
    }));
  };

  const updateSkill = (index: number, name: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], name };
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        id: Date.now().toString(), 
        name: '', 
        startDate: '', 
        endDate: '', 
        associatedExperience: '',
        description: ''
      }]
    }));
  };

  const updateProject = (index: number, field: keyof ProjectEntry, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { 
        id: Date.now().toString(), 
        name: '', 
        dateAcquired: '', 
        description: ''
      }]
    }));
  };

  const updateCertification = (index: number, field: keyof CertificationEntry, value: string) => {
    const newCerts = [...resumeData.certifications];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setResumeData(prev => ({ ...prev, certifications: newCerts }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadClick = () => {
    if (!isAuthenticated) {
      // Save resume data before redirecting to login
      localStorage.setItem('pendingResumeData', JSON.stringify(resumeData));
      localStorage.setItem('pendingResumeTemplate', selectedTemplate || '');
      setShowAuthModal(true);
      return;
    }
    downloadResume();
  };

  const downloadResume = async () => {
    if (!resumeRef.current) return;
    
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: `${resumeData.fullName.replace(/\s+/g, '_')}_resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const redirectToLogin = () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4"
            >
              <LayoutTemplate className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-600">ATS-Friendly Templates</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4"
            >
              Choose Your Resume Template
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              All templates are optimized for Applicant Tracking Systems (ATS). 
              Pick a design that matches your industry and style.
            </motion.p>
          </div>

          {/* Template Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedTemplate(template.id)}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 cursor-pointer hover:shadow-medium transition-all hover:border-primary-200"
              >
                {/* Template Preview Card */}
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-28 ${template.color} rounded-lg flex items-center justify-center shadow-soft`}>
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary-500 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary-500 text-sm font-medium">
                      <span>Select Template</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Check, title: 'ATS Optimized', desc: 'Passes through all major applicant tracking systems' },
              { icon: Sparkles, title: 'Professional Design', desc: 'Modern layouts that impress recruiters' },
              { icon: Download, title: 'PDF Export', desc: 'Download as professional PDF ready to share' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{feature.title}</h4>
                  <p className="text-sm text-neutral-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Templates</span>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <span className="font-medium text-neutral-900">
                {templates.find(t => t.id === selectedTemplate)?.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleDownloadClick}
                disabled={!resumeData.fullName}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative ${showPreview ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start' : ''}`}>
        {/* Editor */}
        <div className={`${showPreview ? '' : 'max-w-3xl mx-auto'}`}>
          {/* Tabs */}
          <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg mb-6 w-fit">
            {(['edit', 'preview'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab === 'edit' ? 'Edit Resume' : 'Preview'}
              </button>
            ))}
          </div>

          {activeTab === 'edit' ? (
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-500" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Professional Title *</label>
                    <input
                      type="text"
                      value={resumeData.professionalTitle}
                      onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Software Engineer, Marketing Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="New York, NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={resumeData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="portfolio.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div
                draggable
                onDragStart={() => handleDragStart('summary')}
                onDragOver={(e) => handleDragOver(e, 'summary')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'summary')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'summary' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'summary' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-neutral-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-neutral-900">Professional Summary</h2>
                </div>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Brief overview of your professional background and key strengths..."
                />
              </div>

              {/* Experience */}
              <div
                draggable
                onDragStart={() => handleDragStart('experience')}
                onDragOver={(e) => handleDragOver(e, 'experience')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'experience')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'experience' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'experience' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary-500" />
                      Work Experience
                    </h2>
                  </div>
                  <button
                    onClick={addExperience}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    + Add Experience
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 bg-neutral-50 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Company Name"
                        />
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Job Title"
                        />
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Start Date (e.g., Jan 2020)"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="End Date (e.g., Present)"
                        />
                      </div>
                      {/* Description with Bullet Points */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-neutral-500">Description (add bullet points below):</span>
                        </div>
                        
                        {/* Bullet Points */}
                        {exp.bullets?.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start gap-2">
                            <span className="mt-2 text-neutral-400">•</span>
                            <textarea
                              value={bullet}
                              onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                              rows={2}
                              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                              placeholder="Achievement or responsibility..."
                            />
                            <button
                              type="button"
                              onClick={() => removeBullet(index, bulletIndex)}
                              className="mt-1 p-1 text-neutral-400 hover:text-error-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add Bullet Button */}
                        <button
                          type="button"
                          onClick={() => addBullet(index)}
                          className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add Bullet Point
                        </button>
                      </div>
                      {resumeData.experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(index)}
                          className="mt-2 text-xs text-error-500 hover:text-error-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div
                draggable
                onDragStart={() => handleDragStart('education')}
                onDragOver={(e) => handleDragOver(e, 'education')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'education')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'education' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'education' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary-500" />
                      Education
                    </h2>
                  </div>
                  <button
                    onClick={addEducation}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    + Add Education
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 bg-neutral-50 rounded-lg space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="School/University"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Degree/Certificate"
                        />
                        <input
                          type="text"
                          value={edu.graduationDate}
                          onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Graduation Date"
                        />
                      </div>
                      <textarea
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Description (optional)..."
                      />
                      {resumeData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-xs text-error-500 hover:text-error-600 text-left"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div
                draggable
                onDragStart={() => handleDragStart('skills')}
                onDragOver={(e) => handleDragOver(e, 'skills')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'skills')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'skills' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'skills' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-primary-500" />
                      Skills
                    </h2>
                  </div>
                  <button
                    onClick={addSkill}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center gap-1 bg-primary-50 px-3 py-2 rounded-lg">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        className="bg-transparent text-sm text-neutral-700 focus:outline-none w-24"
                        placeholder="Skill name"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-neutral-400 hover:text-error-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {resumeData.skills.length === 0 && (
                    <p className="text-sm text-neutral-400 italic">Click "Add Skill" to add your skills</p>
                  )}
                </div>
              </div>

              {/* Projects */}
              <div
                draggable
                onDragStart={() => handleDragStart('projects')}
                onDragOver={(e) => handleDragOver(e, 'projects')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'projects')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'projects' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'projects' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <LayoutTemplate className="w-5 h-5 text-primary-500" />
                      Projects
                    </h2>
                  </div>
                  <button
                    onClick={addProject}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    + Add Project
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={project.id} className="p-4 bg-neutral-50 rounded-lg space-y-3">
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Project Name"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={project.startDate}
                          onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Start Date"
                        />
                        <input
                          type="text"
                          value={project.endDate}
                          onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="End Date"
                        />
                      </div>
                      <input
                        type="text"
                        value={project.associatedExperience}
                        onChange={(e) => updateProject(index, 'associatedExperience', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Associated with (e.g., Company Name, Personal)"
                      />
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Project description..."
                      />
                      <button
                        onClick={() => removeProject(index)}
                        className="text-xs text-error-500 hover:text-error-600"
                      >
                        Remove Project
                      </button>
                    </div>
                  ))}
                  {resumeData.projects.length === 0 && (
                    <p className="text-sm text-neutral-400 italic">Click "Add Project" to add your projects</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div
                draggable
                onDragStart={() => handleDragStart('certifications')}
                onDragOver={(e) => handleDragOver(e, 'certifications')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'certifications')}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border-2 p-6 transition-all cursor-move ${
                  draggedItem === 'certifications' ? 'opacity-50 border-primary-400' : 
                  dragOverItem === 'certifications' ? 'border-primary-400 border-dashed' : 
                  'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-neutral-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary-500" />
                      Certifications
                    </h2>
                  </div>
                  <button
                    onClick={addCertification}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    + Add Certification
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={cert.id} className="p-4 bg-neutral-50 rounded-lg space-y-3">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Certification Name"
                      />
                      <input
                        type="text"
                        value={cert.dateAcquired}
                        onChange={(e) => updateCertification(index, 'dateAcquired', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Date Acquired (e.g., Jan 2023)"
                      />
                      <textarea
                        value={cert.description}
                        onChange={(e) => updateCertification(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Description (optional)..."
                      />
                      <button
                        onClick={() => removeCertification(index)}
                        className="text-xs text-error-500 hover:text-error-600"
                      >
                        Remove Certification
                      </button>
                    </div>
                  ))}
                  {resumeData.certifications.length === 0 && (
                    <p className="text-sm text-neutral-400 italic">Click "Add Certification" to add your certifications</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-neutral-200 p-8">
              <ResumePreview template={selectedTemplate} data={resumeData} sectionOrder={sectionOrder} />
            </div>
          )}
        </div>

        {/* Live Preview (when showPreview is true) */}
        {showPreview && (
          <div className="sticky top-24 self-start">
            <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-soft">
              <h3 className="text-sm font-medium text-neutral-500 mb-4">Live Preview</h3>
              <div className="overflow-auto max-h-[calc(100vh-200px)]" ref={resumeRef}>
                <ResumePreview template={selectedTemplate} data={resumeData} sectionOrder={sectionOrder} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Login Required</h3>
              <p className="text-neutral-600 mb-6">
                Please login or create an account to download your resume. Your progress has been saved.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={redirectToLogin}
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Resume Preview Component
function ResumePreview({ template, data, sectionOrder }: { template: string; data: ResumeData; sectionOrder: SectionOrderItem[] }): React.ReactElement {
  const templateStyles: Record<string, React.CSSProperties> = {
    modern: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: '800px',
      margin: '0 auto'
    },
    classic: {
      fontFamily: "'Georgia', serif",
      maxWidth: '800px',
      margin: '0 auto'
    },
    minimal: {
      fontFamily: "'Inter', sans-serif",
      maxWidth: '800px',
      margin: '0 auto'
    },
    technical: {
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      maxWidth: '800px',
      margin: '0 auto'
    }
  };

  const renderModernSection = (sectionId: SectionType): React.ReactElement | null => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <div className="mb-6" key="summary">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-2">Professional Summary</h2>
            <p className="text-neutral-700 leading-relaxed">{data.summary}</p>
          </div>
        ) : null;
      case 'experience':
        return data.experience.some(e => e.company) ? (
          <div className="mb-6" key="experience">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-3">Experience</h2>
            {data.experience.filter(e => e.company).map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-neutral-900">{exp.role}</h3>
                  <span className="text-sm text-neutral-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-neutral-600 font-medium mb-1">{exp.company}</p>
                {exp.bullets?.filter(b => b.trim()).map((bullet, bulletIdx) => (
                  <p key={bulletIdx} className="text-neutral-700 text-sm">• {bullet}</p>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      case 'education':
        return data.education.some(e => e.school) ? (
          <div className="mb-6" key="education">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-3">Education</h2>
            {data.education.filter(e => e.school).map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-neutral-900">{edu.school}</span>
                  <span className="text-sm text-neutral-500">{edu.graduationDate}</span>
                </div>
                <p className="text-neutral-600">{edu.degree}</p>
                {edu.description && <p className="text-neutral-500 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'skills':
        return data.skills.length > 0 ? (
          <div className="mb-6" key="skills">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-3">Skills</h2>
            <p className="text-neutral-700">{data.skills.map(s => s.name).join(' • ')}</p>
          </div>
        ) : null;
      case 'projects':
        return data.projects.some(p => p.name) ? (
          <div className="mb-6" key="projects">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-3">Projects</h2>
            {data.projects.filter(p => p.name).map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-neutral-900">{project.name}</h3>
                  <span className="text-sm text-neutral-500">{project.startDate} - {project.endDate}</span>
                </div>
                {project.associatedExperience && <p className="text-neutral-600 text-sm">{project.associatedExperience}</p>}
                {project.description && <p className="text-neutral-700 text-sm mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'certifications':
        return data.certifications.some(c => c.name) ? (
          <div key="certifications">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide mb-3">Certifications</h2>
            {data.certifications.filter(c => c.name).map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-neutral-900">{cert.name}</span>
                  <span className="text-sm text-neutral-500">{cert.dateAcquired}</span>
                </div>
                {cert.description && <p className="text-neutral-700 text-sm">{cert.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const renderModern = () => (
    <div style={templateStyles.modern} className="bg-white p-8">
      {/* Header with accent */}
      <div className="flex gap-8 mb-6 pb-6 border-b-2 border-primary-500">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{data.fullName || 'Your Name'}</h1>
          <p className="text-primary-600 font-medium mb-3">{data.professionalTitle || 'Professional Title'}</p>
          <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.location && <span>• {data.location}</span>}
          </div>
        </div>
        <div className="text-right text-sm text-neutral-600">
          {data.website && <div>{data.website}</div>}
          {data.linkedin && <div className="text-primary-600">{data.linkedin}</div>}
        </div>
      </div>

      {/* Dynamic Sections based on sectionOrder */}
      {sectionOrder.map(section => renderModernSection(section.id))}
    </div>
  );

  const renderClassicSection = (sectionId: SectionType): React.ReactElement | null => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <div className="mb-5" key="summary">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-2 pb-1">SUMMARY</h2>
            <p className="text-neutral-700 leading-relaxed">{data.summary}</p>
          </div>
        ) : null;
      case 'experience':
        return data.experience.some(e => e.company) ? (
          <div className="mb-5" key="experience">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-3 pb-1">PROFESSIONAL EXPERIENCE</h2>
            {data.experience.filter(e => e.company).map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-neutral-900">{exp.company}</h3>
                  <span className="text-sm text-neutral-600 italic">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="font-semibold text-neutral-800 italic mb-1">{exp.role}</p>
                {exp.bullets?.filter(b => b.trim()).map((bullet, bulletIdx) => (
                  <p key={bulletIdx} className="text-neutral-700 text-sm">• {bullet}</p>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      case 'education':
        return data.education.some(e => e.school) ? (
          <div className="mb-5" key="education">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-3 pb-1">EDUCATION</h2>
            {data.education.filter(e => e.school).map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="font-bold text-neutral-900">{edu.school}</span>
                  <span className="text-neutral-600"> — {edu.degree}</span>
                </div>
                <span className="text-sm text-neutral-600">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        ) : null;
      case 'skills':
        return data.skills.length > 0 ? (
          <div className="mb-5" key="skills">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-2 pb-1">SKILLS</h2>
            <p className="text-neutral-700">{data.skills.map(s => s.name).join(', ')}</p>
          </div>
        ) : null;
      case 'projects':
        return data.projects.some(p => p.name) ? (
          <div className="mb-5" key="projects">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-3 pb-1">PROJECTS</h2>
            {data.projects.filter(p => p.name).map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-neutral-900">{project.name}</h3>
                  <span className="text-sm text-neutral-600">{project.startDate} - {project.endDate}</span>
                </div>
                {project.associatedExperience && <p className="text-neutral-600 text-sm">{project.associatedExperience}</p>}
                {project.description && <p className="text-neutral-700 text-sm">{project.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'certifications':
        return data.certifications.some(c => c.name) ? (
          <div key="certifications">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-400 mb-2 pb-1">CERTIFICATIONS</h2>
            {data.certifications.filter(c => c.name).map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-neutral-900">{cert.name}</span>
                  <span className="text-sm text-neutral-600">{cert.dateAcquired}</span>
                </div>
                {cert.description && <p className="text-neutral-700 text-sm">{cert.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const renderClassic = () => (
    <div style={templateStyles.classic} className="bg-white p-8">
      {/* Centered Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-neutral-800">
        <h1 className="text-3xl font-bold text-neutral-900 mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-neutral-600 font-medium mb-2">{data.professionalTitle || ''}</p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
          {data.location && <span>{data.location}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.email && <span>{data.email}</span>}
        </div>
        <div className="flex justify-center flex-wrap gap-x-4 text-sm text-neutral-600 mt-1">
          {data.website && <span>{data.website}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* Dynamic Sections based on sectionOrder */}
      {sectionOrder.map(section => renderClassicSection(section.id))}
    </div>
  );

  const renderMinimalSection = (sectionId: SectionType): React.ReactElement | null => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <div className="mb-6" key="summary">
            <p className="text-neutral-700 leading-relaxed">{data.summary}</p>
          </div>
        ) : null;
      case 'experience':
        return data.experience.some(e => e.company) ? (
          <div className="mb-6" key="experience">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Experience</h2>
            {data.experience.filter(e => e.company).map((exp, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-neutral-900">{exp.role}</h3>
                  <span className="text-sm text-neutral-400">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-neutral-500 text-sm mb-1">{exp.company}</p>
                {exp.bullets?.filter(b => b.trim()).map((bullet, bulletIdx) => (
                  <p key={bulletIdx} className="text-neutral-600 text-sm">• {bullet}</p>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      case 'education':
        return data.education.some(e => e.school) ? (
          <div className="mb-6" key="education">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Education</h2>
            {data.education.filter(e => e.school).map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline mb-2">
                <span className="text-neutral-900">{edu.school} <span className="text-neutral-500">— {edu.degree}</span></span>
                <span className="text-sm text-neutral-400">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        ) : null;
      case 'skills':
        return data.skills.length > 0 ? (
          <div className="mb-6" key="skills">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;
      case 'projects':
        return data.projects.some(p => p.name) ? (
          <div className="mb-6" key="projects">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Projects</h2>
            {data.projects.filter(p => p.name).map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-neutral-900">{project.name}</h3>
                  <span className="text-sm text-neutral-400">{project.startDate} - {project.endDate}</span>
                </div>
                {project.associatedExperience && <p className="text-neutral-500 text-sm">{project.associatedExperience}</p>}
                {project.description && <p className="text-neutral-600 text-sm mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'certifications':
        return data.certifications.some(c => c.name) ? (
          <div key="certifications">
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Certifications</h2>
            {data.certifications.filter(c => c.name).map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-neutral-900">{cert.name}</span>
                  <span className="text-sm text-neutral-400">{cert.dateAcquired}</span>
                </div>
                {cert.description && <p className="text-neutral-600 text-sm">{cert.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const renderMinimal = () => (
    <div style={templateStyles.minimal} className="bg-white p-8">
      {/* Clean Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-neutral-900 mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-neutral-500 text-lg mb-3">{data.professionalTitle || ''}</p>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      {/* Dynamic Sections based on sectionOrder */}
      {sectionOrder.map(section => renderMinimalSection(section.id))}
    </div>
  );

  const renderTechnicalSection = (sectionId: SectionType): React.ReactElement | null => {
    switch (sectionId) {
      case 'summary':
        return data.summary ? (
          <div className="mb-5" key="summary">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Summary</h2>
            <p className="text-neutral-700 leading-relaxed">{data.summary}</p>
          </div>
        ) : null;
      case 'experience':
        return data.experience.some(e => e.company) ? (
          <div className="mb-5" key="experience">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Professional Experience</h2>
            {data.experience.filter(e => e.company).map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-neutral-900">{exp.role}</h3>
                  <span className="text-xs text-neutral-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-neutral-600 text-sm mb-1">▸ {exp.company}</p>
                {exp.bullets?.filter(b => b.trim()).map((bullet, bulletIdx) => (
                  <p key={bulletIdx} className="text-neutral-700 text-sm pl-3">• {bullet}</p>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      case 'education':
        return data.education.some(e => e.school) ? (
          <div className="mb-5" key="education">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Education</h2>
            {data.education.filter(e => e.school).map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-neutral-900">{edu.school}</span>
                  <span className="text-xs text-neutral-500">{edu.graduationDate}</span>
                </div>
                <p className="text-neutral-600 text-sm">{edu.degree}</p>
                {edu.description && <p className="text-neutral-500 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'skills':
        return data.skills.length > 0 ? (
          <div className="mb-5" key="skills">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Technical Skills</h2>
            <p className="text-neutral-700">{data.skills.map(s => s.name).join(' | ')}</p>
          </div>
        ) : null;
      case 'projects':
        return data.projects.some(p => p.name) ? (
          <div className="mb-5" key="projects">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Projects</h2>
            {data.projects.filter(p => p.name).map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-neutral-900">{project.name}</h3>
                  <span className="text-xs text-neutral-500">{project.startDate} - {project.endDate}</span>
                </div>
                {project.associatedExperience && <p className="text-neutral-600 text-sm pl-3">▸ {project.associatedExperience}</p>}
                {project.description && <p className="text-neutral-700 text-sm pl-3">{project.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      case 'certifications':
        return data.certifications.some(c => c.name) ? (
          <div key="certifications">
            <h2 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-warning-500 mb-3 pb-1">Certifications</h2>
            {data.certifications.filter(c => c.name).map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-neutral-900">{cert.name}</span>
                  <span className="text-xs text-neutral-500">{cert.dateAcquired}</span>
                </div>
                {cert.description && <p className="text-neutral-700 text-sm pl-3">• {cert.description}</p>}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const renderTechnical = () => (
    <div style={templateStyles.technical} className="bg-white p-8">
      {/* Header with border */}
      <div className="border-l-4 border-warning-500 pl-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">{data.fullName || 'Your Name'}</h1>
        <p className="text-neutral-600 font-medium mb-2">{data.professionalTitle || ''}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      {/* Dynamic Sections based on sectionOrder */}
      {sectionOrder.map(section => renderTechnicalSection(section.id))}
    </div>
  );

  const renderers: Record<string, () => React.ReactElement> = {
    modern: renderModern,
    classic: renderClassic,
    minimal: renderMinimal,
    technical: renderTechnical
  };

  return renderers[template]?.() || renderModern();
}
