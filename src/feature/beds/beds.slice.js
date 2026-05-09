import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as bedAPI from '../../api/beds.api';

export const fetchBedAvailability = createAsyncThunk(
    'beds/fetchBedAvailability',
    async (filters, { rejectWithValue }) => {
        try {
            const data = await bedAPI.fetchBedAvailability(filters);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch bed availability',
            );
        }
    },
);

export const fetchBeds = createAsyncThunk(
    'beds/fetchBeds',
    async (filters, { rejectWithValue }) => {
        try {
            const data = await bedAPI.fetchBeds(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch beds');
        }
    },
);

export const fetchBedById = createAsyncThunk(
    'beds/fetchBedById',
    async (bedId, { rejectWithValue }) => {
        try {
            const data = await bedAPI.fetchBedById(bedId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bed');
        }
    },
);

export const createNewBed = createAsyncThunk(
    'beds/createNewBed',
    async (bedData, { rejectWithValue }) => {
        try {
            const data = await bedAPI.createBed(bedData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create bed');
        }
    },
);

export const updateBedInfo = createAsyncThunk(
    'beds/updateBedInfo',
    async ({ bedId, bedData }, { rejectWithValue }) => {
        try {
            const data = await bedAPI.updateBed(bedId, bedData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update bed');
        }
    },
);

const initialState = {
    beds: [],
    availableBeds: [],
    currentBed: null,
    loading: false,
    error: null,
};

const bedSlice = createSlice({
    name: 'beds',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentBed: (state) => {
            state.currentBed = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch bed availability
        builder.addCase(fetchBedAvailability.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBedAvailability.fulfilled, (state, action) => {
            state.loading = false;
            state.availableBeds = action.payload;
        });
        builder.addCase(fetchBedAvailability.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch all beds
        builder.addCase(fetchBeds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBeds.fulfilled, (state, action) => {
            state.loading = false;
            state.beds = action.payload;
        });
        builder.addCase(fetchBeds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch single bed
        builder.addCase(fetchBedById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBedById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentBed = action.payload;
        });
        builder.addCase(fetchBedById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create bed
        builder.addCase(createNewBed.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewBed.fulfilled, (state, action) => {
            state.loading = false;
            state.beds.push(action.payload);
        });
        builder.addCase(createNewBed.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update bed
        builder.addCase(updateBedInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBedInfo.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.beds.findIndex((b) => b._id === action.payload._id);
            if (index !== -1) {
                state.beds[index] = action.payload;
            }
            state.currentBed = action.payload;
        });
        builder.addCase(updateBedInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError, clearCurrentBed } = bedSlice.actions;
export default bedSlice.reducer;
