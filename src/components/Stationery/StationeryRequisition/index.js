import React from 'react';

// 3rd party imports
import {
    Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Paper,
    Checkbox, Button, withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


// custom imports
import AddRequisitionForm from './AddStationeryRequisition';
import EnhancedTableHead from '../../EnhancedTableHead';
import EnhancedTableToolbar from '../../EnhancedTableToolbar';
import PanelHeader from '../../PanelHeader';
import Alert from '../../Alert'

// styles
import { StationeryListStyles } from '../stationeryListStyles';

// utils
import { getComparator, stableSort, formatDate } from '../../../utils';

const Listing = ({
    error,
    classes,
    success,
    onRowAdd,
    isLoading,
    stationery,
    requisition,
    showAddForm,
    onRowDelete,
    requisitions,
    onHandleChange,
    onAddFormClose,
    onSnackBarClose,
    onRequisitionAdd,
    handlePopperClose,
    onRequisitionEdit,
    onRequisitionDelete,
    onRequsitionEditClick,
    onShowAddRequisitionClick,
    
}) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'authorized', numeric: false, disablePadding: false, label: 'Authorized' },
        { id: 'approved', numeric: false, disablePadding: false, label: 'Approved' },
        { id: 'issued', numeric: false, disablePadding: false, label: 'Issued' },
    ];

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = requisitions.map(n => n);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_, item) => {
        const selectedIndex = selected.map(i => i.id).indexOf(item.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, item);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = id => selected.map(i => i.id).indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, requisitions.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <PanelHeader
                onPopoverCloseClick={handlePopperClose}
            />

            <Alert
                open={error.isError}
                onSnackBarClose={onSnackBarClose}
                severity="error"
                message={error.message}
            />

            <Alert
                open={success.isSuccess}
                onSnackBarClose={onSnackBarClose}
                severity="success"
                message={success.message}
            />

            <Paper className={classes.paper}>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={onShowAddRequisitionClick}
                >
                    New
                </Button>
                <EnhancedTableToolbar
                    title="Stationery Requisitions"
                    selected={selected}
                    numSelected={selected.length}
                    onEditClick={onRequsitionEditClick}
                    onDeleteClick={onRequisitionDelete}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={requisitions.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(requisitions, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((requisition, index) => {
                                    const isItemSelected = isSelected(requisition.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, requisition)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={requisition.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {requisition.name}
                                            </TableCell>
                                            <TableCell>{formatDate(requisition.requisition_date)}</TableCell>
                                            <TableCell>
                                                {
                                                    requisition.authorized_by === null ? "Pending": requisition.authorized_by
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    requisition.approved_by === null ? "Pending": "Approved"
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    requisition.issued_by === null ? "Pending": "Issued"
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={requisitions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <AddRequisitionForm
                    classes={classes}
                    open={showAddForm}
                    loading={isLoading}
                    onRowAdd={onRowAdd}
                    stationery={stationery}
                    requisition={requisition}
                    onRowDelete={onRowDelete}
                    onTextChange={onHandleChange}
                    onSaveClick={onRequisitionAdd}
                    onEditClick={onRequisitionEdit}
                    onPopoverCloseClick={onAddFormClose}
                />
            </Paper>
        </div >
    );
};

export default withStyles(StationeryListStyles)(Listing);
