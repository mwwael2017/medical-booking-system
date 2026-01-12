import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Video, Star, Clock } from 'lucide-react'

// Force dynamic rendering if we were using searchParams purely, 
// but using Prisma directly is fine.
export const dynamic = 'force-dynamic'

export default async function DoctorsPage({
    searchParams,
}: {
    searchParams: Promise<{ specialty?: string }>
}) {
    const { specialty } = await searchParams

    const doctors = await prisma.doctor.findMany({
        where: specialty ? {
            specialtyName: specialty
        } : {},
        include: {
            specialty: true
        }
    })

    // Get all specialties for the filter sidebar
    const specialties = await prisma.specialty.findMany()

    return (
        <div className="container section">
            <div className="page-header">
                <h1>Find Your Specialist</h1>
                <p>Book appointments with top-rated doctors.</p>
            </div>

            <div className="doctors-layout">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Specialty</h3>
                        <div className="filter-links">
                            <Link
                                href="/doctors"
                                className={`filter-link ${!specialty ? 'active' : ''}`}
                            >
                                All Specialists
                            </Link>
                            {specialties.map(s => (
                                <Link
                                    key={s.id}
                                    href={`/doctors?specialty=${s.name}`}
                                    className={`filter-link ${specialty === s.name ? 'active' : ''}`}
                                >
                                    {s.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Doctors Grid */}
                <div className="doctors-grid">
                    {doctors.length === 0 ? (
                        <div className="empty-state">
                            <p>No doctors found matching your criteria.</p>
                            <Link href="/doctors" className="text-primary">Clear Filters</Link>
                        </div>
                    ) : (
                        doctors.map(doctor => (
                            <div key={doctor.id} className="doctor-card card">
                                <div className="doctor-header">
                                    <div className="doctor-image-placeholder">
                                        {/* Ideally Next/Image with real path, using initials for now if no real image */}
                                        {doctor.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="doctor-name">{doctor.name}</h3>
                                        <p className="doctor-specialty">{doctor.specialtyName}</p>
                                    </div>
                                    <div className="doctor-price">
                                        ${doctor.price}
                                    </div>
                                </div>

                                <div className="doctor-stats">
                                    <div className="stat">
                                        <Star size={16} className="text-yellow-400" />
                                        <span>{doctor.experience} Yrs Exp.</span>
                                    </div>
                                    <div className="stat">
                                        <Clock size={16} className="text-slate-400" />
                                        <span>Next: Today</span>
                                    </div>
                                </div>

                                <div className="doctor-badges">
                                    {doctor.consultationTypes.includes('Online') && (
                                        <span className="badge-pill blue">
                                            <Video size={14} /> Online
                                        </span>
                                    )}
                                    {doctor.consultationTypes.includes('Clinic') && (
                                        <span className="badge-pill green">
                                            <MapPin size={14} /> Clinic
                                        </span>
                                    )}
                                </div>

                                <Link href={`/book/${doctor.id}`} className="btn btn-primary btn-full">
                                    Book Appointment
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
