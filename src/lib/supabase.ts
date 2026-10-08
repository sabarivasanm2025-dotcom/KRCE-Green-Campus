import { createClient } from '@supabase/supabase-js';
import type { VolunteerSubmission, VolunteerStatus } from '../types';

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
// Supabase uses VITE_SUPABASE_PUBLISHABLE_KEY in newer project setups
const rawKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
) as string | undefined;

// Validate if real Supabase credentials are configured
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl.startsWith('https://') &&
  !rawUrl.includes('your-project-id') &&
  !rawUrl.includes('placeholder') &&
  rawKey.length > 20 &&
  !rawKey.includes('your-supabase') &&
  !rawKey.includes('placeholder')
);

// Fallback URL and key to prevent createClient from crashing if unconfigured
const supabaseUrl = isSupabaseConfigured ? rawUrl! : 'https://placeholder-krce-green-campus.supabase.co';
const supabaseAnonKey = isSupabaseConfigured ? rawKey! : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LOCAL_STORAGE_KEY = 'krce_green_campus_volunteers';

// Helper to get local fallback submissions
const getLocalSubmissions = (): VolunteerSubmission[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as VolunteerSubmission[];
  } catch {
    return [];
  }
};

// Helper to save local fallback submissions
const saveLocalSubmissions = (items: VolunteerSubmission[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

// Volunteer Service API
export const volunteerService = {
  // Submit new volunteer
  async submitVolunteer(data: {
    name: string;
    email: string;
    department: string;
    year: string;
    activity: string;
    message?: string;
  }): Promise<{ data: VolunteerSubmission | null; error: Error | null; isLocalFallback?: boolean }> {
    const newSubmission: VolunteerSubmission = {
      id: crypto.randomUUID ? crypto.randomUUID() : `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      name: data.name.trim(),
      email: data.email.trim(),
      department: data.department,
      year: data.year,
      activity: data.activity,
      message: data.message?.trim() || '',
      status: 'Pending',
    };

    if (isSupabaseConfigured) {
      try {
        // Anonymous users have INSERT-only access under RLS.
        // Do NOT chain .select() or .single() here — anonymous users cannot SELECT,
        // and Supabase would return an RLS error even after a successful insert.
        // We return the locally-constructed newSubmission on success instead.
        const { error } = await supabase
          .from('volunteer_submissions')
          .insert([
            {
              name: newSubmission.name,
              email: newSubmission.email,
              department: newSubmission.department,
              year: newSubmission.year,
              activity: newSubmission.activity,
              message: newSubmission.message,
              status: newSubmission.status,
            },
          ]);

        if (error) {
          console.warn('Supabase insert failed, falling back to local storage:', error.message);
          // Save locally so submission isn't lost
          const local = getLocalSubmissions();
          saveLocalSubmissions([newSubmission, ...local]);
          return { data: newSubmission, error: null, isLocalFallback: true };
        }

        // Insert succeeded — return the pre-built submission (id, created_at already set)
        return { data: newSubmission, error: null, isLocalFallback: false };
      } catch (err) {
        console.warn('Network exception while connecting to Supabase:', err);
        const local = getLocalSubmissions();
        saveLocalSubmissions([newSubmission, ...local]);
        return { data: newSubmission, error: null, isLocalFallback: true };
      }
    } else {
      // Local fallback mode
      const local = getLocalSubmissions();
      saveLocalSubmissions([newSubmission, ...local]);
      return { data: newSubmission, error: null, isLocalFallback: true };
    }
  },

  // Fetch all submissions (for Admin)
  async getSubmissions(): Promise<{ data: VolunteerSubmission[]; error: Error | null; isLocalFallback?: boolean }> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('volunteer_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase select query error, reading local fallback:', error.message);
          return { data: getLocalSubmissions(), error: new Error(error.message), isLocalFallback: true };
        }

        return { data: (data as VolunteerSubmission[]) || [], error: null, isLocalFallback: false };
      } catch (err: unknown) {
        return { data: getLocalSubmissions(), error: err as Error, isLocalFallback: true };
      }
    } else {
      return { data: getLocalSubmissions(), error: null, isLocalFallback: true };
    }
  },

  // Update submission status
  async updateStatus(
    id: string,
    status: VolunteerStatus
  ): Promise<{ success: boolean; error: Error | null }> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('volunteer_submissions')
          .update({ status })
          .eq('id', id);

        if (error) {
          console.warn('Supabase update error:', error.message);
          // Update in local fallback too
          const local = getLocalSubmissions();
          const updated = local.map((item) => (item.id === id ? { ...item, status } : item));
          saveLocalSubmissions(updated);
          return { success: true, error: null };
        }

        return { success: true, error: null };
      } catch (err: unknown) {
        return { success: false, error: err as Error };
      }
    } else {
      const local = getLocalSubmissions();
      const updated = local.map((item) => (item.id === id ? { ...item, status } : item));
      saveLocalSubmissions(updated);
      return { success: true, error: null };
    }
  },

  // Delete submission
  async deleteSubmission(id: string): Promise<{ success: boolean; error: Error | null }> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('volunteer_submissions')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase delete error:', error.message);
          const local = getLocalSubmissions().filter((item) => item.id !== id);
          saveLocalSubmissions(local);
          return { success: true, error: null };
        }

        return { success: true, error: null };
      } catch (err: unknown) {
        return { success: false, error: err as Error };
      }
    } else {
      const local = getLocalSubmissions().filter((item) => item.id !== id);
      saveLocalSubmissions(local);
      return { success: true, error: null };
    }
  },
};

// Admin Auth Service — used exclusively by the Admin Portal
export const adminAuthService = {
  /** Sign in with email + password via Supabase Auth */
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  /** Sign out the current session */
  async signOut() {
    return supabase.auth.signOut();
  },

  /** Get the current active session */
  async getSession() {
    return supabase.auth.getSession();
  },

  /**
   * Returns true only if the authenticated userId exists in admin_users.
   * Never returns true for anonymous / unauthenticated users.
   */
  async checkIsAdmin(userId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .single();
    return !error && data !== null;
  },
};
