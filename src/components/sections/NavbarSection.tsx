"use client";

// components/sections/NavbarSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from '../../styles/NavbarSection.module.scss';

interface NavbarProps {
  navigationItems?: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  currentSection?: string;
}

const NavbarSection: React.FC<NavbarProps> = ({
  navigationItems = [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "about", label: "About", href: "#about" },
    { id: "research", label: "Research", href: "#research" },
    { id: "teaching", label: "Teaching", href: "#teaching" },
    { id: "awards", label: "Awards", href: "#awards" },
    { id: "professional", label: "Professional", href: "#professional" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "ieee-branch", label: "IEEE Branch", href: "#ieee-branch" },
    { id: "contact", label: "Contact", href: "#contact" }
  ]
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isUserClicking, setIsUserClicking] = useState(false);
  
  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ FIXED: Properly observe sections and update active state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // ✅ Enhanced IntersectionObserver for better section detection
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px', // Adjusted for better detection
      threshold: [0, 0.1, 0.5] // Multiple thresholds for better accuracy
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!isUserClicking) {
        // Find the most visible section
        let mostVisibleSection = '';
        let maxIntersectionRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        // ✅ Update current section based on most visible section
        if (mostVisibleSection) {
          setCurrentSection(mostVisibleSection);
        }
        // ✅ Fallback: Check scroll position for hero section
        else if (window.scrollY < 100) {
          setCurrentSection('hero');
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // ✅ Observe all sections
    navigationItems.forEach(item => {
      const sectionElement = document.querySelector(item.href);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    // ✅ Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [navigationItems, isUserClicking]);

  // ✅ FIXED: Smooth scroll with proper state management
  // ✅ Smooth scroll with precise state reset
const scrollToSection = (href: string, sectionId: string) => {
  setIsUserClicking(true);

  // Immediately mark active
  setCurrentSection(sectionId);

  const element = document.querySelector(href);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // ✅ Use scrollend if available (modern browsers)
    const onScrollEnd = () => {
      setIsUserClicking(false);
      window.removeEventListener("scrollend", onScrollEnd);
    };

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", onScrollEnd, { once: true });
    } else {
      // ✅ Fallback: poll until we're near target
      const checkIfDone = () => {
        const atTarget = Math.abs(window.scrollY - offsetTop) < 2;
        if (atTarget) {
          setIsUserClicking(false);
        } else {
          requestAnimationFrame(checkIfDone);
        }
      };
      requestAnimationFrame(checkIfDone);
    }
  }

  setIsMobileMenuOpen(false);
};

  // ✅ FIXED: CV download with correct path
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/mycv.pdf'; // ✅ Correct path to your CV
    link.download = 'Dr-Swati-Shirke-Deshmukh-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (mobileDrawerRef.current) {
      if (!isMobileMenuOpen) {
        gsap.fromTo(mobileDrawerRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileDrawerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  };

  return (
    <>
      {/* Desktop - Clean Professional Notch */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} ref={navbarRef}>
        <div className={styles.notchContainer}>
          <div className={styles.notch}>
            <div className={styles.notchContent}>
              <div className={styles.navLinksContainer}>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.navLink} ${
                      currentSection === item.id ? styles.active : ''
                    }`}
                    onClick={() => scrollToSection(item.href, item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                className={styles.downloadCVButton}
                onClick={handleDownloadCV}
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile - Hamburger Only */}
      <div className={styles.mobileNav}>
        <button 
          className={`${styles.hamburgerButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className={styles.hamburger}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
        </button>
        
        <div 
          className={`${styles.drawer} ${isMobileMenuOpen ? styles.open : ''}`}
          ref={mobileDrawerRef}
        >
          <div className={styles.drawerContent}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.drawerLink} ${
                  currentSection === item.id ? styles.active : ''
                }`}
                onClick={() => scrollToSection(item.href, item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              className={styles.downloadCVButtonMobile}
              onClick={handleDownloadCV}
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarSection;
