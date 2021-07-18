import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import RadioButton from './RadioButton'

import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { timeFormat } from '../data/api'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ToAnswer(props) {
    const classes = useStyles();

    const questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)
    const authedUser = useSelector(state => state.authedUser)

    const questionIds = Object.keys(questions.questions)
        .sort((a, b) => questions.questions[b].timestamp - questions.questions[a].timestamp)
    if (questionIds) {
        var allQuestions = questionIds.map(id => questions.questions[id])
    }

    const filteredQs = allQuestions.filter(
        question => !question.optionOne.votes.includes(authedUser.authedUser) && !question.optionTwo.votes.includes(authedUser.authedUser)
    )

    return (
        <Fragment>
            {filteredQs.map(
                question => {
                    return (
                        <Fragment>
                            <Route key={question.id} exact path={`/questions/${question.id}`} >
                                <Card id={question.id}  style={{ margin: "25px auto" }} className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={users.users[question.author].avatarURL} aria-label="recipe" className={classes.avatar} />
                                        }
                                        title={`${question.author} asked: Would You Rather?`}
                                        subheader={timeFormat(question.timestamp)}
                                    />
                                    <CardContent>
                                        <RadioButton
                                            id={question.id}
                                            optionOne={question.optionOne.text}
                                            optionTwo={question.optionTwo.text}
                                        />
                                    </CardContent>
                                </Card>
                            </Route>
                        </Fragment>
                    )
                }
            )}

        </Fragment>
    );
}