import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import { saveQuestionAnswer } from '../data/api'
import { useSelector, useDispatch } from 'react-redux'
import { questionsActions } from '../store/questions'
import { usersActions } from '../store/users'
import { Link } from 'react-router-dom'

export default function RadioButton(props) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e);
  };
  
  const authedUser = useSelector(state => state.authedUser.authedUser)
  const dispatch = useDispatch();

  const qid = props.id

  const handleAddVote = (info) => {
    return (dispatch) => {
      dispatch(questionsActions.add_vote(info))
      dispatch(usersActions.add_vote(info))

      return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn("Error in adding vote:", e)
        dispatch(questionsActions.add_vote(info))
        alert("Error")
      })
    }
  }

  const handleSubmit = () => {
    console.log(authedUser, qid, value)
    dispatch(handleAddVote({
      qid,
      answer: value,
      authedUser,
    }))
  }

  

  return (
    <FormControl style={{ marginTop: "15px" }} component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => handleChange(e.target.value)}>
        <FormControlLabel value="optionOne" control={<Radio />} label={props.optionOne} />
        <Divider />
        <FormControlLabel value="optionTwo" control={<Radio />} label={props.optionTwo} />
      </RadioGroup>
      <IconButton onClick={handleSubmit}>
        <Link to="/"><h6>Submit Answer</h6></Link>
      </IconButton>
    </FormControl>
  );
}