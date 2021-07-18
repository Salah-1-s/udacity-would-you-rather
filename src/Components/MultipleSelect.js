import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { useSelector } from 'react-redux'
import { authedUserActions } from '../store/auth'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function MultipleSelect() {
    const [auth, setAuth] = useState(null)
    const classes = useStyles();

    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setAuth(e)
    };

    const login = () => {
        dispatch(authedUserActions.login(auth))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (auth) {
            if (auth.length > 0) {
                login()
            }
        } else{
            alert("Please Select a Valid User")
        } 
      };

    const users = useSelector(state => state.users)
    const userNames = Object.values(users.users).map(user => user.name)

    return (
        <div>
            <FormControl fullWidth required className={classes.formControl}>
                <InputLabel htmlFor="name-native-required">Name</InputLabel>
                <Select
                    native
                    onChange={(e) => handleChange(e.target.value)}
                    name="name"
                    inputProps={{
                        id: 'name-native-required',
                    }}
                >
                    <option aria-label="None" value="" />
                    {userNames.map(name => (
                        <option key={name} value={name.toLowerCase().replace(/\s+/g, '')} >{name}</option>
                    ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
                <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>
            </FormControl>
        </div>
    );
}
