import React from 'react';

// 3rd party components
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (
    {open, onSnackBarClose, severity, message}
) => (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onSnackBarClose}
    >
        <MuiAlert
            elevation={6}
            variant="filled"
            severity={severity}
        >
            {message}
        </MuiAlert>
    </Snackbar>
);

export default Alert;
