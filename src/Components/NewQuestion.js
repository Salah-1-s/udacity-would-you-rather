import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { questionsActions } from '../store/questions';
import { usersActions } from '../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { saveQuestion } from '../data/api'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
}));

const NewQuestion = () => {
const classes = useStyles();
const [options, setOptions] = useState({
        optionOne: "",
        optionTwo: ""
})

const optionOneText = options.optionOne
const optionTwoText = options.optionTwo
const authedUser = useSelector(state => state.authedUser.authedUser)
const dispatch = useDispatch()

const handleOptions = (e) => {
        setOptions({ ...options, [e.target.name]: e.target.value })
}

const handleSubmitQuestion = (info) => {
    return(dispatch) => {
        return saveQuestion(info).then((question) => {
            dispatch(usersActions.add_question({
                authedUser,
                id: question.id
            }))
            dispatch(questionsActions.add_question({
                question,
                id: question.id
            }))
            console.log(question)
        })
    }
}

const handleSubmit = () => {
    dispatch(handleSubmitQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
    }))
}

return (
        <Fragment>
            <Card style={{ margin: "25px auto" }} className={classes.root}>
                <CardHeader
                    title={`Would You Rather?`}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <TextField name="optionOne" onChange={handleOptions} label="Option One" />
                        <Divider style={{ margin: "5px 0" }} />
                        <TextField name="optionTwo" onChange={handleOptions} label="Option Two" />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link to="/"><IconButton onClick={handleSubmit}>
                        <h6>Submit Answer</h6>
                    </IconButton></Link>
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default NewQuestion