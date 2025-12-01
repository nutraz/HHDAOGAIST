
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Zap, MapPin, ChevronRight, AlertCircle, 
  Briefcase, MessageSquare, ArrowLeft, Layers, Activity,
  Database, Users, Sun, Server, CheckCircle2, Clock, 
  FileText, FolderOpen, Target, Cpu, TrendingUp, Vote,
  XCircle, CheckCircle, Video, Mic, Phone, Plus,
  Image as ImageIcon, Paperclip, Send, X, MoreVertical,
  Wallet, Coins, Lock, Unlock, ShoppingCart, ChevronDown,
  Copy, QrCode, ExternalLink, Loader
} from 'lucide-react';
import { projects, currentUser } from '../services/mockData';
import { Project, Proposal, ProjectSocial, ChatUser, CommunityLevel } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import * as Backend from '../services/backend';

// Mock data for charts
const solarData = [
  { time: '06:00', val: 0 }, { time: '08:00', val: 12 }, { time: '10:00', val: 35 },
  { time: '12:00', val: 42 }, { time: '14:00', val: 38 }, { time: '16:00', val: 25 },
  { time: '18:00', val: 5 }, { time: '20:00', val: 0 }
];

const miningData = [
  { time: '06:00', val: 440 }, { time: '08:00', val: 445 }, { time: '10:00', val: 448 },
  { time: '12:00', val: 450 }, { time: '14:00', val: 452 }, { time: '16:00', val: 449 },
  { time: '18:00', val: 455 }, { time: '20:00', val: 460 }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (location.state && (location.state as any).selectedProjectId) {
      const p = projects.find(p => p.id === (location.state as any).selectedProjectId);
      if (p) setSelectedProject(p);
    }
  }, [location.state]);

  const viewProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('overview');
  };

  const clearSelection = () => {
    setSelectedProject(null);
    window.history.replaceState({}, document.title);
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      green: { bg: 'bg-energy-500', text: 'text-energy-400', border: 'border-energy-500' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' },
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-600' }
    };
    return colors[color] || colors.green;
  };

  // --- SUB-COMPONENTS FOR TABS ---

  const OverviewTab = ({ project }: { project: Project }) => {
    // Calculate funding percentage based on secure/required logic (custom for Land phase)
    const isLandPhase = project.fundingStats?.required === 0; // TBA
    const fundedPercent = isLandPhase ? 100 : (
      project.fundingStats 
      ? Math.min(100, (project.fundingStats.secured / project.fundingStats.required) * 100) 
      : 0
    );

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Banner & Header */}
        <div className="relative rounded-3xl overflow-hidden h-64 border border-gray-700 group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <img 
            src={project.imageUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${project.name}`} 
            alt="Project Cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-energy-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {project.tier || 'Project'}
              </span>
              {project.isLive && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE OPS</span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-gray-300 max-w-xl">{project.detailedInfo?.type}</p>
          </div>
        </div>

        {/* Meter Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl backdrop-blur-sm">
             <div className="flex items-center space-x-2 text-yellow-400 mb-2">
               <Sun size={20} /> <span className="text-xs font-bold uppercase">Solar Output</span>
             </div>
             <p className="text-2xl font-bold text-white">{project.liveData?.currentOutput || '0'} <span className="text-sm text-gray-400">kW</span></p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl backdrop-blur-sm">
             <div className="flex items-center space-x-2 text-blue-400 mb-2">
               <Cpu size={20} /> <span className="text-xs font-bold uppercase">Hashrate</span>
             </div>
             <p className="text-2xl font-bold text-white">{project.miningData?.hashrate || '0 TH/s'}</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl backdrop-blur-sm">
             <div className="flex items-center space-x-2 text-green-400 mb-2">
               <Activity size={20} /> <span className="text-xs font-bold uppercase">Surplus</span>
             </div>
             <p className="text-2xl font-bold text-white">124 <span className="text-sm text-gray-400">kWh</span></p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl backdrop-blur-sm">
             <div className="flex items-center space-x-2 text-purple-400 mb-2">
               <Sparkles size={20} /> <span className="text-xs font-bold uppercase">Rewards</span>
             </div>
             <p className="text-2xl font-bold text-white">₹12.5k <span className="text-sm text-gray-400">Distributed</span></p>
          </div>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
               <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
               <p className="text-gray-400 leading-relaxed mb-4">
                 {project.detailedInfo?.vision || "A decentralized renewable energy initiative aimed at empowering local communities through blockchain governance and sustainable technology."}
               </p>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-xs text-gray-500 uppercase">Location</p>
                   <p className="text-white font-medium">{project.detailedInfo?.location}</p>
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase">Capacity</p>
                   <p className="text-white font-medium">{project.detailedInfo?.capacity}</p>
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase">Completion</p>
                   <div className="flex items-center space-x-2">
                     <div className="w-24 bg-gray-700 rounded-full h-2">
                       <div className="bg-green-500 h-2 rounded-full" style={{width: `${project.completion}%`}}></div>
                     </div>
                     <span className="text-white font-medium">{project.completion}%</span>
                   </div>
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase">Strategic Role</p>
                   <p className="text-energy-400 font-medium text-sm">{project.detailedInfo?.strategicRole}</p>
                 </div>
               </div>
             </div>
             
             {/* Funding Status Card */}
             {project.fundingStats && (
               <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-16 bg-green-500/10 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>
                 <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Coins className="mr-2 text-yellow-400" /> Land & Funding Status
                    </h3>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                      {project.fundingStats.investors} Investors
                    </span>
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-400">Current Phase Value</p>
                        <p className="text-3xl font-bold text-white">₹{(project.fundingStats.secured / 10000000).toFixed(1)} Crore</p>
                        <p className="text-xs text-green-400 mt-1 flex items-center"><CheckCircle size={12} className="mr-1"/> 3 Acres Land Acquired</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Next Phase Funding</p>
                        <p className="text-xl font-bold text-gray-300">TBA</p>
                        <p className="text-xs text-orange-400 mt-1">Land Conversion Active</p>
                      </div>
                   </div>
                   
                   <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border border-gray-600">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full relative" 
                        style={{width: `${fundedPercent}%`}}
                      >
                         <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                   </div>
                   
                   <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>Land Secured (15yr Lease @ 7%)</span>
                      <span>Next Round: Open Soon</span>
                   </div>
                 </div>
               </div>
             )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-sm">Land Secured</span>
                  <span className="text-white font-medium">3 Acres</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-sm">Phase Progress</span>
                  <span className="text-white font-medium">{project.completion}%</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-sm">Community</span>
                  <span className="text-white font-medium">{project.communityLevels ? project.communityLevels[6].capacity : 0} Members</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-400 text-sm">Treasury</span>
                  <span className="text-green-400 font-medium">DAO Linked</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NetworkTab = ({ levels }: { levels?: CommunityLevel[] }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'USDC' | 'INR' | 'ETH' | 'BTC' | 'POLYGON'>('USDC');
    const [purchasingTier, setPurchasingTier] = useState<CommunityLevel | null>(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    // Mock User Holding (Hardcoded for demo based on prompt "Tier 7 / 1 PTS")
    const userHolding = {
      tier: 7,
      voteWeight: 1,
      tiersHeld: 1
    };

    const convertPrice = (priceUSDC: number) => {
      switch(selectedCurrency) {
        case 'INR': return `₹${(priceUSDC * 84).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        case 'ETH': return `Ξ${(priceUSDC / 2600).toFixed(4)}`;
        case 'BTC': return `₿${(priceUSDC / 68000).toFixed(6)}`;
        case 'POLYGON': return `${(priceUSDC * 1.5).toFixed(2)} MATIC`; // Approx rate
        default: return `$${priceUSDC.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    };

    const handleBuyClick = (level: CommunityLevel) => {
      setPurchasingTier(level);
    };

    const handlePaymentConfirmation = async () => {
      setPaymentProcessing(true);
      
      // Simulate Backend Payment Verification
      if (selectedCurrency === 'INR') {
        await Backend.initiateUPIPayment(purchasingTier!.tierPriceUSDC * 84, "helios@upi");
      } else {
        await Backend.verifyCryptoTransaction("0xSimulatedHash...");
      }

      setPaymentProcessing(false);
      alert("Payment Verified by Backend. Tier NFT has been transferred to your wallet.");
      setPurchasingTier(null);
    };

    return (
      <div className="space-y-8 animate-fade-in pb-10">
        {/* Payment Modal */}
        {purchasingTier && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden animate-scale-in">
                <button 
                  onClick={() => setPurchasingTier(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white z-20"
                >
                  <X size={24} />
                </button>
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-energy-500/20 text-energy-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Purchase Tier {purchasingTier.level}</h3>
                    <p className="text-gray-400 text-sm mt-1">Acquire {purchasingTier.voteWeight} Governance Points</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount to Send</p>
                    <p className="text-3xl font-bold text-white">{convertPrice(purchasingTier.tierPriceUSDC)}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-sm text-gray-300 text-center">Send funds to the DAO Treasury:</p>
                    <div className="bg-black/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-energy-500 transition-colors">
                      <code className="text-energy-400 text-xs sm:text-sm font-mono break-all mr-2">
                        {Backend.CONFIG.TREASURY_WALLET}
                      </code>
                      <Copy className="text-gray-500 group-hover:text-white" size={18} />
                    </div>
                    <div className="flex justify-center">
                       <div className="bg-white p-2 rounded-xl">
                          <QrCode size={120} className="text-black" />
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={handlePaymentConfirmation}
                    disabled={paymentProcessing}
                    className="w-full bg-energy-600 hover:bg-energy-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-energy-900/20 flex items-center justify-center"
                  >
                    {paymentProcessing ? (
                      <Loader className="animate-spin mr-2" />
                    ) : (
                      "Confirm Payment Sent"
                    )}
                  </button>
                </div>
              </div>
           </div>
        )}

        {/* Header: Current Holding & Currency Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="bg-gradient-to-r from-energy-900 to-gray-900 border border-energy-500/50 rounded-2xl p-6 flex-1 w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-energy-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="relative z-10 w-full">
              <h2 className="text-sm font-bold text-energy-400 uppercase tracking-wider mb-4">Current Holding</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">Tier</th>
                      <th className="pb-3 font-medium">Vote Weight</th>
                      <th className="pb-3 font-medium">Amount of Tiers</th>
                      <th className="pb-3 font-medium">Total Vote Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-white text-lg font-bold">
                      <td className="pt-4 text-energy-400">Tier {userHolding.tier}</td>
                      <td className="pt-4">{userHolding.voteWeight} PTS</td>
                      <td className="pt-4">{userHolding.tiersHeld}</td>
                      <td className="pt-4">{userHolding.voteWeight * userHolding.tiersHeld} PTS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="relative">
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as any)}
              className="appearance-none bg-gray-900 border border-gray-800 text-white py-3 pl-5 pr-12 rounded-xl focus:outline-none focus:border-energy-500 font-bold cursor-pointer hover:border-gray-700 transition-colors"
            >
              {['USDC', 'INR', 'ETH', 'BTC', 'POLYGON'].map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Tier Plan Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Tier Plan</h3>
            <span className="text-sm text-gray-500">Buy a tier to increase your governance influence.</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Tier</th>
                  <th className="px-6 py-4 font-medium">Filled / Total</th>
                  <th className="px-6 py-4 font-medium">Vote Weight</th>
                  <th className="px-6 py-4 font-medium text-right">Price ({selectedCurrency})</th>
                  <th className="px-6 py-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {levels?.map((level) => {
                  // Calculate filled amount (Capacity - Available)
                  const filled = level.capacity - level.available;
                  const filledPercent = (filled / level.capacity) * 100;
                  const isSoldOut = level.available === 0;

                  return (
                    <tr key={level.level} className="hover:bg-gray-800/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${level.level === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-gray-800 text-gray-400 border border-gray-700'}
                          `}>
                            {level.level}
                          </div>
                          <span className={`font-bold ${level.level === 1 ? 'text-yellow-500' : 'text-white'}`}>
                            Tier {level.level}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col w-48">
                           <span className="text-sm font-medium text-gray-300 mb-1">
                             {filled} / {level.capacity}
                           </span>
                           <div className="w-full bg-gray-700 h-1.5 rounded-full">
                             <div 
                               className={`h-full rounded-full ${isSoldOut ? 'bg-red-500' : 'bg-green-500'}`} 
                               style={{ width: `${filledPercent}%` }}
                             ></div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold">
                            {level.voteWeight} PTS
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-white font-medium">
                        {convertPrice(level.tierPriceUSDC)}
                      </td>
                      <td className="px-6 py-5 text-center">
                         <button 
                           onClick={() => handleBuyClick(level)}
                           disabled={isSoldOut}
                           className={`
                             px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg w-32
                             ${isSoldOut 
                               ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                               : 'bg-energy-600 hover:bg-energy-500 text-white hover:scale-105 shadow-energy-900/20'}
                           `}
                         >
                           {isSoldOut ? 'Sold Out' : 'Buy Tier'}
                         </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const PhasesTab = ({ phases }: { phases?: any[] }) => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases?.map((phase) => (
          <div key={phase.id} className={`
            relative p-6 rounded-2xl border 
            ${phase.status === 'active' ? 'bg-gray-800 border-energy-500 ring-1 ring-energy-500/30' : 'bg-gray-900 border-gray-800'}
          `}>
            {phase.status === 'active' && (
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-energy-500"></span>
              </span>
            )}
            
            <h3 className={`text-xl font-bold mb-2 ${phase.status === 'active' ? 'text-white' : 'text-gray-300'}`}>
              {phase.name}
            </h3>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className={`h-2 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : 'bg-energy-500'}`} 
                style={{width: `${phase.progress}%`}}
              ></div>
            </div>

            <div className="space-y-3">
              {phase.tasks.map((task: any, idx: number) => (
                <div key={idx} className="flex items-center space-x-3">
                  {task.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : task.status === 'in-progress' ? (
                    <Clock className="w-5 h-5 text-energy-400 flex-shrink-0 animate-pulse" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0"></div>
                  )}
                  <span className={`text-sm ${task.status === 'pending' ? 'text-gray-500' : 'text-gray-300'}`}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>

            {phase.documents.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 uppercase mb-2">Attached Documents</p>
                <div className="space-y-2">
                  {phase.documents.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 cursor-pointer text-sm">
                      <FileText size={14} />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const GovernanceTab = ({ proposals }: { proposals?: Proposal[] }) => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Governance</h2>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 hover:bg-gray-700">
          Create Proposal
        </button>
      </div>

      {!proposals || proposals.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-2xl">
          <Vote className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-gray-400">No active proposals for this project.</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map(proposal => {
            const total = proposal.votesFor + proposal.votesAgainst;
            const percent = total > 0 ? (proposal.votesFor / total) * 100 : 0;
            return (
              <div key={proposal.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                       <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">Active</span>
                       <span className="text-gray-500 text-xs">#{proposal.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{proposal.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Ends {proposal.endDate}</p>
                  </div>
                </div>

                <div className="mb-4">
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-400">For: {proposal.votesFor.toLocaleString()}</span>
                      <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                   </div>
                   <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden flex">
                      <div className="bg-green-500 h-full" style={{width: `${percent}%`}}></div>
                      <div className="bg-red-500 h-full flex-1"></div>
                   </div>
                </div>

                <div className="flex space-x-3">
                   <button className="flex-1 bg-gray-800 hover:bg-green-900/30 border border-gray-700 hover:border-green-500/50 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <CheckCircle size={16} className="text-green-500" /> Vote For
                   </button>
                   <button className="flex-1 bg-gray-800 hover:bg-red-900/30 border border-gray-700 hover:border-red-500/50 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <XCircle size={16} className="text-red-500" /> Vote Against
                   </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );

  const SocialHubTab = ({ social }: { social?: ProjectSocial }) => {
    const [selectedChatUser, setSelectedChatUser] = useState<ChatUser | null>(null);

    if (!social) return <div className="text-center py-20 text-gray-500">No social hub data available.</div>;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in h-[calc(100vh-200px)]">
        {/* Left Column: Conferencing & Rooms */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <Video size={16} className="mr-2" /> Live Rooms
            </h3>
            <div className="space-y-3">
              {social.rooms.map(room => (
                <div key={room.id} className={`p-3 rounded-xl border transition-all cursor-pointer ${room.isActive ? 'bg-energy-900/20 border-energy-500/50 hover:bg-energy-900/40' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-white text-sm">{room.name}</span>
                    {room.isActive && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                       {room.participants.slice(0,3).map((p, i) => (
                         <img key={i} src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full border-2 border-gray-900" />
                       ))}
                       {room.participants.length > 0 && <span className="text-xs text-gray-500 ml-3">{room.participants.length} Active</span>}
                       {room.participants.length === 0 && <span className="text-xs text-gray-500">Empty</span>}
                    </div>
                    <button className={`p-1.5 rounded-lg ${room.isActive ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                      {room.type === 'video' ? <Video size={14} /> : <Mic size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-dashed border-gray-600 rounded-xl text-xs text-gray-400 hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center">
              <Plus size={14} className="mr-1" /> Create Room
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 h-full">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <Users size={16} className="mr-2" /> Project Members
            </h3>
            <div className="space-y-2">
               {social.members.map(member => (
                 <div 
                   key={member.id} 
                   onClick={() => setSelectedChatUser(member)}
                   className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                 >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full bg-gray-700" />
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${member.isOnline ? 'bg-green-500' : 'bg-gray-500'} border border-gray-900`}></span>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{member.name}</p>
                        <p className="text-[10px] text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <MessageSquare size={14} className="text-gray-600 hover:text-energy-400" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Center Column: Project Feed */}
        <div className="lg:col-span-3 flex flex-col h-full relative">
           {/* Feed Header/Input */}
           <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-4 flex-shrink-0">
              <div className="flex space-x-3">
                 <img src={currentUser.avatar} className="w-10 h-10 rounded-full border border-gray-700" />
                 <div className="flex-1">
                    <input type="text" placeholder="Share a project update, photo, or video..." className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-gray-500 text-sm mb-2" />
                    <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                       <div className="flex space-x-2">
                          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded"><ImageIcon size={18} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded"><Video size={18} /></button>
                          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded"><Paperclip size={18} /></button>
                       </div>
                       <button className="bg-energy-600 hover:bg-energy-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Post Update</button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Feed Scroll Area */}
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-hide">
              {social.posts.map(post => (
                <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                         <img src={post.author.avatar} className="w-10 h-10 rounded-full" />
                         <div>
                            <p className="text-white font-bold text-sm">{post.author.name}</p>
                            <p className="text-gray-500 text-xs">{post.author.role} • {post.timestamp}</p>
                         </div>
                      </div>
                      <button className="text-gray-500 hover:text-white"><MoreVertical size={16} /></button>
                   </div>
                   <p className="text-gray-300 text-sm mb-3">{post.content}</p>
                   
                   {/* Attachments */}
                   {post.image && (
                     <div className="rounded-xl overflow-hidden mb-3 border border-gray-800">
                        <img src={post.image} className="w-full h-auto" />
                     </div>
                   )}

                   <div className="flex space-x-2 mb-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">#{tag}</span>
                      ))}
                   </div>

                   <div className="flex items-center space-x-6 border-t border-gray-800 pt-3 text-xs text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-white"><span>Like</span> ({post.likes})</button>
                      <button className="flex items-center space-x-1 hover:text-white"><span>Comment</span> ({post.comments})</button>
                      <button className="flex items-center space-x-1 hover:text-white"><span>Share</span></button>
                   </div>
                </div>
              ))}
           </div>

           {/* DM Overlay Window */}
           {selectedChatUser && (
             <div className="absolute bottom-4 right-4 w-80 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in z-20 h-96">
                <div className="bg-gray-800 p-3 flex justify-between items-center border-b border-gray-700">
                   <div className="flex items-center space-x-2">
                      <div className="relative">
                         <img src={selectedChatUser.avatar} className="w-8 h-8 rounded-full" />
                         <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${selectedChatUser.isOnline ? 'bg-green-500' : 'bg-gray-500'} border border-gray-800`}></span>
                      </div>
                      <span className="font-bold text-white text-sm">{selectedChatUser.name}</span>
                   </div>
                   <button onClick={() => setSelectedChatUser(null)} className="text-gray-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-900/50">
                   <div className="text-center text-xs text-gray-500 my-4">Today</div>
                   <div className="flex justify-end mb-2">
                      <div className="bg-energy-600 text-white rounded-l-xl rounded-tr-xl px-3 py-2 text-sm max-w-[80%]">
                         Hey, do you have the latest site drawings?
                      </div>
                   </div>
                   <div className="flex justify-start mb-2">
                      <img src={selectedChatUser.avatar} className="w-6 h-6 rounded-full mr-2 self-end" />
                      <div className="bg-gray-800 text-gray-200 rounded-r-xl rounded-tl-xl px-3 py-2 text-sm max-w-[80%]">
                         Yes, sending them over now via the Data Bin.
                      </div>
                   </div>
                </div>
                <div className="p-3 bg-gray-800 border-t border-gray-700">
                   <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2 border border-gray-700">
                      <input type="text" placeholder="Message..." className="bg-transparent border-none text-white text-sm focus:ring-0 flex-1 p-0" />
                      <button className="text-energy-400 hover:text-white ml-2"><Send size={16} /></button>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    );
  }

  const LiveOpsTab = ({ project }: { project: Project }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
             <p className="text-gray-500 text-xs uppercase">Current Hashrate</p>
             <p className="text-2xl font-bold text-blue-400 font-mono mt-1">{project.miningData?.hashrate}</p>
             <p className="text-green-500 text-xs mt-2">↑ 2.4% 24h</p>
           </div>
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
             <p className="text-gray-500 text-xs uppercase">Active Miners</p>
             <p className="text-2xl font-bold text-white font-mono mt-1">{project.miningData?.activeMiners} <span className="text-sm text-gray-500">units</span></p>
             <p className="text-green-500 text-xs mt-2">All Systems Operational</p>
           </div>
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
             <p className="text-gray-500 text-xs uppercase">Daily Revenue</p>
             <p className="text-2xl font-bold text-yellow-400 font-mono mt-1">{project.miningData?.revenue}</p>
           </div>
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
             <p className="text-gray-500 text-xs uppercase">Avg Temp</p>
             <p className="text-2xl font-bold text-red-400 font-mono mt-1">{project.miningData?.temperature}</p>
             <p className="text-xs text-gray-500 mt-2">Optimal Range</p>
           </div>
        </div>
  
        {/* Charts - Only render when mounted to prevent size errors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Sun className="mr-2 text-yellow-500" size={20} /> Solar Generation (kW)
            </h3>
            <div className="w-full h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={solarData}>
                    <XAxis dataKey="time" stroke="#4b5563" fontSize={12} />
                    <YAxis stroke="#4b5563" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                      itemStyle={{ color: '#fbbf24' }}
                    />
                    <Bar dataKey="val" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
  
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Server className="mr-2 text-blue-500" size={20} /> Mining Hashrate (TH/s)
            </h3>
            <div className="w-full h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miningData}>
                    <XAxis dataKey="time" stroke="#4b5563" fontSize={12} />
                    <YAxis domain={[430, 470]} stroke="#4b5563" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CollaborateTab = ({ jobs }: { jobs?: any[] }) => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-white">Collaboration Marketplace</h2>
         <div className="flex space-x-2">
           <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:text-white">All Roles</button>
           <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:text-white">Engineering</button>
           <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:text-white">Operations</button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {jobs?.map((job) => (
           <div key={job.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-energy-500/50 transition-colors group">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="text-xl font-bold text-white group-hover:text-energy-400 transition-colors">{job.title}</h3>
                 <p className="text-gray-400 text-sm mt-1">{job.type} • {job.salary}</p>
               </div>
               <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                 {job.openings - job.filled} Open
               </span>
             </div>
             <p className="text-gray-500 text-sm mb-6">
               Join the on-site team for Phase 2 deployment. Requires verification of technical certifications.
             </p>
             <button className="w-full bg-gray-800 hover:bg-energy-600 text-white font-medium py-3 rounded-xl transition-colors border border-gray-700 hover:border-energy-500">
               Apply with Identity
             </button>
           </div>
         ))}
       </div>
    </div>
  );

  const DataTab = ({ bins }: { bins?: any[] }) => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">Project Data Bins</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bins?.map((bin) => (
          <div key={bin.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:bg-gray-800 cursor-pointer transition-colors text-center group">
            <FolderOpen className="w-12 h-12 text-gray-600 group-hover:text-energy-400 mx-auto mb-4 transition-colors" />
            <h3 className="text-white font-medium group-hover:text-energy-400">{bin.name}</h3>
            <p className="text-xs text-gray-500 mt-2">{bin.files} files • {bin.lastUpdated}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-800 font-medium text-gray-300">Recent Uploads</div>
        {[1,2,3].map(i => (
          <div key={i} className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between hover:bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-400" size={18} />
              <span className="text-gray-300 text-sm">Site_Inspection_Report_v{i}.pdf</span>
            </div>
            <span className="text-gray-600 text-xs">2 hours ago</span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- MAIN RENDER ---

  if (selectedProject) {
    return (
      <div className="space-y-6 animate-fade-in pb-20">
        {/* Back Nav */}
        <button 
          onClick={clearSelection}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-2 group"
        >
          <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Map
        </button>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-2 bg-gray-900/50 p-1 rounded-xl border border-gray-800 sticky top-0 z-30 backdrop-blur-md">
          {[
            { id: 'overview', icon: Target, label: 'Overview' },
            { id: 'hub', icon: MessageSquare, label: 'Project Hub' },
            { id: 'network', icon: Users, label: 'Tier Plan' },
            { id: 'phases', icon: Layers, label: 'Phases' },
            { id: 'governance', icon: Vote, label: 'Governance' },
            { id: 'live', icon: Activity, label: 'Live Ops' },
            { id: 'collaborate', icon: Briefcase, label: 'Collaborate' },
            { id: 'data', icon: Database, label: 'Data Bins' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-energy-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              `}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && <OverviewTab project={selectedProject} />}
          {activeTab === 'hub' && <SocialHubTab social={selectedProject.social} />}
          {activeTab === 'network' && <NetworkTab levels={selectedProject.communityLevels} />}
          {activeTab === 'phases' && <PhasesTab phases={selectedProject.phases} />}
          {activeTab === 'governance' && <GovernanceTab proposals={selectedProject.proposals} />}
          {activeTab === 'live' && <LiveOpsTab project={selectedProject} />}
          {activeTab === 'collaborate' && <CollaborateTab jobs={selectedProject.jobs} />}
          {activeTab === 'data' && <DataTab bins={selectedProject.dataBins} />}
        </div>
      </div>
    );
  }

  // --- PROJECT LIST VIEW ---
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects Map</h1>
            <p className="text-gray-400">Explore decentralized energy initiatives across the network.</p>
         </div>
         <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Filter View
         </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg overflow-hidden relative min-h-[500px]">
        <h3 className="absolute top-6 left-6 text-gray-400 text-sm uppercase tracking-widest z-10 bg-gray-800/80 px-2 rounded">India Deployment</h3>
        
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gray-900" style={{backgroundImage: 'radial-gradient(circle, #4b5563 1px, transparent 1px)', backgroundSize: '30px 30px'}}>
           {/* Abstract Map Shapes */}
           <svg className="absolute inset-0 w-full h-full text-gray-700 opacity-20" fill="currentColor">
              <path d="M100,100 Q200,50 300,150 T500,100" stroke="currentColor" strokeWidth="2" fill="none" />
           </svg>
        </div>

        {projects.map((project) => {
          const colorClasses = getColorClasses(project.color);
          const left = 20 + (project.id * 20);
          const top = 30 + (project.id * 15);
          
          return (
            <button
              key={project.id}
              onClick={() => viewProjectDetail(project)}
              className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center ${colorClasses.bg} shadow-2xl hover:scale-110 transition-transform duration-300 z-10 group border-4 border-gray-800 ${project.isLive ? 'ring-4 ring-red-500/50 animate-pulse' : ''}`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <Zap className="text-white" size={24} />
              {project.isLive && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
              )}
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                <p className="font-bold">{project.name}</p>
                <p className="text-gray-400 text-[10px]">{project.tier}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
             key={project.id}
             onClick={() => viewProjectDetail(project)}
             className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-energy-500/50 transition-all cursor-pointer group"
          >
             <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${project.color === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                   <Zap size={24} />
                </div>
                {project.isLive && (
                   <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-500/30">LIVE</span>
                )}
             </div>
             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-energy-400 transition-colors">{project.name}</h3>
             <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.detailedInfo?.type}</p>
             <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4">
               <div className="bg-energy-500 h-1.5 rounded-full" style={{width: `${project.completion}%`}}></div>
             </div>
             <div className="flex justify-between text-xs text-gray-500">
                <span>{project.size}</span>
                <span>{project.completion}% Complete</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
