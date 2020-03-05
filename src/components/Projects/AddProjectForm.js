import React from 'react';

import {
    Popover, Grid, Button, IconButton, CircularProgress, TextField,
    FormControl,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



const AddProjectForm = ({
    project,
    open,
    classes,
    loading,
    onEditClick,
    onSaveClick,
    onTextChange,
    onStartDateChange,
    onEndDateChange,
    onPopoverCloseClick,
}) => {

    return (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 400 }}
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

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={6}>
                    <TextField
                        label="Project name"
                        name="project_name"
                        variant="outlined"
                        size="small"
                        value={project.project_name}
                        onChange={onTextChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        label="Approx. Value"
                        name="project_value"
                        variant="outlined"
                        size="small"
                        value={project.project_value}
                        onChange={onTextChange}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={6}>
                    <TextField
                        label="Country"
                        name="country"
                        variant="outlined"
                        size="small"
                        value={project.country}
                        onChange={onTextChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Staff Months"
                        name="staff_months"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={project.staff_months}
                        onChange={onTextChange}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={1}
                className={classes.row}
            >
                <Grid item xs={4}>
                    <TextField
                        label="Contact Person Name"
                        name="contact_person_name"
                        variant="outlined"
                        size="small"
                        value={project.contact_person_name}
                        onChange={onTextChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Contact Person Title"
                        name="contact_person_title"
                        variant="outlined"
                        size="small"
                        value={project.contact_person_title}
                        onChange={onTextChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Contact Person Tel"
                        name="contact_person_tel"
                        variant="outlined"
                        size="small"
                        value={project.contact_person_tel}
                        onChange={onTextChange}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                name="start_date"
                                onChange={onStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                name="end_date"
                                onChange={onEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={6}>
                    <TextField
                        label="Senior Professional Staff"
                        name="senior_professional"
                        variant="outlined"
                        size="small"
                        value={project.senior_professional}
                        onChange={onTextChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Consultant Staff Months"
                        name="consultant_months"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={project.consultant_months}
                        onChange={onTextChange}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={12}>
                    <TextField
                        label="Project Description"
                        name="project_description"
                        variant="outlined"
                        multiline
                        rows="4"
                        style={{ width: "100%" }}
                        size="small"
                        value={project.project_description}
                        onChange={onTextChange}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                className={classes.row}
                justify="flex-end"
            >
                <Grid item xs={12}>
                    <TextField
                        label="Service Description"
                        name="service_description"
                        variant="outlined"
                        multiline
                        rows="4"
                        style={{ width: "100%" }}
                        size="small"
                        value={project.service_description}
                        onChange={onTextChange}
                    />
                </Grid>
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
                                    onClick={project.id === 0 ? onSaveClick : onEditClick}
                                >
                                    {project.id === 0 ? 'Save' : 'Edit'}
                                </Button>
                            )
                    }
                </Grid>
            </Grid>
        </Popover >
    )
}

export default AddProjectForm;
