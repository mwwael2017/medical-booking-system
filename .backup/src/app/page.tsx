import Link from 'next/link'
import { ArrowRight, ShieldCheck, Clock, Video } from 'lucide-react'

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Your Health, <br />
                        <span className="text-primary">Our Priority.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Book appointments with top-rated doctors for online or in-clinic consultations.
                        Simple, secure, and fast.
                    </p>
                    <div className="hero-actions">
                        <Link href="/doctors" className="btn btn-primary">
                            Book Appointment
                        </Link>
                        <Link href="/doctors" className="btn btn-outline">
                            View Specialists
                        </Link>
                    </div>

                    <div className="trust-badges">
                        <div className="badge">
                            <ShieldCheck size={20} className="text-primary" />
                            <span>Verified Doctors</span>
                        </div>
                        <div className="badge">
                            <Video size={20} className="text-primary" />
                            <span>Online Video Consults</span>
                        </div>
                        <div className="badge">
                            <Clock size={20} className="text-primary" />
                            <span>Instant Booking</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties Preview */}
            <section className="section bg-white">
                <div className="container">
                    <div className="section-header">
                        <h2>Browse by Specialty</h2>
                        <Link href="/doctors" className="link-arrow">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid-cols-3 specialties-grid">
                        {[
                            { name: 'Cardiology', icon: '❤️' },
                            { name: 'Dermatology', icon: '🧴' },
                            { name: 'Pediatrics', icon: '👶' },
                            { name: 'Neurology', icon: '🧠' },
                            { name: 'General Medicine', icon: '🩺' },
                            { name: 'Orthopedics', icon: '🦴' },
                        ].map((s) => (
                            <Link key={s.name} href={`/doctors?specialty=${s.name}`} className="specialty-card">
                                <span className="specialty-icon">{s.icon}</span>
                                <h3>{s.name}</h3>
                                <p>Find Specialists</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
