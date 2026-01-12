import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import DoctorCard from '../components/doctors/DoctorCard';
import DoctorFilter from '../components/doctors/DoctorFilter';
import { getAllDoctors } from '../services/doctor.service';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ specialty: '', price: '' });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const data = await getAllDoctors(filters);
                setDoctors(data.data || []);
            } catch (err) {
                setError('Failed to fetch doctors. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="doctors-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Find Your Specialist</h1>
                </motion.div>

                <div className="doctors-layout">
                    {/* Mobile Filter Toggle */}
                    <button
                        className="mobile-filter-toggle btn btn-outline"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
                        {isFilterOpen ? 'Close Filters' : 'Filters'}
                    </button>

                    <motion.aside
                        className={`doctors-sidebar ${isFilterOpen ? 'open' : ''}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <DoctorFilter onFilterChange={handleFilterChange} />
                    </motion.aside>

                    <main className="doctors-content">
                        {error && (
                            <div className="no-doctors text-red-400">
                                <p>{error}</p>
                            </div>
                        )}

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.6)' }}>
                                <div className="loading-spinner"></div>
                                <p>Finding best doctors for you...</p>
                            </div>
                        ) : doctors.length > 0 ? (
                            <motion.div
                                className="doctors-list"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {doctors.map((doctor) => (
                                    <motion.div key={doctor._id} variants={itemVariants}>
                                        <DoctorCard doctor={doctor} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="no-doctors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <h3>No doctors found</h3>
                                <p>Try adjusting your search filters to find what you're looking for.</p>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
