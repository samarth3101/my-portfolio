"use client";

// components/sections/AboutSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/AboutSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  level: 'doctoral' | 'masters' | 'bachelors' | 'diploma';
}

interface ExperienceItem {
  id: string;
  position: string;
  institution: string;
  duration: string;
  years: number;
  current?: boolean;
}

interface ResponsibilityCategory {
  id: string;
  title: string;
  items: string[];
  priority: 'high' | 'medium' | 'normal';
}

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'responsibilities'>('education');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stackAnimationsCreated, setStackAnimationsCreated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);

  const education: EducationItem[] = [
    {
      id: "phd",
      degree: "Ph.D. in Computer Science and Engineering",
      institution: "Bharath Institute of Higher Education and Research, Chennai",
      year: "2020",
      grade: "Completed",
      level: "doctoral"
    },
    {
      id: "me",
      degree: "ME Computer Engineering",
      institution: "Siddhant CoE, Pune, Savitribai Phule Pune University",
      year: "2013",
      grade: "First Class",
      level: "masters"
    },
    {
      id: "be",
      degree: "BE Computer Engineering",
      institution: "P.R.E.C., Loni, Ahmednagar, Savitribai Phule Pune University",
      year: "2009",
      grade: "First Class",
      level: "bachelors"
    },
    {
      id: "dcm",
      degree: "DCM Computer Engineering",
      institution: "R.P.W. Loni MSBTE, Mumbai",
      year: "2005",
      grade: "First Class",
      level: "diploma"
    }
  ];

  const experience: ExperienceItem[] = [
    {
      id: "pcu",
      position: "Associate Professor",
      institution: "Pimpri Chinchwad University, Pune",
      duration: "January 2024 - Present",
      years: 1,
      current: true
    },
    {
      id: "mit",
      position: "Assistant Professor",
      institution: "MIT ADT University, MSOE, Pune",
      duration: "March 2021 - December 2023",
      years: 3
    },
    {
      id: "nbn",
      position: "Assistant Professor",
      institution: "NBN Sinhgad School of Engineering, Pune",
      duration: "July 2014 - March 2021",
      years: 7
    },
    {
      id: "jspm",
      position: "Assistant Professor",
      institution: "J.S.P.M.'s BSIOTR Wagholi",
      duration: "June 2012 - June 2014",
      years: 2
    },
    {
      id: "pdea",
      position: "Assistant Professor",
      institution: "P.D.E.A College of Engineering, Hadapsar (Manjari)",
      duration: "January 2010 - April 2012",
      years: 2
    }
  ];

  const responsibilities: ResponsibilityCategory[] = [
    {
      id: "current",
      title: "Current Academic Leadership at PCU",
      priority: "high",
      items: [
        "Head, Department of Computer Science & Engineering (AI & ML)",
        "Board of Studies (BoS) Coordinator & Member",
        "Ph.D. Supervisor - Blockchain, AI, and Data Privacy",
        "Academic Coordinator",
        "IEEE Student Branch Counsellor – PCU"
      ]
    },
    {
      id: "examination",
      title: "Examination & Evaluation",
      priority: "medium",
      items: [
        "Internal supervisor for university examinations",
        "Served at SPPU CAP Center, NBN Sinhgad School of Engineering",
        "Paper Setter at MIT ADT University and VIIT College of Engineering",
        "Prepared Question Bank for PERA CET 2021 (M.Tech – CSE & IT)"
      ]
    },
    {
      id: "accreditation",
      title: "Accreditation & Quality Assurance",
      priority: "medium",
      items: [
        "NAAC Student Section Coordinator",
        "Department Academic Report Coordinator"
      ]
    },
    {
      id: "engagement",
      title: "Student Engagement & Mentorship",
      priority: "medium",
      items: [
        "Alumni Coordinator",
        "Class Teacher and Teacher Guardian",
        "NSS and Prayas Member",
        "STP Trainer",
        "Research Supervisor"
      ]
    },
    {
      id: "events",
      title: "Event Coordination & Committees",
      priority: "normal",
      items: [
        "Coordinator in various institute-level technical events",
        "Guest Lecture Coordinator",
        "Project Coordinator",
        "Coordinator for PMC Poster Competition",
        "ACES Student Club Coordinator",
        "Technical Event Convener, Sinhgad Karandak at NBN SoE",
        "Technical Event Convener Persona @ MIT ADT University",
        "Member of Brochure Committee"
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Academic Roles",
      priority: "medium",
      items: [
        "Integrated B.Tech Programme Head at MIT ADT University",
        "ICT Academy SPOC",
        "DUGC Committee Member",
        "Board of Studies (BoS) Member",
        "Course Coordinator"
      ]
    },
    {
      id: "training",
      title: "Training & Skill Development",
      priority: "high",
      items: [
        "One-week training program on Data Structures and Algorithms @ MIT ADT University",
        "Convener for National Level Project Expo at MIT ADT University",
        "Two-week training program on software testing at PCU",
        "3-Day Training Program on Zscaler Cloud Security at PCU",
        "3-Day Training Program on Empowering AI Tools for Research at PCU",
        "Convener for Project Expo at PCU",
        "Convener for Best Website Development competition for PCU faculty",
        "Coordinator for Graduation Ceremony and Alumni Meet at NBN SoE"
      ]
    }
  ];

  // ✅ FIXED: Main section animation - runs only once
  useEffect(() => {
    if (hasAnimated) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current?.children || []], { opacity: 0, y: 30, scale: 0.95 });
      gsap.set([tabsRef.current?.children || []], { opacity: 0, y: 20, rotateX: -15 });
      gsap.set(contentRef.current, { opacity: 0, y: 20, scale: 0.98 });

      // Create timeline with ScrollTrigger that runs only once
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onLeave: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set([headerRef.current?.children || []], { opacity: 1, y: 0, scale: 1 });
            gsap.set([tabsRef.current?.children || []], { opacity: 1, y: 0, rotateX: 0 });
            gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });
          }
        }
      });

      tl.to(headerRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)"
      });

      tl.to(tabsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  // ✅ FIXED: Stack animations - run once per tab activation
  useEffect(() => {
    if (activeTab !== 'responsibilities' || !stackContainerRef.current || stackAnimationsCreated || !hasAnimated) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.stackCard}`);
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        
        gsap.set(cardElement, {
          y: index * 20,
          scale: 1 - (index * 0.05),
          zIndex: cards.length - index,
          transformOrigin: "center top"
        });

        ScrollTrigger.create({
          trigger: cardElement,
          start: "top center+=100",
          end: "bottom center-=100",
          once: true, // ✅ KEY FIX: Run only once per card
          onEnter: () => {
            gsap.to(cardElement, {
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)"
            });
          }
        });
      });

      setStackAnimationsCreated(true);
    }, stackContainerRef);

    return () => ctx.revert();
  }, [activeTab, hasAnimated, stackAnimationsCreated]);

  const handleTabChange = (tab: 'education' | 'experience' | 'responsibilities') => {
    if (tab === activeTab) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.2)"
        });
      }
    });
  };

  const getEducationIcon = (level: string) => {
    switch (level) {
      case 'doctoral':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"/>
          </svg>
        );
      case 'masters':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        );
      case 'bachelors':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        );
    }
  };

  const renderEducation = () => (
    <div className={styles.educationGrid}>
      {education.map((item) => (
        <div key={item.id} className={`${styles.educationCard} ${styles[`level-${item.level}`]}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              {getEducationIcon(item.level)}
            </div>
            <div className={styles.yearBadge}>{item.year}</div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.degree}>{item.degree}</h3>
            <p className={styles.institution}>{item.institution}</p>
            <div className={styles.gradeContainer}>
              <span className={styles.grade}>{item.grade}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className={styles.experienceTimeline}>
      {experience.map((item, index) => (
        <div key={item.id} className={`${styles.experienceCard} ${item.current ? styles.current : ''}`}>
          <div className={styles.timelineDot}>
            {item.current && <div className={styles.pulseRing} />}
          </div>
          <div className={styles.experienceContent}>
            <div className={styles.experienceHeader}>
              <div className={styles.positionInfo}>
                <h3 className={styles.position}>{item.position}</h3>
                <p className={styles.institution}>{item.institution}</p>
              </div>
              <div className={styles.durationInfo}>
                <span className={styles.duration}>{item.duration}</span>
                <div className={styles.yearsIndicator}>
                  <span className={styles.yearsCount}>{item.years}</span>
                  <span className={styles.yearsLabel}>year{item.years > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            {item.current && (
              <div className={styles.currentBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Current Position
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderResponsibilities = () => (
    <div className={styles.scrollStackContainer} ref={stackContainerRef}>
      <div className={styles.stackHeader}>
        <h3 className={styles.stackTitle}>Leadership & Administrative Excellence</h3>
        <p className={styles.stackSubtitle}>Scroll to explore comprehensive roles across academic leadership</p>
      </div>
      
      <div className={styles.cardsStack}>
        {responsibilities.map((category, index) => (
          <div key={category.id} className={`${styles.stackCard} ${styles[`priority-${category.priority}`]}`}>
            <div className={styles.stackCardHeader}>
              <div className={styles.categoryIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className={styles.cardTitleSection}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.itemCount}>{category.items.length} responsibilities</div>
              </div>
              <div className={styles.priorityBadge}>{category.priority}</div>
            </div>
            
            <div className={styles.responsibilityList}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.responsibilityItem}>
                  <span className={styles.bullet}></span>
                  <span className={styles.itemText}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>About Dr. Swati Shirke-Deshmukh</h2>
          <p className={styles.subtitle}>
            Academic Excellence, Leadership, and Innovation in Computer Science & AI/ML
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation} ref={tabsRef}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'education' ? styles.active : ''}`}
            onClick={() => handleTabChange('education')}
          >
            <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"/>
            </svg>
            Educational Qualification
          </button>
          
          <button 
            className={`${styles.tabButton} ${activeTab === 'experience' ? styles.active : ''}`}
            onClick={() => handleTabChange('experience')}
          >
            <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Professional Experience
          </button>
          
          <button 
            className={`${styles.tabButton} ${activeTab === 'responsibilities' ? styles.active : ''}`}
            onClick={() => handleTabChange('responsibilities')}
          >
            <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Responsibilities & Leadership
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent} ref={contentRef}>
          {activeTab === 'education' && renderEducation()}
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'responsibilities' && renderResponsibilities()}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
