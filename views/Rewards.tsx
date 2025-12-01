import React from 'react';
import { currentUser } from '../services/mockData';

const Rewards: React.FC = () => {
  const rewardsMarketplace = [
    { name: "Travel", icon: "✈️", vendors: ["MakeMyTrip", "Yatra", "Goibibo"] },
    { name: "Food", icon: "🍔", vendors: ["Zomato", "Swiggy", "Dunzo"] },
    { name: "Shopping", icon: "🛍️", vendors: ["Amazon", "Flipkart", "Myntra"] }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold text-white">Rewards Marketplace</h1>
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-8 shadow-xl">
        <p className="text-lg mb-2 opacity-90">Available Balance</p>
        <p className="text-5xl font-bold">{currentUser.tokenBalance.toLocaleString()} HHD</p>
        <p className="text-sm mt-2 opacity-75">1 HHD = $0.12 USD</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardsMarketplace.map((category, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-colors">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl bg-gray-800 p-2 rounded-lg">{category.icon}</span>
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
            <div className="space-y-3">
              {category.vendors.map((vendor, vIdx) => (
                <button 
                  key={vIdx}
                  className="w-full bg-gray-800 hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 text-left px-5 py-4 rounded-xl transition-all border border-gray-700 text-gray-200 font-medium flex justify-between items-center group"
                >
                  <span>{vendor}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
