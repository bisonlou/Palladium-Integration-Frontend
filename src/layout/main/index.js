import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PayrolImport from '../../components/payrollImport';
import { BASE_URL, formatDate } from '../../utils';

import importImg from '../../import.jpg'

const useStyles = makeStyles({
    card: {
        minWidth: 50,
        width: 300,
        margin: 10,
        cursor: 'pointer'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



const Main = () => {
    const classes = useStyles();

    const [showImport, setShowImport] = useState(false)
    const [journalDate, setjournalDate] = useState(Date.now())
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2020)

    const handleImportOpen = () => {
        setShowImport(true);
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
        setjournalDate(formatDate(date));
    };

    const handleImportClick = () => {
        const data = {
            'month': month,
            'year': year,
            'jounal_date': journalDate
        };

        console.log('before---->', data)

        fetch(
            'http://127.0.0.1:5000/',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div className="App">
            <Card
                className={classes.card}
                onClick={handleImportOpen}
            >
                <img src={importImg} alt="import image" style={{ height: 200 }} />
                <CardContent>
                    <Typography className={classes.title} variant="h4" color="textSecondary" gutterBottom>
                        Payroll Import
                    </Typography>
                </CardContent>
            </Card>
            {
                showImport && (
                    <PayrolImport
                        year={year}
                        month={month}
                        journalDate={journalDate}
                        onImportClick={handleImportClick}
                        onValueChange={handleValueChange}
                        onJournalDateChange={handleJournalDateChange}
                    />
                )
            }
        </div>
    );
}

export default Main;
