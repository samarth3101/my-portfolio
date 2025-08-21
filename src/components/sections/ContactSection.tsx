"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    MapPin,
    Mail,
    Phone,
    Linkedin,
    BookOpen,
    GraduationCap,
    Send,
    Check,
    AlertCircle
} from 'lucide-react';
import styles from '../../styles/ContactSection.module.scss';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const sectionRef = useRef<HTMLDivElement>(null);
    const contactInfoRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const contactInfo = [
        {
            icon: <MapPin className={styles.contactIcon} />,
            label: "Office Location",
            value: "Pimpri Chinchwad University, Pune",
            action: () => window.open('https://maps.google.com/?q=Pimpri+Chinchwad+University+Pune', '_blank')
        },
        {
            icon: <Mail className={styles.contactIcon} />,
            label: "Email",
            value: "swati.shirke@pcu.edu.in",
            action: () => window.open('mailto:contact@professor.edu', '_blank')
        },
        {
            icon: <Phone className={styles.contactIcon} />,
            label: "Phone",
            value: "+91 7755916793",
            action: () => window.open('tel:+91 7755916793', '_blank')
        }
    ];

    const socialLinks = [
        {
            icon: <Linkedin className={styles.socialIcon} />,
            label: "LinkedIn",
            url: "https://linkedin.com/in/professor"
        },
        {
            icon: <BookOpen className={styles.socialIcon} />,
            label: "Google Scholar",
            url: "https://scholar.google.com/citations?user=professor"
        },
        {
            icon: <GraduationCap className={styles.socialIcon} />,
            label: "ResearchGate",
            url: "https://researchgate.net/profile/professor"
        }
    ];

    // GSAP Animations
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const elements = [
                contactInfoRef.current,
                formRef.current,
                mapRef.current
            ].filter(Boolean);

            if (sectionRef.current && elements.length > 0) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });

                elements.forEach((element, index) => {
                    tl.fromTo(element,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                        index * 0.2
                    );
                });
            }
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call - replace with actual submission logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section id="contact" className={styles.section} ref={sectionRef}>
            <div className={styles.container}>

                {/* Main Contact Content */}
                <div className={styles.contactGrid}>

                    {/* Left Column - Contact Info */}
                    <div className={styles.contactInfo} ref={contactInfoRef}>
                        <h2 className={styles.sectionTitle}>Get in Touch</h2>
                        <p className={styles.sectionSubtitle}>
                            I'd love to hear from you. Whether you have questions about my research,
                            collaboration opportunities, or academic inquiries.
                        </p>

                        {/* Contact Details */}
                        <div className={styles.contactList}>
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.contactItem}
                                    onClick={item.action}
                                >
                                    {item.icon}
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactLabel}>{item.label}</span>
                                        <span className={styles.contactValue}>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className={styles.socialSection}>
                            <h3 className={styles.socialTitle}>Connect with me</h3>
                            <div className={styles.socialLinks}>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className={styles.contactForm} ref={formRef}>
                        <div className={styles.formCard}>
                            <h3 className={styles.formTitle}>Send a Message</h3>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                {/* Name Field */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                                    />
                                    {errors.name && (
                                        <span className={styles.errorMessage}>
                                            <AlertCircle size={16} />
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your email address"
                                        className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                                    />
                                    {errors.email && (
                                        <span className={styles.errorMessage}>
                                            <AlertCircle size={16} />
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Subject (optional)"
                                        className={styles.formInput}
                                    />
                                </div>

                                {/* Message Field */}
                                <div className={styles.formGroup}>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Your message..."
                                        rows={6}
                                        className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                                    />
                                    {errors.message && (
                                        <span className={styles.errorMessage}>
                                            <AlertCircle size={16} />
                                            {errors.message}
                                        </span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className={styles.spinner}></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className={styles.successMessage}>
                                        <Check size={16} />
                                        Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className={styles.errorMessage}>
                                        <AlertCircle size={16} />
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                {/* Footer Note */}
                                <p className={styles.responseNote}>
                                    I usually respond within 2–3 business days.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed - Updated for PCU */}
                <div className={styles.mapSection} ref={mapRef}>
                    <h3 className={styles.mapTitle}>Find Me</h3>
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.108992661463!2d73.60741999999999!3d18.748668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2addaeb41d919%3A0xcc551cf73e3bdf1c!2sPimpri%20Chinchwad%20University!5e0!3m2!1sen!2sin!4v1755783749315!5m2!1sen!2sin"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pimpri Chinchwad University Location"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactSection;
