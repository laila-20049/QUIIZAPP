/**
 * QUIIZAPP - Routing Architecture Documentation
 * Last Updated: December 14, 2024
 * 
 * This document outlines all available routes in the application.
 * Every button, link, and navigation must use one of these routes.
 */

// ============================================================
// PUBLIC ROUTES (No authentication required)
// ============================================================

// Homepage & Main Pages
GET /                               → Home page (dashboard for authenticated users)
GET /quizzes                        → Quiz list page
GET /quiz/:id                       → Quiz detail page
GET /leaderboard or /classement     → Leaderboard page
GET /universities                   → Universities list
GET /university/:id                 → University detail page
GET /matieres                       → Subjects page
GET /niveaux                        → Levels/Grades page
GET /faculties                      → Faculties page
GET /modules                        → Modules page

// Forum
GET /forum                          → Forum home page
GET /forum/question/:id             → Question detail with answers
GET /forum/ask                      → Create new question
GET /faq                            → FAQ page

// Information Pages
GET /terms                          → Terms of service
GET /privacy                        → Privacy policy
GET /help or /aide                  → Help center

// ============================================================
// AUTHENTICATION ROUTES (Public only, redirects if logged in)
// ============================================================

GET /login                          → Login page
GET /register                       → Registration page
GET /forgot-password                → Password recovery

// ============================================================
// PROTECTED ROUTES (Authentication required)
// ============================================================

// User Dashboard
GET /dashboard                      → User dashboard

// User Quiz Management
GET /mes-quiz                       → My quizzes page
GET /quiz/:id/play                  → Play/Take quiz (protected)
GET /result/:attemptId?             → Quiz result page
GET /results or /resultats          → Results history
GET /saved                          → Saved quizzes
GET /achievements                   → Achievements/Badges

// User Profile
GET /profile                        → User profile page
GET /settings or /parametres        → Settings page
GET /subscription or /abonnement    → Subscription page
GET /payment                        → Payment page
GET /premium                        → Premium features page

// ============================================================
// ADMIN ROUTES (Admin role required)
// ============================================================

GET /admin                          → Admin dashboard
GET /admin/quiz/create              → Create new quiz
GET /admin/quizzes                  → Manage all quizzes
GET /admin/quiz/:id/edit            → Edit quiz
GET /admin/quiz/:id/attempts        → View quiz attempts
GET /admin/users                    → Manage users
GET /admin/users/:id                → View user details
GET /admin/help                     → Admin help documentation
GET /admin/docs                     → API documentation
GET /admin/support                  → Support tickets

// ============================================================
// ERROR HANDLING
// ============================================================

GET /*                              → Auto-redirect to "/" (NO 404 page shown)

// ============================================================
// ROUTE ALIASES (Alternative paths that redirect)
// ============================================================

/classement         → /leaderboard       (French alias)
/resultats          → /results           (French alias)
/aide               → /help              (French alias)
/parametres         → /settings          (French alias)
/abonnement         → /subscription      (French alias)
/forum/faq          → /faq               (Updated)

// ============================================================
// IMPORTANT RULES
// ============================================================

1. EVERY BUTTON/LINK must use one of the routes above
2. NO ROUTE should ever result in a 404 page
3. Unknown routes automatically redirect to "/"
4. Protected routes check authentication and role
5. All routes are lazy-loaded for performance
6. Sidebar, Navbar, Layout all use these routes

// ============================================================
// UPDATED ROUTES vs OLD ROUTES
// ============================================================

OLD ROUTES (BROKEN - DO NOT USE):
  /parametres         → USE /settings instead
  /aide               → USE /help instead
  /resultats          → USE /results instead
  /quizzes/create     → USE /admin/quiz/create instead
  /profile/purchases  → USE /profile instead
  /admin/quiz/edit/:id → USE /admin/quiz/:id/edit instead

// ============================================================
// NAVIGATION BEST PRACTICES
// ============================================================

✓ Use <Link to="/route" /> from react-router-dom
✓ Use navigate("/route") from useNavigate()
✓ Always validate routes against this document
✓ Test all button clicks to ensure they work
✓ Check sidebar and navbar for correct paths
✓ Ensure admin pages are protected with roles
✓ Keep this document updated when adding new routes

// ============================================================
// ROUTE VALIDATION CHECKLIST
// ============================================================

[] All buttons in Home.jsx use valid routes
[] All buttons in UserDashboard.jsx use valid routes
[] All buttons in AdminDashboard.jsx use valid routes
[] All Sidebar links use valid routes
[] All Navbar links use valid routes
[] All Links in pages use valid routes
[] All navigate() calls use valid routes
[] No /terms or /privacy links are broken
[] All forum routes work correctly
[] Admin routes require role check
[] Protected routes require authentication
[] Unknown routes redirect to home

// ============================================================
// CREATED ON: December 14, 2024
// ============================================================
