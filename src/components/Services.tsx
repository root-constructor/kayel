import { useState } from 'react'
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
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <section id="services" className="services section">
            <div className="container">
                <h2 className="section-title">
                    Our <span className="gradient-text">Services</span>
                </h2>

                <p className="section-subtitle">
                    Comprehensive IT solutions tailored to your business needs
                </p>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
