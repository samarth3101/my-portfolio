"use client";

// components/sections/ProfessionalSection.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/ProfessionalSection.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Role {
  org: string;
  title: string;
  dates: string;
  highlights: string[];
  type: 'current' | 'previous';
}

interface Qualification {
  degree: string;
  field: string;
  institution: string;
  year: string;
  type: 'doctorate' | 'masters' | 'bachelor' | 'diploma';
}

const ProfessionalSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ Track animation completion
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Professional roles data
  const roles: Role[] = useMemo(() => [
    {
      org: "Pimpri Chinchwad University, Pune",
      title: "Associate Professor & Head of Department",
      dates: "Jan 2024 – Present",
      type: "current",
      highlights: [
        "Leading curriculum design, faculty management, and research initiatives in AI & ML",
        "Supervising Ph.D. scholars in Blockchain, AI, and Data Privacy domains",
        "IEEE Student Branch Counsellor fostering innovation & industry interaction",
        "Academic Coordinator responsible for strategic planning and policy execution",
      ],
    },
    {
      org: "MIT ADT University, Pune (MSOE)",
      title: "Assistant Professor & Programme Head",
      dates: "Mar 2021 – Dec 2023",
      type: "previous",
      highlights: [
        "Programme Head for Integrated B.Tech program",
        "National Level Project Expo Convener",
        "STP Trainer conducting specialized technical training programs",
        "Active member of Board of Studies (BoS) & DUGC Committees",
      ],
    },
    {
      org: "NBN Sinhgad School of Engineering, Pune",
      title: "Assistant Professor & Event Coordinator",
      dates: "Jul 2014 – Mar 2021",
      type: "previous",
      highlights: [
        "Coordinated major technical & cultural events (Sinhgad Karandak, PMC Competitions)",
        "NAAC Student Section Coordinator & Academic Report Coordinator",
        "Alumni Coordinator building lasting institutional relationships",
        "CAP Center management and Question Bank development lead",
      ],
    },
    {
      org: "JSPM's BSIOTR, Wagholi",
      title: "Assistant Professor",
      dates: "Jun 2012 – Jun 2014",
      type: "previous",
      highlights: [
        "Successfully guided 15+ undergraduate projects to completion",
        "Institute-level event coordination and technical committee membership",
      ],
    },
    {
      org: "PDEA College of Engineering, Hadapsar",
      title: "Assistant Professor",
      dates: "Jan 2010 – Apr 2012",
      type: "previous",
      highlights: [
        "Academic instruction across multiple computer engineering subjects",
        "NSS mentor fostering community service and institutional activities",
      ],
    },
  ], []);

  // Academic qualifications data
  const qualifications: Qualification[] = useMemo(() => [
    {
      degree: "Ph.D.",
      field: "Computer Science & Engineering",
      institution: "Bharath Institute of Higher Education & Research, Chennai",
      year: "2020",
      type: "doctorate",
    },
    {
      degree: "M.E.",
      field: "Computer Engineering",
      institution: "Siddhant College of Engineering, Pune",
      year: "2013",
      type: "masters",
    },
    {
      degree: "B.E.",
      field: "Computer Engineering",
      institution: "PREC Loni, Pune",
      year: "2009",
      type: "bachelor",
    },
    {
      degree: "D.C.M.",
      field: "Computer Engineering",
      institution: "RPW Loni, MSBTE, Mumbai",
      year: "2005",
      type: "diploma",
    },
  ], []);

  // Icon components
  const getTypeIcon = useCallback((type: Role['type']) => {
    if (type === 'current') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );
  }, []);

  const getDegreeIcon = useCallback((type: Qualification['type']) => {
    switch (type) {
      case 'doctorate':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5"/>
          </svg>
        );
      case 'masters':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      case 'bachelor':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <path d="M12 17h.01"/>
          </svg>
        );
      case 'diploma':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        );
      default:
        return null;
    }
  }, []);

  // ✅ FIXED: Animation runs only once using ScrollTrigger with once: true
  useEffect(() => {
    if (hasAnimated) return; // Exit if already animated

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30, scale: 0.96 });
      gsap.set([timelineRef.current?.children || []], { opacity: 0, x: -30, scale: 0.97 });

      const tl = gsap.timeline({ 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onLeave: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set(titleRef.current, { opacity: 1, y: 0, scale: 1 });
            gsap.set([timelineRef.current?.children || []], { opacity: 1, x: 0, scale: 1 });
          }
        },
        defaults: { ease: "power2.out" }
      });

      // Title animation
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.7, 
        ease: "back.out(1.2)" 
      });

      // Timeline entries animation
      tl.to(timelineRef.current?.children || [], { 
        opacity: 1, 
        x: 0,
        scale: 1,
        duration: 0.5, 
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  return (
    <section 
      id="professional" 
      className={styles.professionalPath}
      ref={sectionRef}
    >
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header} ref={titleRef}>
          <h2 className={styles.title}>Professional Journey</h2>
          <p className={styles.subtitle}>
            15+ years of academic excellence and educational leadership
          </p>
        </header>
        
        {/* Timeline */}
        <div className={styles.timelineWrapper}>
          <div className={styles.timeline} ref={timelineRef}>
            
            {/* Current Role Header */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Current Role</h3>
            </div>

            {/* Current Role */}
            {roles.filter(role => role.type === 'current').map((role, idx) => (
              <article className={`${styles.entry} ${styles.current}`} key={`current-${idx}`}>
                <div className={`${styles.marker} ${styles.currentMarker}`}>
                  {getTypeIcon(role.type)}
                </div>
                <div className={styles.card}>
                  <header className={styles.cardHeader}>
                    <div className={styles.titleGroup}>
                      <h3 className={styles.roleTitle}>{role.title}</h3>
                      <p className={styles.roleOrg}>{role.org}</p>
                    </div>
                    <time className={styles.roleDates}>{role.dates}</time>
                  </header>
                  <ul className={styles.highlights}>
                    {role.highlights.map((highlight, i) => (
                      <li key={i}>
                        <span className={styles.highlightBullet}></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            {/* Previous Roles Header */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Previous Roles</h3>
            </div>

            {/* Previous Roles */}
            {roles.filter(role => role.type === 'previous').map((role, idx) => (
              <article className={styles.entry} key={`previous-${idx}`}>
                <div className={styles.marker}>
                  {getTypeIcon(role.type)}
                </div>
                <div className={styles.card}>
                  <header className={styles.cardHeader}>
                    <div className={styles.titleGroup}>
                      <h4 className={styles.roleTitle}>{role.title}</h4>
                      <p className={styles.roleOrg}>{role.org}</p>
                    </div>
                    <time className={styles.roleDates}>{role.dates}</time>
                  </header>
                  <ul className={styles.highlights}>
                    {role.highlights.map((highlight, i) => (
                      <li key={i}>
                        <span className={styles.highlightBullet}></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            {/* Education Divider */}
            <div className={styles.qualDivider}>
              <span className={styles.qualDividerText}>Academic Foundation</span>
            </div>

            {/* Academic Qualifications */}
            {qualifications.map((qualification, i) => (
              <article className={styles.entry} key={`qual-${i}`}>
                <div className={`${styles.marker} ${styles.degreeMarker} ${styles[qualification.type]}`}>
                  {getDegreeIcon(qualification.type)}
                </div>
                <div className={`${styles.card} ${styles.degreeCard}`}>
                  <header className={styles.cardHeader}>
                    <div className={styles.titleGroup}>
                      <h4 className={styles.roleTitle}>
                        {qualification.degree} in {qualification.field}
                      </h4>
                      <p className={styles.roleOrg}>{qualification.institution}</p>
                    </div>
                    <time className={styles.roleDates}>{qualification.year}</time>
                  </header>
                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSection;
