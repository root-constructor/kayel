import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Services.css'

const servicesData = [
    {
        icon: '💡',
        title: 'Consulting & Advisory',
        shortDesc: 'Strategic IT planning and digital transformation guidance',
        details: [
            'IT strategy and roadmap planning',
            'Digital transformation consulting',
            'Cloud migration advisory',
            'Technology assessment and recommendations',
            'Vendor and license management',
            'IT cost optimization'
        ]
    },
    {
        icon: '📱',
        title: 'Application Services',
        shortDesc: 'End-to-end application development and modernization',
        details: [
            'Application development (web, mobile, enterprise)',
            'Application maintenance and support',
            'Software upgrades',
            'Application performance monitoring',
            'Legacy application modernization'
        ]
    },
    {
        icon: '📊',
        title: 'Data & Analytics',
        shortDesc: 'Transform data into actionable business insights',
        details: [
            'Database administration and management',
            'Data migration and integration',
            'Business intelligence and reporting',
            'Data analytics and visualization',
            'Master data management',
            'Data governance and quality management'
        ]
    },
    {
        icon: '⚙️',
        title: 'IT Operations & Managed Services',
        shortDesc: '24/7 monitoring and comprehensive IT management',
        details: [
            'Managed IT services (24/7 monitoring)',
            'IT asset management',
            'Patch and release management',
            'Configuration management',
            'Change and incident management',
            'SLA-based support services'
        ]
    },
    {
        icon: '🚀',
        title: 'DevOps & Automation',
        shortDesc: 'Streamline development with modern DevOps practices',
        details: [
            'CI/CD pipeline implementation',
            'Infrastructure as Code (IaC)',
            'Containerization and orchestration (Docker, Kubernetes)',
            'Automation and scripting',
            'Monitoring and logging solutions'
        ]
    },
    {
        icon: '🔒',
        title: 'Cybersecurity',
        shortDesc: 'Comprehensive security solutions and compliance',
        details: [
            'Security assessments and audits',
            'Endpoint security (EDR, antivirus, MDM)',
            'Identity and access management (IAM)',
            'Firewall and intrusion detection/prevention',
            'Vulnerability management and penetration testing',
            'Security incident monitoring and response',
            'Compliance and risk management (ISO, SOC, GDPR)'
        ]
    },
    {
        icon: '💻',
        title: 'End-User & Workplace Services',
        shortDesc: 'Complete IT support for your workforce',
        details: [
            'IT helpdesk / service desk (L1, L2, L3 support)',
            'Desktop and laptop support',
            'Device provisioning and lifecycle management',
            'Mobile device management',
            'Software installation and patching',
            'User onboarding and offboarding support'
        ]
    }
]

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')

    const paginate = (direction: number) => {
        const newIndex = currentIndex + direction
        if (newIndex >= 0 && newIndex < servicesData.length) {
            setCurrentIndex(newIndex)
            setExpandedIndex(null)
        }
    }

    const goToIndex = (index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index)
            setExpandedIndex(null)
        }
    }

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    // Get prev, current, and next cards for carousel
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : null
    const nextIndex = currentIndex < servicesData.length - 1 ? currentIndex + 1 : null

    return (
        <section id="services" className="services section">
            <div className="container">
                <h2 className="section-title">
                    Our <span className="gradient-text">Services</span>
                </h2>

                <p className="section-subtitle">
                    Comprehensive IT solutions tailored to your business needs
                </p>

                {/* View Toggle Button */}
                <div className="view-toggle">
                    <button
                        className="toggle-btn"
                        onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
                    >
                        {viewMode === 'carousel' ? (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                </svg>
                                View All Services
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="6" y="4" width="12" height="16" rx="2" />
                                    <line x1="6" y1="8" x2="18" y2="8" />
                                </svg>
                                View One at a Time
                            </>
                        )}
                    </button>
                </div>

                {viewMode === 'carousel' ? (
                    /* Carousel View */
                    <>
                        <div className="services-carousel">
                            {/* Prev Button */}
                            <button
                                className="carousel-nav prev"
                                onClick={() => paginate(-1)}
                                disabled={currentIndex === 0}
                                aria-label="Previous service"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>

                            {/* Previous Card (Blurred) */}
                            <div className={`side-card prev ${prevIndex === null ? 'hidden' : ''}`}>
                                {prevIndex !== null && (
                                    <div className="service-card-preview">
                                        <div className="service-icon">{servicesData[prevIndex].icon}</div>
                                        <h3 className="service-title">{servicesData[prevIndex].title}</h3>
                                    </div>
                                )}
                            </div>

                            {/* Main Card Container */}
                            <div className="card-container">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className={`service-card glow ${expandedIndex === currentIndex ? 'expanded' : ''}`}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div className="card-front">
                                            <div className="service-icon">{servicesData[currentIndex].icon}</div>
                                            <h3 className="service-title">{servicesData[currentIndex].title}</h3>
                                            <p className="service-description">{servicesData[currentIndex].shortDesc}</p>

                                            <div className="service-details">
                                                <ul>
                                                    {servicesData[currentIndex].details.map((detail, idx) => (
                                                        <li key={idx}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <button
                                                className="expand-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleExpand(currentIndex)
                                                }}
                                            >
                                                {expandedIndex === currentIndex ? 'Show Less' : 'Learn More'}
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Next Card (Blurred) */}
                            <div className={`side-card next ${nextIndex === null ? 'hidden' : ''}`}>
                                {nextIndex !== null && (
                                    <div className="service-card-preview">
                                        <div className="service-icon">{servicesData[nextIndex].icon}</div>
                                        <h3 className="service-title">{servicesData[nextIndex].title}</h3>
                                    </div>
                                )}
                            </div>

                            {/* Next Button */}
                            <button
                                className="carousel-nav next"
                                onClick={() => paginate(1)}
                                disabled={currentIndex === servicesData.length - 1}
                                aria-label="Next service"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>

                        {/* Dot Indicators */}
                        <div className="carousel-dots">
                            {servicesData.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToIndex(index)}
                                    aria-label={`Go to service ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Service Counter */}
                        <div className="service-counter">
                            <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span className="separator">/</span>
                            <span className="total">{String(servicesData.length).padStart(2, '0')}</span>
                        </div>
                    </>
                ) : (
                    /* Grid View */
                    <motion.div
                        className="services-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {servicesData.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className={`service-card glow ${expandedIndex === index ? 'expanded' : ''}`}
                                onClick={() => toggleExpand(index)}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.shortDesc}</p>

                                <div className="service-details">
                                    <ul>
                                        {service.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="expand-btn">
                                    {expandedIndex === index ? 'Show Less' : 'Learn More'}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default Services
