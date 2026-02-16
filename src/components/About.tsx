import './About.css'
import ParticleSphere from './ParticleSphere'

const About = () => {
    return (
        <section id="about" className="about section">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>
                            About <span className="gradient-text">KAYEL</span>
                        </h2>
                        <p>
                            We are a high-precision technology consultancy bridging bold ambition with structured,
                            scalable execution. We transform visionary ideas into engineered, resilient systems
                            across robotics, artificial intelligence, and enterprise technologies.
                        </p>
                        <p>
                            From financial to legal and insurance ecosystems, we deliver intelligent infrastructures
                            that enhance efficiency, institutionalize risk control, and create measurable, durable
                            competitive advantage. Beyond fleeting trends and surface-level innovation, our work
                            is grounded in longevity, precision, and performance.
                        </p>

                        <div className="stats">
                            <div className="stat-item">
                                <h3 className="gradient-text">50+</h3>
                                <p>Projects Delivered</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="gradient-text">100%</h3>
                                <p>Client Satisfaction</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="gradient-text">24/7</h3>
                                <p>Support Available</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-visual">
                        <ParticleSphere size={400} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
