'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Instagram, Facebook, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Permanent Makeup', href: '/services#permanent-makeup' },
      { name: 'Microblading', href: '/services/microblading' },
      { name: 'Powder Brows', href: '/services/powder-brows' },
      { name: 'Lip Blush', href: '/services/lip-blush' },
      { name: 'Advanced Treatments', href: '/services#advanced-treatments' },
      { name: 'RF Microneedling', href: '/services/rf-microneedling' },
      { name: 'PRP Facial', href: '/services/prp-facial' },
    ],
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-charcoal-900 text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+15551234567" className="flex items-center hover:text-blush-400 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-4567
              </a>
              <span className="text-gray-400">|</span>
              <span>Mon-Sat: 9AM-6PM</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com/beloffbeauty" target="_blank" rel="noopener noreferrer" 
                className="hover:text-blush-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/beloffbeauty" target="_blank" rel="noopener noreferrer"
                className="hover:text-blush-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="text-2xl font-elegant text-charcoal-900">
                  Beloff<span className="text-gradient">Beauty</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-charcoal-700 hover:text-blush-600 font-medium transition-colors py-2"
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-elegant mt-2 py-2 overflow-hidden"
                      >
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-3 text-charcoal-700 hover:bg-blush-50 hover:text-blush-600 transition-colors"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* CTA Button */}
              <Link
                href="/booking"
                className="btn-primary ml-4"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal-900" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-3 text-charcoal-700 hover:text-blush-600 font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block py-2 text-sm text-charcoal-600 hover:text-blush-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/booking"
                  className="block w-full btn-primary text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}