import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Lazy loading des pages pour améliorer les performances
const Home = lazy(() => import('../pages/Home'));
const QuizList = lazy(() => import('../pages/QuizList'));
const QuizDetail = lazy(() => import('../pages/QuizDetail'));
const QuizPlay = lazy(() => import('../pages/QuizPlay'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));
const Leaderboard = lazy(() => import('../pages/Leaderboard'));
const Result = lazy(() => import('../pages/Result'));
const ResultsHistory = lazy(() => import('../pages/ResultsHistory'));
const Payment = lazy(() => import('../pages/Payment'));
const Premium = lazy(() => import('../pages/Premium'));
const Universities = lazy(() => import('../pages/Universities'));
const UniversityDetail = lazy(() => import('../pages/UniversityDetail'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const QuizCreate = lazy(() => import('../pages/admin/QuizCreate'));
const QuizEdit = lazy(() => import('../pages/admin/QuizEdit'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Forum pages
const ForumHome = lazy(() => import('../pages/ForumHome'));
const QuestionDetails = lazy(() => import('../pages/QuestionDetails'));
const AskQuestion = lazy(() => import('../pages/AskQuestion'));
const FAQ = lazy(() => import('../pages/FAQ'));

// Additional pages - lazy loaded or placeholder
const Subjects = lazy(() => import('../pages/Subjects').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Matières</h1></div> })));
const Levels = lazy(() => import('../pages/Levels').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Niveaux</h1></div> })));
const MyQuizzes = lazy(() => import('../pages/MyQuizzes').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Mes Quiz</h1></div> })));
const Achievements = lazy(() => import('../pages/Achievements').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Réalisations</h1></div> })));
const Saved = lazy(() => import('../pages/Saved').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Sauvegardés</h1></div> })));
const Settings = lazy(() => import('../pages/Settings').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Paramètres</h1></div> })));
const Help = lazy(() => import('../pages/Help').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Aide</h1></div> })));
const Terms = lazy(() => import('../pages/Terms').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Conditions d'utilisation</h1></div> })));
const Privacy = lazy(() => import('../pages/Privacy').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Politique de confidentialité</h1></div> })));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const AdminQuizzes = lazy(() => import('../pages/admin/AdminQuizzes').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Gestion des Quiz</h1></div> })));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1></div> })));
const AdminUserDetail = lazy(() => import('../pages/admin/AdminUserDetail').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Détail Utilisateur</h1></div> })));
const AdminHelp = lazy(() => import('../pages/admin/AdminHelp').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Aide Admin</h1></div> })));
const AdminDocs = lazy(() => import('../pages/admin/AdminDocs').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Documentation</h1></div> })));
const AdminSupport = lazy(() => import('../pages/admin/AdminSupport').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Support</h1></div> })));
const QuizAttempts = lazy(() => import('../pages/admin/QuizAttempts').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Tentatives Quiz</h1></div> })));
const Subscription = lazy(() => import('../pages/Subscription').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Abonnement</h1></div> })));
const Modules = lazy(() => import('../pages/Modules').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Modules</h1></div> })));
const Faculties = lazy(() => import('../pages/Faculties').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Facultés</h1></div> })));
const Purchases = lazy(() => import('../pages/Purchases').catch(() => ({ default: () => <div className="p-8"><h1 className="text-3xl font-bold">Achats</h1></div> })));

// Composant pour les routes protégées
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }
  
  // Vérification des rôles si spécifiés
  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Composant pour les routes publiques uniquement (redirige si déjà connecté)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Layouts différents pour différentes parties de l'application
const MainLayout = ({ children }) => (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </Layout>
);

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </div>
);

const AdminLayout = ({ children }) => (
  <Layout showAdminSidebar={true}>
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </Layout>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        {/* Home & Main Pages */}
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        
        {/* Quiz Routes */}
        <Route path="/quizzes" element={
          <MainLayout>
            <QuizList />
          </MainLayout>
        } />
        
        <Route path="/quiz/:id" element={
          <MainLayout>
            <QuizDetail />
          </MainLayout>
        } />
        
        {/* Subjects & Levels */}
        <Route path="/matieres" element={
          <MainLayout>
            <Subjects />
          </MainLayout>
        } />

        <Route path="/niveaux" element={
          <MainLayout>
            <Levels />
          </MainLayout>
        } />

        <Route path="/faculties" element={
          <MainLayout>
            <Faculties />
          </MainLayout>
        } />

        <Route path="/modules" element={
          <MainLayout>
            <Modules />
          </MainLayout>
        } />
        
        {/* Leaderboard */}
        <Route path="/leaderboard" element={
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        } />

        <Route path="/classement" element={
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        } />

        {/* Universities */}
        <Route path="/universities" element={
          <MainLayout>
            <Universities />
          </MainLayout>
        } />

        <Route path="/university/:id" element={
          <MainLayout>
            <UniversityDetail />
          </MainLayout>
        } />

        {/* Forum routes */}
        <Route path="/forum" element={
          <MainLayout>
            <ForumHome />
          </MainLayout>
        } />

        <Route path="/forum/question/:id" element={
          <MainLayout>
            <QuestionDetails />
          </MainLayout>
        } />

        <Route path="/forum/ask" element={
          <MainLayout>
            <AskQuestion />
          </MainLayout>
        } />

        <Route path="/faq" element={
          <MainLayout>
            <FAQ />
          </MainLayout>
        } />

        {/* Information Pages */}
        <Route path="/terms" element={
          <MainLayout>
            <Terms />
          </MainLayout>
        } />

        <Route path="/privacy" element={
          <MainLayout>
            <Privacy />
          </MainLayout>
        } />

        <Route path="/help" element={
          <MainLayout>
            <Help />
          </MainLayout>
        } />

        <Route path="/aide" element={
          <MainLayout>
            <Help />
          </MainLayout>
        } />

        {/* ===== AUTHENTICATION ROUTES ===== */}
        <Route path="/login" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicOnlyRoute>
        } />
        
        <Route path="/register" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicOnlyRoute>
        } />

        <Route path="/forgot-password" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </PublicOnlyRoute>
        } />

        <Route path="/reset-password" element={
          <PublicOnlyRoute>
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          </PublicOnlyRoute>
        } />
        
        {/* ===== PROTECTED USER ROUTES ===== */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <UserDashboard />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/mes-quiz" element={
          <ProtectedRoute>
            <MainLayout>
              <MyQuizzes />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/quiz/:id/play" element={
          <ProtectedRoute>
            <MainLayout>
              <QuizPlay />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/result/:attemptId?" element={
          <ProtectedRoute>
            <MainLayout>
              <Result />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/results" element={
          <ProtectedRoute>
            <MainLayout>
              <ResultsHistory />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/resultats" element={
          <ProtectedRoute>
            <MainLayout>
              <ResultsHistory />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/saved" element={
          <ProtectedRoute>
            <MainLayout>
              <Saved />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/achievements" element={
          <ProtectedRoute>
            <MainLayout>
              <Achievements />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/profile/purchases" element={
          <ProtectedRoute>
            <MainLayout>
              <Purchases />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/parametres" element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/subscription" element={
          <ProtectedRoute>
            <MainLayout>
              <Subscription />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/abonnement" element={
          <ProtectedRoute>
            <MainLayout>
              <Subscription />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/payment" element={
          <ProtectedRoute>
            <AuthLayout>
              <Payment />
            </AuthLayout>
          </ProtectedRoute>
        } />

        <Route path="/premium" element={
          <ProtectedRoute>
            <AuthLayout>
              <Premium />
            </AuthLayout>
          </ProtectedRoute>
        } />
        
        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/quiz/create" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <QuizCreate />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/quizzes" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminQuizzes />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/quiz/:id/edit" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <QuizEdit />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/quiz/:id/attempts" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <QuizAttempts />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/users/:id" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminUserDetail />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/help" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminHelp />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/docs" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminDocs />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/support" element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout>
              <AdminSupport />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* ===== 404 HANDLING ===== */}
        {/* Catch-all route with auto-redirect to home */}
        <Route path="*" element={
          <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;