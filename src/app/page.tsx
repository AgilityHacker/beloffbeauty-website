'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import InstagramFeed from '@/components/InstagramFeed';

// Hero Section Component (replaced with HeroSlider)
const HeroSection = () => {
  return (
    <section className="section-hero min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-elegant text-charcoal-900 leading-tight">
                Enhance Your
                <span className="text-gradient block">Natural Beauty</span>
              </h1>
              <p className="text-xl text-charcoal-700 max-w-xl">
                Expert permanent eyebrows, advanced microneedling, and comprehensive 
                facial treatments to reveal your most radiant self.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-charcoal-600">
                <CheckCircle className="w-5 h-5 text-blush-600 mr-3" />
                <span>Certified Permanent Makeup Artist</span>
              </div>
              <div className="flex items-center text-charcoal-600">
                <CheckCircle className="w-5 h-5 text-blush-600 mr-3" />
                <span>Advanced Microneedling Specialist</span>
              </div>
              <div className="flex items-center text-charcoal-600">
                <CheckCircle className="w-5 h-5 text-blush-600 mr-3" />
                <span>Licensed & Insured Professional</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booking" className="btn-elegant group">
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/gallery" className="btn-secondary">
                View Our Gallery
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-6 text-sm text-charcoal-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-semibold">4.9/5</span>
                <span className="ml-1">(127 reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-blush-600 mr-1" />
                <span>Downtown Studio</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <Image
                src="/images/hero-permanent-makeup.jpg"
                alt="Professional permanent makeup results"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
            
            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-elegant p-6 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blush-100 rounded-full p-3">
                  <Clock className="w-6 h-6 text-blush-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">500+</p>
                  <p className="text-charcoal-600 text-sm">Happy Clients</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Overview Component
const ServicesOverview = () => {
  const services = [
    {
      title: "Permanent Eyebrows",
      description: "Microblading, powder brow, and combination techniques for natural-looking results",
      image: "/images/service-eyebrows.jpg",
      techniques: ["Microblading", "Powder Brow", "Combination"],
      duration: "2-3 hours",
      from: "$450"
    },
    {
      title: "Lip Enhancement",
      description: "Subtle lip blush and full color treatments for enhanced natural beauty",
      image: "/images/service-lips.jpg",
      techniques: ["Lip Blush", "Full Color", "Line Definition"],
      duration: "1.5-2 hours",
      from: "$375"
    },
    {
      title: "RF Microneedling",
      description: "Advanced radiofrequency microneedling for skin tightening and rejuvenation",
      image: "/images/service-microneedling.jpg",
      techniques: ["RF Treatment", "Collagen Boost", "Skin Tightening"],
      duration: "60-90 minutes",
      from: "$275"
    },
    {
      title: "PRP Microneedling",
      description: "Vampire facial using your own platelets for natural skin regeneration",
      image: "/images/service-prp.jpg",
      techniques: ["PRP Extraction", "Microneedling", "Natural Healing"],
      duration: "90 minutes",
      from: "$350"
    }
  ];

  return (
    <section className="section-services py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-elegant text-charcoal-900 mb-6">
            Premium Beauty Services
          </h2>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            Discover our comprehensive range of permanent makeup and advanced facial 
            treatments designed to enhance your natural beauty.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-service group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-blush-700">From {service.from}</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-charcoal-900">{service.title}</h3>
                <p className="text-charcoal-600 text-sm">{service.description}</p>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {service.techniques.map((technique) => (
                      <span
                        key={technique}
                        className="text-xs bg-blush-100 text-blush-700 px-2 py-1 rounded"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-charcoal-500">
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>
                
                <Link
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block w-full text-center btn-secondary text-sm group-hover:bg-blush-50 group-hover:border-blush-400 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-primary">
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Info Component
const ContactInfo = () => {
  return (
    <section className="bg-charcoal-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="w-12 h-12 bg-blush-600 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="text-gray-300">(555) 123-4567</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 bg-blush-600 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Visit Us</h3>
            <p className="text-gray-300">123 Beauty Lane<br />Downtown, City 12345</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 bg-blush-600 rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Hours</h3>
            <p className="text-gray-300">Mon-Sat: 9AM-6PM<br />Sunday: Closed</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Before/After Showcase Component
const BeforeAfterShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-elegant text-charcoal-900 mb-6">
            Transformative <span className="text-gradient">Results</span>
          </h2>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            See the incredible transformations our clients have experienced. 
            Drag the slider to reveal the before and after results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
              Microblading Transformation
            </h3>
            <BeforeAfterSlider
              beforeImage="/images/instagram/beauty-work-4.jpg"
              afterImage="/images/instagram/beauty-work-5.jpg"
              className="aspect-[4/5]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
              Lip Blush Enhancement
            </h3>
            <BeforeAfterSlider
              beforeImage="/images/instagram/beauty-work-6.jpg"
              afterImage="/images/instagram/beauty-work-1.jpg"
              className="aspect-[4/5]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/gallery" className="btn-primary">
            View Full Gallery
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Instagram Section Component
const InstagramSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-elegant text-charcoal-900 mb-6">
            Follow Our <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            See our latest work, client transformations, and behind-the-scenes moments. 
            Join our community of beauty enthusiasts!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InstagramFeed 
            maxPosts={6}
            gridCols={3}
            showStats={true}
            showCaption={false}
            className="max-w-4xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

// Main Homepage Component
export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <ServicesOverview />
      <BeforeAfterShowcase />
      <TestimonialsCarousel />
      <InstagramSection />
      <ContactInfo />
    </main>
  );
}