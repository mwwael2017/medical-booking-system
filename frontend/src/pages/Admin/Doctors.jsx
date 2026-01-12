import React, { useState, useEffect } from 'react';
import { getAllDoctors, getSpecialties, createDoctor, updateDoctor, deleteDoctor } from '../../services/doctor.service';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    Loader,
    User,
    Stethoscope
} from 'lucide-react';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialtyId: '',
        experience: '',
        price: '',
        consultationType: 'online',
        about: '',
        image: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDoctors();
        fetchSpecialties();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await getAllDoctors();
            setDoctors(data.data || []);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecialties = async () => {
        try {
            const data = await getSpecialties();
            setSpecialties(data.data || []);
        } catch (error) {
            console.error('Error fetching specialties:', error);
        }
    };

    const openModal = (doctor = null) => {
        if (doctor) {
            setEditingDoctor(doctor);
            setFormData({
                name: doctor.name,
                specialtyId: doctor.specialtyId?._id || doctor.specialtyId,
                experience: doctor.experience,
                price: doctor.price,
                consultationType: doctor.consultationType,
                about: doctor.about || '',
                image: doctor.image || ''
            });
        } else {
            setEditingDoctor(null);
            setFormData({
                name: '',
                specialtyId: '',
                experience: '',
                price: '',
                consultationType: 'online',
                about: '',
                image: ''
            });
        }
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingDoctor) {
                await updateDoctor(editingDoctor._id, formData);
            } else {
                await createDoctor(formData);
            }
            setShowAddModal(false);
            fetchDoctors();
        } catch (error) {
            alert('Failed to save doctor: ' + (error.response?.data?.error || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete Dr. ${name}?`)) return;
        try {
            await deleteDoctor(id);
            fetchDoctors();
        } catch (error) {
            alert('Failed to delete doctor: ' + (error.response?.data?.error || error.message));
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="dashboard-loading"><Loader className="animate-spin" /></div>;

    return (
        <div className="admin-doctors">
            <div className="doctors-header">
                <div>
                    <h1 className="page-title">Doctors</h1>
                    <p style={{ color: 'var(--admin-text-muted)', margin: 0, marginTop: '0.25rem' }}>Manage medical professionals</p>
                </div>
                <button className="add-doctor-btn" onClick={() => openModal()}>
                    <Plus size={20} />
                    Add Doctor
                </button>
            </div>

            <div className="admin-table-container">
                {/* Filters */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.8rem',
                                border: '1px solid var(--admin-border)',
                                borderRadius: '12px',
                                background: 'rgba(15, 23, 42, 0.6)',
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.95rem'
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Specialty</th>
                                <th>Experience</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doctor) => (
                                    <tr key={doctor._id}>
                                        <td>
                                            <div className="doctor-avatar-cell">
                                                {doctor.image ? (
                                                    <img src={doctor.image} alt={doctor.name} className="doctor-avatar-img" />
                                                ) : (
                                                    <div className="doctor-avatar-placeholder">
                                                        <User size={20} />
                                                    </div>
                                                )}
                                                <div className="doctor-info">
                                                    <span className="doctor-name">{doctor.name}</span>
                                                    {/* <span className="doctor-specialty">{doctor.specialtyId?.name}</span> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                                <Stethoscope size={14} />
                                                {doctor.specialtyId?.name || 'N/A'}
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--admin-text-main)' }}>{doctor.experience} years</td>
                                        <td style={{ color: 'var(--admin-text-main)', fontWeight: 600 }}>${doctor.price}</td>
                                        <td>
                                            <span className={`status-badge ${doctor.consultationType === 'online' ? 'status-info' : 'status-success'}`}>
                                                {doctor.consultationType || 'N/A'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    className="action-icon-btn edit"
                                                    onClick={() => openModal(doctor)}
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    className="action-icon-btn delete"
                                                    onClick={() => handleDelete(doctor._id, doctor.name)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="6" className="dashboard-empty">
                                        No doctors found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'white' }}>{editingDoctor ? 'Edit Doctor' : 'New Doctor'}</h2>
                            <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Doctor Name *</label>
                                <input
                                    type="text"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Image URL</label>
                                <input
                                    type="url"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/doctor-image.jpg"
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Specialty *</label>
                                <select
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    value={formData.specialtyId}
                                    onChange={(e) => setFormData({ ...formData, specialtyId: e.target.value })}
                                >
                                    <option value="">-- Select Specialty --</option>
                                    {specialties.map(spec => (
                                        <option key={spec._id} value={spec._id}>{spec.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Experience (years) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(15, 23, 42, 0.5)',
                                            border: '1px solid var(--admin-border)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Price ($) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(15, 23, 42, 0.5)',
                                            border: '1px solid var(--admin-border)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>Consultation Type</label>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    value={formData.consultationType}
                                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                                >
                                    <option value="online">Online</option>
                                    <option value="in-person">In-Person</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>About Doctor</label>
                                <textarea
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none',
                                        resize: 'none',
                                        minHeight: '80px'
                                    }}
                                    rows="3"
                                    value={formData.about}
                                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                    placeholder="Brief description..."
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }} onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting} className="add-doctor-btn" style={{ boxShadow: 'none' }}>
                                    <Save size={18} />
                                    {submitting ? 'Saving...' : 'Save Doctor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
