import React from 'react';

// 3rd party libraries
import { Grid, TextField, Button,
    FormControl, Input, InputAdornment, InputLabel, IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Register = ({
    email,
    classes,
    password,
    showPassword,
    onRegisterClick,
    handleEmailChange,
    handlePasswordChange,
    handleLastNameChange,
    handleFirstNameChange,
    handleMiddleNameChange,
    handleClickShowPassword,
    handleMouseDownPassword,
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
            <TextField
                label="First Name"
                className={classes.textField}
                onChange={handleFirstNameChange}
                helperText=""
                margin="dense"
            />
        </Grid>

        <Grid item xs={8}>
            <TextField
                label="Middle Name"
                className={classes.textField}
                onChange={handleMiddleNameChange}
                helperText=""
                margin="dense"
            />
        </Grid>

        <Grid item xs={8}>
            <TextField
                label="Last Name"
                className={classes.textField}
                onChange={handleLastNameChange}
                helperText=""
                margin="dense"
            />
        </Grid>

        <Grid item xs={8}>
            <FormControl className={classes.textField}>
                <InputLabel
                    className={classes.textField}
                    htmlFor="standard-adornment-password">
                    Password
                </InputLabel>
                <Input
                    id="standard-adornment-password"
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
                onClick={onRegisterClick}
            >
                Register
            </Button>
        </Grid>
    </Grid>
)

export default Register;
