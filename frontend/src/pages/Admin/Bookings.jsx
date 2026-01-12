import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch bookings from API
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
                setBookings(response.data.data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                // Use mock data on error
                setBookings([
                    { _id: '1', patientName: 'John Doe', email: 'john@example.com', phone: '555-1234', doctorId: { name: 'Dr. Smith' }, date: '2024-01-15', time: '10:00 AM', status: 'pending' },
                    { _id: '2', patientName: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', doctorId: { name: 'Dr. Johnson' }, date: '2024-01-16', time: '2:00 PM', status: 'confirmed' },
                    { _id: '3', patientName: 'Bob Wilson', email: 'bob@example.com', phone: '555-9012', doctorId: { name: 'Dr. Lee' }, date: '2024-01-17', time: '11:00 AM', status: 'cancelled' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { status: newStatus });
            setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
        } catch (error) {
            alert('Failed to update booking status');
        }
    };

    const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'status-success';
            case 'pending': return 'status-warning';
            case 'cancelled': return 'status-error';
            default: return 'status-info';
        }
    };

    return (
        <div className="admin-bookings">
            <div className="page-header">
                <h1 className="page-title">Bookings Management</h1>
                <div className="filter-tabs">
                    <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                    <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={`filter-tab ${filter === 'confirmed' ? 'active' : ''}`} onClick={() => setFilter('confirmed')}>Confirmed</button>
                    <button className={`filter-tab ${filter === 'cancelled' ? 'active' : ''}`} onClick={() => setFilter('cancelled')}>Cancelled</button>
                </div>
            </div>

            <div className="admin-table-container">
                <div className="table-header">
                    <h3 className="table-title">All Appointments</h3>
                </div>
                {loading ? (
                    <div className="dashboard-loading">Loading bookings...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="dashboard-empty">
                        <p>No bookings found</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Contact</th>
                                    <th>Doctor</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>#{booking._id.slice(-6)}</td>
                                        <td>
                                            <div style={{ fontWeight: 500, color: 'white' }}>{booking.patientName}</div>
                                        </td>
                                        <td>
                                            <div className="contact-info">
                                                <span className="contact-email">{booking.email}</span>
                                                <span className="contact-phone">{booking.phone}</span>
                                            </div>
                                        </td>
                                        <td>{booking.doctorId?.name || 'N/A'}</td>
                                        <td>
                                            <div>{booking.date}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{booking.time}</div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {booking.status === 'pending' && (
                                                    <button className="action-btn confirm" onClick={() => handleStatusChange(booking._id, 'confirmed')}>
                                                        Confirm
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && (
                                                    <button className="action-btn cancel" onClick={() => handleStatusChange(booking._id, 'cancelled')}>
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookings;
