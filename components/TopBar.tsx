
import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { User } from '../types';
import Logo from './Logo';

interface TopBarProps {
  user: User;
  toggleMobileMenu: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ user, toggleMobileMenu }) => {
  return (
    <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 md:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
           <Logo className="w-6 h-6 text-energy-400" />
           <span className="font-bold text-lg text-white">HeliosHash</span>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-energy-500 focus:ring-1 focus:ring-energy-500 sm:text-sm transition-colors"
          placeholder="Search projects, people, or proposals..."
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Wallet Badge */}
        <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-tech-950/50 border border-tech-800">
          <div className="w-2 h-2 rounded-full bg-eco-400 mr-2 animate-pulse"></div>
          <span className="text-xs text-tech-400 font-mono">ICP Connected</span>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-energy-500 ring-2 ring-gray-900"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-energy-400">{user.role}</p>
          </div>
          <img
            className="h-10 w-10 rounded-full border-2 border-gray-700 hover:border-energy-500 transition-colors cursor-pointer object-cover"
            src={user.avatar}
            alt={user.name}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
