import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Send, 
  Heart, 
  Search, 
  User,
  ArrowLeft
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const SendTokens = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientEmail: '',
    amount: 1,
    message: ''
  });
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/tokens/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Don't handle amount field here - it has its own handler
    if (name === 'amount') return;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Search for users when email is typed
    if (name === 'recipientEmail' && value.length >= 3) {
      searchUsers(value);
    } else if (name === 'recipientEmail' && value.length < 3) {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const searchUsers = async (email) => {
    try {
      const response = await axios.get(`/api/users/search?email=${email}`);
      setSearchResults(response.data.users);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const selectUser = (user) => {
    setFormData(prev => ({
      ...prev,
      recipientEmail: user.email
    }));
    setShowSearchResults(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.amount > balance) {
      toast.error('Insufficient token balance');
      return;
    }

    if (formData.amount < 1) {
      toast.error('Amount must be at least 1 token');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/tokens/send', formData);
      toast.success(`Successfully sent ${formData.amount} tokens!`);
      setBalance(response.data.newBalance);
      
      // Reset form
      setFormData({
        recipientEmail: '',
        amount: 1,
        message: ''
      });
      
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send tokens';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const suggestedMessages = [
    "Thank you for being amazing! 💜",
    "You make the world a better place! 🌟",
    "Grateful for your kindness and support! 🙏",
    "You deserve all the appreciation! ✨",
    "Thank you for being you! 💖"
  ];

  const selectMessage = (message) => {
    setFormData(prev => ({
      ...prev,
      message
    }));
  };

  return (
    <div className="min-h-screen bg-black relative">
      <ParticlesBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-glow">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Send Tokens</h1>
              <p className="text-white/70">Spread gratitude to someone special</p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Send Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient Email */}
                <div>
                  <label htmlFor="recipientEmail" className="block text-sm font-medium text-white/90 mb-2">
                    Recipient Email
                  </label>
                  <div className="relative">
                    <input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      required
                      value={formData.recipientEmail}
                      onChange={handleChange}
                      className="input-field w-full pr-10"
                      placeholder="Enter recipient's email"
                    />
                    <Search className="w-5 h-5 text-white/40 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  
                  {/* Search Results */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 glass border border-white/10 rounded-xl shadow-lg max-h-48 overflow-y-auto" style={{ top: '100%' }}>
                      {searchResults.map((result) => (
                        <button
                          key={result._id}
                          type="button"
                          onClick={() => selectUser(result)}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center space-x-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {result.firstName} {result.lastName}
                            </div>
                            <div className="text-white/60 text-sm">
                              {result.email}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-white/90 mb-2">
                    Number of Tokens
                  </label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    max={balance}
                    required
                    value={formData.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === '' ? 0 : parseInt(value, 10);
                      setFormData(prev => ({ ...prev, amount: numValue }));
                    }}
                    className="input-field w-full"
                    placeholder="Enter amount"
                  />
                  <p className="text-sm text-white/60 mt-1">
                    Available: {balance} tokens
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field w-full resize-none"
                    placeholder="Add a personal message..."
                  />
                </div>

                {/* Suggested Messages */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Quick Messages
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestedMessages.map((message, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectMessage(message)}
                        className="text-left p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                      >
                        {message}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || formData.amount > balance}
                  className="btn-primary w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Tokens
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tips */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">💡 Tips</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p>• Send tokens to express gratitude</p>
                <p>• Add a personal message to make it special</p>
                <p>• Recipients will receive an email notification</p>
                <p>• You can send tokens to anyone with an account</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Sent 5 tokens</p>
                    <p className="text-white/60 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Received 3 tokens</p>
                    <p className="text-white/60 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SendTokens; 