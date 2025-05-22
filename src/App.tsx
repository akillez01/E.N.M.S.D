import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'sonner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AccessibilityBar from './components/layout/AccessibilityBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import AccessibilityPage from './pages/AccessibilityPage';
import ContactPage from './pages/ContactPage';
import CollaboratePage from './pages/CollaboratePage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import RegisterPage from './pages/admin/RegisterPage';
import AdminVideosPage from './pages/admin/VideosPage';
import AdminEventsPage from './pages/admin/EventsPage';
import AdminBlogPage from './pages/admin/BlogPage';
import AdminSettingsPage from './pages/admin/SettingsPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-cream dark:bg-dark-green">
          <AccessibilityBar />
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/collaborate" element={<CollaboratePage />} />
              
              {/* Auth Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin/register" element={<RegisterPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="videos" element={<AdminVideosPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="blog" element={<AdminBlogPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;