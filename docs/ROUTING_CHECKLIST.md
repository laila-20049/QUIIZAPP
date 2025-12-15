# Routing Checklist (Manual Test Plan)

Use this checklist to verify all routes after deployment. Mark each item as ✅ PASS / ❌ FAIL.

## Public Routes
- `/` (home)
- `/quizzes`
- `/leaderboard` and `/classement`
- `/universities` / `/university/:id`
- `/matieres`, `/niveaux`, `/faculties`, `/modules`
- `/forum`, `/forum/ask`, `/forum/question/:id`, `/faq`
- `/help` and `/aide`
- `/terms`, `/privacy`

## Auth Routes
- `/login`, `/register`, `/forgot-password`, `/reset-password`

## Protected User Routes
- `/dashboard`
- `/mes-quiz`
- `/quiz/:id/play`
- `/result/:attemptId?`, `/results`, `/resultats`
- `/saved`, `/achievements`
- `/profile`, `/profile/purchases`
- `/settings`, `/parametres`
- `/subscription`, `/abonnement`
- `/payment`, `/premium`

## Admin Routes (require admin)
- `/admin`
- `/admin/quizzes`, `/admin/quiz/create`, `/admin/quiz/:id/edit`, `/admin/quiz/:id/attempts`
- `/admin/users`, `/admin/users/:id`
- `/admin/help`, `/admin/docs`, `/admin/support`

## Error Handling
- Unknown routes redirect to `/`
- Unauthorized admin access redirects home

## Navigation Components
- Sidebar links work (including French aliases)
- Navbar links and dropdowns work
- Buttons navigate without console errors

## Performance
- Lazy-loaded pages render
- No infinite re-renders or memory leaks
