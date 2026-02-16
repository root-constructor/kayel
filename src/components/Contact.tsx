import './Contact.css'

const Contact = () => {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <h2 className="section-title">
                    Get in <span className="gradient-text">Touch</span>
                </h2>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Build Something Amazing</h3>
                        <p>
                            Ready to transform your ideas into reality? We're here to help you
                            navigate the digital landscape and create solutions that matter.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:hello@kayel.tech">hello@kayel.tech</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <span className="contact-icon">📱</span>
                                <div>
                                    <h4>Phone</h4>
                                    <a href="tel:+919744141499">+91 9744141499</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <h4>Location</h4>
                                    <p>Kochi, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form">
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>

                        <div className="form-group">
                            <input type="email" placeholder="Your Email" required />
                        </div>

                        <div className="form-group">
                            <input type="text" placeholder="Subject" required />
                        </div>

                        <div className="form-group">
                            <textarea placeholder="Your Message" rows={5} required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
