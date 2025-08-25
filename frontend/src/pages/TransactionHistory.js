import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { 
  History, 
  Send, 
  Heart, 
  Plus, 
  Gift,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchTransactions();
  }, [selectedFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/tokens/history?page=${currentPage}&limit=10`);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.pagination.totalPages);
      setTotalTransactions(response.data.pagination.totalTransactions);
      setHasNextPage(response.data.pagination.hasNextPage);
      setHasPrevPage(response.data.pagination.hasPrevPage);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'SEND':
        return <Send className="w-5 h-5" />;
      case 'RECEIVE':
        return <Heart className="w-5 h-5" />;
      case 'PURCHASE':
        return <Plus className="w-5 h-5" />;
      case 'REDEEM':
        return <Gift className="w-5 h-5" />;
      default:
        return <History className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type, isSender) => {
    if (type === 'SEND' && isSender) return 'text-red-400';
    if (type === 'RECEIVE' || (type === 'SEND' && !isSender)) return 'text-green-400';
    if (type === 'PURCHASE') return 'text-blue-400';
    if (type === 'REDEEM') return 'text-purple-400';
    return 'text-white/60';
  };

  const getTransactionTypeLabel = (type) => {
    switch (type) {
      case 'SEND':
        return 'Sent';
      case 'RECEIVE':
        return 'Received';
      case 'PURCHASE':
        return 'Purchased';
      case 'REDEEM':
        return 'Redeemed';
      default:
        return type;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filters = [
    { id: 'ALL', name: 'All Transactions' },
    { id: 'SEND', name: 'Sent' },
    { id: 'RECEIVE', name: 'Received' },
    { id: 'PURCHASE', name: 'Purchased' },
    { id: 'REDEEM', name: 'Redeemed' }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-glow">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Transaction History</h1>
              <p className="text-white/70">View all your token transactions</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass p-4 text-center rounded-xl">
              <div className="text-2xl font-bold gradient-text">{totalTransactions}</div>
              <div className="text-sm text-white/60">Total Transactions</div>
            </div>
            <div className="glass p-4 text-center rounded-xl">
              <div className="text-2xl font-bold text-green-400">
                {transactions.filter(t => t.recipient?._id === user?.id).length}
              </div>
              <div className="text-sm text-white/60">Received</div>
            </div>
            <div className="glass p-4 text-center rounded-xl">
              <div className="text-2xl font-bold text-blue-400">
                {transactions.filter(t => t.transactionType === 'PURCHASE').length}
              </div>
              <div className="text-sm text-white/60">Purchases</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-white/60" />
            <span className="font-medium text-white/90">Filter transactions:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass rounded-2xl">
            {transactions.length > 0 ? (
              <div className="space-y-4 p-6">
                {transactions.map((transaction, index) => {
                  // Check if current user is the sender
                  const isSender = transaction.sender?._id === user?.id;
                  const otherUser = isSender ? transaction.recipient : transaction.sender;
                  
                  return (
                    <motion.div
                      key={transaction._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.transactionType)}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {isSender && `Sent to ${otherUser?.firstName} ${otherUser?.lastName}`}
                            {!isSender && `Received from ${otherUser?.firstName} ${otherUser?.lastName}`}
                          </p>
                          {transaction.message && (
                            <p className="text-sm text-white/70 mt-1">{transaction.message}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-3 h-3 text-white/50" />
                            <span className="text-xs text-white/50">{formatDate(transaction.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${getTransactionColor(transaction.transactionType, isSender)}`}>
                          {isSender ? '-' : '+'}{transaction.amount}
                        </p>
                        <p className="text-xs text-white/50">
                          {isSender ? 'Sent' : 'Received'}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
                <p className="text-white/60">
                  {selectedFilter === 'ALL' 
                    ? 'You haven\'t made any transactions yet.' 
                    : `No ${selectedFilter.toLowerCase()} transactions found.`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-between mt-8"
            >
              <div className="text-white/60">
                Page {currentPage} of {totalPages} ({totalTransactions} total transactions)
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionHistory; 