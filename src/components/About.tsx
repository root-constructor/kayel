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
                            We are a high-precision technology consultancy that serves as the bridge between
                            bold ambition and structured, scalable execution.
                        </p>
                        <p>
                            In a time when innovation is commonplace but disciplined implementation remains rare,
                            we believe authentic, bold ideas are not as ambitious as it may seem if paired with
                            structured, scalable execution. We transform visionary ideas into engineered
                            realities - systems designed not only to function, but to perform.
                        </p>
                        <p>
                            Our expertise lies in translating complex, high-level concepts into scalable, resilient,
                            and commercially viable solutions, especially in the areas of robotics , artificial
                            intelligence and enterprise-grade intelligent systems.
                        </p>
                        <p>
                            From financial infrastructures to legal and insurance technology ecosystems, we architect
                            and deliver solutions that enhance operational efficiency, institutionalize risk control,
                            and generate measurable financial impact.
                        </p>
                        <p>
                            We do not simply build software - we craft intelligent systems that drive growth, strengthen
                            governance, and create enduring competitive advantage.Beyond fleeting trends and surface-level
                            innovation, our work is grounded in longevity, precision, and performance. Because true
                            transformation is not about momentum - it is about durability.
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
