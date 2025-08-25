import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Gift, 
  Coffee, 
  Film, 
  ShoppingBag, 
  Star,
  Filter
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rewardsRes, balanceRes] = await Promise.all([
        axios.get('/api/rewards'),
        axios.get('/api/tokens/balance')
      ]);
      setRewards(rewardsRes.data.rewards);
      setBalance(balanceRes.data.balance);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load rewards');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    setRedeeming(rewardId);
    
    try {
      const response = await axios.post(`/api/rewards/${rewardId}/redeem`);
      setBalance(response.data.newBalance);
      toast.success(`Successfully redeemed ${response.data.transaction.metadata.rewardName}!`);
      
      // Refresh rewards to update stock
      const rewardsRes = await axios.get('/api/rewards');
      setRewards(rewardsRes.data.rewards);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to redeem reward';
      toast.error(message);
    } finally {
      setRedeeming(null);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'FOOD':
        return <Coffee className="w-5 h-5" />;
      case 'ENTERTAINMENT':
        return <Film className="w-5 h-5" />;
      case 'SHOPPING':
        return <ShoppingBag className="w-5 h-5" />;
      case 'EXPERIENCE':
        return <Star className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'FOOD':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'ENTERTAINMENT':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'SHOPPING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'EXPERIENCE':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const categories = [
    { id: 'ALL', name: 'All Rewards' },
    { id: 'FOOD', name: 'Food & Drinks' },
    { id: 'ENTERTAINMENT', name: 'Entertainment' },
    { id: 'SHOPPING', name: 'Shopping' },
    { id: 'EXPERIENCE', name: 'Experiences' },
    { id: 'OTHER', name: 'Other' }
  ];

  const filteredRewards = selectedCategory === 'ALL' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-8 h-8 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <ParticlesBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-glow">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Rewards</h1>
              <p className="text-white/70">Redeem your tokens for amazing rewards</p>
            </div>
          </div>

          {/* Balance Display */}
          <div className="glass p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium">Your Balance:</span>
              <span className="text-2xl font-bold gradient-text">{balance} tokens</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-white/60" />
            <span className="font-medium text-white/90">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Rewards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
                >
                  {/* Reward Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center shadow-glow">
                    <Gift className="w-12 h-12 text-white" />
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(reward.category)}`}>
                      {getCategoryIcon(reward.category)}
                      <span className="ml-1">{reward.category}</span>
                    </span>
                    {reward.stock > 0 && (
                      <span className="text-xs text-white/50">
                        {reward.stock} left
                      </span>
                    )}
                  </div>

                  {/* Reward Info */}
                  <h3 className="text-xl font-bold text-white mb-2">{reward.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{reward.description}</p>

                  {/* Price and Redeem Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold gradient-text">
                      {reward.tokenCost} tokens
                    </div>
                    <button
                      onClick={() => handleRedeem(reward._id)}
                      disabled={redeeming === reward._id || reward.stock === 0 || balance < reward.tokenCost}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {redeeming === reward._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : reward.stock === 0 ? (
                        'Out of Stock'
                      ) : balance < reward.tokenCost ? (
                        'Insufficient Tokens'
                      ) : (
                        'Redeem'
                      )}
                    </button>
                  </div>

                  {/* Stock Warning */}
                  {reward.stock > 0 && reward.stock <= 5 && (
                    <div className="mt-3 p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                      <p className="text-orange-400 text-xs">
                        ⚠️ Only {reward.stock} left in stock!
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No rewards found</h3>
              <p className="text-white/60">
                {selectedCategory === 'ALL' 
                  ? 'No rewards are currently available.' 
                  : `No rewards found in the ${selectedCategory.toLowerCase()} category.`
                }
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Rewards; 