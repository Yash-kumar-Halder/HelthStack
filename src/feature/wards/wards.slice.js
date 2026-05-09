import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as wardAPI from '../../api/wards.api';

export const fetchWards = createAsyncThunk('wards/fetchWards', async (_, { rejectWithValue }) => {
    try {
        const data = await wardAPI.fetchWards();
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch wards');
    }
});

export const fetchWardById = createAsyncThunk(
    'wards/fetchWardById',
    async (wardId, { rejectWithValue }) => {
        try {
            const data = await wardAPI.fetchWardById(wardId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ward');
        }
    },
);

export const createNewWard = createAsyncThunk(
    'wards/createNewWard',
    async (wardData, { rejectWithValue }) => {
        try {
            const data = await wardAPI.createWard(wardData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create ward');
        }
    },
);

const initialState = {
    wards: [],
    currentWard: null,
    loading: false,
    error: null,
};

const wardSlice = createSlice({
    name: 'wards',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all wards
        builder.addCase(fetchWards.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWards.fulfilled, (state, action) => {
            state.loading = false;
            state.wards = action.payload;
        });
        builder.addCase(fetchWards.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch single ward
        builder.addCase(fetchWardById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWardById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentWard = action.payload;
        });
        builder.addCase(fetchWardById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create ward
        builder.addCase(createNewWard.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewWard.fulfilled, (state, action) => {
            state.loading = false;
            state.wards.push(action.payload);
        });
        builder.addCase(createNewWard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError } = wardSlice.actions;
export default wardSlice.reducer;
