"use client";

// components/sections/AwardsSection.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/AwardsSection.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year?: string;
  highlight?: string;
  icon: string;
}

interface AwardCategory {
  id: string;
  name: string;
  icon: string;
  achievements: Achievement[];
}

interface AnimationRefs {
  header: React.RefObject<HTMLDivElement>;
  tabs: React.RefObject<HTMLDivElement>;
  content: React.RefObject<HTMLDivElement>;
}

const AwardsSection: React.FC = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState<string>('academic');
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ Track animation completion
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Enhanced categories data (removed Special Distinctions)
  const categories: AwardCategory[] = useMemo(() => [
    {
      id: 'academic',
      name: 'Academic Excellence',
      icon: 'graduation-cap',
      achievements: [
        {
          id: 'phd',
          title: 'Ph.D. in Computer Science & Engineering',
          description: 'Research contributions in Artificial Intelligence, Blockchain, and Data Privacy with significant impact on academic community',
          year: '2020',
          highlight: 'Research Excellence',
          icon: 'graduation-cap'
        },
        {
          id: 'first-class',
          title: 'First Class with Distinction',
          description: 'Consistent academic excellence across Master of Engineering, Bachelor of Engineering, and Diploma in Computer Management programs',
          highlight: 'Academic Merit',
          icon: 'star'
        },
        {
          id: 'hod',
          title: 'Head of Department (CSE – AI & ML)',
          description: 'Outstanding academic leadership and departmental management at Pimpri Chinchwad University, driving innovation in AI and ML education',
          highlight: 'Leadership Role',
          icon: 'crown'
        },
        {
          id: 'supervisor',
          title: 'Ph.D. Supervisor Recognition',
          description: 'Trusted expertise in mentoring research scholars in cutting-edge areas of computer science and engineering',
          highlight: 'Mentorship Trust',
          icon: 'user-check'
        }
      ]
    },
    {
      id: 'teaching',
      name: 'Teaching & Mentorship',
      icon: 'users',
      achievements: [
        {
          id: 'projects',
          title: '20+ UG & PG Projects Guided',
          description: 'Successfully guided numerous undergraduate and postgraduate projects, many showcased at national-level expos, hackathons, and competitions',
          highlight: 'Project Success',
          icon: 'layers'
        },
        {
          id: 'research-mentorship',
          title: 'Research Scholar Mentorship',
          description: 'Comprehensive mentoring of research scholars leading to high-quality publications, prestigious awards, and valuable industry collaborations',
          highlight: 'Industry Impact',
          icon: 'book-open'
        },
        {
          id: 'ieee',
          title: 'IEEE Student Branch Counsellor',
          description: 'Active contribution to innovation culture and strengthening industry-academia linkages at Pimpri Chinchwad University',
          highlight: 'IEEE Recognition',
          icon: 'award'
        }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership & Events',
      icon: 'briefcase',
      achievements: [
        {
          id: 'expo-convener',
          title: 'National Level Project Expo Convener',
          description: 'Spearheaded large-scale event management and coordination for MIT ADT University and PCU, facilitating knowledge exchange and innovation showcase',
          highlight: 'National Impact',
          icon: 'megaphone'
        },
        {
          id: 'competition',
          title: 'Best Website Development Competition Convener',
          description: 'Organized and led PCU faculty competition, promoting digital innovation and technical excellence among faculty members',
          highlight: 'Innovation Catalyst',
          icon: 'monitor'
        },
        {
          id: 'training-coord',
          title: 'Zscaler Cloud Security & AI Tools Training',
          description: 'Advanced training program coordination and delivery, bridging the gap between academic learning and industry requirements',
          highlight: 'Tech Leadership',
          icon: 'shield'
        },
        {
          id: 'bos',
          title: 'Board of Studies (BoS) Member',
          description: 'Strategic contribution to curriculum design and development of future-ready academic frameworks aligned with industry needs',
          highlight: 'Academic Strategy',
          icon: 'clipboard'
        },
        {
          id: 'program-head',
          title: 'Integrated B.Tech Programme Head',
          description: 'Comprehensive leadership role at MIT ADT University, overseeing program development, student outcomes, and academic excellence',
          highlight: 'Program Leadership',
          icon: 'target'
        }
      ]
    },
    {
      id: 'community',
      name: 'Community & Events',
      icon: 'heart',
      achievements: [
        {
          id: 'tech-events',
          title: 'Technical Event Convener',
          description: 'Leadership in organizing major technical events including Sinhgad Karandak, Persona, and Project Expo, fostering student engagement and technical growth',
          highlight: 'Event Excellence',
          icon: 'calendar'
        },
        {
          id: 'committees',
          title: 'Committee Participation',
          description: 'Active involvement in Brochure Committees and Accreditation & Quality Assurance Cells, contributing to institutional branding and NAAC/NBA processes',
          highlight: 'NAAC/NBA Contribution',
          icon: 'check-circle'
        },
        {
          id: 'student-engagement',
          title: 'Student Engagement Recognition',
          description: 'Dedicated service as Alumni Coordinator, Teacher Guardian, and NSS/Prayas Member, building lasting connections between students and institution',
          highlight: 'Student Relations',
          icon: 'handshake'
        },
        {
          id: 'training-organizer',
          title: 'Professional Training Program Organizer',
          description: 'Comprehensive organization of skill development workshops covering cloud security, AI tools, and software testing for both students and faculty',
          highlight: 'Skill Development',
          icon: 'cpu'
        },
        {
          id: 'academic-integrity',
          title: 'Academic Integrity Recognition',
          description: 'Trusted with critical academic responsibilities including Question Paper Setting, CAP Evaluation, and Examination Supervision, reflecting institutional confidence',
          highlight: 'Trust & Integrity',
          icon: 'shield-check'
        }
      ]
    }
  ], []);

  // Enhanced icon mapping with improved SVGs
  const getIconSvg = useCallback((iconName: string) => {
    const iconMap: Record<string, React.JSX.Element> = {
      'graduation-cap': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"/>
        </svg>
      ),
      'star': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
        </svg>
      ),
      'crown': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 20h20l-2-6-4 2-4-4-4 4-4-2z"/>
          <path d="M6 6l4 4 4-4 4 4"/>
        </svg>
      ),
      'user-check': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <polyline points="17,11 19,13 23,9"/>
        </svg>
      ),
      'users': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      'layers': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="12,2 2,7 12,12 22,7 12,2"/>
          <polyline points="2,17 12,22 22,17"/>
          <polyline points="2,12 12,17 22,12"/>
        </svg>
      ),
      'book-open': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>  
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
      'award': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
        </svg>
      ),
      'briefcase': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      'megaphone': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 11l18-5v12l-18-5 2-1z"/>
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
        </svg>
      ),
      'monitor': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      'shield': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      'clipboard': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        </svg>
      ),
      'target': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      'heart': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      'calendar': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      'check-circle': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
      ),
      'handshake': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"/>
          <path d="M13 7a4 4 0 0 1 8 0v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/>
          <path d="M11 9h2"/>
        </svg>
      ),
      'cpu': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <line x1="9" y1="1" x2="9" y2="4"/>
          <line x1="15" y1="1" x2="15" y2="4"/>
          <line x1="9" y1="20" x2="9" y2="23"/>
          <line x1="15" y1="20" x2="15" y2="23"/>
          <line x1="20" y1="9" x2="23" y2="9"/>
          <line x1="20" y1="14" x2="23" y2="14"/>
          <line x1="1" y1="9" x2="4" y2="9"/>
          <line x1="1" y1="14" x2="4" y2="14"/>
        </svg>
      ),
      'shield-check': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    };
    return iconMap[iconName] || iconMap['star'];
  }, []);

  // ✅ FIXED: Animation runs only once using ScrollTrigger with once: true
  useEffect(() => {
    if (hasAnimated) return; // Exit if already animated

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current?.children || []], { 
        opacity: 0, 
        y: 40, 
        scale: 0.95,
        rotationX: 15
      });
      gsap.set([tabsRef.current?.children || []], { 
        opacity: 0, 
        x: -30,
        rotateY: -15,
        scale: 0.9
      });
      gsap.set(contentRef.current, { 
        opacity: 0, 
        y: 30,
        scale: 0.98
      });

      const masterTL = gsap.timeline({ 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onComplete: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set([headerRef.current?.children || []], { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotationX: 0
            });
            gsap.set([tabsRef.current?.children || []], { 
              opacity: 1, 
              x: 0,
              rotateY: 0,
              scale: 1
            });
            gsap.set(contentRef.current, { 
              opacity: 1, 
              y: 0,
              scale: 1
            });
          }
        } as ScrollTrigger.Vars,
        defaults: { ease: "power3.out" }
      });

      // Header animation sequence
      masterTL.to(headerRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.3)" 
      });

      // Tabs animation with enhanced effects
      masterTL.to(tabsRef.current?.children || [], { 
        opacity: 1, 
        x: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6, 
        stagger: 0.08, 
        ease: "power3.out" 
      }, "-=0.4");

      // Content animation
      masterTL.to(contentRef.current, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  // Enhanced tab change handler with improved animations
  const handleTabChange = useCallback((categoryId: string) => {
    if (categoryId === activeCategory || isTransitioning) return;

    setIsTransitioning(true);

    // Enhanced exit animation
    gsap.to(contentRef.current, {
      opacity: 0, 
      y: 15,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(categoryId);
        
        // Enhanced enter animation
        gsap.fromTo(contentRef.current, 
          { 
            opacity: 0, 
            y: 15,
            scale: 0.98
          }, 
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.4, 
            ease: "back.out(1.2)",
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });
  }, [activeCategory, isTransitioning]);

  // Memoized current category to prevent unnecessary re-renders
  const currentCategory = useMemo(() => 
    categories.find(cat => cat.id === activeCategory),
    [categories, activeCategory]
  );

  // Total achievements count for analytics
  const totalAchievements = useMemo(() => 
    categories.reduce((sum, cat) => sum + cat.achievements.length, 0),
    [categories]
  );

  return (
    <section 
      id="awards" 
      className={styles.awards} 
      ref={sectionRef}
      aria-label="Awards and Achievements Section"
    >
      <div className={styles.container}>
        {/* Enhanced Header */}
        <header className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>Awards & Achievements</h2>
          <p className={styles.subtitle}>
            Recognition for excellence in academia, leadership, and community service
            <span className={styles.achievementCount}> • {totalAchievements} Total Achievements</span>
          </p>
        </header>

        {/* Enhanced Tab Navigation */}
        <nav className={styles.tabs} ref={tabsRef} role="tablist" aria-label="Award Categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tab} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => handleTabChange(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`tabpanel-${category.id}`}
              aria-label={`View ${category.name} achievements (${category.achievements.length} items)`}
              disabled={isTransitioning}
            >
              <div className={styles.tabIcon}>
                {getIconSvg(category.icon)}
              </div>
              <span className={styles.tabText}>{category.name}</span>
              <span className={styles.tabCount}>{category.achievements.length}</span>
            </button>
          ))}
        </nav>

        {/* Enhanced Content */}
        <main 
          className={styles.content} 
          ref={contentRef}
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
        >
          {currentCategory && (
            <>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>
                  {currentCategory.name}
                  <span className={styles.categoryCount}>
                    ({currentCategory.achievements.length} Achievement{currentCategory.achievements.length !== 1 ? 's' : ''})
                  </span>
                </h3>
              </div>
              
              <div className={styles.achievementsGrid}>
                {currentCategory.achievements.map((achievement, index) => (
                  <article 
                    key={achievement.id} 
                    className={styles.achievementCard}
                    style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className={styles.cardIcon} aria-hidden="true">
                      {getIconSvg(achievement.icon)}
                    </div>
                    
                    <div className={styles.cardContent}>
                      <header className={styles.cardHeader}>
                        <h4 className={styles.cardTitle}>{achievement.title}</h4>
                        {achievement.year && (
                          <time className={styles.cardYear} dateTime={achievement.year}>
                            {achievement.year}
                          </time>
                        )}
                      </header>
                      
                      <p className={styles.cardDescription}>{achievement.description}</p>
                      
                      {achievement.highlight && (
                        <div className={styles.cardHighlight} aria-label="Achievement highlight">
                          {achievement.highlight}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default AwardsSection;
