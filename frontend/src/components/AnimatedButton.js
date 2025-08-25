import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 hover:-translate-y-1',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl',
  };

  const buttonClass = `${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ 
        scale: disabled || loading ? 1 : 1.05,
        y: disabled || loading ? 0 : -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled || loading ? 1 : 0.95,
        y: 0,
        transition: { duration: 0.1 }
      }}
      animate={isPressed && !disabled && !loading ? { scale: 0.95 } : { scale: 1 }}
      {...props}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={loading ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {icon && !loading && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.div>
        )}
        <span>{children}</span>
      </motion.div>
      
      {/* Ripple effect */}
      {!disabled && !loading && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={isPressed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedButton; 