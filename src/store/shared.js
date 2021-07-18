import { getInitialData } from '../data/api'
import { usersActions } from './users'
import { questionsActions } from './questions'
import { authedUserActions } from './auth.js'

const authedUser = null

export const handleInitialData = () => {
    return dispatch => {
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(usersActions.get_users(users))
            dispatch(questionsActions.get_questions(questions))
            dispatch(authedUserActions.login(authedUser))
        })
    }
}