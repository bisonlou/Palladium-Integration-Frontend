import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// 3rd party libraries
import {
    Paper, Tab, Tabs, Grid, withStyles,
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

// custom components
import NavBar from '../../components/NavBar';
import Login from '../../components/Login';
import Register from '../../components/Register';

// util
import { BASE_URL, saveSessionInfo } from '../../utils';

// styles
import { LandingStyles } from './landingStyles';



const Landing = ({ classes }) => {
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState({
        'isError': false,
        'message': ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    const handleEmailChange = event => {
        const { value } = event.target;
        setEmail(value);
    };

    const handlePasswordChange = event => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleFirstNameChange = event => {
        const { value } = event.target;
        setFirstName(value);
    };

    const handleMiddleNameChange = event => {
        const { value } = event.target;
        setMiddleName(value);
    };

    const handleLastNameChange = event => {
        const { value } = event.target;
        setLastName(value);
    };

    const handleClickShowPassword = _ => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const data = {
            'email': email,
            'password': password,
        };

        fetch(`${BASE_URL}/login`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    saveSessionInfo(data);
                    setIsLoggedIn(true);
                } else {
                    setError({
                        'isError': true,
                        'message': data['description']
                    });
                }
            })
            .catch(error => setError({
                'isError': true,
                'message': 'Unable to connect to the server. Consult your administrator'
            }));
    };

    const handleRegistration = () => {
        const data = {
            'email': email,
            'first_name': firstName,
            'middle_name': middleName,
            'last_name': lastName,
            'password': password,
        };

        fetch(`${BASE_URL}/users`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    saveSessionInfo(data);
                    setIsLoggedIn(true);
                } else {
                    setError({
                        'isError': true,
                        'message': data['description']
                    });
                }
            });
    };

    const handleSnackBarClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError({
            'isError': false,
            'message': ''
        });
    };


    return (
        <div>
            {
                isLoggedIn && <Redirect to='/portal' />
            }

            <NavBar />

            {
                error.isError && (
                    <Snackbar
                        open={error.isError}
                        autoHideDuration={6000}
                        onClose={handleSnackBarClose}
                    >
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            onClose={handleSnackBarClose}
                            severity="error"
                        >
                            {error.message}
                        </MuiAlert>
                    </Snackbar>
                )
            }

            <Grid container className={classes.root}>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>
                    <Paper square>
                        <Tabs
                            value={tab}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            onChange={handleTabChange}
                        >
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </Paper>

                    <Paper square>
                        {
                            tab === 0 ? (
                                <Login
                                    email={email}
                                    classes={classes}
                                    password={password}
                                    onLoginClick={handleLogin}
                                    showPassword={showPassword}
                                    handleEmailChange={handleEmailChange}
                                    handlePasswordChange={handlePasswordChange}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                />
                            ) : (
                                    <Register
                                        email={email}
                                        classes={classes}
                                        password={password}
                                        showPassword={showPassword}
                                        onRegisterClick={handleRegistration}
                                        handleEmailChange={handleEmailChange}
                                        handlePasswordChange={handlePasswordChange}
                                        handleLastNameChange={handleLastNameChange}
                                        handleFirstNameChange={handleFirstNameChange}
                                        handleMiddleNameChange={handleMiddleNameChange}
                                        handleClickShowPassword={handleClickShowPassword}
                                        handleMouseDownPassword={handleMouseDownPassword}
                                    />
                                )
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(LandingStyles)(Landing)