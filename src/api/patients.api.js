import api from './axios';

// Create a new patient profile
export const createPatient = async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data.data;
};

// Get patient details
export const fetchPatientById = async (patientId) => {
    const response = await api.get(`/patients/${patientId}`);
    return response.data.data;
};

// Get patient admission history
export const fetchPatientAdmissions = async (patientId) => {
    const response = await api.get(`/patients/${patientId}/admissions`);
    return response.data.data;
};

// Update patient details
export const updatePatient = async (patientId, patientData) => {
    const response = await api.patch(`/patients/${patientId}`, patientData);
    return response.data.data;
};

// Delete patient
export const deletePatient = async (patientId) => {
    const response = await api.delete(`/patients/${patientId}`);
    return response.data.data;
};
