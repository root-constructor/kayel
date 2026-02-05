import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="gradient-text">KAYEL</h3>
                        <p>Building the future of technology</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="#services">Web Development</a></li>
                                <li><a href="#services">Mobile Solutions</a></li>
                                <li><a href="#services">Cloud Architecture</a></li>
                                <li><a href="#services">AI Integration</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Connect</h4>
                            <ul>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">GitHub</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 KAYEL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
