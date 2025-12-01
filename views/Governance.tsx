import React from 'react';
import { proposals } from '../services/mockData';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const Governance: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Governance</h1>
          <p className="text-gray-400">Vote on proposals to shape the future of HeliosHash.</p>
        </div>
        <button className="bg-white text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Create Proposal
        </button>
      </div>

      <div className="space-y-6">
        {proposals.map((proposal) => {
          const totalVotes = proposal.votesFor + proposal.votesAgainst;
          const percentageFor = (proposal.votesFor / totalVotes) * 100;

          return (
            <div key={proposal.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                   <div className="flex items-center space-x-3 mb-2">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                       proposal.status === 'Active' 
                        ? 'bg-energy-500/10 text-energy-400 border-energy-500/50' 
                        : proposal.status === 'Passed' 
                          ? 'bg-eco-500/10 text-eco-400 border-eco-500/50'
                          : 'bg-gray-700 text-gray-400 border-gray-600'
                     }`}>
                       {proposal.status}
                     </span>
                     <span className="text-gray-500 text-sm">#{proposal.id}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                   <p className="text-gray-400 max-w-2xl">{proposal.description}</p>
                </div>
                <div className="text-right text-sm text-gray-500 flex flex-col items-end">
                   <div className="flex items-center space-x-1 mb-1">
                     <Clock className="w-4 h-4" />
                     <span>Ends {proposal.endDate}</span>
                   </div>
                   <div className="flex space-x-2 mt-2">
                      {proposal.tags.map(tag => (
                        <span key={tag} className="bg-gray-800 px-2 py-1 rounded text-xs">{tag}</span>
                      ))}
                   </div>
                </div>
              </div>

              {/* Voting Progress */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-eco-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> For: {percentageFor.toFixed(1)}%</span>
                  <span className="text-red-400 flex items-center">Against: {(100 - percentageFor).toFixed(1)}% <XCircle className="w-4 h-4 ml-1"/></span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-eco-500 transition-all duration-1000 relative group" 
                    style={{ width: `${percentageFor}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="h-full bg-red-500 transition-all duration-1000 flex-1 relative group">
                     <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-right">{totalVotes.toLocaleString()} votes cast</p>
              </div>

              {proposal.status === 'Active' && (
                <div className="mt-6 flex space-x-4 border-t border-gray-800 pt-4">
                  <button className="flex-1 bg-eco-600/20 hover:bg-eco-600/30 text-eco-400 border border-eco-600/50 py-2 rounded-xl font-bold transition-all">
                    Vote For
                  </button>
                  <button className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 py-2 rounded-xl font-bold transition-all">
                    Vote Against
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Governance;