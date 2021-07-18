import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';

import { useSelector } from 'react-redux'
import { timeFormat } from '../data/api'
import { Route } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function AnsweredQs() {
    const classes = useStyles()
    const questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)
    const authedUser = useSelector(state => state.authedUser)
    const questionIds = Object.keys(questions.questions)
        .sort((a, b) => questions.questions[b].timestamp - questions.questions[a].timestamp)
    if (questionIds) {
        var allQuestions = questionIds.map(id => questions.questions[id])
    }

    const filteredQs = allQuestions.filter(
        question => question.optionOne.votes.includes(authedUser.authedUser) || question.optionTwo.votes.includes(authedUser.authedUser)
    )

    return (
        <Fragment>
            {filteredQs.map(
                (question) => {
                    return (
                        <Fragment>
                            <Route key={question.id} exact path={`/questions/${question.id}`} >
                                <Card id={question.id} key={question.id} style={{ margin: "25px 0" }} className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={users.users[question.author].avatarURL} aria-label="recipe" className={classes.avatar} />
                                        }
                                        title={`${question.author} asked: Would You Rather?`}
                                        subheader={timeFormat(question.timestamp)}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <div className={classes.root}>
                                                <span>{question.optionOne.text}</span>,
                                                <LinearProgress variant="determinate" value={(question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100} />
                                                <span>{`${(question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100} %, Number of Votes: ${question.optionOne.votes.length}`}</span>
                                                <div>{question.optionOne.votes.includes(authedUser.authedUser) && <CheckIcon />}</div>
                                                <Divider style={{ margin: "15px 0" }} />
                                                <span>{question.optionTwo.text}</span>
                                                <LinearProgress variant="determinate" value={(question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100} />
                                                <span>{`${(question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100} %, Number of Votes: ${question.optionTwo.votes.length}`}</span>
                                                <div>{question.optionTwo.votes.includes(authedUser.authedUser) && <CheckIcon />}</div>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                    </CardActions>
                                </Card>
                            </Route>
                        </Fragment>

                    )
                }
            )}
        </Fragment>
    );
}