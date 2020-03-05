import React from 'react';

// 3rd party imports
import {
    Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Paper,
    Checkbox, Button, withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


// custom imports
import AddStationeryForm from './AddStationeryForm';
import UploadStationeryForm from './UploadStationeryForm';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import PanelHeader from '../PanelHeader';
import Alert from '../Alert'

// styles
import { StationeryListStyles } from './stationeryListStyles';

// utils
import { getComparator, stableSort } from '../../utils';

const StationeryList = ({
    item,
    error,
    classes,
    success,
    onItemAdd,
    onUpload,
    isLoading,
    stationery,
    onItemEdit,
    showAddForm,
    showUploadForm,
    onFileChange,
    onItemDelete,
    onHandleChange,
    onAddFormClose,
    onUploadFormClose,
    onSnackBarClose,
    onItemEditClick,
    handlePopperClose,
    onShowAddFormClick,
    onShowUploadFormClick,
}) => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    ];

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = stationery.map(n => n);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, stationery.length - page * rowsPerPage);

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
                    onClick={onShowAddFormClick}
                >
                    New
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={onShowUploadFormClick}
                >
                    Bulk Upload
                </Button>
                <EnhancedTableToolbar
                    title="Stationery"
                    selected={selected}
                    numSelected={selected.length}
                    onEditClick={onItemEditClick}
                    onDeleteClick={onItemDelete}
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
                            rowCount={stationery.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(stationery, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => {
                                    const isItemSelected = isSelected(item.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, item)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={item.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>{item.description}</TableCell>
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
                    count={stationery.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <AddStationeryForm
                    item={item}
                    open={showAddForm}
                    loading={isLoading}
                    classes={classes}
                    onTextChange={onHandleChange}
                    onSaveClick={onItemAdd}
                    onEditClick={onItemEdit}
                    onPopoverCloseClick={onAddFormClose}
                />

                <UploadStationeryForm
                    open={showUploadForm}
                    loading={isLoading}
                    classes={classes}
                    onFileChange={onFileChange}
                    onUploadClick={onUpload}
                    onPopoverCloseClick={onUploadFormClose}
                />
            </Paper>
        </div >
    );
}

export default withStyles(StationeryListStyles)(StationeryList);
