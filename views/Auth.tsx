
import React, { useState } from 'react';
import { Wallet, Shield, User as UserIcon, Loader } from 'lucide-react';
import Logo from '../components/Logo';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const authProviders = [
    { id: 'internet-identity', name: 'Internet Identity', icon: Shield, color: 'text-white' },
    { id: 'plug-wallet', name: 'Plug Wallet', icon: Wallet, color: 'text-energy-400' },
    { id: 'stoic-wallet', name: 'Stoic Wallet', icon: UserIcon, color: 'text-eco-400' },
  ];

  const handleAuth = async (provider: string) => {
    setLoading(provider);
    // Simulate auth delay
    setTimeout(() => {
      setLoading(null);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-energy-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-eco-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 backdrop-blur-xl bg-gray-900/40 p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="text-center space-y-4">
          <div className="relative inline-block text-energy-400">
            <div className="absolute inset-0 bg-energy-500 blur-xl opacity-50 animate-pulse"></div>
            <Logo className="relative w-20 h-20 mx-auto drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-energy-400 via-white to-eco-400 bg-clip-text text-transparent">
              HeliosHash DAO
            </h1>
            <p className="text-gray-400 mt-2">Connect to the Renewable Future</p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          {authProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleAuth(provider.id)}
              disabled={!!loading}
              className={`
                group w-full relative overflow-hidden bg-gray-800/80 hover:bg-gray-800 border border-gray-700 hover:border-energy-500/50 
                text-white p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]
                ${loading && loading !== provider.id ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-energy-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className={`p-2 rounded-lg bg-gray-900 ${provider.color}`}>
                  <provider.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-lg">{provider.name}</span>
              </div>
              
              <div className="relative z-10">
                {loading === provider.id ? (
                  <Loader className="animate-spin w-5 h-5 text-energy-400" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-energy-400 transition-colors"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By connecting, you agree to the DAO Governance Protocol v1.2
        </p>
      </div>
    </div>
  );
};

export default Auth;
