import React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const PanelHeader = ({ onPopoverCloseClick }) => (
    <Grid
        container
        justify="flex-end"
    >
        <IconButton
            size="medium"
            aria-label="close"
            onClick={onPopoverCloseClick}
        >
            <CloseIcon color={"secondary"} />
        </IconButton>
    </Grid>
);

export default PanelHeader;
