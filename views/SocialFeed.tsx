
import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, 
  Smile, Send, Plus, Video, Mic, ThumbsDown, MessageSquare, 
  Users, Flag, Slash, Video as VideoIcon, UserX 
} from 'lucide-react';
import { posts, currentUser, stories } from '../services/mockData';

const SocialFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);

  // Toggle dropdown menu for a specific post
  const toggleMenu = (postId: string) => {
    setActiveMenuPostId(activeMenuPostId === postId ? null : postId);
  };

  const handleBanUser = (authorName: string) => {
    alert(`User ${authorName} has been banned from the platform.`);
    setActiveMenuPostId(null);
  };

  const FeedTab = () => (
    <div className="lg:col-span-2 space-y-6 animate-fade-in">
      {/* Stories Bar */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
         <div className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0">
           <div className="w-16 h-16 rounded-full border-2 border-gray-700 p-1 relative">
             <img src={currentUser.avatar} alt="You" className="w-full h-full rounded-full object-cover" />
             <div className="absolute bottom-0 right-0 bg-energy-500 text-white rounded-full p-0.5 border-2 border-gray-900">
               <Plus size={14} />
             </div>
           </div>
           <span className="text-xs text-gray-400">Add Story</span>
         </div>
         
         {stories.map(story => (
           <div key={story.id} className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0">
             <div className={`w-16 h-16 rounded-full p-0.5 ${story.viewed ? 'border border-gray-600' : 'bg-gradient-to-tr from-energy-500 to-purple-500'}`}>
               <div className="w-full h-full rounded-full border-2 border-gray-900 overflow-hidden">
                 <img src={story.image} alt={story.user.name} className="w-full h-full object-cover" />
               </div>
             </div>
             <span className="text-xs text-gray-400 truncate w-16 text-center">{story.user.name}</span>
           </div>
         ))}
      </div>

      {/* Create Post */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
        <div className="flex space-x-4">
          <img src={currentUser.avatar} alt="Me" className="w-10 h-10 rounded-full border border-gray-700" />
          <div className="flex-1">
            <textarea
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-energy-500 transition-colors resize-none h-24"
              placeholder="Share your renewable journey or project update..."
            ></textarea>
            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-energy-400 hover:bg-gray-800 rounded-lg transition-colors tooltip" title="Upload Image">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors tooltip" title="Upload Video">
                  <VideoIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors tooltip" title="Add Emoji">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center space-x-2 bg-energy-500 hover:bg-energy-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                <Send className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:border-gray-700 transition-colors relative">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-gray-700" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white hover:text-energy-400 cursor-pointer">{post.author.name}</h3>
                    {post.author.badges.includes('Official') && (
                      <span className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5 py-0.5 rounded border border-blue-500/30">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{post.author.handle} · {post.timestamp}</p>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleMenu(post.id)}
                  className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                
                {activeMenuPostId === post.id && (
                  <div className="absolute right-0 top-8 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden animate-fade-in">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm text-gray-300 flex items-center space-x-2">
                      <Flag size={16} /> <span>Report Post</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm text-gray-300 flex items-center space-x-2">
                      <Slash size={16} /> <span>Block User</span>
                    </button>
                    <button 
                      onClick={() => handleBanUser(post.author.name)}
                      className="w-full text-left px-4 py-3 hover:bg-red-900/20 text-sm text-red-400 flex items-center space-x-2"
                    >
                      <UserX size={16} /> <span>Ban User</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 mb-4">
              <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
              {post.image && (
                <div className="rounded-xl overflow-hidden border border-gray-800">
                  <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
                </div>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-energy-400 hover:text-energy-300 cursor-pointer">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-green-500/10">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-red-500/10">
                    <ThumbsDown className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{post.dislikes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-gray-800">
                  <Share2 className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MessagesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] animate-fade-in bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
       {/* Sidebar */}
       <div className="col-span-1 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
             <h3 className="text-xl font-bold text-white mb-4">Messages</h3>
             <input type="text" placeholder="Search chats..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-energy-500" />
          </div>
          <div className="flex-1 overflow-y-auto">
             {[1, 2, 3, 4, 5].map(i => (
               <div 
                 key={i} 
                 onClick={() => setSelectedChatUser(`User ${i}`)}
                 className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-colors ${selectedChatUser === `User ${i}` ? 'bg-gray-800' : ''}`}
               >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                       <Users size={20} />
                    </div>
                    {i % 2 === 0 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-baseline mb-1">
                        <span className="text-white font-medium truncate">Dao Member {i}</span>
                        <span className="text-xs text-gray-500">10m</span>
                     </div>
                     <p className="text-sm text-gray-500 truncate">Hey, did you check the latest proposal?</p>
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Chat Window */}
       <div className="col-span-1 md:col-span-2 flex flex-col bg-gray-900/50">
          {selectedChatUser ? (
            <>
               <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <Users size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-white">{selectedChatUser}</h4>
                        <span className="text-xs text-green-500">Online</span>
                     </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full">
                     <MoreHorizontal size={20} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-start">
                     <div className="bg-gray-800 text-gray-200 rounded-r-xl rounded-tl-xl px-4 py-3 max-w-[70%]">
                        Hello! Are you going to the town hall meeting later?
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <div className="bg-energy-600 text-white rounded-l-xl rounded-tr-xl px-4 py-3 max-w-[70%]">
                        Yes, definitely. I want to ask about the Baghpat expansion.
                     </div>
                  </div>
                  <div className="flex justify-start">
                     <div className="bg-gray-800 text-gray-200 rounded-r-xl rounded-tl-xl px-4 py-3 max-w-[70%]">
                        Great! See you there.
                     </div>
                  </div>
               </div>

               <div className="p-4 bg-gray-900 border-t border-gray-800">
                  <div className="flex items-center space-x-3 bg-gray-800 rounded-xl px-4 py-2 border border-gray-700">
                     <button className="text-gray-400 hover:text-white"><Plus size={20} /></button>
                     <input type="text" placeholder="Type a message..." className="bg-transparent border-none focus:ring-0 flex-1 text-white placeholder-gray-500" />
                     <button className="text-energy-500 hover:text-energy-400"><Send size={20} /></button>
                  </div>
               </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
               <MessageSquare size={64} className="mb-4 opacity-20" />
               <p className="text-lg">Select a conversation to start messaging</p>
            </div>
          )}
       </div>
    </div>
  );

  const LiveHallsTab = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Live Community Halls</h2>
          <button className="bg-energy-600 hover:bg-energy-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
             <Video size={18} /> Create Room
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
             { name: "Town Hall: Q3 Roadmap", users: 124, tag: "Official" },
             { name: "Tech Talk: Solar IoT", users: 45, tag: "Engineering" },
             { name: "Chill Lounge", users: 12, tag: "Community" },
             { name: "Governance Debate", users: 89, tag: "Politics" },
          ].map((room, i) => (
             <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-energy-500/50 transition-colors group">
                <div className="h-40 bg-gray-800 relative">
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
                         <Video size={32} className="text-white" />
                      </div>
                   </div>
                   <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
                   </div>
                   <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                      {room.tag}
                   </div>
                </div>
                <div className="p-5">
                   <h3 className="text-lg font-bold text-white mb-2">{room.name}</h3>
                   <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                         <Users size={16} />
                         <span>{room.users} Watching</span>
                      </div>
                      <button className="px-4 py-1.5 rounded-lg border border-energy-500 text-energy-400 text-sm font-bold hover:bg-energy-500 hover:text-white transition-all">
                         Join
                      </button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Social Hub</h1>
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-lg border border-gray-800">
          {[
            { id: 'feed', icon: MessageSquare, label: 'Feed' },
            { id: 'messages', icon: MessageCircle, label: 'Messages' },
            { id: 'live', icon: Video, label: 'Live Halls' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-energy-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'feed' && <FeedTab />}
      {activeTab === 'messages' && <MessagesTab />}
      {activeTab === 'live' && <LiveHallsTab />}

      {activeTab === 'feed' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Widgets could go here if layout changes to support sidebar in feed view */}
        </div>
      )}
    </div>
  );
};

export default SocialFeed;
