import React, { useState } from 'react';
import { 
  Award, Wallet, TrendingUp, CheckCircle, Users, 
  Gift, Map, ChevronRight, Image, 
  ArrowUpRight, ArrowDownLeft, QrCode, X, Copy, Layers,
  Zap, Loader, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [showNFTCollection, setShowNFTCollection] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showStakingModal, setShowStakingModal] = useState(false);

  // Staking State
  const [stakingAmount, setStakingAmount] = useState('');
  const [isStaking, setIsStaking] = useState(true); // true = stake, false = unstake
  const [stakingProcessing, setStakingProcessing] = useState(false);
  const [stakingSuccess, setStakingSuccess] = useState(false);

  const goToProject = (projectId: number) => {
    navigate('/projects', { state: { selectedProjectId: projectId } });
  };

  const handleStakeSubmit = () => {
    setStakingProcessing(true);
    setTimeout(() => {
      setStakingProcessing(false);
      setStakingSuccess(true);
      setTimeout(() => {
        setStakingSuccess(false);
        setShowStakingModal(false);
        setStakingAmount('');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Receive Modal */}
      {showReceiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 w-full max-w-sm relative shadow-2xl animate-scale-in">
            <button onClick={() => setShowReceiveModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 text-center">Receive HHD</h3>
            <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 mb-6 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <QrCode size={160} className="text-black relative z-10" />
            </div>
            <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
              <code className="text-gray-300 text-sm truncate mr-4">0x71C...9a2B</code>
              <button className="text-energy-400 hover:text-white transition-transform active:scale-95">
                <Copy size={20} />
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">Only send HHD or ICP to this address.</p>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 w-full max-w-md relative shadow-2xl animate-scale-in">
            <button onClick={() => setShowSendModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6">Send HHD</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Recipient Address</label>
                <div className="flex space-x-2">
                  <input type="text" placeholder="0x..." className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-energy-500 outline-none transition-colors" />
                  <button className="bg-gray-800 border border-gray-700 rounded-xl px-4 text-gray-400 hover:text-white">
                    <QrCode size={20} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount</label>
                <input type="number" placeholder="0.00" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-energy-500 outline-none transition-colors" />
              </div>
              <button className="w-full bg-energy-600 text-white font-bold py-4 rounded-xl hover:bg-energy-500 transition-colors mt-4 shadow-lg shadow-energy-900/20">
                Confirm Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staking Modal */}
      {showStakingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-lg relative shadow-2xl overflow-hidden animate-scale-in">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-energy-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

            <button onClick={() => setShowStakingModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
              <X size={24} />
            </button>
            
            <div className="p-8 relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-energy-500/20 rounded-xl text-energy-400">
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Staking Vault</h3>
                  <p className="text-gray-400 text-sm">Earn 12.5% APY rewards</p>
                </div>
              </div>

              {stakingSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
                    <CheckCircle size={48} className="animate-scale-in" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Transaction Successful</h4>
                  <p className="text-gray-400">Your assets have been {isStaking ? 'staked' : 'unstaked'} securely.</p>
                </div>
              ) : stakingProcessing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 relative mb-6">
                    <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-energy-500 rounded-full animate-spin"></div>
                    <Zap className="absolute inset-0 m-auto text-energy-400 animate-pulse" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Processing Transaction</h4>
                  <p className="text-gray-400">Confirming on Internet Computer...</p>
                </div>
              ) : (
                <>
                  {/* Toggle */}
                  <div className="flex bg-gray-800 p-1 rounded-xl mb-6 relative">
                    <button 
                      onClick={() => setIsStaking(true)}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all relative z-10 ${isStaking ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      Stake
                    </button>
                    <button 
                      onClick={() => setIsStaking(false)}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all relative z-10 ${!isStaking ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      Unstake
                    </button>
                    <div 
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-700 rounded-lg transition-all duration-300 ease-in-out ${isStaking ? 'left-1' : 'left-[calc(50%+4px)]'}`}
                    ></div>
                  </div>

                  {/* Amount Input */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 mb-6 transition-all focus-within:border-energy-500 focus-within:ring-1 focus-within:ring-energy-500/50">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Amount</label>
                      <span className="text-xs text-gray-400">Balance: {isStaking ? user.tokenBalance : user.stakingBalance} HHD</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent text-3xl font-bold text-white w-full outline-none placeholder-gray-600"
                      />
                      <button 
                        onClick={() => setStakingAmount(String(isStaking ? user.tokenBalance : user.stakingBalance))}
                        className="text-xs bg-gray-700 text-energy-400 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        MAX
                      </button>
                    </div>
                  </div>

                  {/* Info Row */}
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-8 px-2">
                    <span>Estimated APY</span>
                    <span className="text-green-400 font-bold">12.5%</span>
                  </div>

                  <button 
                    onClick={handleStakeSubmit}
                    disabled={!stakingAmount}
                    className={`
                      w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                      ${isStaking 
                        ? 'bg-gradient-to-r from-energy-600 to-orange-500 text-white shadow-energy-500/20' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'}
                    `}
                  >
                    {isStaking ? 'Confirm Stake' : 'Confirm Unstake'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wallet & Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
        {/* Main Wallet Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-blue-600/20 to-green-500/20 blur-3xl animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl border border-blue-500/30 h-full flex flex-col justify-between transition-transform duration-500">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white blur-md opacity-30 animate-pulse"></div>
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="relative w-16 h-16 rounded-full border-2 border-white/50 bg-gray-800 object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <div className="flex items-center space-x-2 text-blue-200">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.rank}</span>
                  </div>
                </div>
              </div>
              <Wallet className="w-8 h-8 text-blue-200 opacity-50 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-blue-100 text-sm mb-1 opacity-80">Total Balance</p>
                <p className="text-5xl font-bold tracking-tight drop-shadow-lg">
                  {user.tokenBalance.toLocaleString()} <span className="text-2xl opacity-75">HHD</span>
                </p>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowSendModal(true)}
                  className="flex-1 bg-white text-blue-700 px-4 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center space-x-2 active:scale-95 transform duration-100"
                >
                  <ArrowUpRight size={18} />
                  <span>Send</span>
                </button>
                <button 
                  onClick={() => setShowReceiveModal(true)}
                  className="flex-1 bg-blue-500/30 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-500/40 transition-colors shadow-lg flex items-center justify-center space-x-2 active:scale-95 transform duration-100"
                >
                  <ArrowDownLeft size={18} />
                  <span>Receive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Staking Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 relative overflow-hidden group hover:border-gray-700 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-energy-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-energy-500/20 rounded-xl text-energy-400 group-hover:scale-110 transition-transform duration-300">
                <Layers size={24} />
              </div>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                +12.5% APY
              </span>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm">Staked Assets</p>
              <p className="text-3xl font-bold text-white mt-1 group-hover:text-energy-100 transition-colors">{user.stakingBalance.toLocaleString()} HHD</p>
              
              <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-energy-600 to-energy-400 h-full w-1/3 animate-pulse-slow"></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Next Reward</span>
                <span className="font-mono">24h 12m</span>
              </div>
            </div>

            <button 
              onClick={() => setShowStakingModal(true)}
              className="w-full mt-6 bg-gray-800 border border-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-energy-900/30 hover:border-energy-500 hover:text-energy-400 transition-all active:scale-95"
            >
              Manage Stake
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
        {[
          { icon: TrendingUp, label: "Projects Started", val: user.stats.projectsStarted, color: "text-green-400", bg: "bg-green-500/20" },
          { icon: CheckCircle, label: "Projects Helped", val: user.stats.projectsHelped, color: "text-blue-400", bg: "bg-blue-500/20" },
          { icon: Users, label: "Network Growth", val: `+${user.stats.membersAdded}`, color: "text-purple-400", bg: "bg-purple-500/20" }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center space-x-4 hover:border-gray-700 transition-colors group">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NFT Collection */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up" style={{animationDelay: '0.2s'}}>
        <button 
          onClick={() => setShowNFTCollection(!showNFTCollection)}
          className="w-full p-8 text-left hover:bg-gray-800/50 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 group-hover:rotate-12 transition-transform duration-300">
              <Image size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">My NFT Collection</h3>
              <p className="text-sm text-gray-400">{user.nftCollection.length} assets owned</p>
            </div>
          </div>
          <ChevronRight className={`text-gray-400 transition-transform duration-300 ${showNFTCollection ? 'rotate-90' : ''}`} size={24} />
        </button>

        {showNFTCollection && (
          <div className="p-8 pt-0 border-t border-gray-800 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {user.nftCollection.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => goToProject(nft.projectId)}
                  className="group relative bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 hover:border-purple-500 hover:-translate-y-1 transition-all text-left overflow-hidden"
                >
                  <div className="aspect-square rounded-xl bg-gray-900 mb-4 overflow-hidden relative">
                    <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <h4 className="font-bold text-white mb-1 truncate">{nft.name}</h4>
                  <p className="text-xs text-purple-300">{nft.community}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
        <button 
          onClick={() => navigate('/rewards')}
          className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/20 rounded-2xl p-6 text-left hover:border-orange-500/50 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Gift className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform relative z-10" />
          <p className="font-bold text-lg text-white relative z-10">Rewards</p>
          <p className="text-sm text-gray-400 relative z-10">Redeem tokens for goods</p>
        </button>

        <button 
          onClick={() => navigate('/projects')}
          className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-500/20 rounded-2xl p-6 text-left hover:border-green-500/50 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Map className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform relative z-10" />
          <p className="font-bold text-lg text-white relative z-10">Explore Map</p>
          <p className="text-sm text-gray-400 relative z-10">Find active projects</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;