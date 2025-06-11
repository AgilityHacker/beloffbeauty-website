'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    service: 'Microblading',
    rating: 5,
    text: 'I cannot express how happy I am with my microblading results! The attention to detail and professionalism exceeded all expectations. My brows look so natural, everyone thinks they\'re real!',
    image: '/images/testimonials/sarah.jpg',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    service: 'Lip Blush',
    rating: 5,
    text: 'The lip blush treatment transformed my lips completely. The color is perfect and so natural. I wake up feeling confident and beautiful. Best investment I\'ve made in myself!',
    image: '/images/testimonials/maria.jpg',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Emily Chen',
    service: 'RF Microneedling',
    rating: 5,
    text: 'After just 3 sessions of RF microneedling, my skin has never looked better. Fine lines diminished, pores tightened, and my overall skin texture improved dramatically. Highly recommend!',
    image: '/images/testimonials/emily.jpg',
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Jessica Williams',
    service: 'Powder Brows',
    rating: 5,
    text: 'The powder brow technique gave me the perfect soft, filled-in look I wanted. The healing process was smooth, and the results are exactly what I envisioned. Professional and talented!',
    image: '/images/testimonials/jessica.jpg',
    date: '2 months ago',
  },
  {
    id: 5,
    name: 'Alexandra Petrov',
    service: 'Combination Brows',
    rating: 5,
    text: 'Best decision ever! The combination of hair strokes and shading created the most natural-looking brows. The artist\'s skill and attention to symmetry is outstanding.',
    image: '/images/testimonials/alexandra.jpg',
    date: '6 weeks ago',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    goToTestimonial((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    goToTestimonial(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  // Calculate visible testimonials for desktop view
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-elegant text-charcoal-900 mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            Real stories from real clients. Discover why we're the trusted choice 
            for permanent makeup and advanced beauty treatments.
          </p>
        </motion.div>

        {/* Mobile View - Single Card */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-soft p-8"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View - Three Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: index === 1 ? 1 : 0.7,
                    scale: index === 1 ? 1 : 0.95
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-2xl shadow-soft p-8 ${
                    index === 1 ? 'shadow-elegant' : ''
                  }`}
                >
                  <TestimonialCard testimonial={testimonial} featured={index === 1} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-charcoal-700" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-blush-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-charcoal-700" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({ 
  testimonial, 
  featured = false 
}: { 
  testimonial: typeof testimonials[0];
  featured?: boolean;
}) {
  return (
    <>
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className={`w-10 h-10 ${featured ? 'text-blush-600' : 'text-blush-400'}`} />
      </div>

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-charcoal-700 mb-6 italic">
        "{testimonial.text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-charcoal-900">{testimonial.name}</h4>
          <p className="text-sm text-charcoal-600">
            {testimonial.service} • {testimonial.date}
          </p>
        </div>
      </div>
    </>
  );
}