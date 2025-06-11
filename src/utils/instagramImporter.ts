// Instagram Photo Importer Utility
// For extracting photos from Instagram legally and safely

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export class InstagramImporter {
  private accessToken: string;
  private userId: string;

  constructor(accessToken: string, userId: string) {
    this.accessToken = accessToken;
    this.userId = userId;
  }

  /**
   * Fetch Instagram media using official API
   */
  async fetchInstagramMedia(limit: number = 25): Promise<InstagramMedia[]> {
    try {
      const response = await fetch(
        `https://graph.instagram.com/${this.userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${this.accessToken}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch Instagram media:', error);
      throw error;
    }
  }

  /**
   * Download and save Instagram media locally
   */
  async downloadMedia(media: InstagramMedia[], outputDir: string = './public/images/instagram'): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    for (const item of media) {
      try {
        const response = await fetch(item.media_url);
        if (!response.ok) continue;

        const buffer = await response.arrayBuffer();
        const extension = item.media_type === 'VIDEO' ? '.mp4' : '.jpg';
        const filename = `${item.id}${extension}`;
        const filepath = path.join(outputDir, filename);

        await fs.writeFile(filepath, new Uint8Array(buffer));
        console.log(`Downloaded: ${filename}`);
      } catch (error) {
        console.error(`Failed to download ${item.id}:`, error);
      }
    }
  }

  /**
   * Generate gallery data from Instagram media
   */
  generateGalleryData(media: InstagramMedia[]): any[] {
    return media.map((item, index) => ({
      id: item.id,
      serviceId: this.inferServiceFromCaption(item.caption),
      title: this.generateTitle(item.caption, index),
      description: this.cleanCaption(item.caption),
      technique: this.inferTechnique(item.caption),
      beforeImage: {
        url: `/images/instagram/${item.id}.jpg`,
        alt: this.generateTitle(item.caption, index),
        width: 400,
        height: 400,
      },
      afterImage: {
        url: `/images/instagram/${item.id}.jpg`,
        alt: this.generateTitle(item.caption, index),
        width: 400,
        height: 400,
      },
      featured: index < 3,
      tags: this.extractHashtags(item.caption),
      date: item.timestamp,
    }));
  }

  private inferServiceFromCaption(caption?: string): string {
    if (!caption) return 'general';
    
    const lowerCaption = caption.toLowerCase();
    if (lowerCaption.includes('microbladir') || lowerCaption.includes('eyebrow')) return 'microblading';
    if (lowerCaption.includes('lip')) return 'lip-blush';
    if (lowerCaption.includes('microneedling')) return 'rf-microneedling';
    if (lowerCaption.includes('facial')) return 'facial-treatment';
    
    return 'general';
  }

  private generateTitle(caption?: string, index: number = 0): string {
    if (!caption) return `Beautiful Result ${index + 1}`;
    
    // Extract first meaningful part of caption
    const firstSentence = caption.split('.')[0].split('\n')[0];
    return firstSentence.length > 50 
      ? firstSentence.substring(0, 47) + '...'
      : firstSentence;
  }

  private cleanCaption(caption?: string): string {
    if (!caption) return '';
    
    // Remove hashtags and clean up
    return caption
      .replace(/#\w+/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  }

  private inferTechnique(caption?: string): string {
    if (!caption) return 'Professional Treatment';
    
    const lowerCaption = caption.toLowerCase();
    if (lowerCaption.includes('microblading')) return 'Microblading';
    if (lowerCaption.includes('powder brow')) return 'Powder Brow';
    if (lowerCaption.includes('lip blush')) return 'Lip Blush';
    if (lowerCaption.includes('microneedling')) return 'RF Microneedling';
    
    return 'Professional Treatment';
  }

  private extractHashtags(caption?: string): string[] {
    if (!caption) return [];
    
    const hashtags = caption.match(/#\w+/g) || [];
    return hashtags.map(tag => tag.substring(1)); // Remove the # symbol
  }
}

// Usage example:
export async function importInstagramPhotos() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    throw new Error('Instagram credentials not configured');
  }

  const importer = new InstagramImporter(accessToken, userId);
  
  try {
    // Fetch latest 25 posts
    const media = await importer.fetchInstagramMedia(25);
    
    // Download images locally
    await importer.downloadMedia(media);
    
    // Generate gallery data
    const galleryData = importer.generateGalleryData(media);
    
    console.log('Instagram import complete!');
    console.log(`Downloaded ${media.length} items`);
    
    return galleryData;
  } catch (error) {
    console.error('Instagram import failed:', error);
    throw error;
  }
}

export default InstagramImporter;