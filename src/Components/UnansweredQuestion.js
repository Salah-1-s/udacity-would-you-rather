import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
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

export default function UnansweredQuestion(props) {
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
                        <Card key={question.id} style={{ margin: "25px auto" }} className={classes.root}>
                            <CardHeader
                                avatar={
                                    <Avatar src={users.users[question.author].avatarURL} aria-label="recipe" className={classes.avatar} />
                                }
                                title={`${question.author} asked: Would You Rather?`}
                                subheader={timeFormat(question.timestamp)}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <span>{question.optionOne.text}</span>
                                    <Divider style={{ margin: "5px 0" }} />
                                    <span>{question.optionTwo.text}</span>
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <Link to={`/questions/${question.id}`}><h6>Tap To Answer</h6></Link>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                }
            )}

        </Fragment>
    );
}