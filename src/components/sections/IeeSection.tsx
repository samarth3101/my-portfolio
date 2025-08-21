"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/IEEEStudentBranchSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IEEEStudentBranchSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const objectivesRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const objectives = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Technical Skills & Leadership",
      description: "Foster technical skills, leadership qualities, and research-oriented thinking."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
        </svg>
      ),
      title: "Industry Collaboration",
      description: "Bridge academic learning and industry demands through projects."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        </svg>
      ),
      title: "Interdisciplinary Innovation",
      description: "Promote innovation in emerging technology domains."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      ),
      title: "Ethical & Sustainable Tech",
      description: "Encourage ethical practices in technology development."
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "National & International Webinars",
      description: "Hosted webinars with IEEE experts reaching 500+ participants.",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=300&h=180&fit=crop",
      year: "2024"
    },
    {
      id: 2,
      title: "Technology Workshops",
      description: "Organized workshops on AI, blockchain, IoT, and robotics.",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=180&fit=crop",
      year: "2024-25"
    },
    {
      id: 3,
      title: "Innovation Competitions",
      description: "Won recognition in inter-university competitions.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=180&fit=crop",
      year: "2024-25"
    },
    {
      id: 4,
      title: "IEEE Conference Participation",
      description: "Facilitated student participation in conferences.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=180&fit=crop",
      year: "2025"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "March 15, 2025",
      type: "Workshop"
    },
    {
      id: 2,
      title: "IEEE Student Paper Competition",
      date: "April 2, 2025",
      type: "Competition"
    },
    {
      id: 3,
      title: "Industry Expert Webinar",
      date: "March 28, 2025",
      type: "Webinar"
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const elements = [
        headerRef.current,
        aboutRef.current,
        objectivesRef.current,
        achievementsRef.current,
        bannerRef.current,
        eventsRef.current
      ].filter(Boolean);

      gsap.set(elements, {
        opacity: 1,
        y: 0
      });

      if (sectionRef.current && elements.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        if (headerRef.current) {
          tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        }
        if (aboutRef.current) {
          tl.to(aboutRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
        }
        if (objectivesRef.current) {
          const objectiveCards = objectivesRef.current.children;
          if (objectiveCards.length > 0) {
            tl.to(objectiveCards, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.2");
          }
        }
        if (achievementsRef.current) {
          tl.to(achievementsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1");
        }
        if (bannerRef.current) {
          tl.to(bannerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1");
        }
        if (eventsRef.current) {
          tl.to(eventsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1");
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Auto-slide achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % achievements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [achievements.length]);

  return (
    // In IEEEStudentBranchSection.tsx
    <section id="ieee-branch" className={styles.section} ref={sectionRef}>

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <div className={styles.ieeeLogo}>IEEE</div>
          <h1 className={styles.title}>IEEE Student Branch – PCU</h1>
          <p className={styles.tagline}>Empowering Innovation & Technology at PCU</p>
          <p className={styles.subtitle}>
            Connecting students with a global community of engineers, scientists, and innovators.
          </p>
          <div className={styles.establishment}>Established: January 16, 2025</div>
        </div>

        {/* About Section - Side by Side Layout: IEEE Student Branch | About IEEE */}
        <div className={styles.about} ref={aboutRef}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>IEEE Student Branch</h2>
              <p className={styles.description}>
                The IEEE Student Branch at Pimpri Chinchwad University was established on 16th January 2025
                to provide students with a platform to connect with global technology leaders.
              </p>
              <p className={styles.description}>
                Our vibrant community engages in technical events, workshops, research collaborations,
                hackathons, and outreach programs.
              </p>
              <a href="https://innovare.dev" target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                Visit INNOVARE Platform
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </a>
            </div>
            <div className={styles.aboutTextRight}>
              <h2 className={styles.sectionTitle}>About IEEE</h2>
              <p className={styles.description}>
                IEEE is the world's largest technical professional organization dedicated to advancing
                technology for the benefit of humanity.
              </p>
              <p className={styles.description}>
                With over 400,000 members in more than 160 countries, IEEE provides access to cutting-edge
                research, networking opportunities, and professional development resources.
              </p>
              <a href="https://ieee.org" target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                Learn More About IEEE
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className={styles.objectives}>
          <h2 className={styles.sectionTitle}>Our Objectives</h2>
          <div className={styles.objectivesGrid} ref={objectivesRef}>
            {objectives.map((objective, index) => (
              <div key={`objective-${index}`} className={styles.objectiveCard}>
                <div className={styles.icon}>{objective.icon}</div>
                <h3 className={styles.cardTitle}>{objective.title}</h3>
                <p className={styles.cardDesc}>{objective.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Carousel */}
        <div className={styles.achievements} ref={achievementsRef}>
          <h2 className={styles.sectionTitle}>Key Achievements</h2>
          <div className={styles.carousel}>
            <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {achievements.map((achievement) => (
                <div key={`achievement-${achievement.id}`} className={styles.slide}>
                  <div className={styles.achievementCard}>
                    <div className={styles.achievementImage}>
                      <img src={achievement.image} alt={achievement.title} />
                      <div className={styles.year}>{achievement.year}</div>
                    </div>
                    <div className={styles.achievementContent}>
                      <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                      <p className={styles.achievementDesc}>{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.dots}>
              {achievements.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Academic Banner */}
        <div className={styles.banner} ref={bannerRef}>
          <h2 className={styles.bannerTitle}>Academic Year 2024–25</h2>
          <p className={styles.bannerSubtitle}>A gateway to growth, learning, and innovation</p>
          <div className={styles.bannerStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Members</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>25+</span>
              <span className={styles.statLabel}>Events</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Partners</span>
            </div>
          </div>
          <a href="#events" className={styles.bannerCta}>
            View Events Calendar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>


      </div>
    </section>
  );
};

export default IEEEStudentBranchSection;