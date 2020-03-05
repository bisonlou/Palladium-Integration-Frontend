import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

const ProjectCard = ({ classes, onCardClick, title, iconImage }) => (
    <Card
        className={classes.card}
        onClick={onCardClick}
    >
        <img src={iconImage} alt="definition" style={{ height: 200 }} />
        <CardContent>
            <Typography className={classes.title} variant="h5" gutterBottom>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

export default ProjectCard;
