import React from "react";
import { motion } from "framer-motion";

const AnimatedTitle = () => {
  return (
    <div className="text-center py-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Main Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Habesha Hotels
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl mt-4 font-medium"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
       
        Discover our wide range of hotels in prime locations—choose the one closest to you and book your perfect stay today!
        
      </motion.p>

      {/* CTA Button */}
      <motion.button
        className="mt-6 px-8 py-3 text-lg font-semibold rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        
      >
        Explore Now
      </motion.button>
    </div>
  );
};

export default AnimatedTitle;
