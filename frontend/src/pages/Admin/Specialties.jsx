import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    Loader,
    Activity
} from 'lucide-react';
import specialtyService from '../../services/specialty.service';
import './Specialties.css';

const Specialties = () => {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSpecialty, setEditingSpecialty] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: ''
    });

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const fetchSpecialties = async () => {
        try {
            setLoading(true);
            const data = await specialtyService.getAll();
            if (data.success) {
                setSpecialties(data.data);
            }
        } catch (err) {
            console.error('Error fetching specialties:', err);
            setError('Failed to load specialties');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSpecialty) {
                await specialtyService.update(editingSpecialty._id, formData);
            } else {
                await specialtyService.create(formData);
            }
            fetchSpecialties();
            closeModal();
        } catch (err) {
            console.error('Error saving specialty:', err);
            setError('Failed to save specialty');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this specialty?')) {
            try {
                await specialtyService.delete(id);
                fetchSpecialties();
            } catch (err) {
                console.error('Error deleting specialty:', err);
                setError('Failed to delete specialty');
            }
        }
    };

    const openModal = (specialty = null) => {
        if (specialty) {
            setEditingSpecialty(specialty);
            setFormData({
                name: specialty.name,
                description: specialty.description || '',
                icon: specialty.icon || ''
            });
        } else {
            setEditingSpecialty(null);
            setFormData({
                name: '',
                description: '',
                icon: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSpecialty(null);
        setFormData({ name: '', description: '', icon: '' });
    };

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="dashboard-loading"><Loader className="animate-spin" /></div>;

    return (
        <div className="admin-specialties">
            {/* Header */}
            <div className="specialties-header">
                <div>
                    <h1 className="page-title">Specialties</h1>
                    <p style={{ color: 'var(--admin-text-muted)', margin: 0, marginTop: '0.25rem' }}>Manage medical specializations</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="add-specialty-btn"
                >
                    <Plus size={20} />
                    Add Specialty
                </button>
            </div>

            {/* Main Content */}
            <div className="admin-table-container">
                {/* Filters */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search specialties..."
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

                {/* Table */}
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSpecialties.length > 0 ? (
                                filteredSpecialties.map((specialty) => (
                                    <tr key={specialty._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '8px',
                                                    background: 'rgba(59, 130, 246, 0.1)', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    color: '#60a5fa'
                                                }}>
                                                    <Activity size={18} />
                                                </div>
                                                <span className="specialty-name">{specialty.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="specialty-desc">
                                                {specialty.description || 'No description'}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    className="action-icon-btn edit"
                                                    onClick={() => openModal(specialty)}
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    className="action-icon-btn delete"
                                                    onClick={() => handleDelete(specialty._id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="dashboard-empty">
                                        No specialties found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={closeModal}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.5rem',
                            borderBottom: '1px solid var(--admin-border)',
                            paddingBottom: '1rem'
                        }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, color: 'white' }}>
                                {editingSpecialty ? 'Edit Specialty' : 'New Specialty'}
                            </h2>
                            <button
                                onClick={closeModal}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-text-muted)' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                    Specialty Name
                                </label>
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
                                    placeholder="e.g. Cardiology"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--admin-text-muted)' }}>
                                    Description
                                </label>
                                <textarea
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid var(--admin-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none',
                                        minHeight: '100px',
                                        resize: 'none'
                                    }}
                                    placeholder="Brief description of the specialty..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        color: 'var(--admin-text-muted)',
                                        background: 'none',
                                        border: 'none',
                                        fontWeight: 500,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="add-specialty-btn"
                                    style={{ boxShadow: 'none' }}
                                >
                                    <Save size={18} />
                                    Save Specialty
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Specialties;
