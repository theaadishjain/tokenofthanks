import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradient = ({ children, className = '', variant = 'aurora' }) => {
  const gradients = {
    aurora: 'bg-gradient-aurora',
    sunset: 'bg-gradient-sunset',
    ocean: 'bg-gradient-ocean',
    fire: 'bg-gradient-fire',
    forest: 'bg-gradient-forest',
    space: 'bg-gradient-space',
    mesh: 'bg-gradient-mesh',
  };

  const gradientClass = gradients[variant] || gradients.aurora;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={`absolute inset-0 ${gradientClass} animate-gradient-xy`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradient; 