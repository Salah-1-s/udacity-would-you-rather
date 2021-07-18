import React, { Fragment } from 'react'

import Grid from '@material-ui/core/Grid';

import DashTabs from './DashTabs'

const Dashboard = () => {
    return (
        <Fragment>
            <Grid container direction= "column" alignItems= "center" justifyContent= "center">
                <h3 style={{ margin: "20px 0" }}>Dashboard</h3>
                <DashTabs  />
            </Grid>
        </Fragment>
    )
}

export default Dashboard