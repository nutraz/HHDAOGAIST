
import React, { useState } from 'react';
import { Shield, Fingerprint, Eye, Smartphone, CheckCircle, Lock, Loader, AlertCircle } from 'lucide-react';
import { currentUser } from '../services/mockData';
import * as Backend from '../services/backend';

const Identity: React.FC = () => {
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{success: boolean, message: string} | null>(null);

  const handleManualVerification = async () => {
    setVerifying(true);
    setVerificationResult(null);
    try {
      // Simulate verifying a test Aadhaar number
      const result = await Backend.verifyAadhaar("123456789012");
      setVerificationResult(result);
    } catch (e) {
      setVerificationResult({ success: false, message: "Verification failed due to network error" });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-white">Identity Center</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Secure your participation in the DAO with multi-layer verification. 
          Your data is encrypted and stored locally.
        </p>
      </div>

      {/* Main Status Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-energy-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center relative">
               <img src={currentUser.avatar} alt="Profile" className="w-full h-full rounded-full opacity-50" />
               <Shield className="absolute text-green-500 w-10 h-10 drop-shadow-lg" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white mb-1">Identity Verified</h2>
               <p className="text-green-400 flex items-center gap-2">
                 <CheckCircle size={16} /> Level 3 Clearance
               </p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-right">
             <p className="text-gray-400 text-sm mb-1">Unique Identity Hash</p>
             <p className="text-white font-mono bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
               {currentUser.identity?.retinaHash}
             </p>
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-2xl relative group">
           <div className="absolute top-4 right-4 text-green-500">
             <CheckCircle size={24} />
           </div>
           <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-blue-400">
             <Fingerprint size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">Gov ID Linked</h3>
           <p className="text-sm text-gray-400">Aadhaar & PAN verification complete via UIDAI Backend.</p>
        </div>

        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-2xl relative group">
           <div className="absolute top-4 right-4 text-green-500">
             <CheckCircle size={24} />
           </div>
           <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-purple-400">
             <Eye size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">Biometric Lock</h3>
           <p className="text-sm text-gray-400">Retina hash generated and stored in local enclave.</p>
        </div>

        <div className="bg-gray-900 border border-green-500/30 p-6 rounded-2xl relative group">
           <div className="absolute top-4 right-4 text-green-500">
             <CheckCircle size={24} />
           </div>
           <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 text-orange-400">
             <Smartphone size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">Device Seed</h3>
           <p className="text-sm text-gray-400">Mobile device registered as primary seed phrase vault.</p>
        </div>
      </div>

      {/* Manual Verification Test (Simulation) */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Re-Verify Identity (Backend Test)</h3>
        <div className="flex items-center justify-between">
           <p className="text-gray-400 text-sm">Force a re-check against the UIDAI backend database.</p>
           <button 
             onClick={handleManualVerification}
             disabled={verifying}
             className="px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-lg text-white text-sm font-medium flex items-center"
           >
             {verifying ? <Loader size={16} className="animate-spin mr-2" /> : null}
             {verifying ? 'Verifying...' : 'Test Verification'}
           </button>
        </div>
        {verificationResult && (
           <div className={`mt-4 p-3 rounded-lg text-sm flex items-center ${verificationResult.success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {verificationResult.success ? <CheckCircle size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
              {verificationResult.message}
           </div>
        )}
      </div>

      {/* Recovery Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Lock className="mr-2 text-gray-400" size={20} /> Security & Recovery
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
             <div>
               <p className="text-white font-medium">Social Recovery</p>
               <p className="text-sm text-gray-400">2 of 3 Confidants active</p>
             </div>
             <button className="text-energy-400 hover:text-white font-medium text-sm">Manage</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
             <div>
               <p className="text-white font-medium">Cloud Backup</p>
               <p className="text-sm text-gray-400">Encrypted backup synced yesterday</p>
             </div>
             <button className="text-energy-400 hover:text-white font-medium text-sm">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identity;
