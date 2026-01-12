'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, CreditCard, CheckCircle, AlertCircle, Video } from 'lucide-react'

// Types
type Doctor = {
    id: string
    name: string
    price: number
    specialtyName: string
    consultationTypes: string
}

type TimeSlot = {
    time: string
    available: boolean
}

export default function BookingPage({ params }: { params: Promise<{ doctorId: string }> }) {
    // Unwrap params using React.use() or await in async component. 
    // Since this is 'use client', we need to effect fetch or use generic unwrap if Next 15.
    // In Next.js 15, params is a promise.
    const [doctorId, setDoctorId] = useState<string | null>(null)

    useEffect(() => {
        params.then(p => setDoctorId(p.doctorId))
    }, [params])

    const router = useRouter()
    const [step, setStep] = useState(1)
    const [doctor, setDoctor] = useState<Doctor | null>(null)
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [slots, setSlots] = useState<TimeSlot[]>([])
    const [loadingSlots, setLoadingSlots] = useState(false)

    // Form State
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [type, setType] = useState<string>('Online')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch Doctor
    useEffect(() => {
        if (!doctorId) return

        // We can reuse the filter API or make a specific ID one. 
        // For now, let's just fetch all and find (mock-ish) or update API to support ID get.
        // Better: update API to support finding by ID would be cleaner, 
        // but filtering the list is fine for this size.
        fetch(`/api/doctors`)
            .then(res => res.json())
            .then((docs: Doctor[]) => {
                const d = docs.find(doc => doc.id === doctorId)
                if (d) setDoctor(d)
            })
    }, [doctorId])

    // Fetch Availability
    useEffect(() => {
        if (!doctorId || !date) return

        setLoadingSlots(true)
        fetch(`/api/availability?doctorId=${doctorId}&date=${date}`)
            .then(res => res.json())
            .then(data => {
                setSlots(data)
                setLoadingSlots(false)
            })
            .catch(() => setLoadingSlots(false))
    }, [doctorId, date])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId,
                    patientName: formData.name,
                    patientEmail: formData.email,
                    patientPhone: formData.phone,
                    date: `${date}T${selectedTime}:00`, // Naive ISO construction
                    type,
                    notes: formData.notes
                })
            })

            if (res.ok) {
                router.push('/success')
            } else {
                alert('Booking failed. Please try again.')
            }
        } catch (error) {
            alert('An error occurred.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!doctor) return <div className="container section">Loading doctor details...</div>

    return (
        <div className="container section">
            <div className="booking-layout">
                {/* Main Content */}
                <div className="booking-main">
                    <h2>Book Appointment</h2>

                    <div className="steps-indicator">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Time</div>
                        <div className="line" />
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
                        <div className="line" />
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Pay</div>
                    </div>

                    {step === 1 && (
                        <div className="step-content">
                            <div className="form-group">
                                <label>Select Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                        setSelectedTime(null)
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Select Time Slot</label>
                                <div className="slots-grid">
                                    {loadingSlots ? (
                                        <p>Loading slots...</p>
                                    ) : slots.length > 0 ? (
                                        slots.map((slot) => (
                                            <button
                                                key={slot.time}
                                                className={`slot-btn ${selectedTime === slot.time ? 'selected' : ''}`}
                                                disabled={!slot.available}
                                                onClick={() => setSelectedTime(slot.time)}
                                            >
                                                {slot.time}
                                            </button>
                                        ))
                                    ) : (
                                        <p>No slots available.</p>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Consultation Type</label>
                                <div className="type-options">
                                    {doctor.consultationTypes.includes('Online') && (
                                        <button
                                            className={`type-btn ${type === 'Online' ? 'selected' : ''}`}
                                            onClick={() => setType('Online')}
                                        >
                                            <Video size={18} /> Online Video
                                        </button>
                                    )}
                                    {doctor.consultationTypes.includes('Clinic') && (
                                        <button
                                            className={`type-btn ${type === 'Clinic' ? 'selected' : ''}`}
                                            onClick={() => setType('Clinic')}
                                        >
                                            <Calendar size={18} /> In-Clinic
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                disabled={!selectedTime}
                                onClick={() => setStep(2)}
                            >
                                Continue to Details
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    className="form-input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Notes / Symptoms (Optional)</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="actions">
                                <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                                <button
                                    className="btn btn-primary"
                                    disabled={!formData.name || !formData.email || !formData.phone}
                                    onClick={() => setStep(3)}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-content">
                            <div className="payment-simulation">
                                <div className="alert-box">
                                    <AlertCircle size={20} />
                                    <p>This is a simulated secure payment.</p>
                                </div>

                                <div className="form-group">
                                    <label>Card Details</label>
                                    <div className="fake-card-input">
                                        <CreditCard className="card-icon" />
                                        <input
                                            placeholder="0000 0000 0000 0000"
                                            className="sub-input"
                                            disabled
                                            value="4242 4242 4242 4242"
                                        />
                                    </div>
                                </div>

                                <div className="grid-2">
                                    <div className="form-group">
                                        <label>Expiry</label>
                                        <input className="form-input" disabled value="12/28" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVC</label>
                                        <input className="form-input" disabled value="123" />
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : `Pay $${doctor.price} & Book`}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Summary */}
                <div className="booking-sidebar">
                    <div className="card summary-card">
                        <h3>Booking Summary</h3>
                        <div className="summary-item">
                            <span>Doctor</span>
                            <strong>{doctor.name}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Specialty</span>
                            <strong>{doctor.specialtyName}</strong>
                        </div>
                        <hr />
                        <div className="summary-item">
                            <span>Date</span>
                            <strong>{date}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Time</span>
                            <strong>{selectedTime || '-'}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Type</span>
                            <strong>{type}</strong>
                        </div>
                        <hr />
                        <div className="summary-item total">
                            <span>Total</span>
                            <span>${doctor.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
