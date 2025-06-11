'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import Link from 'next/link';

export default function FloatingBookingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show button after scrolling down 100px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Expanded State */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-elegant p-6 w-80"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Ready to Book?
                </h3>
                
                <div className="space-y-3">
                  <Link
                    href="/booking"
                    className="block w-full btn-primary text-center"
                    onClick={() => setIsExpanded(false)}
                  >
                    Book Appointment
                  </Link>
                  
                  <Link
                    href="/services"
                    className="block w-full btn-secondary text-center"
                    onClick={() => setIsExpanded(false)}
                  >
                    View Services
                  </Link>
                  
                  <div className="text-center">
                    <p className="text-sm text-charcoal-600 mb-1">
                      Or call us directly
                    </p>
                    <a
                      href="tel:+15551234567"
                      className="text-blush-600 font-semibold hover:text-blush-700"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              relative group bg-gradient-to-r from-blush-500 to-blush-600 
              text-white rounded-full shadow-elegant hover:shadow-glow 
              transition-all duration-300 overflow-hidden
              ${isExpanded ? 'w-14 h-14' : 'px-6 py-4'}
            `}
          >
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-blush-400 opacity-75 animate-ping" />
            
            {/* Button Content */}
            <span className="relative flex items-center justify-center">
              <Calendar className="w-5 h-5" />
              {!isExpanded && (
                <span className="ml-2 font-semibold whitespace-nowrap">
                  Book Now
                </span>
              )}
            </span>

            {/* Shimmer Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear',
                repeatDelay: 3,
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}