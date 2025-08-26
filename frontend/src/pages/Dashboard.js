import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Heart, 
  Send, 
  Gift, 
  History, 
  Star
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Removed buy tokens feature

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchDashboardData();
    }
    if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const [balanceRes, historyRes] = await Promise.all([
        axios.get('/api/tokens/balance'),
        axios.get('/api/tokens/history?limit=5')
      ]);

      setBalance(balanceRes.data.balance);
      setRecentTransactions(historyRes.data.transactions);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // handleBuyTokens removed

  const quickActions = [
    {
      title: 'Send Tokens',
      description: 'Send tokens to someone special',
      icon: Send,
      path: '/send-tokens',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    // Removed Buy Tokens action
    {
      title: 'Redeem Rewards',
      description: 'Convert tokens to rewards',
      icon: Gift,
      path: '/rewards',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'View History',
      description: 'See all transactions',
      icon: History,
      path: '/history',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'SEND':
        return <Send className="w-5 h-5" />;
      case 'RECEIVE':
        return <Heart className="w-5 h-5" />;
      case 'PURCHASE':
        return <Star className="w-5 h-5" />;
      case 'REDEEM':
        return <Gift className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type, isSender) => {
    if (type === 'SEND' && isSender) return 'text-red-400';
    if (type === 'RECEIVE' || (type === 'SEND' && !isSender)) return 'text-green-400';
    if (type === 'PURCHASE') return 'text-blue-400';
    if (type === 'REDEEM') return 'text-purple-400';
    return 'text-white/60';
  };

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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-white/70">
            Ready to spread some gratitude today?
          </p>
        </motion.div>

        {/* Token Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass p-8 rounded-2xl mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Your Token Balance</h2>
              <div className="text-4xl font-bold gradient-text">{balance}</div>
              <p className="text-white/80">tokens available</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-glow">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="glass p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={action.path ? () => {} : action.action}
              >
                {action.path ? (
                  <Link to={action.path} className="block">
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-glow`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm">{action.description}</p>
                  </Link>
                ) : (
                  <div>
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-glow`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-white/70 text-sm">{action.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
            <Link to="/history" className="text-purple-400 hover:text-purple-300 font-medium">
              View All
            </Link>
          </div>
          
          <div className="glass rounded-2xl">
            {recentTransactions.length > 0 ? (
              <div className="space-y-4 p-6">
                {recentTransactions.map((transaction) => {
                  const isSender = transaction.sender?._id === user?._id;
                  const otherUser = isSender ? transaction.recipient : transaction.sender;
                  
                  return (
                    <div key={transaction._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.transactionType)}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {transaction.transactionType === 'SEND' && isSender && `Sent to ${otherUser?.firstName} ${otherUser?.lastName}`}
                            {transaction.transactionType === 'SEND' && !isSender && `Received from ${otherUser?.firstName} ${otherUser?.lastName}`}
                            {transaction.transactionType === 'PURCHASE' && 'Token Purchase'}
                            {transaction.transactionType === 'REDEEM' && 'Reward Redemption'}
                          </p>
                          <p className="text-sm text-white/70">{transaction.message}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.transactionType, isSender)}`}>
                          {transaction.transactionType === 'SEND' && isSender ? '-' : '+'}{transaction.amount}
                        </p>
                        <p className="text-xs text-white/50">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No transactions yet. Start by sending some tokens!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Buy Tokens Modal removed */}
      </div>
    </div>
  );
};

export default Dashboard; 