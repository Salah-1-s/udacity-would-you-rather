import { createSlice } from '@reduxjs/toolkit'

const initialState = { questions: {} }

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        get_questions(state, action) {
            state.questions = action.payload
        },
        add_vote(state, action) {
            state.questions[action.payload.qid][action.payload.answer].votes = state.questions[action.payload.qid][action.payload.answer].votes.concat(action.payload.authedUser)
        },
        add_question(state, action) {
            state.questions[action.payload.id] = action.payload.question 
        }
    }
})

export const questionsActions = questionsSlice.actions;

export default questionsSlice;
