import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// third party libraries
import {
    Toolbar, Typography, AppBar,
    Grid, Avatar, withStyles,
    Popper, Fade, Paper, Button
} from '@material-ui/core';

// utils
import { getSessionInfo, clearSessionInfo } from '../../utils';

// styles
import { NavBarStyles } from './navBarStyles';


const NavBar = ({ classes }) => {
    const [open, setOpenPopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSignedOut, setIsSignedOut] = useState(false);

    let initials = '';
    let email = '';
    if (getSessionInfo('token')) {
        const firstName = getSessionInfo('first_name');
        const lastName = getSessionInfo('last_name');
        email = `${getSessionInfo('email')}@eprcug.org`

        initials = `${firstName.split('')[0]}${lastName.split('')[0]}`.toUpperCase();
    }

    const handleAvatorClick = event => {
        setAnchorEl(event.currentTarget);
        setOpenPopper(true)
    };

    const handleSignOutClick = () => {
        clearSessionInfo();
        setIsSignedOut(true);
    }

    return (
        <div>
            {
                isSignedOut && <Redirect to="/" />
            }

            <AppBar style={{ position: 'static' }}>
                <Grid
                    container
                    justify="space-between"
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            EPRC Portal
                </Typography>
                    </Toolbar>

                    <Grid item>
                        {
                            getSessionInfo('token') ? (
                                <Avatar
                                    className={classes.avatar}
                                    onClick={handleAvatorClick}
                                >{initials}</Avatar>
                            ) : ''
                        }
                    </Grid>
                </Grid>

                <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <Grid container justify="center" alignItems="center" spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.center}>{email}</Typography>
                                    </Grid>
                                    <Grid item container justify="center" xs={12}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={handleSignOutClick}
                                        >
                                            Sign Out
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </AppBar>
        </div>
    );
}

export default withStyles(NavBarStyles)(NavBar);