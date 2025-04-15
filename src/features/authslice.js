import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    errorMessage: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            if(!state.user){
                state.isError = true
                state.errorMessage = "Invalid email or password"
            }
        },
        signOut: (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
})

export const {signIn, signOut} = authSlice.actions

export default authSlice.reducer