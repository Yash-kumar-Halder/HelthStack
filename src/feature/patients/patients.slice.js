import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as patientAPI from '../../api/patients.api';

export const createNewPatient = createAsyncThunk(
    'patients/createNewPatient',
    async (patientData, { rejectWithValue }) => {
        try {
            const data = await patientAPI.createPatient(patientData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create patient');
        }
    },
);

export const fetchPatientById = createAsyncThunk(
    'patients/fetchPatientById',
    async (patientId, { rejectWithValue }) => {
        try {
            const data = await patientAPI.fetchPatientById(patientId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch patient');
        }
    },
);

export const fetchPatientAdmissions = createAsyncThunk(
    'patients/fetchPatientAdmissions',
    async (patientId, { rejectWithValue }) => {
        try {
            const data = await patientAPI.fetchPatientAdmissions(patientId);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch patient admissions',
            );
        }
    },
);

export const updatePatientProfile = createAsyncThunk(
    'patients/updatePatientProfile',
    async ({ patientId, patientData }, { rejectWithValue }) => {
        try {
            const data = await patientAPI.updatePatient(patientId, patientData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update patient');
        }
    },
);

export const deletePatientProfile = createAsyncThunk(
    'patients/deletePatientProfile',
    async (patientId, { rejectWithValue }) => {
        try {
            await patientAPI.deletePatient(patientId);
            return patientId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete patient');
        }
    },
);

const initialState = {
    currentPatient: null,
    patientAdmissions: [],
    loading: false,
    error: null,
};

const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentPatient: (state) => {
            state.currentPatient = null;
        },
    },
    extraReducers: (builder) => {
        // Create patient
        builder.addCase(createNewPatient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPatient = action.payload;
        });
        builder.addCase(createNewPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch patient
        builder.addCase(fetchPatientById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPatientById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPatient = action.payload;
        });
        builder.addCase(fetchPatientById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch patient admissions
        builder.addCase(fetchPatientAdmissions.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPatientAdmissions.fulfilled, (state, action) => {
            state.loading = false;
            state.patientAdmissions = action.payload;
        });
        builder.addCase(fetchPatientAdmissions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update patient
        builder.addCase(updatePatientProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updatePatientProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPatient = action.payload;
        });
        builder.addCase(updatePatientProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete patient
        builder.addCase(deletePatientProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deletePatientProfile.fulfilled, (state) => {
            state.loading = false;
            state.currentPatient = null;
        });
        builder.addCase(deletePatientProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError, clearCurrentPatient } = patientSlice.actions;
export default patientSlice.reducer;
