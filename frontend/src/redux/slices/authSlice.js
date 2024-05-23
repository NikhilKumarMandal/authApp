import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    data: JSON.parse(localStorage.getItem('data')) || {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     setUser: (state, action) => {
            if (action.payload.success) {
                localStorage.setItem('data', JSON.stringify(action.payload.data));
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                state.isLoggedIn = true;
                state.data = action.payload.data;
            } else {
                console.error("User registration failed:", action.payload.message);
            }
        },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
