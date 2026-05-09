import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as doctorAPI from '../../api/doctors.api';

export const fetchDoctors = createAsyncThunk(
    'doctors/fetchDoctors',
    async (filters, { rejectWithValue }) => {
        try {
            const data = await doctorAPI.fetchDoctors(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
        }
    },
);

export const fetchDoctorById = createAsyncThunk(
    'doctors/fetchDoctorById',
    async (doctorId, { rejectWithValue }) => {
        try {
            const data = await doctorAPI.fetchDoctorById(doctorId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor');
        }
    },
);

export const createNewDoctor = createAsyncThunk(
    'doctors/createNewDoctor',
    async (doctorData, { rejectWithValue }) => {
        try {
            const data = await doctorAPI.createDoctor(doctorData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create doctor');
        }
    },
);

export const updateDoctorProfile = createAsyncThunk(
    'doctors/updateDoctorProfile',
    async ({ doctorId, doctorData }, { rejectWithValue }) => {
        try {
            const data = await doctorAPI.updateDoctor(doctorId, doctorData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update doctor');
        }
    },
);

export const deleteDoctorProfile = createAsyncThunk(
    'doctors/deleteDoctorProfile',
    async (doctorId, { rejectWithValue }) => {
        try {
            await doctorAPI.deleteDoctor(doctorId);
            return doctorId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete doctor');
        }
    },
);

const initialState = {
    doctors: [],
    currentDoctor: null,
    loading: false,
    error: null,
};

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentDoctor: (state) => {
            state.currentDoctor = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all doctors
        builder.addCase(fetchDoctors.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.doctors = action.payload;
        });
        builder.addCase(fetchDoctors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch single doctor
        builder.addCase(fetchDoctorById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDoctorById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentDoctor = action.payload;
        });
        builder.addCase(fetchDoctorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create doctor
        builder.addCase(createNewDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.doctors.push(action.payload);
        });
        builder.addCase(createNewDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update doctor
        builder.addCase(updateDoctorProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateDoctorProfile.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.doctors.findIndex((d) => d._id === action.payload._id);
            if (index !== -1) {
                state.doctors[index] = action.payload;
            }
            state.currentDoctor = action.payload;
        });
        builder.addCase(updateDoctorProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete doctor
        builder.addCase(deleteDoctorProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteDoctorProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.doctors = state.doctors.filter((d) => d._id !== action.payload);
        });
        builder.addCase(deleteDoctorProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError, clearCurrentDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
