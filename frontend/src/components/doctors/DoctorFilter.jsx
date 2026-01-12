import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';
import { getSpecialties } from '../../services/doctor.service';
import './DoctorFilter.css';

const DoctorFilter = ({ onFilterChange }) => {
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    // Refs for click outside detection
    const specialtyRef = useRef(null);
    const priceRef = useRef(null);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const data = await getSpecialties();
                setSpecialties(data.data || []);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };
        fetchSpecialties();
    }, []);

    // Click Outside Listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (specialtyRef.current && !specialtyRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (priceRef.current && !priceRef.current.contains(event.target)) {
                setIsPriceDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Auto-apply filters when price changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFilterChange({
                specialty: selectedSpecialty,
                minPrice: priceRange.min,
                maxPrice: priceRange.max
            });
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [priceRange, selectedSpecialty]);

    const handleSpecialtyChange = (e) => {
        const value = e.target.value;
        setSelectedSpecialty(value);
    };

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), priceRange.max - 100);
        setPriceRange(prev => ({ ...prev, min: value }));
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), priceRange.min + 100);
        setPriceRange(prev => ({ ...prev, max: value }));
    };

    // Calculate background gradient for slider track
    const getSliderBackground = () => {
        const minPercent = (priceRange.min / 5000) * 100;
        const maxPercent = (priceRange.max / 5000) * 100;
        return { background: `linear-gradient(to right, #334155 ${minPercent}%, #3b82f6 ${minPercent}%, #3b82f6 ${maxPercent}%, #334155 ${maxPercent}%)` };
    };

    return (
        <div className="doctor-filter">
            {/* Specialty Filter - Dropdown */}
            <div className="filter-group" ref={specialtyRef}>
                <h3>Specialty</h3>
                <div className="custom-dropdown">
                    <button
                        className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                        onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                    >
                        {selectedSpecialty
                            ? specialties.find(s => s._id === selectedSpecialty)?.name
                            : 'All Specialties'}
                        <ChevronDown size={18} className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <div
                                className={`dropdown-item ${selectedSpecialty === '' ? 'selected' : ''}`}
                                onClick={() => {
                                    handleSpecialtyChange({ target: { value: '' } });
                                    setIsDropdownOpen(false);
                                }}
                            >
                                All Specialties
                            </div>
                            {specialties.map((spec) => (
                                <div
                                    key={spec._id}
                                    className={`dropdown-item ${selectedSpecialty === spec._id ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleSpecialtyChange({ target: { value: spec._id } });
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {spec.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Price Filter - Dropdown with Dual Range Slider */}
            <div className="filter-group" ref={priceRef}>
                <h3>Filter</h3>
                <div className="custom-dropdown">
                    <button
                        className={`dropdown-trigger price-trigger ${isPriceDropdownOpen ? 'active' : ''}`}
                        onClick={() => {
                            setIsPriceDropdownOpen(!isPriceDropdownOpen);
                        }}
                    >
                        <div className="trigger-content">
                            <DollarSign size={16} className="trigger-icon" />
                            <span>Price</span>
                        </div>
                        <ChevronDown size={16} className={`dropdown-arrow ${isPriceDropdownOpen ? 'open' : ''}`} />
                    </button>

                    {isPriceDropdownOpen && (
                        <div className="dropdown-menu price-dropdown-content">

                            <div className="price-title">Price</div>

                            <div className="price-inputs-row">
                                <div className="price-input-group">
                                    <label>From</label>
                                    <div className="input-wrapper">
                                        <span className="currency">€</span>
                                        <input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={handleMinPriceChange}
                                            min="0"
                                            max="5000"
                                        />
                                    </div>
                                </div>
                                <span className="separator">-</span>
                                <div className="price-input-group">
                                    <label>To</label>
                                    <div className="input-wrapper">
                                        <span className="currency">€</span>
                                        <input
                                            type="number"
                                            value={priceRange.max}
                                            onChange={handleMaxPriceChange}
                                            min="0"
                                            max="5000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dual-slider-container">
                                <div className="slider-track" style={getSliderBackground()}></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={priceRange.min}
                                    onChange={handleMinPriceChange}
                                    className="dual-range-slider min-slider"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={priceRange.max}
                                    onChange={handleMaxPriceChange}
                                    className="dual-range-slider max-slider"
                                />
                                <div className="slider-labels">
                                    <span>€0</span>
                                    <span>€5,000</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorFilter;
