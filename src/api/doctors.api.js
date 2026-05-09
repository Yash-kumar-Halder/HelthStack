import api from './axios';

// Get all doctors with optional filters
export const fetchDoctors = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.department) {
        params.append('department', filters.department);
    }

    if (filters.status) {
        params.append('status', filters.status);
    }

    // IMPORTANT BOOLEAN FIX
    if (filters.isVerified !== undefined && filters.isVerified !== '') {
        params.append('isVerified', filters.isVerified);
    }

    const response = await api.get(`/doctors?${params.toString()}`);

    return response.data.data;
};

// Get single doctor details
export const fetchDoctorById = async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}`);
    return response.data.data;
};

// Create a new doctor profile
export const createDoctor = async (doctorData) => {
    const response = await api.post('/doctors', doctorData);
    return response.data.data;
};

// Update doctor profile
export const updateDoctor = async (doctorId, doctorData) => {
    const response = await api.patch(`/doctors/${doctorId}`, doctorData);
    return response.data.data;
};

// Delete doctor
export const deleteDoctor = async (doctorId) => {
    const response = await api.delete(`/doctors/${doctorId}`);
    return response.data.data;
};

export const approveDoctor = async (doctorId) => {
    const response = await api.patch(`/doctors/${doctorId}/approve`);
    console.log(response);

    return response.data.data;
};
