'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Check, Star, ArrowRight, Info } from 'lucide-react';

// Service categories
const serviceCategories = [
  {
    id: 'permanent-makeup',
    name: 'Permanent Makeup',
    description: 'Semi-permanent cosmetic treatments for lasting beauty',
    icon: '💄',
    services: [
      {
        id: 'microblading',
        name: 'Microblading',
        description: 'Create natural-looking hair strokes for fuller, perfectly shaped eyebrows',
        duration: '2-3 hours',
        price: '$450',
        touchUp: '$150',
        benefits: [
          'Natural hair-like strokes',
          'Customized shape and color',
          'Lasts 12-18 months',
          'Perfect for sparse brows',
        ],
        process: [
          'Consultation & design',
          'Numbing application',
          'Hair stroke creation',
          'Color customization',
          'Aftercare instructions',
        ],
        image: '/images/services/microblading.jpg',
      },
      {
        id: 'powder-brows',
        name: 'Powder Brows',
        description: 'Soft, powdered effect for a filled-in makeup look',
        duration: '2-3 hours',
        price: '$500',
        touchUp: '$175',
        benefits: [
          'Soft, makeup effect',
          'Great for oily skin',
          'Lasts 2-3 years',
          'Low maintenance',
        ],
        process: [
          'Shape consultation',
          'Numbing treatment',
          'Powder technique application',
          'Density customization',
          'Healing guidance',
        ],
        image: '/images/services/powder-brows.jpg',
      },
      {
        id: 'combination-brows',
        name: 'Combination Brows',
        description: 'Best of both worlds - hair strokes with powder shading',
        duration: '3 hours',
        price: '$550',
        touchUp: '$200',
        benefits: [
          'Natural front, defined tail',
          'Versatile look',
          'Lasts 18-24 months',
          'Ideal for most brow types',
        ],
        process: [
          'Design consultation',
          'Dual technique approach',
          'Stroke and shade blend',
          'Perfect symmetry',
          'Complete aftercare kit',
        ],
        image: '/images/services/combo-brows.jpg',
      },
      {
        id: 'lip-blush',
        name: 'Lip Blush',
        description: 'Enhance your natural lip color with a subtle tint',
        duration: '2 hours',
        price: '$375',
        touchUp: '$125',
        benefits: [
          'Natural lip enhancement',
          'Corrects asymmetry',
          'Lasts 2-3 years',
          'Customizable color',
        ],
        process: [
          'Lip analysis',
          'Color selection',
          'Numbing application',
          'Gentle tattooing',
          'Hydration treatment',
        ],
        image: '/images/services/lip-blush.jpg',
      },
    ],
  },
  {
    id: 'advanced-treatments',
    name: 'Advanced Facial Treatments',
    description: 'Cutting-edge technology for skin rejuvenation',
    icon: '✨',
    services: [
      {
        id: 'rf-microneedling',
        name: 'RF Microneedling',
        description: 'Radiofrequency energy with microneedling for skin tightening',
        duration: '60-90 min',
        price: '$275',
        package: '3 for $750',
        benefits: [
          'Tightens loose skin',
          'Reduces fine lines',
          'Improves texture',
          'Minimal downtime',
        ],
        process: [
          'Skin cleansing',
          'Numbing cream',
          'RF treatment',
          'Cooling mask',
          'SPF protection',
        ],
        image: '/images/services/rf-microneedling.jpg',
      },
      {
        id: 'prp-facial',
        name: 'PRP Vampire Facial',
        description: 'Your own platelets for natural rejuvenation',
        duration: '90 min',
        price: '$350',
        package: '3 for $950',
        benefits: [
          'Natural growth factors',
          'Improves skin quality',
          'Reduces scarring',
          'Long-lasting results',
        ],
        process: [
          'Blood draw',
          'PRP extraction',
          'Microneedling',
          'PRP application',
          'Recovery care',
        ],
        image: '/images/services/prp-facial.jpg',
      },
      {
        id: 'chemical-peel',
        name: 'Chemical Peels',
        description: 'Professional-grade peels for renewed skin',
        duration: '45-60 min',
        price: 'From $125',
        package: 'Series available',
        benefits: [
          'Exfoliates dead skin',
          'Reduces pigmentation',
          'Smooths texture',
          'Brightens complexion',
        ],
        process: [
          'Skin analysis',
          'Peel selection',
          'Application',
          'Neutralization',
          'Post-peel care',
        ],
        image: '/images/services/chemical-peel.jpg',
      },
      {
        id: 'led-therapy',
        name: 'LED Light Therapy',
        description: 'Therapeutic light for various skin concerns',
        duration: '30 min',
        price: '$75',
        package: '10 for $650',
        benefits: [
          'Reduces inflammation',
          'Stimulates collagen',
          'Kills acne bacteria',
          'No downtime',
        ],
        process: [
          'Skin cleansing',
          'Eye protection',
          'LED exposure',
          'Serum application',
          'Moisturizer',
        ],
        image: '/images/services/led-therapy.jpg',
      },
    ],
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState(serviceCategories[0].id);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const currentCategory = serviceCategories.find(cat => cat.id === selectedCategory)!;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-cream-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-blush-50 via-white to-sage-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-elegant text-charcoal-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
              Discover our comprehensive range of beauty treatments designed to enhance 
              your natural features and boost your confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 mx-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blush-600 text-white shadow-lg'
                    : 'bg-gray-100 text-charcoal-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Category Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-charcoal-900 mb-4">
                {currentCategory.name}
              </h2>
              <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            </div>

            {/* Services */}
            <div className="grid gap-8">
              {currentCategory.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-charcoal-900 mb-2">
                            {service.name}
                          </h3>
                          <p className="text-charcoal-600">
                            {service.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedService(
                            expandedService === service.id ? null : service.id
                          )}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Info className="w-5 h-5 text-charcoal-600" />
                        </button>
                      </div>

                      {/* Pricing and Duration */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-blush-50 px-4 py-2 rounded-full">
                          <span className="text-blush-700 font-semibold">
                            {service.price}
                          </span>
                        </div>
                        <div className="bg-sage-50 px-4 py-2 rounded-full">
                          <Clock className="w-4 h-4 inline mr-1 text-sage-700" />
                          <span className="text-sage-700">{service.duration}</span>
                        </div>
                        {service.touchUp && (
                          <div className="bg-cream-100 px-4 py-2 rounded-full">
                            <span className="text-cream-700">
                              Touch-up: {service.touchUp}
                            </span>
                          </div>
                        )}
                        {service.package && (
                          <div className="bg-charcoal-100 px-4 py-2 rounded-full">
                            <span className="text-charcoal-700">
                              {service.package}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-charcoal-900 mb-3">
                          Benefits
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center">
                              <Check className="w-4 h-4 text-blush-600 mr-2 flex-shrink-0" />
                              <span className="text-sm text-charcoal-600">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expanded Process Info */}
                      {expandedService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t pt-6 mt-6"
                        >
                          <h4 className="font-semibold text-charcoal-900 mb-3">
                            Treatment Process
                          </h4>
                          <ol className="space-y-2">
                            {service.process.map((step, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="bg-blush-100 text-blush-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-charcoal-600">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </motion.div>
                      )}

                      {/* CTA */}
                      <div className="flex gap-4 mt-6">
                        <Link
                          href={`/booking?service=${service.id}`}
                          className="btn-primary flex items-center"
                        >
                          Book Now
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                          href={`/services/${service.id}`}
                          className="btn-secondary"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-blush-600">500+</div>
              <div className="text-charcoal-600">Happy Clients</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-blush-600">10+</div>
              <div className="text-charcoal-600">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex justify-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <div className="text-charcoal-600">5-Star Reviews</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-blush-600">100%</div>
              <div className="text-charcoal-600">Licensed & Insured</div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}