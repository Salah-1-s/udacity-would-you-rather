import { createSlice } from '@reduxjs/toolkit'

const initialState = { users: {} }

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        get_users(state, action) {
            state.users = action.payload
        },
        add_vote(state, action) {
            state.users[action.payload.authedUser].answers[action.payload.qid] = action.payload.answer
        },
        add_question(state, action) {
            state.users[action.payload.authedUser].questions = state.users[action.payload.authedUser].questions.concat(action.payload.id)
        }
    }
})

export const usersActions = usersSlice.actions;

export default usersSlice;
