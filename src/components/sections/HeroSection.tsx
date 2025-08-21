"use client";

// components/sections/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/HeroSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  name?: string;
  title?: string;
  department?: string;
  university?: string;
  expertise?: string[];
  achievements?: {
    years: string;
    publications: string;
    awards: string;
    membership: string;
  };
  profileImage?: string;
  resumeUrl?: string;
}

const HeroSection: React.FC<HeroProps> = ({
  name = "Dr. Swati Shirke-Deshmukh",
  title = "Associate Professor and HoD",
  department = "Department of Artificial Intelligence & Machine Learning",
  university = "Pimpri Chinchwad University, Pune",
  expertise = [
    "Deep Learning & Neural Networks",
    "Computer Vision & Image Processing",
    "Natural Language Processing",
    "Reinforcement Learning",
    "Edge AI & IoT Systems"
  ],
  achievements = {
    years: "15+",
    publications: "80+",
    awards: "12+",
    membership: "IEEE Member"
  },
  profileImage = "/images/dr-swati-profile.jpg",
  resumeUrl = "/mycv.pdf"
}) => {
  const [currentExpertise, setCurrentExpertise] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const departmentRef = useRef<HTMLParagraphElement>(null);
  const universityRef = useRef<HTMLParagraphElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Rotating expertise animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpertise((prev) => (prev + 1) % expertise.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [expertise.length]);

  // Entry animations (run only once)
  useEffect(() => {
    if (hasAnimated) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Initial state
    gsap.set(imageRef.current, { opacity: 0, scale: 0.95 });
    gsap.set([nameRef.current, titleRef.current, departmentRef.current, universityRef.current], {
      opacity: 0,
      x: 40
    });
    gsap.set([expertiseRef.current, statsRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    });

    // Entrance animations
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    })
      .to(nameRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.4")
      .to(departmentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
      .to(universityRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.1")
      .to(expertiseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.2")
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          const statNumbers = statsRef.current?.querySelectorAll(`.${styles.statNumber}`);
          const values = [achievements.years, achievements.publications, achievements.awards];
          statNumbers?.forEach((el, index) => {
            if (values[index]) {
              animateCounter(el as HTMLElement, values[index]);
            }
          });
        }
      }, "-=0.4")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => {
          setHasAnimated(true);
        }
      }, "-=0.2");

  }, []);

  const animateCounter = (element: HTMLElement, target: string) => {
    if (!element) return;

    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    const suffix = target.replace(/[0-9]/g, '');

    gsap.fromTo(element,
      { textContent: 0 },
      {
        textContent: numericValue,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          element.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
        }
      }
    );
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Dr-Swati-Shirke-Deshmukh-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Profile Image */}
          <div className={styles.imageContent}>
            <div className={styles.profileImageContainer} ref={imageRef}>
              <div className={styles.gradientBorder}>
                <div className={styles.imageFrame}>
                  <img
                    src="/profile/image.png"
                    alt={`${name} - ${title}`}
                    className={styles.profileImage}
                    style={{
                      // ✅ Inline styles to ensure proper image display
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      borderRadius: '50%',
                      display: 'block'
                    }}
                  />
                </div>
              </div>

              {/* Floating PCU Logo - Bottom Left */}
              <div className={styles.floatingLogo}>
                <img
                  src="/pcu.png"
                  alt="Pimpri Chinchwad University Logo"
                  className={styles.logoImage}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Professional Information */}
          <div className={styles.textContent}>
            {/* Header Section */}
            <div className={styles.headerSection}>
              <h1 className={styles.name} ref={nameRef}>
                {name}
              </h1>
              <h2 className={styles.title} ref={titleRef}>
                {title}
              </h2>
              <p className={styles.department} ref={departmentRef}>
                {department}
              </p>
              <p className={styles.university} ref={universityRef}>
                {university}
              </p>
            </div>

            {/* Expertise Section - Enhanced for full width */}
            <div className={styles.expertiseSection} ref={expertiseRef}>
              <h3 className={styles.expertiseLabel}>Research Focus</h3>
              <div className={styles.expertiseContainer}>
                <div className={styles.expertiseRotator}>
                  {expertise.map((item, index) => (
                    <span
                      key={index}
                      className={`${styles.expertiseItem} ${index === currentExpertise ? styles.active : ''
                        }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section - Enhanced for consistency */}
            <div className={styles.statsSection} ref={statsRef}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{achievements.years}</div>
                  <div className={styles.statLabel}>Years Experience</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{achievements.publications}</div>
                  <div className={styles.statLabel}>Publications</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{achievements.awards}</div>
                  <div className={styles.statLabel}>Awards</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statMembership}>{achievements.membership}</div>
                  <div className={styles.statLabel}>Faculty Advisor</div>
                </div>
              </div>
            </div>

            {/* CTA Section - Enhanced Layout */}
            <div className={styles.ctaSection} ref={buttonsRef}>
              <div className={styles.primaryActions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={downloadCV}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </button>

                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => scrollToSection('research')}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  View Research
                </button>

                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => scrollToSection('contact')}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </button>
              </div>

              {/* Secondary Actions - Academic Links */}
              <div className={styles.secondaryActions}>
                <button
                  className={`${styles.btn} ${styles.btnTertiary}`}
                  onClick={() => openLink('https://orcid.org/0000-0001-6668-5610')}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.86 5.18c.3-.3.67-.43 1.06-.43.4 0 .76.13 1.06.43.3.3.43.67.43 1.06 0 .4-.13.76-.43 1.06-.3.3-.67.43-1.06.43-.4 0-.76-.13-1.06-.43-.3-.3-.43-.67-.43-1.06 0-.4.13-.76.43-1.06zM9.7 8.54h1.61v8.16H9.7V8.54zm4.32 0h1.55v1.19h.02c.22-.41.64-.74 1.31-.74 1.4 0 2.34 1 2.34 2.31v5.4h-1.61v-4.78c0-.6-.11-1.37-.84-1.37-.84 0-.96.82-.96 1.4v4.75h-1.61V8.54z" />
                  </svg>
                  ORCID
                </button>

                <button
                  className={`${styles.btn} ${styles.btnTertiary}`}
                  onClick={() => openLink('https://www.scopus.com/authid/detail.uri?authorId=57190344923')}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.873 14.05c0 1.02-.83 1.85-1.85 1.85s-1.85-.83-1.85-1.85.83-1.85 1.85-1.85 1.85.83 1.85 1.85zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.473 8.267c0-.733-.6-1.333-1.333-1.333H8.533c-.733 0-1.333.6-1.333 1.333v7.466c0 .733.6 1.333 1.333 1.333h5.607c.733 0 1.333-.6 1.333-1.333V8.267z" />
                  </svg>
                  Scopus
                </button>

                <button
                  className={`${styles.btn} ${styles.btnTertiary}`}
                  onClick={() => openLink('https://scholar.google.com/citations?user=vQf1nlwAAAAJ&hl=en')}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                  </svg>
                  Google Scholar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
