import api from './axios';

// Create a new admission (book appointment/bed)
export const createAdmission = async (admissionData) => {
    const response = await api.post('/admissions', admissionData);
    return response.data.data;
};

// Get admission details
export const fetchAdmissionById = async (admissionId) => {
    const response = await api.get(`/admissions/${admissionId}`);
    return response.data.data;
};

// Discharge patient (free bed)
export const dischargePatient = async (admissionId) => {
    const response = await api.patch(`/admissions/${admissionId}/discharge`);
    return response.data.data;
};
