import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Edit2, Trash2, ExternalLink, 
  Calendar, LayoutTemplate, AlertCircle,
  Plus, Loader2, Download
} from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import type { ResumeData } from '../firebase/resumeService';
import { getResumes, deleteResume } from '../firebase/resumeService';
import html2pdf from 'html2pdf.js';

const MyResumes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    loadResumes();
  }, [isAuthenticated, user]);

  const loadResumes = async () => {
    if (!user?.uid) return;
    
    try {
      setLoading(true);
      const data = await getResumes(user.uid);
      setResumes(data);
    } catch (err) {
      console.error('Failed to load resumes:', err);
      setError('Failed to load your resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (!user?.uid) return;
    
    if (!confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(resumeId);
      await deleteResume(user.uid, resumeId);
      setResumes(prev => prev.filter(r => r.id !== resumeId));
    } catch (err) {
      console.error('Failed to delete resume:', err);
      alert('Failed to delete resume. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (resume: ResumeData) => {
    // Store resume data in localStorage to load in Templates page
    localStorage.setItem('editResumeData', JSON.stringify(resume));
    localStorage.setItem('editResumeId', resume.id || '');
    window.history.pushState({}, '', '/templates');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleOptimizeLinkedIn = (_resume: ResumeData) => {
    window.history.pushState({}, '', '/linkedin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleDownload = async (resume: ResumeData) => {
    try {
      setDownloadingId(resume.id!);
      
      // Create a temporary container for the resume
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '210mm';
      container.style.background = 'white';
      container.style.padding = '20mm';
      container.style.boxSizing = 'border-box';
      document.body.appendChild(container);
      
      // Simple HTML structure for PDF generation
      container.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 5px; color: #1f2937;">${resume.fullName}</h1>
          <p style="font-size: 14px; color: #3b82f6; margin-bottom: 10px;">${resume.professionalTitle}</p>
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 20px;">
            ${resume.email} ${resume.phone ? '| ' + resume.phone : ''} ${resume.location ? '| ' + resume.location : ''}
          </div>
          
          ${resume.summary ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Professional Summary</h2><p style="font-size: 12px; color: #4b5563;">${resume.summary}</p></div>` : ''}
          
          ${resume.experience?.length ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Experience</h2>${resume.experience.map(exp => `<div style="margin-bottom: 10px;"><div style="font-weight: 600; font-size: 13px;">${exp.role} at ${exp.company}</div><div style="font-size: 11px; color: #6b7280;">${exp.startDate} - ${exp.endDate}</div>${exp.bullets?.map(b => `<div style="font-size: 12px; color: #4b5563; margin-top: 3px;">• ${b}</div>`).join('')}</div>`).join('')}</div>` : ''}
          
          ${resume.education?.length ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Education</h2>${resume.education.map(edu => `<div style="margin-bottom: 8px;"><div style="font-weight: 600; font-size: 13px;">${edu.school} — ${edu.degree}</div><div style="font-size: 11px; color: #6b7280;">${edu.graduationDate}</div>${edu.description ? `<div style="font-size: 12px; color: #4b5563; margin-top: 3px;">${edu.description}</div>` : ''}</div>`).join('')}</div>` : ''}
          
          ${resume.skills?.length ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Skills</h2><p style="font-size: 12px; color: #4b5563;">${resume.skills.map(s => s.name).join(', ')}</p></div>` : ''}
          
          ${resume.projects?.length ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Projects</h2>${resume.projects.map(proj => `<div style="margin-bottom: 8px;"><div style="font-weight: 600; font-size: 13px;">${proj.name}</div><div style="font-size: 11px; color: #6b7280;">${proj.startDate} - ${proj.endDate}</div><div style="font-size: 12px; color: #4b5563; margin-top: 3px;">${proj.description}</div></div>`).join('')}</div>` : ''}
          
          ${resume.certifications?.length ? `<div style="margin-bottom: 20px;"><h2 style="font-size: 14px; font-weight: bold; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px;">Certifications</h2>${resume.certifications.map(cert => `<div style="margin-bottom: 8px;"><div style="font-weight: 600; font-size: 13px;">${cert.name}</div><div style="font-size: 11px; color: #6b7280;">${cert.dateAcquired}</div>${cert.description ? `<div style="font-size: 12px; color: #4b5563; margin-top: 3px;">${cert.description}</div>` : ''}</div>`).join('')}</div>` : ''}
        </div>
      `;
      
      // Generate PDF
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${resume.fullName.replace(/\s+/g, '_')}_resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          scrollY: 0,
          scrollX: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };
      
      await html2pdf().set(opt).from(container).save();
      
      // Clean up
      document.body.removeChild(container);
    } catch (err) {
      console.error('Failed to download resume:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Unknown date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[1, 2].map(i => (
                <div key={i} className="h-48 bg-neutral-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                My Resumes
              </h1>
              <p className="text-neutral-600">
                {resumes.length > 0 
                  ? `You have ${resumes.length} saved resume${resumes.length !== 1 ? 's' : ''}`
                  : 'No saved resumes yet. Create your first one!'
                }
              </p>
            </div>
            <a
              href="/templates"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New
            </a>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-error-500 mt-0.5" />
            <p className="text-error-700">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {resumes.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              No Saved Resumes
            </h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Create your first resume in the Templates section and save it to see it here.
            </p>
            <a
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Resume
            </a>
          </motion.div>
        )}

        {/* Resume Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-medium transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {resume.fullName || 'Untitled Resume'}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {resume.professionalTitle || 'No title'}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  resume.template === 'modern' ? 'bg-primary-100 text-primary-700' :
                  resume.template === 'classic' ? 'bg-neutral-100 text-neutral-700' :
                  resume.template === 'minimal' ? 'bg-success-100 text-success-700' :
                  resume.template === 'technical' ? 'bg-warning-100 text-warning-700' :
                  'bg-neutral-100 text-neutral-700'
                }`}>
                  {resume.template || 'Default'}
                </span>
              </div>

              {/* Resume Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {formatDate(resume.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500">
                  <LayoutTemplate className="w-4 h-4" />
                  <span>{resume.experience?.length || 0} experiences, {resume.education?.length || 0} education</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => handleEdit(resume)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDownload(resume)}
                  disabled={downloadingId === resume.id}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-success-600 hover:bg-success-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {downloadingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download
                </button>
                <button
                  onClick={() => handleOptimizeLinkedIn(resume)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleDelete(resume.id!)}
                  disabled={deletingId === resume.id}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-error-600 hover:bg-error-50 rounded-lg transition-colors ml-auto disabled:opacity-50"
                >
                  {deletingId === resume.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Create Button */}
        <div className="sm:hidden fixed bottom-6 right-6">
          <a
            href="/templates"
            className="flex items-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-full font-medium shadow-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyResumes;
