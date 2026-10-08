-- ==============================================================================
-- KRCE GREEN CAMPUS — ADMIN PORTAL SQL MIGRATION
-- Run EVERY statement below in: Supabase Dashboard → SQL Editor
-- Execute this AFTER schema.sql has already been applied.
-- ==============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- PART 1: Fix missing GRANTs on volunteer_submissions
--   (Tables created via SQL Editor do NOT get automatic Dashboard GRANTs)
-- ─────────────────────────────────────────────────────────────────────────────

-- Allow anonymous users to INSERT (public volunteer form)
grant insert on public.volunteer_submissions to anon;

-- Allow authenticated users (admins) full access (RLS will further restrict)
grant select, insert, update, delete on public.volunteer_submissions to authenticated;


-- ─────────────────────────────────────────────────────────────────────────────
-- PART 2: Replace the old blanket "authenticated" volunteer policies
--   with admin_users-scoped policies (so only registered admins can query)
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop original broad policies from schema.sql
drop policy if exists "Allow authenticated select on volunteer_submissions"
  on public.volunteer_submissions;
drop policy if exists "Allow authenticated update on volunteer_submissions"
  on public.volunteer_submissions;
drop policy if exists "Allow authenticated delete on volunteer_submissions"
  on public.volunteer_submissions;

-- Admin-only SELECT: user must be in admin_users
drop policy if exists "Allow admin select on volunteer_submissions"
  on public.volunteer_submissions;
create policy "Allow admin select on volunteer_submissions"
  on public.volunteer_submissions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

-- Admin-only UPDATE
drop policy if exists "Allow admin update on volunteer_submissions"
  on public.volunteer_submissions;
create policy "Allow admin update on volunteer_submissions"
  on public.volunteer_submissions
  for update
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );

-- Admin-only DELETE
drop policy if exists "Allow admin delete on volunteer_submissions"
  on public.volunteer_submissions;
create policy "Allow admin delete on volunteer_submissions"
  on public.volunteer_submissions
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.admin_users where id = auth.uid()
    )
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- PART 3: admin_users table
--   Links Supabase auth.users to the admin role for this application.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.admin_users (
  id         uuid        primary key references auth.users(id) on delete cascade,
  email      text        not null,
  created_at timestamptz not null default timezone('utc', now())
);

-- Enable RLS on admin_users
alter table public.admin_users enable row level security;

-- GRANT: authenticated users can read admin_users (required to verify their own admin status)
grant select on public.admin_users to authenticated;

-- RLS: authenticated users may only see their own row
drop policy if exists "Admin can read own record" on public.admin_users;
create policy "Admin can read own record"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = id);


-- ─────────────────────────────────────────────────────────────────────────────
-- PART 4: Register your first admin user
--
--   Step 1: Go to Supabase Dashboard → Authentication → Users → Add User
--           Enter the admin email + password, enable "Auto Confirm".
--
--   Step 2: Copy the UUID shown for that user in the Users list.
--
--   Step 3: Run the INSERT below, replacing the placeholder values:
-- ─────────────────────────────────────────────────────────────────────────────

-- insert into public.admin_users (id, email)
-- values (
--   'PASTE-THE-AUTH-USER-UUID-HERE',
--   'admin@krce.ac.in'
-- );

-- ==============================================================================
-- END OF MIGRATION
-- ==============================================================================
