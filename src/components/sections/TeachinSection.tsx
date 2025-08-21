"use client";

// components/sections/TeachingSection.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/TeachingSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
interface Course {
  id: string;
  name: string;
  category: 'core' | 'advanced' | 'specialized';
  level: 'undergraduate' | 'postgraduate';
}

interface Workshop {
  id: string;
  title: string;
  duration: string;
  institution: string;
  type: 'bootcamp' | 'training' | 'seminar' | 'competition';
  participants?: string;
}

interface MentorshipArea {
  id: string;
  title: string;
  description: string;
  type: 'supervision' | 'guidance' | 'mentoring' | 'support' | 'relations';
  count?: string;
}

interface TeachingStat {
  icon: string;
  number: string;
  label: string;
}

const TeachingSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'philosophy' | 'courses' | 'mentorship' | 'workshops' | 'impact'>('philosophy');
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ Track animation completion
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Teaching Statistics for header
  const teachingStats: TeachingStat[] = useMemo(() => [
    { icon: 'book-open', number: '15+', label: 'Years Teaching' },
    { icon: 'graduation-cap', number: '11', label: 'Subjects Taught' },
    { icon: 'users', number: '20+', label: 'Projects Guided' },
    { icon: 'trophy', number: '7', label: 'Workshops Led' },
    { icon: 'zap', number: '100%', label: 'Industry Focus' }
  ], []);

  // Course data
  const courses: Course[] = useMemo(() => [
    { id: "dsa", name: "Data Structures & Algorithms", category: "core", level: "undergraduate" },
    { id: "ai-ml", name: "Artificial Intelligence & Machine Learning", category: "advanced", level: "undergraduate" },
    { id: "dbms", name: "Database Management Systems", category: "core", level: "undergraduate" },
    { id: "blockchain", name: "Blockchain Technologies", category: "specialized", level: "undergraduate" },
    { id: "networks", name: "Computer Networks", category: "core", level: "undergraduate" },
    { id: "os", name: "Operating Systems", category: "core", level: "undergraduate" },
    { id: "testing", name: "Software Testing", category: "advanced", level: "undergraduate" },
    { id: "adv-ai", name: "Advanced Artificial Intelligence", category: "specialized", level: "postgraduate" },
    { id: "research", name: "Research Methodology", category: "core", level: "postgraduate" },
    { id: "distributed", name: "Distributed Systems", category: "advanced", level: "postgraduate" },
    { id: "privacy", name: "Data Privacy & Security", category: "specialized", level: "postgraduate" }
  ], []);

  const workshops: Workshop[] = useMemo(() => [
    {
      id: "dsa-bootcamp",
      title: "Data Structures & Algorithms Bootcamp",
      duration: "1 week",
      institution: "MIT ADT University",
      type: "bootcamp",
      participants: "Circuit & Non-Circuit Branches"
    },
    {
      id: "software-testing",
      title: "Software Testing Training",
      duration: "2 weeks",
      institution: "PCU",
      type: "training"
    },
    {
      id: "zscaler-security",
      title: "Zscaler Cloud Security Hands-On Program",
      duration: "3 days",
      institution: "PCU",
      type: "training"
    },
    {
      id: "ai-research",
      title: "Empowering AI Tools for Research",
      duration: "3 days",
      institution: "PCU",
      type: "seminar"
    },
    {
      id: "project-expo-mit",
      title: "National Level Project Expo Convener",
      duration: "Annual",
      institution: "MIT ADT University & PCU",
      type: "competition"
    },
    {
      id: "web-dev-competition",
      title: "Best Website Development Competition",
      duration: "1 day",
      institution: "PCU Faculty",
      type: "competition"
    },
    {
      id: "graduation-coord",
      title: "Graduation & Alumni Meet Coordination",
      duration: "Annual",
      institution: "NBN Sinhgad School of Engineering",
      type: "seminar"
    }
  ], []);

  const mentorshipAreas: MentorshipArea[] = useMemo(() => [
    {
      id: "phd-supervision",
      title: "Ph.D. Supervision",
      description: "Research in Blockchain, AI, and Data Privacy",
      type: "supervision",
      count: "Active"
    },
    {
      id: "project-guidance",
      title: "Project Guidance",
      description: "20+ UG and PG projects in AI-driven applications, cloud security, and software engineering",
      type: "guidance",
      count: "20+"
    },
    {
      id: "competition-mentoring",
      title: "Competition Mentoring",
      description: "Hackathons, coding competitions, and project expos",
      type: "mentoring",
      count: "Multiple"
    },
    {
      id: "academic-support",
      title: "Academic Support",
      description: "Teacher Guardian & Class Teacher for multiple cohorts",
      type: "support"
    },
    {
      id: "alumni-relations",
      title: "Alumni Relations",
      description: "Building long-term student-institution connections",
      type: "relations"
    },
    {
      id: "ieee-counsellor",
      title: "IEEE Student Branch Counsellor",
      description: "Contributing to innovation culture and industry-academia linkages at PCU",
      type: "mentoring"
    }
  ], []);

  // Icon component function
  const getIconSvg = (iconName: string) => {
    switch (iconName) {
      case 'graduation-cap':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"/>
          </svg>
        );
      case 'book-open':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      case 'users':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'trophy':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/>
            <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"/>
            <path d="M2 14h20v-2a6 6 0 0 0-12 0v2a6 6 0 0 0 12 0"/>
          </svg>
        );
      case 'zap':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        );
      case 'target':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        );
      case 'wrench':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        );
      case 'microscope':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18h8"/>
            <path d="M3 22h18"/>
            <path d="M14 22a7 7 0 1 0 0-14h-1"/>
            <path d="M9 14h2"/>
            <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
            <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
          </svg>
        );
      case 'trending-up':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
            <polyline points="16,7 22,7 22,13"/>
          </svg>
        );
      case 'rocket':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
          </svg>
        );
      case 'link':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getMentorshipIcon = (type: MentorshipArea['type']) => {
    switch (type) {
      case 'supervision':
        return getIconSvg('graduation-cap');
      case 'guidance':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="4" width="16" height="12" rx="2"/>
            <path d="M2 18h20"/>
          </svg>
        );
      case 'mentoring':
        return getIconSvg('trophy');
      case 'support':
        return getIconSvg('target');
      case 'relations':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"/>
            <path d="M13 7a4 4 0 0 1 8 0v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/>
            <path d="M11 9h2"/>
          </svg>
        );
      default:
        return getIconSvg('users');
    }
  };

  // ✅ FIXED: Animation runs only once using ScrollTrigger with once: true
  useEffect(() => {
    if (hasAnimated) return; // Exit if already animated

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current?.children || []], { opacity: 0, y: 50, scale: 0.9 });
      gsap.set([statsRef.current?.children || []], { opacity: 0, y: 30, scale: 0.8 });
      gsap.set([navRef.current?.children || []], { opacity: 0, x: -30, rotateY: -15 });
      gsap.set(contentRef.current, { opacity: 0, y: 30, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onLeave: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set([headerRef.current?.children || []], { opacity: 1, y: 0, scale: 1 });
            gsap.set([statsRef.current?.children || []], { opacity: 1, y: 0, scale: 1 });
            gsap.set([navRef.current?.children || []], { opacity: 1, x: 0, rotateY: 0 });
            gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });
          }
        }
      });

      // Header animation
      tl.to(headerRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)"
      });

      // Stats animation
      tl.to(statsRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.6");

      // Navigation animation
      tl.to(navRef.current?.children || [], { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // Content animation
      tl.to(contentRef.current, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  // Tab change handler with animation
  const handleSectionChange = useCallback((section: typeof activeSection) => {
    if (section === activeSection) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveSection(section);
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)"
        });
      }
    });
  }, [activeSection]);

  // Render functions
  const renderPhilosophy = () => (
    <div className={styles.philosophyContent}>
      <div className={styles.researchGrid}>
        <div className={styles.focusCard}>
          <h3 className={styles.cardTitle}>Teaching Philosophy</h3>
          <div className={styles.tagCloud}>
            <span className={styles.researchTag}>Conceptual Clarity</span>
            <span className={styles.researchTag}>Practical Exposure</span>
            <span className={styles.researchTag}>Research-Driven Learning</span>
            <span className={styles.researchTag}>Innovation Focus</span>
            <span className={styles.researchTag}>Critical Thinking</span>
            <span className={styles.researchTag}>Problem Solving</span>
          </div>
        </div>
        
        <div className={styles.themesCard}>
          <h3 className={styles.cardTitle}>Key Teaching Themes</h3>
          <ul className={styles.themesList}>
            <li className={styles.themeItem}>
              <span className={styles.bullet}></span>
              Empowering students through conceptual clarity and practical exposure
            </li>
            <li className={styles.themeItem}>
              <span className={styles.bullet}></span>
              Fostering critical thinking and hands-on problem-solving skills
            </li>
            <li className={styles.themeItem}>
              <span className={styles.bullet}></span>
              Preparing students for real-world engineering challenges
            </li>
            <li className={styles.themeItem}>
              <span className={styles.bullet}></span>
              Promoting innovation and ethical technology development
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className={styles.coursesContent}>
      <div className={styles.typeSection}>
        <h3 className={styles.typeTitle}>Undergraduate Courses</h3>
        <div className={styles.coursesGrid}>
          {courses.filter(course => course.level === 'undergraduate').map((course, index) => (
            <div key={course.id} className={`${styles.courseCard} ${styles[course.category]}`}>
              <div className={styles.courseHeader}>
                <div className={styles.courseNumber}>{index + 1}</div>
                <div className={`${styles.courseType} ${styles[course.category]}`}>
                  {course.category.toUpperCase()}
                </div>
              </div>
              <h4 className={styles.courseTitle}>{course.name}</h4>
              <p className={styles.courseLevel}>Bachelor of Engineering / Technology Level</p>
              <div className={styles.courseTags}>
                <span className={styles.courseTag}>Core Subject</span>
                {course.category === 'advanced' && <span className={styles.courseTag}>Advanced</span>}
                {course.category === 'specialized' && <span className={styles.courseTag}>Specialized</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.typeSection}>
        <h3 className={styles.typeTitle}>Postgraduate Courses</h3>
        <div className={styles.coursesGrid}>
          {courses.filter(course => course.level === 'postgraduate').map((course, index) => (
            <div key={course.id} className={`${styles.courseCard} ${styles[course.category]}`}>
              <div className={styles.courseHeader}>
                <div className={styles.courseNumber}>{index + 1}</div>
                <div className={`${styles.courseType} ${styles[course.category]}`}>
                  {course.category.toUpperCase()}
                </div>
              </div>
              <h4 className={styles.courseTitle}>{course.name}</h4>
              <p className={styles.courseLevel}>Master of Engineering / Technology Level</p>
              <div className={styles.courseTags}>
                <span className={styles.courseTag}>PG Level</span>
                {course.category === 'advanced' && <span className={styles.courseTag}>Advanced</span>}
                {course.category === 'specialized' && <span className={styles.courseTag}>Specialized</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentorship = () => (
    <div className={styles.mentorshipContent}>
      <div className={styles.typeSection}>
        <h3 className={styles.typeTitle}>Key Mentorship Areas</h3>
        <div className={styles.mentorshipGrid}>
          {mentorshipAreas.map((area, index) => (
            <div key={area.id} className={`${styles.mentorshipCard} ${styles[area.type]}`}>
              <div className={styles.mentorshipHeader}>
                <div className={styles.mentorshipIcon}>
                  {getMentorshipIcon(area.type)}
                </div>
                {area.count && (
                  <div className={styles.mentorshipCount}>{area.count}</div>
                )}
              </div>
              <h4 className={styles.mentorshipTitle}>{area.title}</h4>
              <p className={styles.mentorshipDescription}>{area.description}</p>
              <div className={styles.mentorshipTags}>
                <span className={styles.mentorshipTag}>{area.type}</span>
                <span className={styles.mentorshipTag}>Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkshops = () => (
    <div className={styles.workshopsContent}>
      <div className={styles.workshopsGrid}>
        {workshops.map((workshop) => (
          <div key={workshop.id} className={styles.workshopCard}>
            <div className={styles.workshopIcon}>
              {getIconSvg('zap')}
            </div>
            <div className={styles.workshopInfo}>
              <h4 className={styles.workshopTitle}>{workshop.title}</h4>
              <p className={styles.workshopInstitution}>{workshop.institution}</p>
              <p className={styles.workshopDuration}>{workshop.duration} | {workshop.type.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImpact = () => (
    <div className={styles.impactContent}>
      <div className={styles.impactSection}>
        <h3 className={styles.sectionTitle}>Teaching Impact</h3>
        <div className={styles.impactsList}>
          <div className={styles.impactCard}>
            <div className={styles.impactHeader}>
              <div className={styles.impactType}>EXCELLENCE</div>
              <div className={styles.impactStatus}>ACTIVE</div>
            </div>
            <h4 className={styles.impactTitle}>15+ Years of Teaching Excellence</h4>
            <div className={styles.impactDetails}>
              <span>Academic Leadership</span>
              <span>Student Development</span>
              <span>Industry Integration</span>
            </div>
          </div>
          
          <div className={styles.impactCard}>
            <div className={styles.impactHeader}>
              <div className={styles.impactType}>INTEGRATION</div>
              <div className={styles.impactStatus}>ONGOING</div>
            </div>
            <h4 className={styles.impactTitle}>100% Industry-Academic Integration</h4>
            <div className={styles.impactDetails}>
              <span>Real-world Projects</span>
              <span>Industry Collaboration</span>
              <span>Practical Learning</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.highlightSection}>
        <h3 className={styles.sectionTitle}>Key Highlights</h3>
        <div className={styles.impactsList}>
          <div className={styles.highlightCard}>
            <div className={styles.highlightHeader}>
              <div className={styles.highlightType}>INNOVATION</div>
              <div className={styles.highlightStatus}>ACTIVE</div>
            </div>
            <h4 className={styles.highlightTitle}>Innovation-Driven Education</h4>
            <div className={styles.highlightDetails}>
              <span>Future-Ready Students</span>
              <span>Technology Focus</span>
              <span>Research Culture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="teaching" className={styles.teaching} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>Teaching Excellence</h2>
          <p className={styles.subtitle}>
            Empowering Future Technologists Through Innovation-Driven Education
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid} ref={statsRef}>
          {teachingStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                {getIconSvg(stat.icon)}
              </div>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className={styles.navigation} ref={navRef}>
          <button
            className={`${styles.navButton} ${activeSection === 'philosophy' ? styles.active : ''}`}
            onClick={() => handleSectionChange('philosophy')}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7a4 4 0 1 1 8 0m0 0v7a4 4 0 0 1-8 0m8 0h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4"/>
            </svg>
            Philosophy
          </button>
          
          <button
            className={`${styles.navButton} ${activeSection === 'courses' ? styles.active : ''}`}
            onClick={() => handleSectionChange('courses')}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Courses
          </button>
          
          <button
            className={`${styles.navButton} ${activeSection === 'mentorship' ? styles.active : ''}`}
            onClick={() => handleSectionChange('mentorship')}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Mentorship
          </button>
          
          <button
            className={`${styles.navButton} ${activeSection === 'workshops' ? styles.active : ''}`}
            onClick={() => handleSectionChange('workshops')}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Workshops
          </button>
          
          <button
            className={`${styles.navButton} ${activeSection === 'impact' ? styles.active : ''}`}
            onClick={() => handleSectionChange('impact')}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
            Impact
          </button>
        </div>

        {/* Content */}
        <div className={styles.content} ref={contentRef}>
          {activeSection === 'philosophy' && renderPhilosophy()}
          {activeSection === 'courses' && renderCourses()}
          {activeSection === 'mentorship' && renderMentorship()}
          {activeSection === 'workshops' && renderWorkshops()}
          {activeSection === 'impact' && renderImpact()}
        </div>
      </div>
    </section>
  );
};

export default TeachingSection;
