
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Briefcase, Lightbulb, Users, 
  CheckCircle, Upload, Fingerprint, Scan, Shield,
  FileText, Zap, ChevronRight, AlertCircle, Loader, ExternalLink
} from 'lucide-react';
import { ApplicationRole } from '../types';
import * as Backend from '../services/backend';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<ApplicationRole | null>(null);
  const [mintedData, setMintedData] = useState<{url: string, tokenId: string} | null>(null);

  // Form State
  const [identity, setIdentity] = useState({
    aadhaar: '', pan: '', mobile: '', retinaScan: false, confidants: ['', '']
  });

  // Role Specific States
  const [landDetails, setLandDetails] = useState({
    landType: 'Agricultural', sizeAcres: '', coordinates: '', hasAccessRoad: false, gridProximity: '', partnershipModel: 'Lease'
  });

  const [contractorDetails, setContractorDetails] = useState({
    category: 'Solar EPC', experience: '', teamSize: '', certifications: [] as string[]
  });

  const [entrepreneurDetails, setEntrepreneurDetails] = useState({
    category: 'Community Solar', description: '', govtLandType: 'Panchayat', support: [] as string[]
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const handleSimulatedScan = () => {
    setLoading(true);
    setTimeout(() => {
      setIdentity(prev => ({ ...prev, retinaScan: true }));
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // 1. Simulate Aadhaar Verification (Backend)
      if (identity.aadhaar) {
        await Backend.verifyAadhaar(identity.aadhaar);
      }

      // 2. Mint NFT (Backend)
      const mintResult = await Backend.mintIdentityNFT("0xUserWallet...", role || 'member');
      
      setMintedData({
        url: mintResult.openseaUrl,
        tokenId: mintResult.tokenId
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Application failed", error);
      setLoading(false);
    }
  };

  // --- STEP COMPONENTS ---

  const Step1RoleSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-2">Select Your Role</h2>
      <p className="text-gray-400 mb-6">Choose how you want to participate in the HeliosHash ecosystem.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => { setRole('landowner'); setStep(2); }}
          className="bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-energy-500 hover:bg-gray-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Land Owner</h3>
          <p className="text-gray-400 text-sm">I own land (0.5+ Acres) and want to lease or co-develop a solar microgrid.</p>
        </button>

        <button 
          onClick={() => { setRole('contractor'); setStep(2); }}
          className="bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-blue-500 hover:bg-gray-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Briefcase size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Contractor / EPC</h3>
          <p className="text-gray-400 text-sm">I provide equipment, installation, civil works, or technical services.</p>
        </button>

        <button 
          onClick={() => { setRole('entrepreneur'); setStep(2); }}
          className="bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-yellow-500 hover:bg-gray-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Lightbulb size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Entrepreneur</h3>
          <p className="text-gray-400 text-sm">I have an idea for a project on government/community land (No personal land).</p>
        </button>

        <button 
          onClick={() => { setRole('citizen'); setStep(2); }}
          className="bg-gray-900 border border-gray-700 p-6 rounded-2xl hover:border-purple-500 hover:bg-gray-800 transition-all text-left group"
        >
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Community Member</h3>
          <p className="text-gray-400 text-sm">I want to join, vote, volunteer, or invest in renewable projects.</p>
        </button>
      </div>
    </div>
  );

  const Step2Identity = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Shield className="mr-3 text-energy-400" /> Identity Verification
      </h2>
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Aadhaar Number</label>
            <input 
              type="text" 
              placeholder="XXXX-XXXX-XXXX" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-energy-500 focus:outline-none"
              value={identity.aadhaar}
              onChange={e => setIdentity({...identity, aadhaar: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">PAN Number</label>
            <input 
              type="text" 
              placeholder="ABCDE1234F" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-energy-500 focus:outline-none"
              value={identity.pan}
              onChange={e => setIdentity({...identity, pan: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Mobile Number (Seed Phrase Vault)</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-energy-500 focus:outline-none"
              value={identity.mobile}
              onChange={e => setIdentity({...identity, mobile: e.target.value})}
            />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-2">
          <label className="block text-sm text-gray-400 mb-2">Biometric Verification</label>
          <button 
            onClick={handleSimulatedScan}
            disabled={loading || identity.retinaScan}
            className={`w-full py-4 rounded-xl border-2 border-dashed flex items-center justify-center space-x-3 transition-all ${
              identity.retinaScan 
                ? 'border-green-500 bg-green-500/10 text-green-400' 
                : 'border-gray-600 hover:border-energy-400 hover:bg-gray-800 text-gray-400'
            }`}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : identity.retinaScan ? (
              <>
                <CheckCircle /> <span>Retina Scan Verified</span>
              </>
            ) : (
              <>
                <Scan /> <span>Launch Retina Scanner / Selfie Cam</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button 
          onClick={() => setStep(3)}
          disabled={!identity.aadhaar || !identity.retinaScan}
          className={`px-8 py-3 rounded-lg font-bold transition-colors ${
             !identity.aadhaar || !identity.retinaScan ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-energy-600 hover:bg-energy-500 text-white'
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const Step3Details = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white flex items-center">
        {role === 'landowner' && <MapPin className="mr-3 text-green-400" />}
        {role === 'contractor' && <Briefcase className="mr-3 text-blue-400" />}
        {role === 'entrepreneur' && <Lightbulb className="mr-3 text-yellow-400" />}
        {role === 'citizen' && <Users className="mr-3 text-purple-400" />}
        <span className="capitalize">{role} Details</span>
      </h2>

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
        
        {/* LAND OWNER FORM */}
        {role === 'landowner' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Land Type</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                    onChange={(e) => setLandDetails({...landDetails, landType: e.target.value})}
                  >
                    <option>Agricultural</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Residential (Unused)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Size (Acres)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2.5"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                    onChange={(e) => setLandDetails({...landDetails, sizeAcres: e.target.value})}
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Geo-Coordinates</label>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Lat, Long"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                      onChange={(e) => setLandDetails({...landDetails, coordinates: e.target.value})}
                    />
                    <button className="bg-gray-800 border border-gray-700 px-4 rounded-lg hover:text-white text-gray-400">
                      <MapPin size={20} />
                    </button>
                  </div>
               </div>
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Partnership Model</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                    onChange={(e) => setLandDetails({...landDetails, partnershipModel: e.target.value})}
                  >
                    <option>Lease to Community</option>
                    <option>Co-develop with DAO</option>
                    <option>Full Ownership</option>
                  </select>
               </div>
            </div>
          </>
        )}

        {/* CONTRACTOR FORM */}
        {role === 'contractor' && (
          <>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Service Category</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                    onChange={(e) => setContractorDetails({...contractorDetails, category: e.target.value as any})}
                  >
                    <option>Solar EPC</option>
                    <option>Civil Construction</option>
                    <option>Electrical Contractor</option>
                    <option>Mining Hardware</option>
                    <option>IoT / Software</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Team Size</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 15"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                  />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Key Projects / Experience</label>
                  <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none h-24 resize-none"
                    placeholder="Describe your past experience..."
                  ></textarea>
               </div>
            </div>
          </>
        )}

        {/* ENTREPRENEUR FORM */}
        {role === 'entrepreneur' && (
           <>
             <div className="space-y-4">
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Idea Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Village Water Purification Plant"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none"
                  />
               </div>
               <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Description</label>
                  <textarea 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none h-32 resize-none"
                    placeholder="Describe the impact, goals, and needs..."
                  ></textarea>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Target Govt Land Type</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none">
                       <option>Panchayat Land</option>
                       <option>Revenue Land</option>
                       <option>Forest Fringe</option>
                       <option>Municipal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Support Needed</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none">
                       <option>Technical & Funding</option>
                       <option>Funding Only</option>
                       <option>Technical Only</option>
                    </select>
                  </div>
               </div>
             </div>
           </>
        )}

        {/* CITIZEN FORM */}
        {role === 'citizen' && (
           <div className="space-y-4">
              <p className="text-gray-400">As a community member, you don't need to provide project details yet. You will be onboarded to the governance and voting platform.</p>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Interests</label>
                <div className="flex flex-wrap gap-2">
                   {['Investing', 'Voting', 'Volunteering', 'Learning'].map(i => (
                     <span key={i} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm hover:border-energy-500 cursor-pointer">{i}</span>
                   ))}
                </div>
              </div>
           </div>
        )}
      </div>

      <div className="flex justify-end pt-4 space-x-4">
        <button 
          onClick={() => setStep(2)}
          className="px-6 py-3 rounded-lg text-gray-400 hover:text-white"
        >
          Back
        </button>
        <button 
          onClick={() => setStep(4)}
          className="px-8 py-3 bg-energy-600 hover:bg-energy-500 text-white rounded-lg font-bold transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const Step4Uploads = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-white flex items-center">
        <Upload className="mr-3 text-gray-400" /> Documents & Bins
       </h2>
       <p className="text-gray-400 mb-4">Upload verified documents. These will be encrypted and stored in your specific DAO Data Bins.</p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dynamic Upload Fields based on Role */}
          {role === 'landowner' && (
             <>
               <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl border-dashed hover:border-energy-500 transition-colors cursor-pointer group">
                  <FileText className="w-10 h-10 text-gray-600 group-hover:text-energy-400 mb-2" />
                  <h3 className="font-bold text-white">Title Deed / 7/12 Extract</h3>
                  <p className="text-xs text-gray-500">Auto-sorts to: Asset Bin</p>
                  <input type="file" className="hidden" />
               </div>
               <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl border-dashed hover:border-energy-500 transition-colors cursor-pointer group">
                  <FileText className="w-10 h-10 text-gray-600 group-hover:text-energy-400 mb-2" />
                  <h3 className="font-bold text-white">Tax Receipt</h3>
                  <p className="text-xs text-gray-500">Auto-sorts to: Compliance Bin</p>
                  <input type="file" className="hidden" />
               </div>
             </>
          )}

          {role === 'contractor' && (
             <>
               <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl border-dashed hover:border-energy-500 transition-colors cursor-pointer group">
                  <FileText className="w-10 h-10 text-gray-600 group-hover:text-energy-400 mb-2" />
                  <h3 className="font-bold text-white">Business Registration</h3>
                  <p className="text-xs text-gray-500">Auto-sorts to: Vendor Bin</p>
                  <input type="file" className="hidden" />
               </div>
               <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl border-dashed hover:border-energy-500 transition-colors cursor-pointer group">
                  <FileText className="w-10 h-10 text-gray-600 group-hover:text-energy-400 mb-2" />
                  <h3 className="font-bold text-white">Safety Certifications</h3>
                  <p className="text-xs text-gray-500">Auto-sorts to: Safety Bin</p>
                  <input type="file" className="hidden" />
               </div>
             </>
          )}

          {/* Common Uploads */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl border-dashed hover:border-energy-500 transition-colors cursor-pointer group">
             <Fingerprint className="w-10 h-10 text-gray-600 group-hover:text-energy-400 mb-2" />
             <h3 className="font-bold text-white">Signed DAO Terms</h3>
             <p className="text-xs text-gray-500">Auto-sorts to: Legal Bin</p>
             <input type="file" className="hidden" />
          </div>
       </div>

       <div className="flex justify-end pt-4 space-x-4">
        <button 
          onClick={() => setStep(3)}
          className="px-6 py-3 rounded-lg text-gray-400 hover:text-white"
        >
          Back
        </button>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-green-900/20"
        >
          {loading ? 'Processing...' : 'Submit & Mint ID NFT'}
        </button>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6 animate-scale-in text-center p-8">
      <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-3xl font-bold text-white">Application Successful!</h2>
      <p className="text-gray-400 max-w-lg">
        Your role as <span className="text-white font-bold uppercase">{role}</span> has been assigned. 
        Identity NFT has been minted to your wallet.
      </p>
      
      {mintedData && (
        <a 
          href={mintedData.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-800 border border-gray-700 hover:border-energy-500 text-white px-6 py-4 rounded-xl flex items-center space-x-3 transition-all group"
        >
          <img src="https://opensea.io/static/images/logos/opensea.svg" alt="OpenSea" className="w-8 h-8" />
          <div className="text-left">
            <p className="text-xs text-gray-400">View on OpenSea</p>
            <p className="font-bold flex items-center">
              Identity NFT #{mintedData.tokenId} <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </a>
      )}

      <button 
        onClick={() => navigate('/dashboard')}
        className="px-8 py-3 bg-energy-600 hover:bg-energy-500 text-white rounded-lg font-bold transition-colors shadow-lg"
      >
        Go to Dashboard
      </button>
    </div>
  );

  // --- LOADING OVERLAY ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gray-800 border-t-energy-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <Zap className="text-energy-500 animate-pulse" fill="currentColor" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Processing Application</h2>
          <div className="text-gray-400 text-sm space-y-1">
             <p>• Verifying Aadhaar via Backend...</p>
             <p>• Creating Decentralized Data Bins...</p>
             <p>• Minting Identity NFT on Polygon...</p>
          </div>
        </div>
      </div>
    );
  }

  // --- SUCCESS VIEW ---
  if (mintedData) {
    return <SuccessScreen />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-2">
        <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
           <h1 className="text-3xl font-bold text-white">Application Center</h1>
           <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span className={step >= 1 ? 'text-energy-400' : ''}>Role</span>
              <ChevronRight size={14} />
              <span className={step >= 2 ? 'text-energy-400' : ''}>Identity</span>
              <ChevronRight size={14} />
              <span className={step >= 3 ? 'text-energy-400' : ''}>Details</span>
              <ChevronRight size={14} />
              <span className={step >= 4 ? 'text-energy-400' : ''}>Uploads</span>
           </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-energy-500 h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {step === 1 && <Step1RoleSelection />}
        {step === 2 && <Step2Identity />}
        {step === 3 && <Step3Details />}
        {step === 4 && <Step4Uploads />}
      </div>
    </div>
  );
};

export default CreateProject;
