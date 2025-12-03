"use client";

// components/sections/ResearchSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/ResearchSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  type: 'sci' | 'scopus' | 'conference' | 'book' | 'patent' | 'copyright';
  status?: string;
  doi?: string;
  isbn?: string;
  appNo?: string;
  regNo?: string;
  indexing?: string[];
}

const ResearchSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('overview');
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ Track animation completion
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const researchStats = {
    citations: 125,
    hIndex: 4,
    i10Index: 3,
    publications: 23,
    books: 11,
    patents: 2
  };

  const researchFocus = [
    "Iris Recognition",
    "Biometrics",
    "Deep Learning (DBN/ANN)",
    "Computer Vision",
    "Image Processing",
    "Optimization (MBO)",
    "Pattern Recognition",
    "Security & Authentication"
  ];

  const recentThemes = [
    "Iris recognition at-a-distance",
    "Feature extraction (Hough, Radon, Gabor)",
    "Rubber Sheet Model",
    "Deep-learning based descriptors",
    "Security & Captchas",
    "Gesture-based HCI"
  ];

  const publications: Publication[] = [
    {
      id: "sci1",
      title: "Local Gradient Pattern and Deep Learning–based Approach for Iris Recognition at-a-Distance",
      journal: "International Journal of Knowledge-Based and Intelligent Engineering Systems",
      year: "2019",
      type: "sci",
      indexing: ["WoS", "Scopus", "J-Gate"]
    },
    {
      id: "sci2",
      title: "ScatT-Loop: Scattering Tetrolet Loop Descriptor and Optimized NN for Iris Recognition at-a-Distance",
      journal: "International Journal of Biomedical Engineering",
      year: "2020",
      type: "sci",
      indexing: ["WoS Core Collection – SCIE"]
    },
    {
      id: "sci3",
      title: "Chronological Monarch Butterfly Optimization–based Deep Belief Network for Iris Recognition at-a-Distance",
      journal: "Knowledge-Based and Intelligent Engineering Systems",
      year: "2020",
      type: "sci",
      indexing: ["WoS", "Scopus", "J-Gate"]
    },
    {
      id: "book1",
      title: "Embedded Operating Systems",
      journal: "Nirali Publications",
      year: "2015",
      type: "book",
      isbn: "978-93-5164-367-8"
    },
    {
      id: "book2",
      title: "Artificial Intelligence and Machine Learning",
      journal: "Nirali Publications",
      year: "2022",
      type: "book",
      isbn: "9789354518508"
    },
    {
      id: "patent1",
      title: "An Intelligent Audio and Video Recorder Embedded With A Speech Recognition and Video Processing System",
      journal: "Design Patent",
      year: "2022",
      type: "patent",
      status: "Published",
      appNo: "202121061379"
    }
  ];

  const categories = [
    { 
      id: 'overview', 
      label: 'Research Overview', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      )
    },
    { 
      id: 'publications', 
      label: 'Publications', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    { 
      id: 'books', 
      label: 'Books', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
        </svg>
      )
    },
    { 
      id: 'patents', 
      label: 'Patents & IP', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      )
    },
    { 
      id: 'profiles', 
      label: 'Research Profiles', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  // ✅ FIXED: Animation runs only once using ScrollTrigger with once: true
  useEffect(() => {
    if (hasAnimated) return; // Exit if already animated

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current?.children || []], { opacity: 0, y: 30, scale: 0.95 });
      gsap.set([statsRef.current?.children || []], { opacity: 0, y: 20 });
      gsap.set([categoriesRef.current?.children || []], { opacity: 0, y: 20, rotateX: -15 });
      gsap.set(contentRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // ✅ KEY FIX: Animate only once
          onLeave: () => {
            setHasAnimated(true);
            // Ensure elements stay visible
            gsap.set([headerRef.current?.children || []], { opacity: 1, y: 0, scale: 1 });
            gsap.set([statsRef.current?.children || []], { opacity: 1, y: 0 });
            gsap.set([categoriesRef.current?.children || []], { opacity: 1, y: 0, rotateX: 0 });
            gsap.set(contentRef.current, { opacity: 1, y: 0 });
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

      tl.to(statsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");

      tl.to(categoriesRef.current?.children || [], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.3");

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []); // Empty dependency array

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(categoryId);
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.2)"
        });
      }
    });
  };

  const renderOverview = () => (
    <div className={styles.overviewContent}>
      <div className={styles.researchGrid}>
        <div className={styles.focusCard}>
          <h3 className={styles.cardTitle}>Primary Research Areas</h3>
          <div className={styles.tagCloud}>
            {researchFocus.map((area, index) => (
              <span key={index} className={styles.researchTag}>
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.themesCard}>
          <h3 className={styles.cardTitle}>Recent Research Themes</h3>
          <ul className={styles.themesList}>
            {recentThemes.map((theme, index) => (
              <li key={index} className={styles.themeItem}>
                <span className={styles.bullet}></span>
                {theme}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.profilesGrid}>
        <div className={styles.profileCard}>
          <h4>ORCID</h4>
          <a href="https://orcid.org/0000-0001-6668-5610" target="_blank" rel="noopener noreferrer">
            0000-0001-6668-5610
          </a>
        </div>
        <div className={styles.profileCard}>
          <h4>Scopus Author ID</h4>
          <span>57190344923</span>
        </div>
        <div className={styles.profileCard}>
          <h4>Google Scholar</h4>
          <a href="https://scholar.google.com/citations?user=FstcyVcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );

  const renderPublications = () => (
    <div className={styles.publicationsContent}>
      <div className={styles.publicationTypes}>
        <div className={styles.typeSection}>
          <h3 className={styles.typeTitle}>SCI / Web of Science (Core) & WoS-Indexed</h3>
          <div className={styles.publicationsList}>
            {publications.filter(p => p.type === 'sci').map((pub, index) => (
              <div key={pub.id} className={styles.publicationCard}>
                <div className={styles.pubHeader}>
                  <span className={styles.pubNumber}>{index + 1}</span>
                  <div className={styles.pubType}>SCI/WoS</div>
                </div>
                <h4 className={styles.pubTitle}>{pub.title}</h4>
                <p className={styles.pubJournal}>{pub.journal}, {pub.year}</p>
                {pub.indexing && (
                  <div className={styles.indexingTags}>
                    {pub.indexing.map((index, i) => (
                      <span key={i} className={styles.indexTag}>{index}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className={styles.booksContent}>
      <div className={styles.booksGrid}>
        {[
          { title: "Embedded Operating Systems", publisher: "Nirali", year: "2015", isbn: "978-93-5164-367-8" },
          { title: "Smart System Design and Applications", publisher: "Nirali", year: "2016", isbn: "978-93-5164-706-5" },
          { title: "Advanced Data Structures", publisher: "Nirali", year: "2017", isbn: "978-0521880374" },
          { title: "Artificial Intelligence and Robotics", publisher: "Technical Publications", year: "2018", isbn: "978-93-3321956-3" },
          { title: "Data Structures and Algorithms (SPPU)", publisher: "Nirali", year: "2021", isbn: "9789354510281" },
          { title: "Theory of Computation", publisher: "Nirali", year: "2021", isbn: "9789354512889" },
          { title: "Theory of Computation (BATU)", publisher: "Nirali", year: "2022", isbn: "9789354518577" },
          { title: "Data Mining", publisher: "Nirali", year: "2022", isbn: "9789354518119" },
          { title: "Artificial Intelligence and Machine Learning", publisher: "Nirali", year: "2022", isbn: "9789354518508" },
          { title: "Economics and Management", publisher: "Nirali", year: "2023", isbn: "9789354519338" },
          { title: "Pattern Recognition", publisher: "Nirali", year: "2023", isbn: "9789395951753" }
        ].map((book, index) => (
          <div key={index} className={styles.bookCard}>
            <div className={styles.bookIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </div>
            <div className={styles.bookInfo}>
              <h4 className={styles.bookTitle}>{book.title}</h4>
              <p className={styles.bookPublisher}>{book.publisher}, {book.year}</p>
              <span className={styles.bookIsbn}>ISBN: {book.isbn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPatents = () => (
    <div className={styles.patentsContent}>
      <div className={styles.patentSection}>
        <h3 className={styles.sectionTitle}>Published Patents</h3>
        <div className={styles.patentsList}>
          <div className={styles.patentCard}>
            <div className={styles.patentHeader}>
              <span className={styles.patentType}>Design Patent</span>
              <span className={styles.patentStatus}>Published</span>
            </div>
            <h4 className={styles.patentTitle}>
              An Intelligent Audio and Video Recorder Embedded With A Speech Recognition and Video Processing System
            </h4>
            <div className={styles.patentDetails}>
              <span>App No: 202121061379</span>
              <span>Date: 07 Jan 2022</span>
            </div>
          </div>

          <div className={styles.patentCard}>
            <div className={styles.patentHeader}>
              <span className={styles.patentType}>Ordinary Patent</span>
              <span className={styles.patentStatus}>Published</span>
            </div>
            <h4 className={styles.patentTitle}>
              Smart Intelligent Entertainment Robot for Assisting Children using IoT and Machine Learning
            </h4>
            <div className={styles.patentDetails}>
              <span>App No: 202341004377</span>
              <span>Date: 23 Jan 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyrightSection}>
        <h3 className={styles.sectionTitle}>Registered Copyright</h3>
        <div className={styles.copyrightCard}>
          <div className={styles.copyrightHeader}>
            <span className={styles.copyrightType}>Literary Work</span>
            <span className={styles.copyrightCountry}>Canada</span>
          </div>
          <h4 className={styles.copyrightTitle}>
            Cryptographic Secure Algorithm with User Validating Preservation Scheme in IoT Healthcare
          </h4>
          <div className={styles.copyrightDetails}>
            <span>Reg. No.: 1195054</span>
            <span>Date: 26 Jul 2022</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className={styles.profilesContent}>
      <div className={styles.profilesGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.86 5.18c.3-.3.67-.43 1.06-.43.4 0 .76.13 1.06.43.3.3.43.67.43 1.06 0 .4-.13.76-.43 1.06-.3.3-.67.43-1.06.43-.4 0-.76-.13-1.06-.43-.3-.3-.43-.67-.43-1.06 0-.4.13-.76.43-1.06zM9.7 8.54h1.61v8.16H9.7V8.54zm4.32 0h1.55v1.19h.02c.22-.41.64-.74 1.31-.74 1.4 0 2.34 1 2.34 2.31v5.4h-1.61v-4.78c0-.6-.11-1.37-.84-1.37-.84 0-.96.82-.96 1.4v4.75h-1.61V8.54z" />
            </svg>
          </div>
          <h4>ORCID</h4>
          <a href="https://orcid.org/0000-0001-6668-5610" target="_blank" rel="noopener noreferrer">
            0000-0001-6668-5610
          </a>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.873 14.05c0 1.02-.83 1.85-1.85 1.85s-1.85-.83-1.85-1.85.83-1.85 1.85-1.85 1.85.83 1.85 1.85zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.473 8.267c0-.733-.6-1.333-1.333-1.333H8.533c-.733 0-1.333.6-1.333 1.333v7.466c0 .733.6 1.333 1.333 1.333h5.607c.733 0 1.333-.6 1.333-1.333V8.267z" />
            </svg>
          </div>
          <h4>Scopus</h4>
          <span>Author ID: 57190344923</span>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </div>
          <h4>Google Scholar</h4>
          <a href="https://scholar.google.com/citations?user=FstcyVcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'overview':
        return renderOverview();
      case 'publications':
        return renderPublications();
      case 'books':
        return renderBooks();
      case 'patents':
        return renderPatents();
      case 'profiles':
        return renderProfiles();
      default:
        return renderOverview();
    }
  };

  return (
    <section id="research" className={styles.research} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>Research & Publications</h2>
          <p className={styles.subtitle}>
            Leading research in iris recognition, biometrics, and artificial intelligence with extensive publications and intellectual property
          </p>
        </div>

        <div className={styles.statsGrid} ref={statsRef}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 11l3 3 8-8" />
                <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.citations}</div>
            <div className={styles.statLabel}>Citations</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.hIndex}</div>
            <div className={styles.statLabel}>H-Index</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.i10Index}</div>
            <div className={styles.statLabel}>I10-Index</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.publications}</div>
            <div className={styles.statLabel}>Publications</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.books}</div>
            <div className={styles.statLabel}>Books</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className={styles.statNumber}>{researchStats.patents}</div>
            <div className={styles.statLabel}>Patents</div>
          </div>
        </div>

        <div className={styles.categoryNavigation} ref={categoriesRef}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.content} ref={contentRef}>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
