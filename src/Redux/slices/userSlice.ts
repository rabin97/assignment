// src/Redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerProfile {
    id: number;
    name: string;
    color: number[];
    email: string;
    pincode: string;
    location_name: string;
    type: string;
    profile_pic: string | null;
    gst: string | null;
}

interface User {
    id: number;
    customer: number;
    customer_profile: CustomerProfile;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
