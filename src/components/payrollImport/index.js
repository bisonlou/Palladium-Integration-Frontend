import React from 'react';

import {
    Popover, Grid, Button, withStyles, IconButton,
    InputLabel, MenuItem, FormControl, Select, CircularProgress
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import ImportStyles from './importStyles';


const Payrollimport = ({
    open,
    year,
    years,
    month,
    classes,
    loading,
    journalDate,
    onImportClick,
    onValueChange,
    onJournalDateChange,
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
            {/* <Grid>
                <Typography className={classes.error}>
                </Typography>
            </Grid> */}
            <Grid
                container
                justify="flex-end"
                className={classes.header}
            >
                <grid item xs={3}>
                    <IconButton
                        size="small"
                        aria-label="delete"
                        className={classes.margin}
                        onClick={onPopoverCloseClick}
                    >
                        <CloseIcon color={"secondary"} />
                    </IconButton>
                </grid>
            </Grid>

            <Grid className={classes.row}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="month"
                        value={month}
                        className={classes.selectField}
                        onChange={onValueChange}
                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid className={classes.row}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="year"
                        value={year}
                        className={classes.selectField}
                        onChange={onValueChange}
                    >{
                            years.map(year => (
                                <MenuItem
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid className={classes.row}>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            name="journal-date"
                            value={journalDate}
                            onChange={onJournalDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
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
                                    onClick={onImportClick}
                                >
                                    Import
                                </Button>
                            )
                    }
                </Grid>
            </Grid>
        </Popover >
    )
}

export default withStyles(ImportStyles)(Payrollimport);
