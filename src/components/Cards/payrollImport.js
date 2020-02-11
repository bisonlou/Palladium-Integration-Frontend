import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import importImg from '../../images/import.jpg';

const PayrollImportCard = ({ classes, onCardClick }) => (
    <Card
        className={classes.card}
        onClick={onCardClick}
    >
        <img src={importImg} alt="payroll import" style={{ height: 200 }} />
        <CardContent>
            <Typography className={classes.title} variant="h5" gutterBottom>
                Payroll Import
            </Typography>
        </CardContent>
    </Card>
);

export default PayrollImportCard;
