import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart, Brain, Baby, Bone, Stethoscope, Eye,
    Calendar, Shield, Clock, ChevronRight, Activity, Users
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const specialties = [
        { id: 1, name: 'Cardiology', icon: <Heart size={32} />, desc: 'Expert heart care and surgery.' },
        { id: 2, name: 'Neurology', icon: <Brain size={32} />, desc: 'Advanced neurological disorders treatment.' },
        { id: 3, name: 'Pediatrics', icon: <Baby size={32} />, desc: 'Comprehensive care for infants and children.' },
        { id: 4, name: 'Orthopedics', icon: <Bone size={32} />, desc: 'Treatment for bones, joints, and muscles.' },
        { id: 5, name: 'Dermatology', icon: <Shield size={32} />, desc: 'Diagnosis and treatment of skin conditions.' }, // Changed icon to Shield as generic protection or use Activity if better fitting
        { id: 6, name: 'Ophthalmology', icon: <Eye size={32} />, desc: 'Complete eye care and vision surgery.' },
    ];

    const stats = [
        { number: '500+', label: 'Verified Doctors' },
        { number: '10k+', label: 'Happy Patients' },
        { number: '50+', label: 'Specialties' },
        { number: '24/7', label: 'Support Available' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>Your Health, Used Smartly.</h1>
                        <p>Experience the future of healthcare. Book appointments with top-rated specialists, manage your health records, and consult online—all in one secure platform.</p>
                        <div className="hero-buttons">
                            <Link to="/booking" className="btn-primary">
                                Book Appointment <ChevronRight size={20} />
                            </Link>
                            <Link to="/doctors" className="btn-outline">
                                Find a Doctor
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{stat.number}</h3>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialties Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Specialties</h2>
                        <p className="section-subtitle">We offer a wide range of specialized medical services to cater to all your health needs with precision and care.</p>
                    </div>

                    <motion.div
                        className="specialties-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {specialties.map((specialty) => (
                            <motion.div
                                key={specialty.id}
                                className="specialty-card"
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                            >
                                <div className="specialty-icon-wrapper">
                                    {specialty.icon}
                                </div>
                                <h3 className="specialty-name">{specialty.name}</h3>
                                <p className="specialty-desc">{specialty.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">What Our Patients Say</h2>
                        <p className="section-subtitle">Real experiences from our valued patients.</p>
                    </div>
                    <div className="testimonials-grid">
                        {[
                            { name: 'Sarah Johnson', role: 'Patient', text: "The booking process was incredibly smooth. I found the perfect cardiologist within minutes!", initial: 'S' },
                            { name: 'Michael Chen', role: 'Patient', text: "Video consultation feature saved me so much time. The doctor was very professional.", initial: 'M' },
                            { name: 'Emily Davis', role: 'Mother', text: "Great pediatric specialists. They took such good care of my little one.", initial: 'E' }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <p className="testimonial-content">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{testimonial.initial}</div>
                                    <div className="author-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div className="feature-section">
                        <motion.div
                            className="feature-content"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '1rem' }}>WHY CHOOSE US</div>
                            <h2>Modern Healthcare for a Modern World</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                We combine advanced technology with compassionate care to bring you the best medical experience possible.
                            </p>
                            <ul className="feature-list">
                                <li><Activity size={20} className="check-icon" /> Real-time Appointment Booking</li>
                                <li><Users size={20} className="check-icon" /> Verified & Top-Rated Doctors</li>
                                <li><Shield size={20} className="check-icon" /> Secure & Private Records</li>
                                <li><Clock size={20} className="check-icon" /> 24/7 Customer Support</li>
                            </ul>
                            <Link to="/about" className="btn-primary" style={{ width: 'fit-content' }}>
                                Learn More About Us
                            </Link>
                        </motion.div>
                        <motion.div
                            className="feature-image"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Placeholder for a nice image */}
                            <div style={{
                                width: '100%',
                                height: '400px',
                                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <Stethoscope size={64} color="#38bdf8" style={{ opacity: 0.5 }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
