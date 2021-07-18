import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authedUserActions } from '../store/auth'

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

const Navigation = () => {

    const classes = useStyles();
    const authedUser = useSelector(state => state.authedUser);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authedUserActions.logout())
    }
    
    return (
        <div>
            <Navbar bg="light" variant="light">
                <LiveHelpIcon />
                <Nav className="mr-auto">
                    <Link style={{margin: "auto 10px"}} to="/">Dashboard</Link>
                    <Link style={{margin: "auto 10px"}} to="/new-question">New Question</Link>
                    <Link style={{margin: "auto 10px"}} to="/leaderboard">Leaderboard</Link>
                    <Avatar src={users.users[authedUser.authedUser] ? users.users[authedUser.authedUser].avatarURL : null } aria-label="recipe" className={classes.avatar} />
                    <Link to="/" style={{margin: "auto 10px"}} onClick={logoutHandler}>Logout</Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Navigation
