import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Send, 
  Gift, 
  ArrowRight,
  Sparkles,
  Shield,
  Coffee
} from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';
import AnimatedGradient from '../components/AnimatedGradient';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (isAuthenticated) {
          const res = await axios.get('/api/tokens/balance');
          setBalance(res.data.balance);
        } else {
          setBalance(null);
        }
      } catch (e) {
        setBalance(null);
      }
    };
    fetchBalance();
  }, [isAuthenticated]);

  const HeroSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <ParticlesBackground />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div ref={ref} className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <motion.div
                  className="inline-flex items-center justify-center p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-8 h-8 text-purple-400" />
                </motion.div>
                
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <span className="gradient-text">Send.</span>
                  <br />
                  <span className="gradient-text">Redeem.</span>
                  <br />
                  <span className="gradient-text">Enjoy.</span>
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Turn gratitude into real rewards. Fast. Fun. Feels good.
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 items-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <AnimatedButton
                    variant="gradient"
                    size="lg"
                    icon={<Sparkles className="w-5 h-5" />}
                    onClick={() => navigate('/register')}
                  >
                    Start Now
                  </AnimatedButton>
                  
                  <AnimatedButton
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    Learn how
                  </AnimatedButton>
                </motion.div>

                <motion.div
                  className="mt-12 text-white/60"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <p className="text-lg mb-2">Trusted by cafés & teams</p>
                  <p className="text-sm">Starter tokens for new signups</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Token Wallet (shows real balance when logged in) */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="glass p-8 rounded-3xl"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Token Wallet</h3>
                  {isAuthenticated && balance !== null ? (
                    <>
                      <div className="text-4xl font-bold gradient-text">{balance}</div>
                      <p className="text-white/60">tokens</p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold gradient-text">Sign in</div>
                      <p className="text-white/60">to view your balance</p>
                    </>
                  )}
                </div>

                {/* Reward Card */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Coffee className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">Free Cappuccino</h4>
                      <p className="text-white/70 text-sm mb-4">
                        Redeem for a hot cup at participating cafés
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-semibold">20 tokens</span>
                        <span className="text-white/50 text-sm">Limited</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <AnimatedButton
                      variant="gradient"
                      size="sm"
                      className="flex-1"
                    >
                      Redeem
                    </AnimatedButton>
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      Save
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/40 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    );
  };

  const FeaturesSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    const features = [
      {
        icon: Send,
        title: 'Instant Delivery',
        description: 'Send tokens instantly to anyone, anywhere',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Gift,
        title: 'Real Rewards',
        description: 'Convert tokens into actual experiences and products',
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: Shield,
        title: 'Secure & Private',
        description: 'Your data is protected with enterprise-grade security',
        color: 'from-purple-500 to-pink-500'
      }
    ];

    return (
      <section className="py-32 relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        
        <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why Choose <span className="gradient-text">Token of Thanks</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of gratitude with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={feature.title}
                variant="primary"
                delay={index}
                className="p-8 text-center"
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const CTASection = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
      <section className="py-32 relative bg-black">
        <AnimatedGradient variant="aurora" className="absolute inset-0 opacity-10" />
        
        <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Start Spreading <span className="gradient-text">Gratitude</span>?
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              Join thousands of users who are already making the world a kinder place, one token at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <AnimatedButton
                variant="gradient"
                size="xl"
                icon={<ArrowRight className="w-6 h-6" />}
                onClick={() => navigate('/register')}
              >
                Create Your Account
              </AnimatedButton>
              
              <AnimatedButton
                variant="secondary"
                size="xl"
                onClick={() => navigate('/login')}
              >
                Sign In
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const Footer = () => {
    return (
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-10 h-10 text-purple-400 mr-3 animate-heartbeat" />
              <span className="text-3xl font-bold gradient-text">Token of Thanks</span>
            </motion.div>
            <p className="text-white/70 mb-6 text-lg">
              Gratitude, Made Effortless
            </p>
            <p className="text-white/50 text-sm">
              © 2024 Token of Thanks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home; 