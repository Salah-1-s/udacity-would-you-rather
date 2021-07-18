import { createSlice } from '@reduxjs/toolkit'

const initialState = { authedUser: null }

const authedUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.authedUser = action.payload
        },
        logout(state) {
            state.authedUser = null
        }
    }
})

export const authedUserActions = authedUserSlice.actions;

export default authedUserSlice;