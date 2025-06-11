'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramFeedProps {
  maxPosts?: number;
  showStats?: boolean;
  gridCols?: 2 | 3 | 4 | 6;
  showCaption?: boolean;
  className?: string;
}

export default function InstagramFeed({ 
  maxPosts = 6, 
  showStats = true,
  gridCols = 3,
  showCaption = false,
  className = ''
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real Instagram photos from Svetlana Belova's work
  const mockPosts: InstagramPost[] = [
    {
      id: '1',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-1.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Beautiful microblading transformation ✨ Perfect natural hair strokes for lasting confidence #microblading #permanentmakeup #eyebrows #beloffbeauty',
      timestamp: '2024-01-15T10:00:00Z',
      like_count: 245,
      comments_count: 18
    },
    {
      id: '2',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-2.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Stunning lip blush enhancement 💋 Natural color that enhances your beauty #lipblush #permanentlips #beloffbeauty',
      timestamp: '2024-01-14T14:30:00Z',
      like_count: 189,
      comments_count: 12
    },
    {
      id: '3',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-3.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Professional powder brow technique ✨ Soft, natural results that last #powderbrows #eyebrowsonfleek #beloffbeauty',
      timestamp: '2024-01-13T16:45:00Z',
      like_count: 156,
      comments_count: 9
    },
    {
      id: '4',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-4.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Expert microblading artistry 🎨 Creating perfect brows for every face shape #microblading #artist #beloffbeauty',
      timestamp: '2024-01-12T11:20:00Z',
      like_count: 203,
      comments_count: 15
    },
    {
      id: '5',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-5.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Combination brow technique mastery ✨ Hair strokes + shading for dimensional look #combinationbrows #beloffbeauty',
      timestamp: '2024-01-11T09:15:00Z',
      like_count: 198,
      comments_count: 14
    },
    {
      id: '6',
      media_type: 'IMAGE',
      media_url: '/images/instagram/beauty-work-6.jpg',
      permalink: 'https://instagram.com/svetlana_belove',
      caption: 'Another happy client transformation 🥰 Book your consultation today! #happyclient #transformation #beloffbeauty',
      timestamp: '2024-01-10T13:00:00Z',
      like_count: 167,
      comments_count: 11
    }
  ];

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        
        // Replace with actual Instagram Basic Display API call
        const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
        
        if (!accessToken) {
          // Use mock data for development
          setPosts(mockPosts.slice(0, maxPosts));
          setLoading(false);
          return;
        }

        // Real Instagram API call
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${accessToken}&limit=${maxPosts}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        
        const data = await response.json();
        setPosts(data.data || []);
      } catch (err) {
        console.error('Instagram API Error:', err);
        setError('Failed to load Instagram posts');
        // Fallback to mock data
        setPosts(mockPosts.slice(0, maxPosts));
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [maxPosts]);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const truncateCaption = (caption: string, maxLength: number = 100) => {
    if (!caption) return '';
    return caption.length > maxLength ? caption.substring(0, maxLength) + '...' : caption;
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse">
          <div className={`grid grid-cols-${gridCols} gap-4`}>
            {Array(maxPosts).fill(0).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Unable to load Instagram posts</p>
        <Link 
          href="https://instagram.com/beloffbeauty" 
          target="_blank"
          className="text-blush-600 hover:text-blush-700 font-medium"
        >
          Visit our Instagram →
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal-900">@beloffbeauty</h3>
            <p className="text-sm text-charcoal-600">Follow us on Instagram</p>
          </div>
        </div>
        <Link
          href="https://instagram.com/beloffbeauty"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blush-600 hover:text-blush-700 font-medium text-sm transition-colors"
        >
          Follow
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Posts Grid */}
      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
          >
            <Link href={post.permalink} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-full">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes={`(max-width: 768px) 50vw, ${100 / gridCols}vw`}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {showStats && (
                    <div className="flex items-center gap-4 text-white">
                      {post.like_count && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-5 h-5 fill-current" />
                          <span className="font-medium">{post.like_count}</span>
                        </div>
                      )}
                      {post.comments_count && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-medium">{post.comments_count}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Post Type Indicator */}
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-black/50 rounded-full p-1">
                      <div className="w-6 h-6 text-white flex items-center justify-center text-xs">⊞</div>
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Caption (if enabled) */}
            {showCaption && post.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs leading-relaxed">
                  {truncateCaption(post.caption)}
                </p>
                <p className="text-white/70 text-xs mt-1">
                  {formatTimeAgo(post.timestamp)}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* View More Link */}
      <div className="text-center mt-6">
        <Link
          href="https://instagram.com/beloffbeauty"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blush-600 hover:text-blush-700 font-medium transition-colors"
        >
          View more on Instagram
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}