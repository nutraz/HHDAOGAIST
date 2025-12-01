
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Map,
  Plus,
  Gift
} from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Projects & Map', path: '/projects' },
    { icon: Gift, label: 'Rewards', path: '/rewards' },
    { icon: Users, label: 'Social Hub', path: '/social' },
    { icon: Plus, label: 'Create Project', path: '/create-project' },
    { icon: Settings, label: 'Settings & Identity', path: '/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 h-screen fixed left-0 top-0 z-50">
      {/* Logo Area */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
        <div className="relative text-energy-400">
          <div className="absolute inset-0 bg-energy-500 blur-lg opacity-40 animate-pulse"></div>
          <Logo className="relative w-10 h-10" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-energy-400 via-white to-eco-400 bg-clip-text text-transparent">
            HeliosHash
          </h1>
          <span className="text-xs text-gray-500 tracking-wider">DAO SYSTEM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-gradient-to-r from-energy-600/20 to-transparent text-white border-l-4 border-energy-500' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-energy-400' : 'group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-energy-400 shadow-[0_0_8px_#FB923C]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
