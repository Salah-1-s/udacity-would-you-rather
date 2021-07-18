import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Leaderboard = () => {
    const users = useSelector(state => state.users)
    const usersArray = Object.keys(users.users).sort((a, b) => {
        const scoreA = Object.keys(users.users[a].answers).length + users.users[a].questions.length
        const scoreB = Object.keys(users.users[b].answers).length + users.users[b].questions.length
        return scoreB - scoreA
    })
    const sortedUsers = usersArray.map(user => users.users[user])
    return (
        <div>
            <h3 style={{margin: "30px auto", textAlign: "center"}}>Leaderboard</h3>
            {sortedUsers.map(user => {
                return (
                    <Fragment key={user.id}>
                        <Card style={{margin: "15px auto"}}>
                            <CardContent style={{textAlign: "center"}}>
                                <Avatar 
                                style={{margin: "auto"}} 
                                src={user.avatarURL} />
                                <Typography>{user.name}</Typography>
                                <Typography>No of answers = {Object.keys(user.answers).length}</Typography>
                                <Typography>No of questions = {user.questions.length}</Typography>
                                <Typography>Total score is {Object.keys(user.answers).length + user.questions.length}</Typography>
                            </CardContent>
                        </Card>
                    </Fragment>
                )
            })}
        </div>
    )
}

export default Leaderboard