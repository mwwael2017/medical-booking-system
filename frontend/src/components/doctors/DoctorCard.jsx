import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="doctor-card">
            <div className="doctor-image-container">
                <img
                    src={doctor.image || 'https://via.placeholder.com/150?text=Doctor'}
                    alt={doctor.name}
                    className="doctor-image"
                />
            </div>
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialtyId?.name || 'General'}</p>
            <div className="doctor-info">
                <p>{doctor.experience} years experience</p>
            </div>
            <p className="doctor-price">${doctor.price} / consultation</p>
            {/* TODO: Add logic to pass doctorId to booking page */}
            <Link to={`/booking?doctorId=${doctor._id}`} className="btn btn-primary">
                Book Appointment
            </Link>
        </div>
    );
};

export default DoctorCard;
