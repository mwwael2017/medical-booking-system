import { ArrowRight, Users, Calendar, DollarSign, Activity } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
    return (
        <div className="container section">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Manage bookings, doctors, and platform settings.</p>
            </div>

            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-icon bg-blue-100 text-blue-600">
                        <Calendar size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Total Bookings</h3>
                        <p className="stat-value">1,204</p>
                        <span className="stat-trend positive">+12% this week</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Revenue</h3>
                        <p className="stat-value">$45,200</p>
                        <span className="stat-trend positive">+8% this month</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon bg-purple-100 text-purple-600">
                        <Users size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Active Doctors</h3>
                        <p className="stat-value">24</p>
                        <span className="stat-trend neutral">0 new added</span>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon bg-orange-100 text-orange-600">
                        <Activity size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Appts</h3>
                        <p className="stat-value">18</p>
                        <span className="stat-trend negative">Requires attention</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent */}
            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header">
                        <h3>Recent Bookings</h3>
                        <Link href="/admin/bookings" className="text-primary text-sm font-medium">View All</Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map(i => (
                                <tr key={i}>
                                    <td>John Doe</td>
                                    <td>Dr. Sarah Johnson</td>
                                    <td>Today, 14:00</td>
                                    <td><span className="badge-pill blue">Confirmed</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Management</h3>
                    </div>
                    <div className="action-list">
                        <Link href="/admin/doctors" className="action-item">
                            <span>Manage Doctors</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/admin/bookings" className="action-item">
                            <span>Manage Bookings</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/admin/settings" className="action-item">
                            <span>Platform Settings</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
