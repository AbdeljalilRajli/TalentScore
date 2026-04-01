import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Briefcase, Plus, Calendar, 
  MapPin, DollarSign, ExternalLink, Trash2,
  CheckCircle2, XCircle, HelpCircle, LogIn, Loader2
} from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';
import { 
  getApplications, 
  addApplication, 
  updateApplication, 
  deleteApplication,
  type JobApplication 
} from '../firebase/trackerService';

type ApplicationStatus = JobApplication['status'];

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: React.ElementType }> = {
  applied: { label: 'Applied', color: 'bg-neutral-600', icon: CheckCircle2 },
  interview: { label: 'Interview', color: 'bg-warning-500', icon: Users },
  offer: { label: 'Offer', color: 'bg-success-500', icon: Trophy },
  rejected: { label: 'Rejected', color: 'bg-error-500', icon: XCircle },
  ghosted: { label: 'Ghosted', color: 'bg-neutral-700', icon: HelpCircle }
};

function Users(props: { className?: string }) { return <span className={props.className}>👥</span>; }
function Trophy(props: { className?: string }) { return <span className={props.className}>🏆</span>; }

const JobTracker: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    status: 'applied',
    appliedDate: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all');

  useEffect(() => {
    if (isAuthenticated && user) {
      loadApplications();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [isAuthenticated, user, authLoading]);

  const loadApplications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const apps = await getApplications(user.uid);
      setApplications(apps);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!user || !formData.company?.trim() || !formData.role?.trim()) return;
    
    try {
      await addApplication(user.uid, {
        company: formData.company,
        role: formData.role,
        location: formData.location,
        salary: formData.salary,
        url: formData.url,
        notes: formData.notes,
        status: formData.status || 'applied',
        appliedDate: formData.appliedDate || new Date().toISOString().split('T')[0]
      });
      await loadApplications();
      setIsAdding(false);
      setFormData({ status: 'applied', appliedDate: new Date().toISOString().split('T')[0] });
    } catch (err) {
      console.error('Failed to add application:', err);
    }
  };

  const handleStatusChange = async (id: string | undefined, newStatus: ApplicationStatus) => {
    if (!user || !id) return;
    try {
      await updateApplication(user.uid, id, { status: newStatus });
      await loadApplications();
      setEditingId(null);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!user || !id) return;
    try {
      await deleteApplication(user.uid, id);
      await loadApplications();
    } catch (err) {
      console.error('Failed to delete application:', err);
    }
  };

  const filteredApps = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const stats = {
    total: applications.length,
    active: applications.filter(a => !['rejected', 'ghosted', 'offer'].includes(a.status)).length,
    interviews: applications.filter(a => ['interview', 'offer'].includes(a.status)).length,
    offers: applications.filter(a => a.status === 'offer').length
  };

  const daysSince = (dateStr: string) => {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-800/50">
          <div className="container-premium">
            <div className="flex items-center justify-between h-16 md:h-20">
              <a href="/" className="flex items-center gap-3 text-neutral-400 hover:text-neutral-100 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="text-neutral-100 font-medium">Job Tracker</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24 md:pt-32 pb-20">
          <div className="container-premium max-w-md">
            <div className="card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-neutral-100 text-xl mb-3">Sign in required</h2>
              <p className="text-neutral-400 mb-6">
                Sign in to save and track your job applications across devices.
              </p>
              <a href="/login" className="btn-primary inline-flex">
                <LogIn className="w-4 h-4" />
                Sign In
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-neutral-100 font-medium">Job Tracker</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20">
        <div className="container-premium">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-neutral-50 mb-3">Track your applications</h1>
            <p className="text-neutral-400 text-lg max-w-2xl">
              Stay organized and never lose track of where you applied.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-neutral-100' },
              { label: 'Active', value: stats.active, color: 'text-primary-400' },
              { label: 'Interviews', value: stats.interviews, color: 'text-warning-400' },
              { label: 'Offers', value: stats.offers, color: 'text-success-400' }
            ].map(stat => (
              <div key={stat.label} className="card p-4 text-center">
                <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
                <p className="text-neutral-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters & Add */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All
              </button>
              {(Object.keys(statusConfig) as ApplicationStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === s ? 'bg-primary-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="btn-primary ml-auto"
            >
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          </div>

          {/* Add Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="card p-6">
                  <h3 className="text-neutral-100 font-medium mb-4">New Application</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Company *"
                      value={formData.company || ''}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Role *"
                      value={formData.role || ''}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location || ''}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Salary Range"
                      value={formData.salary || ''}
                      onChange={e => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                    <input
                      type="url"
                      placeholder="Job URL"
                      value={formData.url || ''}
                      onChange={e => setFormData({ ...formData, url: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                    <input
                      type="date"
                      value={formData.appliedDate || ''}
                      onChange={e => setFormData({ ...formData, appliedDate: e.target.value })}
                      className="w-full bg-neutral-800/50 text-neutral-100 px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Notes (interviewers, follow-up dates, etc.)"
                    value={formData.notes || ''}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full h-24 bg-neutral-800/50 text-neutral-100 text-sm p-4 rounded-xl border border-neutral-700 focus:border-primary-500/50 focus:outline-none resize-none mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAdd}
                      disabled={!formData.company?.trim() || !formData.role?.trim()}
                      className="btn-primary"
                    >
                      Save Application
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 rounded-xl text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Applications List */}
          <div className="space-y-3">
            {filteredApps.length === 0 ? (
              <div className="card p-12 text-center">
                <Briefcase className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">
                  {filter === 'all' ? 'No applications yet. Start tracking your job search!' : `No ${statusConfig[filter].label} applications.`}
                </p>
              </div>
            ) : (
              filteredApps.map(app => {
                const StatusIcon = statusConfig[app.status].icon;
                return (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${statusConfig[app.status].color} flex items-center justify-center shrink-0`}>
                        <StatusIcon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-neutral-100 font-medium">{app.company}</h4>
                            <p className="text-neutral-400">{app.role}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {daysSince(app.appliedDate)}
                              </span>
                              {app.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {app.location}
                                </span>
                              )}
                              {app.salary && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {app.salary}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {app.url && (
                              <a
                                href={app.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 text-neutral-400" />
                              </a>
                            )}
                            
                            {/* Status Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() => setEditingId(editingId === (app.id || '') ? null : app.id || '')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusConfig[app.status].color} text-white`}
                              >
                                {statusConfig[app.status].label}
                              </button>
                              
                              {editingId === app.id && (
                                <div className="absolute right-0 top-full mt-2 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 py-1 z-10 min-w-[140px]">
                                  {(Object.keys(statusConfig) as ApplicationStatus[]).map(s => (
                                    <button
                                      key={s}
                                      onClick={() => handleStatusChange(app.id, s)}
                                      className="w-full px-3 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-700 transition-colors"
                                    >
                                      {statusConfig[s].label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="p-2 rounded-lg hover:bg-error-500/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-neutral-500 hover:text-error-400" />
                            </button>
                          </div>
                        </div>
                        
                        {app.notes && (
                          <p className="mt-3 text-sm text-neutral-500 bg-neutral-800/30 rounded-lg p-3">
                            {app.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobTracker;
