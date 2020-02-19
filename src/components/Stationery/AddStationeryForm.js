import React from 'react';

import {
    Popover, Grid, Button, IconButton, CircularProgress, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const AddStationeryForm = ({
    item,
    open,
    classes,
    loading,
    onEditClick,
    onSaveClick,
    onTextChange,
    onPopoverCloseClick,
}) => {

    return (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 600 }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Grid
                container
                justify="flex-end"
                className={classes.header}
            >
                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={onPopoverCloseClick}
                >
                    <CloseIcon color={"secondary"} />
                </IconButton>
            </Grid>

            <Grid className={classes.row}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={item.name}
                    onChange={onTextChange}
                />
            </Grid>
            <Grid className={classes.row}>
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    value={item.description}
                    onChange={onTextChange}
                />
            </Grid>
            <Grid container justify="center" className={classes.row}>
                <Grid item xs={8}>
                    {
                        loading ? (
                            <Grid container item xs={12} justify="center">
                                <Grid item>
                                    <CircularProgress
                                        color="secondary"
                                        className={classes.button}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    className={classes.button}
                                    onClick={item.id === 0 ? onSaveClick : onEditClick}
                                >
                                    {item.id === 0 ? 'Save' : 'Edit'}
                                </Button>
                            )
                    }
                </Grid>
            </Grid>
        </Popover >
    )
}

export default AddStationeryForm;
