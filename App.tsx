
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import SocialFeed from './views/SocialFeed';
import Governance from './views/Governance';
import Projects from './views/Projects';
import Rewards from './views/Rewards';
import CreateProject from './views/CreateProject';
import Identity from './views/Identity';
import Settings from './views/Settings';
import { currentUser } from './services/mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100 font-sans selection:bg-energy-500 selection:text-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar onLogout={handleLogout} />
        
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
             <div className="w-64 h-full bg-gray-900 border-r border-gray-800" onClick={e => e.stopPropagation()}>
                <Sidebar onLogout={handleLogout} />
             </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative h-screen">
          <TopBar 
            user={currentUser} 
            toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
          
          <main className="flex-1 p-6 md:p-8 overflow-y-auto z-10 scroll-smooth">
            <div className="max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard user={currentUser} />} />
                <Route path="/social" element={<SocialFeed />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/identity" element={<Identity />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/marketplace" element={<Navigate to="/rewards" replace />} />
                <Route path="/messages" element={<div className="text-center p-20 text-gray-500">Messaging Center Coming Soon</div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
