import React from 'react';
import {
    Popover, Grid, Button, withStyles
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import ImportStyles from './importStyles';


const Payrollimport = ({
    classes,
    journalDate,
    month,
    year,
    onImportClick,
    onValueChange,
    onJournalDateChange
}) => {

    return (
        <Popover
            open={true}
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
                        <MenuItem value={9}>Septembver</MenuItem>
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
                    >
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
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

            <Grid container justify="center">
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={onImportClick}
                    >
                        Import
                    </Button>
                </Grid>
            </Grid>
        </Popover>
    )
}

export default withStyles(ImportStyles)(Payrollimport);
