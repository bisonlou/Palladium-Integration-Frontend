import React from 'react';

// 3rd party imports
import {
    Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Paper,
    Checkbox, Button, withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


// custom imports
import AddProjectForm from './AddProjectForm';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import PanelHeader from '../PanelHeader';
import Alert from '../Alert'

// styles
import { ProjectListStyles } from './projectListStyles';

// utils
import { getComparator, stableSort, formatDate } from '../../utils';

const ProjectList = ({
    project,
    error,
    classes,
    success,
    onProjectAdd,
    isLoading,
    projects,
    onProjectEdit,
    showAddForm,
    onProjectDelete,
    onHandleChange,
    onAddFormClose,
    onSnackBarClose,
    onProjectEditClick,
    handlePopperClose,
    onShowAddFormClick,
    onStartDateChange,
    onEndDateChange,
}) => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const headCells = [
        { id: 'project_name', numeric: false, disablePadding: true, label: 'Project' },
        { id: 'client_name', numeric: false, disablePadding: true, label: 'Client' },
        { id: 'start_date', numeric: false, disablePadding: true, label: 'Start' },
        { id: 'end_date', numeric: false, disablePadding: true, label: 'End' },
    ];

    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = projects.map(n => n);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

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
                
                <EnhancedTableToolbar
                    title="Projects"
                    selected={selected}
                    numSelected={selected.length}
                    onEditClick={onProjectEditClick}
                    onDeleteClick={onProjectDelete}
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
                            rowCount={projects.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(projects, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((project, index) => {
                                    const isItemSelected = isSelected(project.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, project)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={project.project_name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {project.project_name}
                                            </TableCell>
                                            <TableCell>{project.client_name}</TableCell>
                                            <TableCell>{formatDate(project.start_date)}</TableCell>
                                            <TableCell>{formatDate(project.end_date)}</TableCell>
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
                    count={projects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <AddProjectForm
                    project={project}
                    open={showAddForm}
                    loading={isLoading}
                    classes={classes}
                    onTextChange={onHandleChange}
                    onSaveClick={onProjectAdd}
                    onEditClick={onProjectEdit}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                    onPopoverCloseClick={onAddFormClose}
                />
            </Paper>
        </div >
    );
}

export default withStyles(ProjectListStyles)(ProjectList);
