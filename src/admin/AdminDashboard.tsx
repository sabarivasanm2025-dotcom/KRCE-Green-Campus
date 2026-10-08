import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, LogOut, Users, Clock, CheckCircle2, XCircle,
  Search, Filter, RefreshCw, Trash2, Eye, X,
  ChevronDown, AlertTriangle, Mail, GraduationCap,
  Calendar, Compass, MessageSquare, ShieldCheck,
} from 'lucide-react';
import { volunteerService, adminAuthService } from '../lib/supabase';
import { useAdminAuth } from './AdminContext';
import type { VolunteerSubmission, VolunteerStatus } from '../types';

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: VolunteerStatus }> = ({ status }) => {
  const map: Record<VolunteerStatus, { color: string; dot: string }> = {
    Pending:  { color: 'bg-amber-400/10  border-amber-400/30  text-amber-300',  dot: 'bg-amber-400'  },
    Approved: { color: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300', dot: 'bg-emerald-400' },
    Rejected: { color: 'bg-rose-400/10   border-rose-400/30   text-rose-300',   dot: 'bg-rose-400'   },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-semibold ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
  loading: boolean;
}> = ({ label, value, icon, accent, loading }) => (
  <div className={`rounded-2xl bg-forest-900/60 border ${accent} backdrop-blur-md p-5 flex items-center gap-4`}>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-forest-950 border ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{label}</p>
      {loading ? (
        <div className="w-12 h-6 mt-0.5 bg-forest-800 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-bold text-white font-display">{value}</p>
      )}
    </div>
  </div>
);

// ─── Detail modal ──────────────────────────────────────────────────────────────
const DetailModal: React.FC<{ sub: VolunteerSubmission; onClose: () => void }> = ({ sub, onClose }) => (
  <AnimatePresence>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#030d08]/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="relative w-full max-w-lg bg-forest-900 border border-emerald-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/15 bg-forest-950/60">
          <div>
            <p className="text-[10px] font-mono text-lime-300 uppercase tracking-widest mb-0.5">Submission Detail</p>
            <h3 className="text-base font-bold text-white font-display">{sub.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-forest-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-3 text-sm">
          {[
            { icon: <Mail className="w-4 h-4 text-emerald-400/70" />, label: 'Email', value: sub.email },
            { icon: <GraduationCap className="w-4 h-4 text-emerald-400/70" />, label: 'Department', value: sub.department },
            { icon: <Calendar className="w-4 h-4 text-emerald-400/70" />, label: 'Year', value: sub.year },
            { icon: <Compass className="w-4 h-4 text-emerald-400/70" />, label: 'Activity', value: sub.activity },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/60 border border-emerald-500/15">
              {icon}
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">{label}</p>
                <p className="text-slate-200 text-xs mt-0.5">{value}</p>
              </div>
            </div>
          ))}
          {sub.message && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/60 border border-emerald-500/15">
              <MessageSquare className="w-4 h-4 text-emerald-400/70 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Message</p>
                <p className="text-slate-200 text-xs mt-0.5 italic">"{sub.message}"</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-mono text-slate-500">Status</span>
            <StatusBadge status={sub.status} />
          </div>
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-[10px] font-mono text-slate-500">Submitted</span>
            <span className="text-xs text-slate-300">
              {new Date(sub.created_at).toLocaleString('en-IN', {
                dateStyle: 'medium', timeStyle: 'short',
              })}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);

// ─── Delete confirmation modal ────────────────────────────────────────────────
const DeleteModal: React.FC<{
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}> = ({ name, onConfirm, onCancel, loading }) => (
  <AnimatePresence>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-[#030d08]/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-sm bg-forest-900 border border-rose-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
        </div>
        <h3 className="text-base font-bold text-white font-display mb-1">Delete Submission?</h3>
        <p className="text-xs text-slate-400 mb-5">
          Permanently remove <span className="text-white font-semibold">{name}</span>'s record. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-forest-800 hover:bg-forest-700 border border-emerald-500/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export const AdminDashboard: React.FC = () => {
  const { adminUser, setAdminUser } = useAdminAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterActivity, setFilterActivity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modals
  const [detailSub, setDetailSub] = useState<VolunteerSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VolunteerSubmission | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  // ── Fetch submissions ──
  const fetchSubmissions = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    const { data, error: fetchErr } = await volunteerService.getSubmissions();
    if (fetchErr) setError('Failed to load submissions. Check your connection.');
    else setSubmissions(data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  // ── Logout ──
  const handleLogout = async () => {
    await adminAuthService.signOut();
    setAdminUser(null);
    navigate('/admin', { replace: true });
  };

  // ── Status update ──
  const handleStatusChange = async (id: string, status: VolunteerStatus) => {
    setStatusUpdating(id);
    const { success } = await volunteerService.updateStatus(id, status);
    if (success) {
      setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
    }
    setStatusUpdating(null);
  };

  // ── Delete ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const { success } = await volunteerService.deleteSubmission(deleteTarget.id);
    if (success) {
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  // ── Derived filter values ──
  const uniqueDepts     = [...new Set(submissions.map((s) => s.department))].sort();
  const uniqueYears     = [...new Set(submissions.map((s) => s.year))].sort();
  const uniqueActivities = [...new Set(submissions.map((s) => s.activity))].sort();

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch   = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchDept     = !filterDept     || s.department === filterDept;
    const matchYear     = !filterYear     || s.year === filterYear;
    const matchActivity = !filterActivity || s.activity === filterActivity;
    const matchStatus   = !filterStatus   || s.status === filterStatus;
    return matchSearch && matchDept && matchYear && matchActivity && matchStatus;
  });

  // ── Stats ──
  const total    = submissions.length;
  const pending  = submissions.filter((s) => s.status === 'Pending').length;
  const approved = submissions.filter((s) => s.status === 'Approved').length;
  const rejected = submissions.filter((s) => s.status === 'Rejected').length;

  const statuses: VolunteerStatus[] = ['Pending', 'Approved', 'Rejected'];

  return (
    <div className="min-h-screen bg-[#030d08] text-slate-100 font-sans">
      {/* ── Top Navbar ── */}
      <header className="sticky top-0 z-40 bg-[#030d08]/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest-850 border border-emerald-500/40 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-lime-400" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black tracking-wider text-slate-100 font-display">GREEN</span>
                <span className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-display">CAMPUS</span>
              </div>
              <span className="text-[9px] font-mono tracking-wider text-emerald-400/80 uppercase">Admin Portal</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/60 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-xs font-mono text-slate-300 max-w-[180px] truncate">
                {adminUser?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/25 hover:border-rose-500/50 text-xs font-mono text-rose-300 hover:text-rose-200 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Page title ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 border border-emerald-500/25 text-lime-300 text-[10px] font-mono font-semibold uppercase mb-2">
              <Users className="w-3 h-3 text-lime-400" />
              <span>Volunteer Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Admin{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                Dashboard
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review, manage, and update volunteer submissions for KRCE Green Campus.
            </p>
          </div>
          <button
            onClick={() => fetchSubmissions(true)}
            disabled={refreshing}
            className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 border border-emerald-500/25 text-xs font-mono text-emerald-400 hover:text-lime-300 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300 font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Submissions"
            value={total}
            icon={<Users className="w-5 h-5 text-emerald-400" />}
            accent="border-emerald-500/25"
            loading={loading}
          />
          <StatCard
            label="Pending Review"
            value={pending}
            icon={<Clock className="w-5 h-5 text-amber-400" />}
            accent="border-amber-500/25"
            loading={loading}
          />
          <StatCard
            label="Approved"
            value={approved}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            accent="border-emerald-500/25"
            loading={loading}
          />
          <StatCard
            label="Rejected"
            value={rejected}
            icon={<XCircle className="w-5 h-5 text-rose-400" />}
            accent="border-rose-500/25"
            loading={loading}
          />
        </div>

        {/* ── Submissions table panel ── */}
        <div className="rounded-2xl bg-forest-900/50 border border-emerald-500/20 backdrop-blur-md overflow-hidden">
          {/* Filters header */}
          <div className="px-5 py-4 border-b border-emerald-500/15 space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-lime-400" />
              <span className="text-xs font-mono font-semibold text-lime-300 uppercase tracking-wider">
                Filter Submissions
              </span>
              <span className="ml-auto text-[10px] font-mono text-slate-500">
                {filtered.length} / {total} shown
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-forest-950 border border-emerald-500/20 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all"
                />
              </div>

              {/* Department */}
              <div className="relative">
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl bg-forest-950 border border-emerald-500/20 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all cursor-pointer"
                >
                  <option value="">All Departments</option>
                  {uniqueDepts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
              </div>

              {/* Year */}
              <div className="relative">
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl bg-forest-950 border border-emerald-500/20 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all cursor-pointer"
                >
                  <option value="">All Years</option>
                  {uniqueYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
              </div>

              {/* Status */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl bg-forest-950 border border-emerald-500/20 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Activity filter (second row — can be long) */}
            <div className="relative w-full sm:w-80">
              <select
                value={filterActivity}
                onChange={(e) => setFilterActivity(e.target.value)}
                className="w-full appearance-none pl-3 pr-7 py-2 rounded-xl bg-forest-950 border border-emerald-500/20 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all cursor-pointer"
              >
                <option value="">All Activities</option>
                {uniqueActivities.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20 gap-3">
                <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-400">Loading submissions…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No submissions match the current filters.</p>
              </div>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-emerald-500/15 bg-forest-950/40">
                    {['Name', 'Email', 'Department', 'Year', 'Activity', 'Status', 'Date', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-mono font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) => (
                    <motion.tr
                      key={sub.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.025 }}
                      className="border-b border-emerald-500/10 hover:bg-forest-900/40 transition-colors group"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-200 whitespace-nowrap">
                        {sub.name}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {sub.email}
                      </td>
                      <td className="px-4 py-3 text-slate-300 max-w-[160px] truncate" title={sub.department}>
                        {sub.department}
                      </td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                        {sub.year}
                      </td>
                      <td className="px-4 py-3 text-slate-300 max-w-[160px] truncate" title={sub.activity}>
                        {sub.activity}
                      </td>
                      {/* Status dropdown */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {statusUpdating === sub.id ? (
                          <div className="w-5 h-5 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="relative">
                            <select
                              value={sub.status}
                              onChange={(e) => handleStatusChange(sub.id, e.target.value as VolunteerStatus)}
                              className="appearance-none pl-2.5 pr-6 py-1 rounded-lg bg-forest-950 border border-emerald-500/20 text-[10px] font-mono text-white focus:outline-none focus:border-lime-400 cursor-pointer transition-all"
                            >
                              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setDetailSub(sub)}
                            title="View details"
                            className="p-1.5 rounded-lg hover:bg-emerald-500/15 text-emerald-400 hover:text-lime-300 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(sub)}
                            title="Delete submission"
                            className="p-1.5 rounded-lg hover:bg-rose-500/15 text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] font-mono text-slate-600 pb-4">
          KRCE Green Campus • Admin Portal • Data stored securely in Supabase
        </p>
      </main>

      {/* ── Modals ── */}
      {detailSub && <DetailModal sub={detailSub} onClose={() => setDetailSub(null)} />}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};
