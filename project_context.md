# KRCE Green Campus — Project Development Context

## 1. Project Identity

Project Name:
KRCE Green Campus — Environmental Protection Initiatives

Institution:
K. Ramakrishnan College of Engineering (KRCE), Trichy, Tamil Nadu

Subject:
Environmental Studies (EVS)

Academic Project Theme:
Green Campus Initiatives for Environmental Protection

Project Type:
Academic EVS web application / presentation platform

---

## 2. IMPORTANT PROJECT PURPOSE

This is an academic EVS project that presents a proposed vision for a greener,
more sustainable engineering campus.

The website must NOT claim that KRCE has officially implemented any
environmental initiative unless verified from an official source.

All numerical values such as water savings, energy generation, trees,
recycling quantities, etc. must remain clearly labelled as:

- Proposed Target
- Project Goal
- Illustrative Data
- Sample Impact
- Vision Target

Do NOT present proposed values as actual KRCE achievements.

---

## 3. CURRENT WEBSITE STATUS

The website is already built and working successfully.

The current design is considered APPROVED.

DO NOT rebuild the website from scratch.

DO NOT replace the current visual design.

DO NOT remove existing sections.

DO NOT unnecessarily change the color palette, typography,
animations, layouts, or interactions.

Any future changes must preserve the existing premium design.

The website currently runs locally using:

    npm run dev

Local URL:

    http://localhost:5173/

---

## 4. CURRENT TECHNOLOGY STACK

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS

Animation:
- Framer Motion

3D / Interactive Visuals:
- Three.js
- React Three Fiber where applicable

Icons:
- Lucide React

Other:
- Canvas Confetti

The project is component-based and should remain maintainable.

---

## 5. CURRENT DESIGN DIRECTION

The approved visual style is:

- Premium
- Futuristic
- Environmental / sustainability focused
- Modern
- Elegant
- Professional
- Technology + nature combination

Main visual direction:

- Dark forest green
- Emerald
- Lime accents
- Off-white
- Charcoal
- Glassmorphism
- Cinematic imagery
- Subtle shadows
- Smooth animations
- Premium typography

The website should feel like a professional sustainability-tech platform,
NOT like a basic college template.

Avoid:
- childish UI
- excessive bright colors
- clutter
- unnecessary redesigns
- generic templates
- excessive animations that hurt performance

---

## 6. COMPLETED WEBSITE SECTIONS

The following sections already exist:

1. Cinematic Hero
   - "GREEN CAMPUS"
   - "Designing a Greener Future for KRCE"

2. Vision Section
   - "A Campus That Gives Back to Nature"
   - Interactive environmental / Earth visual

3. Green Campus Action Pillars
   - Waste Management
   - Water Conservation
   - Clean Energy
   - Biodiversity
   - Green Mobility
   - Green Infrastructure

4. Environmental Journey
   - Understand
   - Reduce
   - Reuse
   - Restore
   - Measure
   - Inspire

5. Impact Dashboard
   - Proposed tree plantation target
   - Proposed water saving target
   - Proposed waste recycling target
   - Proposed clean energy target
   - Proposed green commute target

6. Interactive Green Campus Score
   - Interactive parameters
   - Dynamic score
   - Green campus classification
   - Confetti interaction

7. Water Conservation Section
   - Rain
   - Collect
   - Filter
   - Store
   - Reuse
   - Greywater concepts
   - Leak detection concept

8. Clean Energy Section
   - Solar energy
   - Micro-grid concept
   - IoT monitoring concept

9. Biodiversity Section
   - Indigenous / suitable plant concepts
   - Neem
   - Pongamia
   - Tulsi
   - Peepal
   - Butterfly / pollinator zones

10. Student Movement / Volunteer Section
    - Student activity cards
    - Volunteer registration modal
    - Department/year selections
    - Registration interaction
    - Confetti / success interaction

11. Gallery
    - Category filters
    - Campus
    - Nature
    - Students
    - Energy
    - Waste
    - Water
    - Cinematic lightbox

12. KRCE Institutional Spotlight
    - KRCE-focused section
    - Trichy / Tamil Nadu context
    - Student leadership
    - Green campus vision

13. KR Group Section
    The website also contains a section showing:
    - K. Ramakrishnan College of Engineering (KRCE)
    - K. Ramakrishnan College of Technology (KRCT)
    - M. Kumarasamy College of Engineering (MKCE)

    This section was added without redesigning the existing website.

14. Future Vision
    - Smart ultrasonic waste-bin sensors
    - Solar-powered / net-zero laboratory concepts
    - Student green mobility / micro-fleet concepts
    - Future eco-technology

15. Final CTA
    - "One Campus. One Community. One Planet."

16. Footer

---

## 7. IMPORTANT DESIGN DECISION

The current website already looks premium and polished.

The existing design should be treated as the baseline.

Before making any change:

1. Inspect the existing implementation.
2. Understand the current component structure.
3. Preserve the existing design.
4. Make only the requested changes.
5. Do not rebuild working sections unnecessarily.

If a requested change can be implemented with a small modification,
prefer the small modification.

---

## 8. SUPABASE BACKEND STATUS

A Supabase project has already been created.

Supabase project name:

KRCE GREEN CAMPUS

Region:

South Asia (Mumbai)

Project URL is stored in `.env.local`.

The project uses a Vite environment variable structure.

The frontend environment variables are:

    VITE_SUPABASE_URL=...
    VITE_SUPABASE_PUBLISHABLE_KEY=...

IMPORTANT:

Do NOT hardcode the Supabase key into React/TypeScript source files.

Do NOT expose any Supabase secret/service-role key in frontend code.

`.env.local` must remain local and must not be committed to GitHub.

---

## 9. SUPABASE VOLUNTEER BACKEND — CURRENT STATE

The goal is to make the existing Volunteer Registration form actually
store submissions in Supabase.

Desired database table:

    volunteer_submissions

Suggested fields:

- id
- created_at
- name
- email
- department
- year
- activity
- message
- status

The default status should be:

    Pending

Required behavior:

When a student submits the existing Volunteer form:

1. Validate the form.
2. Insert the submission into Supabase.
3. Show a success message if insertion succeeds.
4. Show an error message if insertion fails.
5. Preserve the existing UI and animations.

Security requirement:

Public users should be allowed to INSERT volunteer submissions.

Public users must NOT be allowed to:
- SELECT submissions
- UPDATE submissions
- DELETE submissions

Admin functionality should later be protected separately.

---

## 10. IMPORTANT: PREVIOUS SUPABASE ATTEMPT WAS INTERRUPTED

An earlier Antigravity agent was instructed to connect the Volunteer form
to Supabase.

The agent started inspecting the existing files and then the account
hit its Individual/Model quota limit.

Antigravity reported that 3 files had changed:

    3 files changed
    +36
    -6

Therefore:

DO NOT assume that the Supabase integration is complete.

DO NOT blindly rewrite the integration.

FIRST inspect the current project files and Git diff / changed files.

Determine exactly what was already modified.

Then continue only from the current state.

---

## 11. NEXT DEVELOPMENT TASK

The immediate next task is:

### Verify and complete the Volunteer → Supabase integration.

Steps:

1. Inspect the current project.
2. Inspect the existing Volunteer form/component.
3. Inspect any Supabase-related files already created.
4. Inspect the current Git diff.
5. Check `.env.local` usage.
6. Determine whether the Supabase client is already implemented.
7. Determine whether the Volunteer form already performs an INSERT.
8. Do not duplicate existing code.
9. Complete only missing pieces.
10. Verify the application builds successfully.

If the database table does not yet exist, provide/create the required
SQL schema for:

    volunteer_submissions

with appropriate Row Level Security.

---

## 12. AFTER VOLUNTEER BACKEND

Once Volunteer → Supabase is working:

### Admin Dashboard

Create a secure admin dashboard.

The desired admin features are:

- Admin login
- View volunteer submissions
- Search submissions
- Filter submissions
- View submission details
- Change status
- Delete submission if appropriate

Possible statuses:

- Pending
- Approved
- Rejected
- Completed

IMPORTANT:

Do NOT create a hardcoded frontend password.

Use Supabase authentication for admin access.

Public users must not be able to access admin data.

Use Row Level Security properly.

---

## 13. DEPLOYMENT PLAN

After the website and backend are working correctly:

Frontend deployment:

    Vercel

Backend:

    Supabase

Optional source control:

    GitHub

Expected architecture:

    User
      ↓
    Vercel-hosted React website
      ↓
    Supabase
      ↓
    Volunteer submissions database

The website should have:

Public:
    /

Protected:
    /admin

Do not deploy until the local project is tested successfully.

---

## 14. AUTHENTICITY / CONTENT RULES

This is an academic EVS project.

Do not invent:
- KRCE environmental statistics
- official carbon reduction values
- official renewable-energy generation
- official water savings
- official waste recycling statistics
- official green audit certifications
- official sustainability achievements

If a number is required for the design, label it clearly as a
Proposed Target / Project Goal / Illustrative Data.

Use official KRCE information only when verified.

---

## 15. IMAGE RULES

The website may use appropriate campus/environmental imagery.

Prefer:
- official KRCE assets
- user-provided assets
- properly licensed assets

Do not scrape or use copyrighted images irresponsibly.

If replacing images, preserve the existing image dimensions,
layout, and visual quality.

---

## 16. RESPONSIVE DESIGN

The existing website is already responsive.

Do not redesign mobile unnecessarily.

Before changing responsive behavior:

- inspect existing breakpoints
- preserve desktop design
- preserve tablet design
- preserve mobile design

Only fix genuine responsive bugs.

---

## 17. PERFORMANCE

Preserve performance.

Avoid:
- unnecessarily huge images
- unnecessary dependencies
- duplicate libraries
- excessive animations
- expensive continuous rendering

The 3D environmental visual should have a graceful fallback if necessary.

---

## 18. ACCESSIBILITY

Maintain:

- semantic HTML
- readable contrast
- keyboard-friendly controls
- accessible form labels
- sensible focus states
- responsive text
- usable interactive elements

---

## 19. DEVELOPMENT RULE

Before making changes, ALWAYS inspect the existing code.

Do not assume the project is empty.

Do not create duplicate components.

Do not overwrite working functionality.

Do not redesign the site unless explicitly requested.

Prefer targeted changes.

After changes:

    npm run build

must succeed.

For local development:

    npm run dev

---

## 20. CURRENT PROJECT PRIORITY

Priority order:

1. Preserve existing website.
2. Verify current state.
3. Complete Volunteer → Supabase.
4. Test database insertion.
5. Implement secure Admin Dashboard.
6. Test authentication and RLS.
7. Final UI polish only if required.
8. Production build.
9. Deploy to Vercel.
10. Connect production frontend to Supabase.

---

## 21. HANDOVER INSTRUCTION FOR ANY NEW AI AGENT

IMPORTANT:

You are continuing an existing project.

Do NOT start from scratch.

Read:

    README.md

and this file:

    PROJECT_CONTEXT.md

before making changes.

Then inspect the actual source files.

The current website is already considered visually successful.

Preserve the current design and functionality.

Do not ask the developer to provide code that already exists in the
project. Inspect the files yourself.

When a task is completed, explain briefly:
- what was changed
- which files were changed
- whether the build passed
- whether anything remains incomplete

Do not make unrelated changes.

---

## 22. CURRENT STOPPING POINT

The website is currently running successfully locally.

The development server can be started with:

    npm run dev

If PowerShell blocks `npm.ps1`, use:

    npm.cmd run dev

The project itself is safe and located at:

    E:\KRCE-Green-Campus

The next major task is to inspect and continue the interrupted
Supabase Volunteer Registration integration.

Do not rebuild the website.