import React from 'react';

// 3rd party components
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Toolbar, Typography, IconButton, Tooltip, withStyles } from '@material-ui/core';

// styles
import { EnhancedToolbarStyles } from './styles'


const EnhancedTableToolbar = props => {
    const { classes, numSelected, onDeleteClick, selected, onEditClick, title } = props;


    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        {title}
        </Typography>
                )}

            {numSelected === 1 ? (
                <Tooltip title="Edit">
                    <IconButton
                        aria-label="edit"
                        onClick={() => onEditClick(selected[0])}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : ''
            }

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteClick(selected)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(EnhancedToolbarStyles)(EnhancedTableToolbar);
