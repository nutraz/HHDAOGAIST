
import React, { useState } from 'react';
import Identity from './Identity';
import { User, Bell, Lock, Shield, Globe, Camera, Save, Plus, Trash2, Check, Smartphone, Fingerprint } from 'lucide-react';
import { currentUser } from '../services/mockData';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile State
  const [profile, setProfile] = useState({
    name: currentUser.name,
    bio: "Renewable energy enthusiast & DAO contributor.",
    language: 'English',
    avatar: currentUser.avatar
  });
  const [isSaving, setIsSaving] = useState(false);

  // Security State
  const [confidants, setConfidants] = useState([
    { name: "Rahul's Brother", wallet: "0x71...9A2", active: true },
    { name: "Sarah Tech", wallet: "0x3B...1C4", active: true }
  ]);
  const [securitySettings, setSecuritySettings] = useState({
    biometric: true,
    twoFactor: false
  });

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zack',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
  ];

  // --- SUB-COMPONENTS ---

  const ProfileTab = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">Public Profile</h2>
        
        {/* Avatar Selection */}
        <div className="mb-8">
          <label className="block text-sm text-gray-400 mb-3">Profile Picture</label>
          <div className="flex items-center space-x-4">
             <div className="relative group">
                <img src={profile.avatar} alt="Current" className="w-24 h-24 rounded-full border-4 border-gray-800 group-hover:border-energy-500 transition-colors" />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <Camera className="text-white" />
                </div>
             </div>
             <div className="flex space-x-2">
                {avatars.map((url, idx) => (
                   <img 
                     key={idx} 
                     src={url} 
                     onClick={() => setProfile({...profile, avatar: url})}
                     className={`w-12 h-12 rounded-full cursor-pointer border-2 hover:scale-110 transition-transform ${profile.avatar === url ? 'border-energy-500' : 'border-transparent'}`}
                   />
                ))}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <div>
             <label className="block text-sm text-gray-400 mb-1">Display Name</label>
             <input 
               type="text" 
               value={profile.name}
               onChange={(e) => setProfile({...profile, name: e.target.value})}
               className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-energy-500 focus:outline-none"
             />
           </div>
           <div>
             <label className="block text-sm text-gray-400 mb-1">Language</label>
             <div className="relative">
                <Globe className="absolute left-3 top-3.5 text-gray-500" size={16} />
                <select 
                  value={profile.language}
                  onChange={(e) => setProfile({...profile, language: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 pl-10 text-white focus:border-energy-500 focus:outline-none appearance-none"
                >
                  <option>English</option>
                  <option>Hindi (हिंदी)</option>
                  <option>Spanish (Español)</option>
                  <option>French (Français)</option>
                  <option>German (Deutsch)</option>
                  <option>Japanese (日本語)</option>
                </select>
             </div>
           </div>
           <div className="md:col-span-2">
             <label className="block text-sm text-gray-400 mb-1">Bio</label>
             <textarea 
               value={profile.bio}
               onChange={(e) => setProfile({...profile, bio: e.target.value})}
               className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-energy-500 focus:outline-none h-24 resize-none"
             />
           </div>
        </div>

        <div className="flex justify-end">
           <button 
             onClick={handleSaveProfile}
             disabled={isSaving}
             className="bg-energy-600 hover:bg-energy-500 text-white px-6 py-2 rounded-lg font-bold flex items-center space-x-2 transition-all"
           >
             {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
             <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
           </button>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-8 animate-fade-in">
       {/* Social Recovery */}
       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h2 className="text-xl font-bold text-white flex items-center">
                   <Shield className="mr-2 text-green-400" /> Social Recovery
                </h2>
                <p className="text-gray-400 text-sm mt-1">Designate trusted contacts to help recover your account if you lose access.</p>
             </div>
             <button className="bg-gray-800 hover:bg-gray-700 text-energy-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center">
                <Plus size={16} className="mr-2" /> Add Contact
             </button>
          </div>

          <div className="space-y-3">
             {confidants.map((confidant, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                         <User size={20} />
                      </div>
                      <div>
                         <p className="text-white font-medium">{confidant.name}</p>
                         <p className="text-xs text-gray-500 font-mono">{confidant.wallet}</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-4">
                      <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Active</span>
                      <button className="text-gray-500 hover:text-red-400 transition-colors">
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* 2FA & Biometrics */}
       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
             <Lock className="mr-2 text-blue-400" /> Login Security
          </h2>
          
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                   <Fingerprint className="text-gray-400 mt-1" />
                   <div>
                      <p className="text-white font-medium">Biometric Authentication</p>
                      <p className="text-sm text-gray-500">Use FaceID or Fingerprint to sign transactions.</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSecuritySettings({...securitySettings, biometric: !securitySettings.biometric})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${securitySettings.biometric ? 'bg-energy-500' : 'bg-gray-700'}`}
                >
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securitySettings.biometric ? 'translate-x-6' : ''}`}></div>
                </button>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                   <Smartphone className="text-gray-400 mt-1" />
                   <div>
                      <p className="text-white font-medium">Two-Factor Authentication (2FA)</p>
                      <p className="text-sm text-gray-500">Require an authenticator code for new device logins.</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSecuritySettings({...securitySettings, twoFactor: !securitySettings.twoFactor})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${securitySettings.twoFactor ? 'bg-energy-500' : 'bg-gray-700'}`}
                >
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securitySettings.twoFactor ? 'translate-x-6' : ''}`}></div>
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-2 lg:sticky lg:top-24 h-fit">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${activeTab === 'profile' ? 'bg-energy-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('identity')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${activeTab === 'identity' ? 'bg-energy-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Shield size={20} />
            <span>Identity Center</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${activeTab === 'security' ? 'bg-energy-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Lock size={20} />
            <span>Security</span>
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${activeTab === 'notifications' ? 'bg-energy-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'identity' && <Identity />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && (
             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <Bell size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Notifications</h3>
              <p className="text-gray-400">Preferences for email and push notifications coming in v1.3.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
