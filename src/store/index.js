import { configureStore } from '@reduxjs/toolkit'

import usersSlice from './users';
import questionsSlice from './questions';
import authedUserSlice from './auth';
import logger from '../middleware/logger'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: { 
        users: usersSlice.reducer, 
        questions: questionsSlice.reducer,
        authedUser: authedUserSlice.reducer

    },
    middleware: [ logger, thunk ]
})

export default store;