import api from './api';

export const getAllDoctors = async (filters = {}) => {
    try {
        const response = await api.get('/doctors', { params: filters });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSpecialties = async () => {
    try {
        const response = await api.get('/specialties');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const createDoctor = async (data) => {
    try {
        const response = await api.post('/doctors', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateDoctor = async (id, data) => {
    try {
        const response = await api.put(`/doctors/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteDoctor = async (id) => {
    try {
        const response = await api.delete(`/doctors/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
