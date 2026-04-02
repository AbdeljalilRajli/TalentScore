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
      <div className="min-h-screen bg-neutral-50 relative flex items-center justify-center">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(72,122,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(72,122,145,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 relative">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(72,122,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(72,122,145,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
          <div className="container-premium">
            <div className="flex items-center justify-between h-16 md:h-20">
              <a href="/" className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium text-sm">Back</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-500 rounded-sm flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <span className="text-neutral-900 font-medium text-sm">Job Tracker</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24 md:pt-32 pb-20 relative">
          <div className="container-premium max-w-md">
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center shadow-soft">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-8 h-8 text-primary-500" />
              </div>
              <h2 className="text-neutral-900 text-xl mb-3 font-semibold">Sign in required</h2>
              <p className="text-neutral-500 mb-8">
                Sign in to save and track your job applications across devices.
              </p>
              <a href="/login" className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 shadow-soft hover:shadow-medium">
                <LogIn className="w-5 h-5" />
                Sign In
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-neutral-900 font-medium text-sm">Job Tracker</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20 relative">
        <div className="container-premium">
          {/* Page Header */}
          <div className="mb-12">
            <span className="text-primary-500 text-sm font-medium tracking-wider uppercase mb-4 block">Tracker</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">Track your applications</h1>
            <p className="text-neutral-600 max-w-lg">
              Stay organized and never lose track of where you applied.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-neutral-900', bg: 'bg-white' },
              { label: 'Active', value: stats.active, color: 'text-primary-600', bg: 'bg-primary-50' },
              { label: 'Interviews', value: stats.interviews, color: 'text-warning-600', bg: 'bg-warning-50' },
              { label: 'Offers', value: stats.offers, color: 'text-success-600', bg: 'bg-success-50' }
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-6 text-center border border-neutral-200 shadow-soft`}>
                <p className={`text-3xl font-semibold ${stat.color} tracking-tight`}>{stat.value}</p>
                <p className="text-neutral-500 text-sm font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters & Add */}
          <div className="flex flex-wrap items-center gap-4 mb-8 border-b border-neutral-200 pb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === 'all' ? 'bg-primary-500 text-white shadow-soft' : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                All
              </button>
              {(Object.keys(statusConfig) as ApplicationStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === s ? 'bg-primary-500 text-white shadow-soft' : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:translate-y-0 shadow-soft hover:shadow-medium ml-auto"
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
                className="mb-8"
              >
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-soft">
                  <h3 className="text-neutral-900 font-semibold mb-6 text-lg">New Application</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Company *"
                      value={formData.company || ''}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Role *"
                      value={formData.role || ''}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location || ''}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Salary Range"
                      value={formData.salary || ''}
                      onChange={e => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                    <input
                      type="url"
                      placeholder="Job URL"
                      value={formData.url || ''}
                      onChange={e => setFormData({ ...formData, url: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                    <input
                      type="date"
                      value={formData.appliedDate || ''}
                      onChange={e => setFormData({ ...formData, appliedDate: e.target.value })}
                      className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Notes (interviewers, follow-up dates, etc.)"
                    value={formData.notes || ''}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full h-24 bg-neutral-50 text-neutral-900 text-sm p-4 rounded-lg border border-neutral-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAdd}
                      disabled={!formData.company?.trim() || !formData.role?.trim()}
                      className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50"
                    >
                      Save Application
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-soft">
                <Briefcase className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">
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
                    className="bg-white rounded-2xl border border-neutral-200 p-6 group hover:shadow-medium transition-all shadow-soft"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${statusConfig[app.status].color} rounded-xl flex items-center justify-center shrink-0`}>
                        <StatusIcon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-neutral-900 font-semibold text-base">{app.company}</h4>
                            <p className="text-neutral-600 text-sm">{app.role}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {daysSince(app.appliedDate)}
                              </span>
                              {app.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {app.location}
                                </span>
                              )}
                              {app.salary && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
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
                                className="p-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 text-neutral-500" />
                              </a>
                            )}
                            
                            {/* Status Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() => setEditingId(editingId === (app.id || '') ? null : app.id || '')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${statusConfig[app.status].color}`}
                              >
                                {statusConfig[app.status].label}
                              </button>
                              
                              {editingId === app.id && (
                                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-strong border border-neutral-200 py-2 z-10 min-w-[160px]">
                                  {(Object.keys(statusConfig) as ApplicationStatus[]).map(s => (
                                    <button
                                      key={s}
                                      onClick={() => handleStatusChange(app.id, s)}
                                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                    >
                                      {statusConfig[s].label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="p-2 bg-neutral-100 rounded-lg hover:bg-error-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-neutral-500 hover:text-error-500" />
                            </button>
                          </div>
                        </div>
                        
                        {app.notes && (
                          <p className="mt-4 text-sm text-neutral-600 border-t border-neutral-200 pt-4">
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
