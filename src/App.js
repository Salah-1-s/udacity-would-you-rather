import Navigation from './Components/Navigation'
import SignIn from './Components/SignIn'
import Dashboard from './Components/Dashboard'
import ToAnswer from './Components/ToAnswer'
import NewQuestion from './Components/NewQuestion'
import Leaderboard from './Components/Leaderboard'
import QDetails from './Components/QDetails'

import 'bootstrap/dist/css/bootstrap.min.css';

import { handleInitialData } from './store/shared'
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  const authedUser = useSelector(state => state.authedUser)

  return (
    <Fragment>
        {authedUser.authedUser && <Navigation />}
        {/* {!authedUser.authedUser && <SignIn />} */}
        <Switch>
        <Route exact path="/">
          {!authedUser.authedUser ? <SignIn /> : <Dashboard />}
        </Route>
        <Route exact path="/questions/:id">
          {!authedUser.authedUser ? <SignIn /> : <ToAnswer />}
        </Route>
        <Route exact path="/questions/:id">
        {!authedUser.authedUser ? <SignIn /> : <QDetails />}
        </Route>
        <Route path="/leaderboard" exact>
        {!authedUser.authedUser ? <SignIn /> : <Leaderboard />}
        </Route>
        <Route exact path="/new-question">
        {!authedUser.authedUser ? <SignIn /> : <NewQuestion />}
        </Route>
        <Route>
          <h2>Error 404</h2>
        </Route>
        <Route>
          <h2>Error 404</h2>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
