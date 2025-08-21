"use client";

// components/sections/GallerySection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/GallerySection.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  size: 'small' | 'large';
  category: 'teaching' | 'research' | 'leadership' | 'recognition';
}

const GallerySection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ Track animation completion
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Gallery images with stock photos from Unsplash
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      url: '/acminag.png',
      caption: 'ACM Student Chapter Inaugration',
      size: 'large',
      category: 'teaching'
    },
    {
      id: 2,
      url: 'ieeinag.png',
      caption: 'IEEE Student Chapter Inaugration',
      size: 'small',
      category: 'teaching'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=400&h=200&fit=crop',
      caption: 'Guiding Students',
      size: 'small',
      category: 'teaching'
    },
    {
      id: 4,
      url: 'cultural.png',
      caption: 'Cultural Event',
      size: 'large',
      category: 'research'
    },
    {
      id: 5,
      url: 'pcu.png',
      caption: 'PCU',
      size: 'small',
      category: 'research'
    },
    {
      id: 6,
      url: 'pcucamp.png',
      caption: 'Zscalar at Glance',
      size: 'small',
      category: 'research'
    },
    {
      id: 7,
      url: 'usain.png',
      caption: 'honor of hosting Ms. Revati Gandhi, Data Scientist at Dark Matter Technologies, Chicago, USA',
      size: 'large',
      category: 'leadership'
    },
    {
      id: 8,
      url: 'image.png',
      caption: 'campus life',
      size: 'small',
      category: 'leadership'
    },
    {
      id: 9,
      url: 'zscalar.png',
      caption: 'ZScalar Workshop',
      size: 'small',
      category: 'leadership'
    },
    {
      id: 10,
      url: 'zfest.png',
      caption: 'Felicitation of Sanskriti sood',
      size: 'large',
      category: 'recognition'
    },
    {
      id: 11,
      url: 'orient.png',
      caption: 'SoET Orientation Program',
      size: 'small',
      category: 'recognition'
    },
    {
      id: 12,
      url: 'shivjayanti.png',
      caption: 'Shiv Jayanti Celebration',
      size: 'small',
      category: 'recognition'
    }
  ];

  // ✅ FIXED: Animation runs only once using ScrollTrigger with once: true
  useEffect(() => {
    if (hasAnimated) return; // Exit if already animated

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set([gridRef.current?.children || []], { opacity: 0, y: 40, scale: 0.8 });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onLeave: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set(titleRef.current, { opacity: 1, y: 0, scale: 1 });
            gsap.set([gridRef.current?.children || []], { opacity: 1, y: 0, scale: 1 });
            gsap.set(taglineRef.current, { opacity: 1, y: 0 });
          }
        }
      });

      // Title animation
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.3)" 
      });

      // Gallery items animation
      tl.to(gridRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

      // Tagline animation
      tl.to(taglineRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  return (
    <section 
      id="gallery" 
      className={styles.gallerySection} 
      ref={sectionRef}
    >
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.title} ref={titleRef}>
            Moments Captured
          </h2>
        </header>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid} ref={gridRef}>
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`${styles.galleryItem} ${styles[image.size]} ${styles[image.category]}`}
            >
              <div 
                className={styles.imageContainer}
                style={{ 
                  backgroundImage: `url(${image.url})` 
                }}
              >
                <div className={styles.overlay}>
                  <span className={styles.caption}>
                    {image.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <footer className={styles.footer}>
          <p className={styles.tagline} ref={taglineRef}>
            A journey shaped by teaching, research, and lifelong learning.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default GallerySection;
