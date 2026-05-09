import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as admissionAPI from '../../api/admissions.api';

export const createNewAdmission = createAsyncThunk(
    'admissions/createNewAdmission',
    async (admissionData, { rejectWithValue }) => {
        try {
            const data = await admissionAPI.createAdmission(admissionData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create admission');
        }
    },
);

export const fetchAdmissionById = createAsyncThunk(
    'admissions/fetchAdmissionById',
    async (admissionId, { rejectWithValue }) => {
        try {
            const data = await admissionAPI.fetchAdmissionById(admissionId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch admission');
        }
    },
);

export const dischargePatientAdmission = createAsyncThunk(
    'admissions/dischargePatientAdmission',
    async (admissionId, { rejectWithValue }) => {
        try {
            const data = await admissionAPI.dischargePatient(admissionId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to discharge patient');
        }
    },
);

const initialState = {
    admissions: [],
    currentAdmission: null,
    loading: false,
    error: null,
};

const admissionSlice = createSlice({
    name: 'admissions',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentAdmission: (state) => {
            state.currentAdmission = null;
        },
    },
    extraReducers: (builder) => {
        // Create admission
        builder.addCase(createNewAdmission.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewAdmission.fulfilled, (state, action) => {
            state.loading = false;
            state.admissions.push(action.payload);
            state.currentAdmission = action.payload;
        });
        builder.addCase(createNewAdmission.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch admission
        builder.addCase(fetchAdmissionById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAdmissionById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentAdmission = action.payload;
        });
        builder.addCase(fetchAdmissionById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Discharge patient
        builder.addCase(dischargePatientAdmission.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(dischargePatientAdmission.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.admissions.findIndex((a) => a._id === action.payload._id);
            if (index !== -1) {
                state.admissions[index] = action.payload;
            }
            state.currentAdmission = action.payload;
        });
        builder.addCase(dischargePatientAdmission.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError, clearCurrentAdmission } = admissionSlice.actions;
export default admissionSlice.reducer;
