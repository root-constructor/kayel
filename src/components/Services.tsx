import { useState } from 'react'
import { motion } from 'framer-motion'
import './Services.css'

const servicesData = [
    {
        icon: '💡',
        title: 'Consulting & Advisory Services',
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
        title: 'Data & Analytics Services',
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
        icon: '☁️',
        title: 'Infrastructure & Cloud Services',
        shortDesc: 'Scalable cloud solutions and robust infrastructure',
        details: [
            'Server setup and management',
            'Cloud services (AWS, Azure, Google Cloud)',
            'Data center operations',
            'Storage & backup solutions',
            'Disaster recovery & business continuity',
            'Network design and implementation',
            'Capacity planning and optimization'
        ]
    },
    {
        icon: '⚙️',
        title: 'IT Operations & Managed Services',
        shortDesc: '24/7 monitoring and comprehensive IT management',
        details: [
            'Managed IT services (24/7 monitoring)',
            'IT helpdesk / service desk (L1, L2, L3 support)',
            'Patch and release management',
            'Configuration management',
            'Change and incident management',
            'SLA-based support services'
        ]
    },
    {
        icon: '🚀',
        title: 'DevOps & Automation Services',
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
        title: 'Cybersecurity Services',
        shortDesc: 'Comprehensive security solutions and compliance',
        details: [
            'Security assessments and audits',
            'Endpoint security (EDR, antivirus, MDM)',
            'Identity and access management (IAM)',
            'Firewall and intrusion detection/prevention',
            'Vulnerability management and penetration testing',
            'Security incident monitoring and response',
            'Compliance and risk management (ISO, SOC, GDPR, etc.)'
        ]
    },
    {
        icon: '🤖',
        title: 'Automation Services',
        shortDesc: 'Efficiency through intelligent process automation',
        details: [
            'IT process automation',
            'Robotic Process Automation (RPA)',
            'Infrastructure automation',
            'Automated provisioning and configuration',
            'Self-service portals and catalogs',
            'Monitoring and alert automation',
            'Automated backup and recovery'
        ]
    },
    {
        icon: '🧠',
        title: 'Artificial Intelligence & Intelligent Services',
        shortDesc: 'Cutting-edge AI solutions for business innovation',
        details: [
            'AI strategy and use-case consulting',
            'AI/ML model development and deployment',
            'Predictive analytics and forecasting',
            'AI-powered IT operations (AIOps)',
            'Intelligent monitoring and anomaly detection',
            'Chatbots and virtual assistants (IT support, HR, customer service)',
            'Natural Language Processing (NLP) solutions',
            'Computer vision solutions',
            'Recommendation engines',
            'Intelligent document processing (IDP)',
            'Voice assistants and speech recognition',
            'Model training, tuning, and lifecycle management'
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
            </div>
        </section>
    )
}

export default Services
