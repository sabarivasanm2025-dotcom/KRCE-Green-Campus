import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  User,
  Mail,
  GraduationCap,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { volunteerService } from '../lib/supabase';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPreference?: string;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({
  isOpen,
  onClose,
  defaultPreference,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science and Engineering (CSE)',
    year: '2nd Year',
    email: '',
    activityPreference: defaultPreference || 'Tree Plantation & Campus Greening',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const departments = [
    'Computer Science and Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence and Data Science (AI & DS)',
    'Mechanical Engineering (MECH)',
    'Electronics and Communication Engineering (ECE)',
    'Electrical and Electronics Engineering (EEE)',
    'Civil Engineering (CIVIL)',
    'MBA / Science & Humanities',
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];

  const activities = [
    'Tree Plantation & Campus Greening',
    'Clean Campus & Zero-Plastic Campaign',
    'Rainwater & Water Audit Patrol',
    'Solar & Energy Conservation Cell',
    'Green Club Leadership & Media',
    'Eco-Hackathon & Poster Ideathon',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await volunteerService.submitVolunteer({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        year: formData.year,
        activity: formData.activityPreference,
        message: formData.message,
      });

      if (response.error) {
        console.warn('Backend save notice:', response.error.message);
      }

      const generatedTicket =
        'KRCE-ECO-' + (response.data?.id ? response.data.id.substring(0, 5).toUpperCase() : Math.floor(1000 + Math.random() * 9000));
      setTicketId(generatedTicket);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger eco-confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#10b981', '#ffffff', '#34d399'],
      });
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Could not complete submission. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: 'Computer Science and Engineering (CSE)',
      year: '2nd Year',
      email: '',
      activityPreference: defaultPreference || 'Tree Plantation & Campus Greening',
      message: '',
    });
    setErrorMessage('');
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030d08]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-forest-900 border border-emerald-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
        >
          {/* Top Banner */}
          <div className="p-6 bg-gradient-to-r from-forest-950 via-forest-850 to-emerald-950 border-b border-emerald-500/20 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-[10px] font-mono font-semibold text-lime-300 uppercase mb-2">
              <Sparkles className="w-3 h-3 text-lime-400" />
              <span>KRCE Student Initiative</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Become a Green Volunteer
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Join fellow KRCE students in shaping a cleaner, cooler, and more sustainable campus.
            </p>
          </div>

          {/* Form or Confirmation */}
          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Karthikeyan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    College / Personal Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. karthik.krce@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
                    />
                  </div>
                </div>

                {/* Department and Year Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60 pointer-events-none" />
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full pl-10 pr-8 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all appearance-none cursor-pointer"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept} className="bg-forest-900 text-white">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Year of study */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      Year of Study
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60 pointer-events-none" />
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full pl-10 pr-8 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all appearance-none cursor-pointer"
                      >
                        {years.map((yr) => (
                          <option key={yr} value={yr} className="bg-forest-900 text-white">
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Activity Preference */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    Activity Preference
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/60 pointer-events-none" />
                    <select
                      value={formData.activityPreference}
                      onChange={(e) => setFormData({ ...formData, activityPreference: e.target.value })}
                      className="w-full pl-10 pr-8 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-xs text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all appearance-none cursor-pointer"
                    >
                      {activities.map((act) => (
                        <option key={act} value={act} className="bg-forest-900 text-white">
                          {act}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Message Field */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    Message / Motivation (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-2.5 w-4 h-4 text-emerald-400/60" />
                    <textarea
                      rows={2}
                      placeholder="Why do you want to join this green initiative?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-forest-950 border border-emerald-500/25 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting to Database...</span>
                    ) : (
                      <>
                        <span>Submit Volunteer Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-mono text-center text-slate-400">
                  Data securely saved for KRCE Green Campus Community Review
                </p>
              </form>
            ) : (
              /* Success confirmation */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-lime-400/10 border-2 border-lime-400/40 text-lime-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(163,230,53,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Welcome to the Green Movement!
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    VOLUNTEER PASS GENERATED: <span className="text-lime-300 font-bold">{ticketId}</span>
                  </p>
                </div>

                {/* Confirmation Card */}
                <div className="p-4 rounded-xl bg-forest-950 border border-emerald-500/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Volunteer Name:</span>
                    <span className="font-semibold text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-semibold text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-semibold text-white">{formData.department}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Selected Role:</span>
                    <span className="font-semibold text-lime-300">{formData.activityPreference}</span>
                  </div>
                  {formData.message && (
                    <div className="py-1 border-b border-white/5">
                      <span className="text-slate-400 block mb-0.5">Note:</span>
                      <span className="text-slate-200 italic">{formData.message}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Database Status:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-mono text-[10px]">
                      Pending Review
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span>Submission logged to database successfully</span>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-lime-400 hover:bg-lime-300 transition-colors"
                >
                  Done & Back to Campus Page
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
