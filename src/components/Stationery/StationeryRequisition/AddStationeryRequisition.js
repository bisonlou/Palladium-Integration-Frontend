import React from 'react';

import {
    Popover, Grid, Button, IconButton, CircularProgress, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';

// utils
import { getEmployeeName, formatDate } from '../../../utils';


const AddStationeryRequisition = ({
    open,
    classes,
    loading,
    onRowAdd,
    stationery,
    onEditClick,
    onSaveClick,
    requisition,
    onRowDelete,
    onTextChange,
    onPopoverCloseClick,
}) => {
    const getLookupItems = () => {
        const lookupItems = {};

        stationery.forEach(item => {
            lookupItems[item.id] = item.name
        });

        return lookupItems;
    };

    const columns = [
        { title: 'Item', field: 'item_id', lookup: getLookupItems() },
        { title: 'Quantity', field: 'quantity', type: 'numeric' },
        { title: 'Purpose', field: 'purpose' },
    ];

    const getColumnData = () => {
        return requisition.details.map(item => {
            const newItem = {
                item_id: parseInt(item.item_id),
                quantity: item.quantity,
                purpose: item.purpose,
            };

            return newItem;
        });
    };

    return (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            className={classes.requisitionForm}
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

            <Grid container justify="space-between" className={classes.spacedRow}>
                <TextField
                    disabled
                    label="Name"
                    name="name"
                    value={requisition.id === 0 ? getEmployeeName() : requisition.name}
                    onChange={onTextChange}
                />

                <TextField
                    disabled
                    label="Date"
                    name="date"
                    value={requisition.id === 0 ? formatDate(Date()) : formatDate(requisition.requisition_date)}
                    onChange={onTextChange}
                />
            </Grid>

            <MaterialTable
                title="Requisition Items"
                columns={columns}
                data={getColumnData()}
                options={{
                    search: false,
                    showTitle: false,
                    paging: false,
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            resolve();
                            onRowAdd(newData);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            resolve();
                            onRowDelete(oldData);
                        }),
                }}
            />

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
                                    disabled={requisition.details.length === 0}
                                    onClick={requisition.id === 0 ? onSaveClick : onEditClick}
                                >
                                    {requisition.id === 0 ? 'Save' : 'Edit'}
                                </Button>
                            )
                    }
                </Grid>
            </Grid>
        </Popover >
    )
};

export default AddStationeryRequisition;
