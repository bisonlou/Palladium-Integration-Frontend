import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PayrolImport from '../../components/payrollImport';
import NavBar from '../../components/NavBar';

import { BASE_URL, formatDate, dateToString } from '../../utils';

import importImg from '../../import.jpg'

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

    const [showPayrollImport, setShowPayrollImport] = useState(false)
    const [journalDate, setjournalDate] = useState(dateToString(new Date()))
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(false)
    const [years, setYears] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}/years`)
            .then(response => response.json())
            .then(data => setYears(data['data']))
    }, [])

    const handlePayrollImportOpen = () => {
        setShowPayrollImport(true);
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
            .then(data => setLoading(false))
    }

    return (
        <div className="App">
            <NavBar />

            <Card
                className={classes.card}
                onClick={handlePayrollImportOpen}
            >
                <img src={importImg} alt="payroll import" style={{ height: 200 }} />
                <CardContent>
                    <Typography className={classes.title} variant="h5" gutterBottom>
                        Payroll Import
                    </Typography>
                </CardContent>
            </Card>
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
        </div>
    );
}

export default Main;
