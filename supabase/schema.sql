-- ==============================================================================
-- KRCE GREEN CAMPUS - SUPABASE DATABASE SCHEMA
-- Table: volunteer_submissions
-- Security: Row Level Security (RLS) enabled
-- ==============================================================================

-- 1. Create table
create table if not exists public.volunteer_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  department text not null,
  year text not null,
  activity text not null,
  message text default '',
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Rejected'))
);

-- 2. Indexes for faster search and filtering in Admin Dashboard
create index if not exists idx_volunteer_status on public.volunteer_submissions(status);
create index if not exists idx_volunteer_created_at on public.volunteer_submissions(created_at desc);
create index if not exists idx_volunteer_department on public.volunteer_submissions(department);

-- 3. Enable Row Level Security (RLS)
alter table public.volunteer_submissions enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow public insert to volunteer_submissions" on public.volunteer_submissions;
drop policy if exists "Allow authenticated select on volunteer_submissions" on public.volunteer_submissions;
drop policy if exists "Allow authenticated update on volunteer_submissions" on public.volunteer_submissions;
drop policy if exists "Allow authenticated delete on volunteer_submissions" on public.volunteer_submissions;

-- 4. Policy: Public (anon or authenticated) can INSERT volunteer submissions
create policy "Allow public insert to volunteer_submissions"
  on public.volunteer_submissions
  for insert
  to anon, authenticated
  with check (true);

-- 5. Policy: Only authenticated users (Admins) can SELECT volunteer submissions
create policy "Allow authenticated select on volunteer_submissions"
  on public.volunteer_submissions
  for select
  to authenticated
  using (true);

-- 6. Policy: Only authenticated users (Admins) can UPDATE submissions (e.g., status changes)
create policy "Allow authenticated update on volunteer_submissions"
  on public.volunteer_submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- 7. Policy: Only authenticated users (Admins) can DELETE submissions
create policy "Allow authenticated delete on volunteer_submissions"
  on public.volunteer_submissions
  for delete
  to authenticated
  using (true);

-- ==============================================================================
-- ADMIN USER CREATION INSTRUCTIONS:
-- In Supabase Dashboard -> Authentication -> Users -> Add User -> Create user:
--   Email: admin@krce.ac.in (or your preferred admin email)
--   Password: your-secure-password
--   Auto Confirm: Enabled
-- ==============================================================================
