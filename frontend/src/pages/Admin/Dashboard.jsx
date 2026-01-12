import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDoctors } from '../../services/doctor.service';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        totalDoctors: 0,
        revenue: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch bookings
                const bookingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
                const bookings = bookingsResponse.data.data || [];

                // Calculate stats from bookings
                const pending = bookings.filter(b => b.status === 'pending').length;
                const confirmed = bookings.filter(b => b.status === 'confirmed').length;
                const revenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

                // Fetch doctors count
                const doctorsData = await getAllDoctors();
                const doctorsCount = doctorsData.data?.length || 0;

                setStats({
                    totalBookings: bookings.length,
                    pendingBookings: pending,
                    confirmedBookings: confirmed,
                    totalDoctors: doctorsCount,
                    revenue: revenue
                });

                // Get recent 5 bookings
                setRecentBookings(bookings.slice(0, 5));

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Keep default values on error
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'status-success';
            case 'pending': return 'status-warning';
            case 'cancelled': return 'status-error';
            default: return 'status-info';
        }
    };

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Dashboard Overview</h1>

            {loading ? (
                <div className="dashboard-loading">
                    Loading dashboard...
                </div>
            ) : (
                <>
                    <div className="dashboard-stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">Total Bookings</div>
                            <div className="stat-value">{stats.totalBookings}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Pending Approval</div>
                            <div className="stat-value" style={{ color: '#fbbf24' }}>{stats.pendingBookings}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Confirmed</div>
                            <div className="stat-value" style={{ color: '#4ade80' }}>{stats.confirmedBookings}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Total Doctors</div>
                            <div className="stat-value">{stats.totalDoctors}</div>
                        </div>
                    </div>

                    <div className="admin-table-container">
                        <div className="table-header">
                            <h3 className="table-title">Recent Bookings</h3>
                        </div>
                        {recentBookings.length === 0 ? (
                            <div className="dashboard-empty">
                                <p>No bookings available</p>
                            </div>
                        ) : (
                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Patient</th>
                                            <th>Doctor</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map((booking) => (
                                            <tr key={booking._id}>
                                                <td>#{booking._id?.slice(-6) || 'N/A'}</td>
                                                <td>{booking.patientName || 'N/A'}</td>
                                                <td>{booking.doctorId?.name || 'N/A'}</td>
                                                <td>{booking.date || 'N/A'}</td>
                                                <td>
                                                    <span className={`status-badge ${getStatusClass(booking.status)}`}>
                                                        {booking.status || 'pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
