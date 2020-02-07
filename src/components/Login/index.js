import React from 'react';
import { } from '@material-ui/core';

// 3rd party libraries
import {
    Grid, Button, FormControl, Input, InputAdornment, InputLabel, IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = ({
    email,
    classes,
    password,
    onLoginClick,
    showPassword,
    handleEmailChange,
    handlePasswordChange,
    handleClickShowPassword,
    handleMouseDownPassword

}) => (
    <Grid container justify="center" className={classes.loginBox}>
        <Grid item xs={8}>
            <FormControl className={classes.textField}>
                <Input
                    value={email}
                    onChange={handleEmailChange}
                    endAdornment={<InputAdornment position="end">@eprcug.org</InputAdornment>}
                    aria-describedby="eprc email address"
                    inputProps={{
                        'aria-label': 'email address',
                    }}
                />
            </FormControl>
        </Grid>

        <Grid item xs={8}>
            <FormControl className={classes.textField}>
                <InputLabel
                    className={classes.textField}
                    htmlFor="standard-adornment-password">
                    Password
                </InputLabel>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Grid>
        <Grid xs={6} item>
            <Button
                variant="contained"
                color="secondary"
                fullWidth={true}
                className={classes.button}
                onClick={onLoginClick}
            >
                Login
            </Button>
        </Grid>
    </Grid>
)

export default Login;
