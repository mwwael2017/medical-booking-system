import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>MedBook</h3>
                        <p>Your trusted partner in healthcare booking. Fast, reliable, and secure.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/doctors">Find Doctors</Link></li>
                            <li><Link to="/booking">My Bookings</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <ul className="footer-links">
                            <li>support@medbook.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Medical Booking System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
