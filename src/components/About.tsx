import './About.css'

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
                            We are a premium tech consultancy specializing in transforming ambitious ideas
                            into reality. With a focus on cutting-edge technologies and innovative solutions,
                            we help businesses navigate the digital landscape.
                        </p>
                        <p>
                            Our team of expert developers, designers, and strategists work collaboratively
                            to deliver exceptional results that exceed expectations. We don't just build
                            software—we craft experiences that drive growth and innovation.
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
                        <div className="visual-box glow"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
