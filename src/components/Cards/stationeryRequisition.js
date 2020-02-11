import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import stationeryImg from '../../images/stationery.jpg';

const StationeryRequisitionCard = ({ classes, onCardClick }) => (
    <Card
        className={classes.card}
        onClick={onCardClick}
    >
        <img src={stationeryImg} alt="stationery requisition" style={{ height: 200 }} />
        <CardContent>
            <Typography className={classes.title} variant="h5" gutterBottom>
                Stationery Requisition
            </Typography>
        </CardContent>
    </Card>
);

export default StationeryRequisitionCard;
