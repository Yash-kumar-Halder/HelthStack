import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as roomAPI from '../../api/rooms.api';

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async (filters, { rejectWithValue }) => {
        try {
            const data = await roomAPI.fetchRooms(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rooms');
        }
    },
);

export const fetchRoomById = createAsyncThunk(
    'rooms/fetchRoomById',
    async (roomId, { rejectWithValue }) => {
        try {
            const data = await roomAPI.fetchRoomById(roomId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch room');
        }
    },
);

export const createNewRoom = createAsyncThunk(
    'rooms/createNewRoom',
    async (roomData, { rejectWithValue }) => {
        try {
            const data = await roomAPI.createRoom(roomData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create room');
        }
    },
);

const initialState = {
    rooms: [],
    currentRoom: null,
    loading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all rooms
        builder.addCase(fetchRooms.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms = action.payload;
        });
        builder.addCase(fetchRooms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch single room
        builder.addCase(fetchRoomById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRoomById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRoom = action.payload;
        });
        builder.addCase(fetchRoomById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create room
        builder.addCase(createNewRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createNewRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms.push(action.payload);
        });
        builder.addCase(createNewRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearError } = roomSlice.actions;
export default roomSlice.reducer;
