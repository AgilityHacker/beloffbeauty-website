'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Perfect Brows,',
    subtitle: 'Lasting Confidence',
    description: 'Wake up with flawless eyebrows every day. Our expert microblading and powder brow techniques create natural-looking results that enhance your beauty.',
    image: '/images/instagram/beauty-work-1.jpg',
    cta: 'Book Consultation',
    ctaLink: '/booking',
    stats: { number: '500+', label: 'Happy Clients' },
  },
  {
    id: 2,
    title: 'Lip Perfection,',
    subtitle: 'Natural Enhancement',
    description: 'Enhance your natural lip color with our signature lip blush technique. Get the perfect pout that lasts for years.',
    image: '/images/instagram/beauty-work-2.jpg',
    cta: 'View Services',
    ctaLink: '/services',
    stats: { number: '10+', label: 'Years Experience' },
  },
  {
    id: 3,
    title: 'Advanced Skincare,',
    subtitle: 'Radiant Results',
    description: 'Transform your skin with our cutting-edge RF microneedling and PRP treatments. Experience the future of facial rejuvenation.',
    image: '/images/instagram/beauty-work-3.jpg',
    cta: 'Learn More',
    ctaLink: '/services#advanced-treatments',
    stats: { number: '4.9/5', label: 'Star Rating' },
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-white text-sm">127 Reviews</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl lg:text-7xl font-elegant text-white mb-4 leading-tight">
                      {slide.title}
                      <span className="block text-blush-400">{slide.subtitle}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-200 mb-8 max-w-xl">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      <Link
                        href={slide.ctaLink}
                        className="btn-elegant text-white"
                      >
                        {slide.cta}
                      </Link>
                      <Link
                        href="/gallery"
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/30"
                      >
                        View Gallery
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-3xl font-bold text-white">{slide.stats.number}</div>
                        <div className="text-gray-300 text-sm">{slide.stats.label}</div>
                      </div>
                      <div className="h-12 w-px bg-white/30" />
                      <div>
                        <div className="text-sm text-gray-300">Licensed & Insured</div>
                        <div className="text-white font-medium">Professional Artist</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-3 bg-blush-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}