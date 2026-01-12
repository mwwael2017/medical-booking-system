'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'

type Doctor = {
    id: string
    name: string
    specialtyName: string
    experience: number
    price: number
    isOnline: boolean
}

export default function DoctorsAdminPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch doctors
    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="container section">
            <div className="page-header">
                <h1>Manage Doctors</h1>
                <button className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '0.5rem' }} />
                    Add New Doctor
                </button>
            </div>

            <div className="card">
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Specialty</th>
                                <th>Experience</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(d => (
                                <tr key={d.id}>
                                    <td>
                                        <strong>{d.name}</strong>
                                    </td>
                                    <td>{d.specialtyName}</td>
                                    <td>{d.experience} Years</td>
                                    <td>${d.price}</td>
                                    <td>
                                        {d.isOnline ? (
                                            <span style={{ color: 'var(--secondary)' }}>• Active</span>
                                        ) : (
                                            <span style={{ color: 'var(--slate-400)' }}>• Offline</span>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                                                <Edit size={14} />
                                            </button>
                                            <button className="btn btn-outline" style={{ padding: '0.5rem', borderColor: '#FECACA', color: '#DC2626' }}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
