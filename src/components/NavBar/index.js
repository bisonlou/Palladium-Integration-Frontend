import React from 'react';
import {
    Toolbar, Typography, AppBar, Grid
} from '@material-ui/core';

const NavBar = () => {

    return (

        <AppBar style={{ position: 'static' }}>
            <Grid
                container
                justify="space-between"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        EPRC Palladium Integration
                </Typography>
                </Toolbar>
            </Grid>
        </AppBar>
    );
}

export default NavBar;