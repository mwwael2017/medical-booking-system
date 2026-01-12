import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllDoctors } from '../services/doctor.service';
import { createBooking, getAvailableSlots } from '../services/booking.service';
import './Booking.css';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const preSelectedDoctorId = searchParams.get('doctorId');

    const [step, setStep] = useState(1);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Booking Data State
    const [bookingData, setBookingData] = useState({
        doctorId: preSelectedDoctorId || '',
        date: '',
        time: '',
        patientName: '',
        email: '',
        phone: '',
        consultationType: 'online',
        notes: ''
    });

    const [availableSlots, setAvailableSlots] = useState([]);

    // Fetch doctors for selection step
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getAllDoctors();
                setDoctors(data.data || []);
            } catch (err) {
                console.error('Error fetching doctors:', err);
            }
        };
        fetchDoctors();
    }, []);

    // Update slots when date or doctor changes
    useEffect(() => {
        if (bookingData.doctorId && bookingData.date) {
            const slots = getAvailableSlots(bookingData.doctorId, bookingData.date);
            setAvailableSlots(slots);
        }
    }, [bookingData.doctorId, bookingData.date]);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1 && !bookingData.doctorId) return alert('Please select a doctor');
        if (step === 2 && (!bookingData.date || !bookingData.time)) return alert('Please select date and time');
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createBooking(bookingData);
            alert('Booking Confirmed!');
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-page">
            <div className="booking-container">
                <div className="booking-header">
                    <h1>Book an Appointment</h1>
                    <p>Complete the steps below to schedule your consultation</p>
                </div>

                {/* Progress Steps */}
                <div className="booking-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                        <div className="step-number">1</div>
                        <span>Doctor</span>
                    </div>
                    <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                        <div className="step-number">2</div>
                        <span>Time</span>
                    </div>
                    <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                        <div className="step-number">3</div>
                        <span>Details</span>
                    </div>
                    <div className={`step ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
                        <div className="step-number">4</div>
                        <span>Confirm</span>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit}>
                    <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}> {/* Fixed height container to reduce layout shift */}
                        <AnimatePresence mode="wait">
                            {/* Step 1: Select Doctor */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="step-content"
                                >
                                    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Select a Doctor</h2>
                                    <div className="form-group">
                                        <label>Doctor</label>
                                        <select
                                            name="doctorId"
                                            className="form-control"
                                            value={bookingData.doctorId}
                                            onChange={handleChange}
                                        >
                                            <option value="">-- Choose Doctor --</option>
                                            {doctors.map(doc => (
                                                <option key={doc._id} value={doc._id}>
                                                    {doc.name} - {doc.specialtyId?.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Date & Time */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="step-content"
                                >
                                    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Select Date & Time</h2>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control"
                                            value={bookingData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            style={{ colorScheme: 'dark' }}
                                        />
                                    </div>

                                    {bookingData.date && (
                                        <div className="form-group">
                                            <label>Available Slots</label>
                                            {availableSlots.length > 0 ? (
                                                <div className="slots-grid">
                                                    {availableSlots.map(slot => (
                                                        <div
                                                            key={slot}
                                                            className={`time-slot ${bookingData.time === slot ? 'selected' : ''}`}
                                                            onClick={() => setBookingData({ ...bookingData, time: slot })}
                                                        >
                                                            {slot}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: '1rem' }}>No slots available for this date.</p>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Step 3: Patient Details */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="step-content"
                                >
                                    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Patient Details</h2>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="patientName" className="form-control" value={bookingData.patientName} onChange={handleChange} required placeholder="e.g. John Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" className="form-control" value={bookingData.email} onChange={handleChange} required placeholder="e.g. john@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" className="form-control" value={bookingData.phone} onChange={handleChange} required placeholder="e.g. +1 234 567 890" />
                                    </div>
                                    <div className="form-group">
                                        <label>Consultation Type</label>
                                        <select name="consultationType" className="form-control" value={bookingData.consultationType} onChange={handleChange}>
                                            <option value="online">Online Assessment</option>
                                            <option value="in-person">In-Person Visit</option>
                                        </select>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Confirmation */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="step-content"
                                >
                                    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Confirm Appointment</h2>
                                    <div className="confirmation-details">
                                        <p><strong>Doctor:</strong> <span>{doctors.find(d => d._id === bookingData.doctorId)?.name}</span></p>
                                        <p><strong>Date:</strong> <span>{bookingData.date}</span></p>
                                        <p><strong>Time:</strong> <span>{bookingData.time}</span></p>
                                        <p><strong>Patient:</strong> <span>{bookingData.patientName}</span></p>
                                        <p><strong>Type:</strong> <span>{bookingData.consultationType === 'online' ? 'Online Assessment' : 'In-Person Visit'}</span></p>
                                    </div>
                                    {error && <div className="text-red-400 mt-4 text-center">{error}</div>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="form-actions">
                            {step > 1 && (
                                <button type="button" className="btn btn-outline" onClick={handleBack} disabled={loading}>
                                    Back
                                </button>
                            )}

                            {step < 4 ? (
                                <button type="button" className="btn btn-primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginLeft: 'auto' }}>
                                    {loading ? 'Confirming...' : 'Confirm Booking'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Booking;
