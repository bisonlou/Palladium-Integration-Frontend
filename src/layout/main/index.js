import React, { useState, useEffect } from 'react';

// third party components
import { Grid, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

// custom components
import PayrolImport from '../../components/payrollImport';
import PayrollImportCard from '../../components/Cards/payrollImport';
import StationeryRequisitionCard from '../../components/Cards/stationeryRequisition';
import Stationery from '../../components/Stationery';
import NavBar from '../../components/NavBar';

// utils
import { BASE_URL, dateToString } from '../../utils';


const useStyles = makeStyles({
    card: {
        minWidth: 50,
        width: 300,
        margin: 10,
        cursor: 'pointer'
    },
    title: {
        fontSize: 16,
    },
});



const Main = () => {
    const classes = useStyles();

    const [showPayrollImport, setShowPayrollImport] = useState(false);
    const [showStationery, setShowStationery] = useState(false);
    const [journalDate, setjournalDate] = useState(dateToString(new Date()));
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [error, setError] = useState({
        'isError': false,
        'message': ''
    });
    const [message, setMessage] = useState({
        'isMessage': false,
        'message': ''
    });


    useEffect(() => {
        fetch(`${BASE_URL}/years`)
            .then(response => response.json())
            .then(data => setYears(data['data']))
    }, [])

    const handlePayrollImportOpen = () => {
        setShowPayrollImport(true);
    }

    const handleStationeryOpen = () => {
        setShowStationery(true);
    }

    const handlePopoverCloseClick = () => {
        setShowPayrollImport(false);
    }

    const handleValueChange = event => {
        const { name, value } = event.target;
        if (name === 'month') {
            setMonth(value);
        }

        if (name === 'year') {
            setYear(value);
        }
    }

    const handleJournalDateChange = date => {
        setjournalDate(dateToString(date));
    };

    const handleImportClick = () => {
        setLoading(true);

        const data = {
            'month': month,
            'year': year,
            'journal_date': journalDate
        };

        fetch(`${BASE_URL}/`,
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
                    setLoading(false);
                    setMessage({
                        'isMessage': true,
                        'message': 'Import successful'
                    });
                } else {
                    setLoading(false);
                    setError({
                        'isError': true,
                        'message': data['description']
                    });
                }

            })
    }

    const handleSnackBarClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError({
            'isError': false,
            'message': ''
        });

        setMessage({
            'isMessage': false,
            'message': ''
        });
    };

    const handleStationeryClose = () => {
        setShowStationery(false);
    };

    return (
        <div className="App">
            <NavBar />
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

            <Snackbar
                open={message.isMessage}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackBarClose}
                    severity="success"
                >
                    {message.message}
                </MuiAlert>
            </Snackbar>

            <Grid container >
                <Grid item xs={3}>
                    <PayrollImportCard
                        classes={classes}
                        onCardClick={handlePayrollImportOpen}
                    />
                </Grid>

                <Grid item xs={3}>
                    <StationeryRequisitionCard
                        classes={classes}
                        onCardClick={handleStationeryOpen}
                    />
                </Grid>
            </Grid>

            <PayrolImport
                year={year}
                years={years}
                month={month}
                loading={loading}
                open={showPayrollImport}
                journalDate={journalDate}
                onImportClick={handleImportClick}
                onValueChange={handleValueChange}
                onPopoverCloseClick={handlePopoverCloseClick}
                onJournalDateChange={handleJournalDateChange}
            />

            <Stationery
                open={showStationery}
                handleClose={handleStationeryClose}
            />
        </div>
    );
}

export default Main;
