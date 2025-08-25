import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 3,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const Particle = ({ particle }) => {
    return (
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 backdrop-blur-sm"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        }}
        animate={{
          x: [0, (Math.random() - 0.5) * 20, 0],
          y: [0, (Math.random() - 0.5) * 20, 0],
          opacity: [0, 0.6, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  };

  const FloatingOrbs = () => {
    const orbs = [
      { size: 200, x: 10, y: 20, color: 'from-purple-500/20 to-pink-500/20' },
      { size: 150, x: 80, y: 60, color: 'from-pink-500/20 to-purple-500/20' },
      { size: 300, x: 60, y: 80, color: 'from-purple-400/15 to-pink-400/15' },
    ];

    return orbs.map((orb, index) => (
      <motion.div
        key={index}
        className={`absolute rounded-full bg-gradient-to-r ${orb.color} blur-3xl`}
        style={{
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          left: `${orb.x}%`,
          top: `${orb.y}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 2,
        }}
      />
    ));
  };

  return (
    <div className="particles-container">
      <FloatingOrbs />
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} />
      ))}
    </div>
  );
};

export default ParticlesBackground; 