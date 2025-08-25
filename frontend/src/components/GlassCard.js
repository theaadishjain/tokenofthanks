import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  delay = 0,
  ...props 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const variants = {
    default: 'card-glass',
    hover: 'card-hover',
    primary: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/30',
    accent: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-white/30',
  };

  const cardClass = variants[variant] || variants.default;

  return (
    <motion.div
      ref={ref}
      className={`${cardClass} ${hover ? 'hover:scale-105 hover:-translate-y-2' : ''} ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? {
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard; 