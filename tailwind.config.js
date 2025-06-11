/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom color palette for BeloffBeauty
      colors: {
        // Primary brand colors - soft blush and sophisticated neutrals
        blush: {
          50: '#fef7f0',
          100: '#feeee1',
          200: '#fcdcc3',
          300: '#f9c49e',
          400: '#f5a478',
          500: '#f1845c',
          600: '#e8693a',
          700: '#d14f2a',
          800: '#ae4025',
          900: '#8c3622',
          950: '#4c1a11',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f4',
          200: '#faf2e8',
          300: '#f6e8d6',
          400: '#f0d8c0',
          500: '#e8c4a0',
          600: '#daa974',
          700: '#c8924f',
          800: '#a67742',
          900: '#86613a',
          950: '#47321c',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c7d2c7',
          300: '#a3b4a3',
          400: '#7a937a',
          500: '#5d7a5d',
          600: '#486148',
          700: '#3c503c',
          800: '#334133',
          900: '#2d372d',
          950: '#171e17',
        },
      },
      
      // Custom font families
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        elegant: ['Playfair Display', 'Georgia', 'serif'],
      },
      
      // Custom spacing for beauty industry layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // Custom border radius for modern design
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Custom shadows for depth and elegance
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(241, 132, 92, 0.3)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Custom gradients for visual appeal
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #fef7f0 0%, #feeee1 100%)',
        'service-pattern': 'linear-gradient(45deg, #f6f7f6 0%, #e3e8e3 100%)',
      },
      
      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(241, 132, 92, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(241, 132, 92, 0.5)' },
        },
      },
      
      // Typography scale
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
      },
      
      // Custom breakpoints for responsive design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      
      // Custom aspect ratios for beauty content
      aspectRatio: {
        'portrait': '3 / 4',
        'beauty': '4 / 5',
        'gallery': '16 / 10',
      },
      
      // Custom z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for beauty-specific utilities
    function({ addUtilities, addComponents, theme }) {
      // Beauty-specific button styles
      addComponents({
        '.btn-primary': {
          '@apply bg-blush-600 hover:bg-blush-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-soft hover:shadow-elegant': {},
        },
        '.btn-secondary': {
          '@apply bg-white hover:bg-blush-50 text-blush-700 font-semibold py-3 px-6 rounded-lg border border-blush-300 hover:border-blush-400 transition-all duration-200': {},
        },
        '.btn-elegant': {
          '@apply bg-gradient-to-r from-blush-500 to-blush-600 hover:from-blush-600 hover:to-blush-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-elegant hover:shadow-glow': {},
        },
        
        // Card styles for services and galleries
        '.card-service': {
          '@apply bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden': {},
        },
        '.card-testimonial': {
          '@apply bg-cream-50 border border-cream-200 rounded-xl p-6 shadow-soft': {},
        },
        
        // Gallery and image styles
        '.image-gallery': {
          '@apply rounded-xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300': {},
        },
        '.before-after-card': {
          '@apply relative rounded-lg overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer': {},
        },
        
        // Form styles
        '.form-input': {
          '@apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-colors duration-200': {},
        },
        '.form-textarea': {
          '@apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 resize-vertical min-h-[100px] transition-colors duration-200': {},
        },
        
        // Section patterns
        '.section-hero': {
          '@apply bg-gradient-to-br from-blush-50 via-cream-50 to-sage-50': {},
        },
        '.section-services': {
          '@apply bg-white': {},
        },
        '.section-testimonials': {
          '@apply bg-cream-25': {},
        },
      });
      
      // Custom utilities
      addUtilities({
        '.text-gradient': {
          'background': 'linear-gradient(45deg, #f1845c, #e8693a)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-pattern-dots': {
          'background-image': 'radial-gradient(circle, #f1845c 1px, transparent 1px)',
          'background-size': '20px 20px',
        },
        '.backdrop-blur-soft': {
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
      });
    },
  ],
};