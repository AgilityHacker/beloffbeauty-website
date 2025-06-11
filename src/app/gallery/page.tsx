'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryItems as realGalleryItems } from '@/data/galleryData';

// Gallery categories
const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'eyebrows', name: 'Permanent Eyebrows' },
  { id: 'lips', name: 'Lip Enhancement' },
  { id: 'microneedling', name: 'Microneedling' },
  { id: 'facial', name: 'Facial Treatments' },
];

// Real gallery data using Svetlana's beautiful work
const galleryItems = realGalleryItems.length > 0 ? realGalleryItems : [
  {
    id: 1,
    category: 'eyebrows',
    title: 'Microblading Transformation',
    before: '/images/gallery/eyebrows-before-1.jpg',
    after: '/images/gallery/eyebrows-after-1.jpg',
    technique: 'Microblading',
    description: 'Natural hair-stroke technique for fuller brows',
  },
  {
    id: 2,
    category: 'eyebrows',
    title: 'Powder Brow Perfection',
    before: '/images/gallery/eyebrows-before-2.jpg',
    after: '/images/gallery/eyebrows-after-2.jpg',
    technique: 'Powder Brow',
    description: 'Soft, powdered effect for defined brows',
  },
  {
    id: 3,
    category: 'lips',
    title: 'Natural Lip Blush',
    before: '/images/gallery/lips-before-1.jpg',
    after: '/images/gallery/lips-after-1.jpg',
    technique: 'Lip Blush',
    description: 'Enhanced natural lip color and definition',
  },
  {
    id: 4,
    category: 'microneedling',
    title: 'RF Microneedling Results',
    before: '/images/gallery/microneedling-before-1.jpg',
    after: '/images/gallery/microneedling-after-1.jpg',
    technique: 'RF Microneedling',
    description: 'Skin tightening and texture improvement',
  },
  {
    id: 5,
    category: 'eyebrows',
    title: 'Combination Brow Art',
    before: '/images/gallery/eyebrows-before-3.jpg',
    after: '/images/gallery/eyebrows-after-3.jpg',
    technique: 'Combination',
    description: 'Perfect blend of hair strokes and shading',
  },
  {
    id: 6,
    category: 'lips',
    title: 'Full Lip Color',
    before: '/images/gallery/lips-before-2.jpg',
    after: '/images/gallery/lips-after-2.jpg',
    technique: 'Full Color',
    description: 'Bold, lasting lip color enhancement',
  },
  {
    id: 7,
    category: 'facial',
    title: 'Chemical Peel Glow',
    before: '/images/gallery/facial-before-1.jpg',
    after: '/images/gallery/facial-after-1.jpg',
    technique: 'Chemical Peel',
    description: 'Renewed skin with improved tone and texture',
  },
  {
    id: 8,
    category: 'microneedling',
    title: 'PRP Vampire Facial',
    before: '/images/gallery/prp-before-1.jpg',
    after: '/images/gallery/prp-after-1.jpg',
    technique: 'PRP Microneedling',
    description: 'Natural rejuvenation using growth factors',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [showingBefore, setShowingBefore] = useState(true);

  // Filter gallery items based on category
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Navigation functions
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedItem(filteredItems[newIndex]);
    setShowingBefore(true); // Reset to before image
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-elegant text-charcoal-900 mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
              Witness the transformative power of our treatments. Every result tells a story 
              of enhanced natural beauty and renewed confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blush-600 text-white shadow-lg'
                    : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowingBefore(true);
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-elegant transition-all duration-300">
                    {/* Before/After Toggle */}
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.after}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <ZoomIn className="w-6 h-6 text-charcoal-900" />
                        </div>
                      </div>
                      
                      {/* Labels */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {item.technique}
                        </span>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-charcoal-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-charcoal-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-charcoal-600">No items found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="grid lg:grid-cols-2">
                {/* Before Image */}
                <div className="relative aspect-[4/5] lg:aspect-auto">
                  <div className="absolute top-4 left-4 z-10 bg-charcoal-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Before
                  </div>
                  <Image
                    src={selectedItem.before}
                    alt={`${selectedItem.title} - Before`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* After Image */}
                <div className="relative aspect-[4/5] lg:aspect-auto">
                  <div className="absolute top-4 left-4 z-10 bg-blush-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    After
                  </div>
                  <Image
                    src={selectedItem.after}
                    alt={`${selectedItem.title} - After`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 bg-gray-50">
                <h3 className="text-2xl font-semibold text-charcoal-900 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-charcoal-600 mb-4">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blush-100 text-blush-700 px-4 py-2 rounded-full text-sm font-medium">
                    {selectedItem.technique}
                  </span>
                  <span className="bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium">
                    Professional Results
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}