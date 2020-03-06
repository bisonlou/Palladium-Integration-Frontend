import React, { useState, useEffect } from 'react';

// 3rd party components
import {
    Popover, withStyles, Tabs, Tab
} from '@material-ui/core';

// custom components
import StationeryList from './StationeryList';
import TabPanel from '../TabPanel';
import StationeryRequisition from './StationeryRequisition';
import {ExcelRenderer} from 'react-excel-renderer';

// styles
import StationeryStyles from './stationeryStyles';

// utils
import { BASE_URL, formatDate, getSessionInfo } from '../../utils';


const StationeryRequisitionListing = ({
    open,
    classes,
    handleClose
}) => {
    const initialRequisition = {
        id: 0,
        name: '',
        requisition_date: formatDate(Date()),
        details: []
    }

    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [stationery, setStationery] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [requisitions, setRequisitions] = useState([]);
    const [showAddStationeryForm, setShowAddStationeryForm] = useState(false);
    const [showUploadStationeryForm, setShowUploadStationeryForm] = useState(false);
    const [showAddRequisitionForm, setShowAddRequisitionForm] = useState(false);
    const [item, setItem] = useState({
        id: 0,
        name: '',
        description: ''
    });
    const [requisition, setRequisition] = useState(initialRequisition);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const [success, setSuccess] = useState({
        isSuccess: false,
        message: ''
    });


    useEffect(() => {
        fetchStationery();
        fetchStationeryRequisitions();
    }, [])

    const fetchStationery = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/stationery`)
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setStationery(data['data'])
                } else {
                    setIsLoading(false);
                    setError({ isError: true, message: data['description'] });
                }
            })
            .catch(error => {
                setIsLoading(false);
                setError({ isError: true, message: "unable to fetch stationery listing!" });
            })
    };

    const fetchStationeryRequisitions = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/stationery_requisitions`)
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setRequisitions(data['data'])
                } else {
                    setIsLoading(false);
                    setError({ isError: true, message: data['description'] });
                }
            })
            .catch(error => {
                setIsLoading(false);
                setError({ isError: true, message: "Unable to fetch stationery requisitions!" });
            })
    };


    const handleItemAdd = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/stationery`,
            {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setStationery([...stationery, item]);
                    setItem({
                        id: 0,
                        name: '',
                        description: ''
                    });
                    setSuccess({ isSuccess: true, message: "Item successfuly added!" });
                    fetchStationery();
                } else {
                    setIsLoading(false);
                    setError({ isError: true, message: data['description'] });
                }
            })
            .catch(error => {
                setIsLoading(false);
                setError({ isError: true, message: "unable to complete transaction!" });
            })
    };

    const handleRequisitionAdd = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/stationery_requisitions`,
            {
                method: "POST",
                body: JSON.stringify(requisition),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getSessionInfo('token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setStationery([...stationery, item]);
                    setRequisition(initialRequisition);
                    setShowAddRequisitionForm(false);
                    fetchStationeryRequisitions();
                } else {
                    setIsLoading(false);
                    setError({ isError: true, message: data['description'] });
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
                // setError({ isError: true, message: "unable to complete transaction!" });
            })
    };

    const handleAddRequisitionRow = (detail) => {
        const currentRequisition = { ...requisition };
        currentRequisition.details.push(detail);

        setRequisition(currentRequisition);
    };

    const handleDeleteRequisitionRow = (oldData) => {
        const currentRequisition = { ...requisition };
        const details = currentRequisition.details;

        const newDetails = details.filter(detail => detail.item_id !== oldData.item_id);
        currentRequisition.details = newDetails

        setRequisition(currentRequisition);
    };

    const handleItemEdit = () => {
        fetch(
            `${BASE_URL}/stationery/${item.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setStationery(stationery.map(i => {
                        if (i.id === item.id) {
                            i.name = item.name;
                            i.description = item.description;
                        }

                        return i;
                    }));
                    fetchStationery();
                } else {
                    setError({
                        isError: true,
                        message: 'Edit failed!'
                    })
                }
            })
            .catch(error => setError({
                isError: true,
                message: 'Could not perform operation!'
            }))
    };

    const handleRequisitionEdit = () => {
        fetch(
            `${BASE_URL}/stationery_requisitions/${requisition.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(requisition),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getSessionInfo('token')}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setShowAddRequisitionForm(false);
                    fetchStationeryRequisitions();
                } else {
                    setError({
                        isError: true,
                        message: 'Requisition Edit failed!'
                    })
                }
            })
            .catch(error => setError({
                isError: true,
                message: 'Could not perform operation!'
            }))
    };

    const handleItemDelete = (selected_items) => {
        selected_items.forEach(item => {
            fetch(
                `${BASE_URL}/stationery/${item.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => response.json())
                .then(data => {
                    if (data['success'] === true) {
                        setStationery(stationery.filter(i => i.id !== item.id));
                        fetchStationery();
                    } else {
                        setError({
                            isError: true,
                            message: 'Delete failed!'
                        })
                    }
                })
                .catch(error => setError({
                    isError: true,
                    message: 'Could not perform operation!'
                }))
        });
    };

    const handleRequisitionDelete = (selected_requisitions) => {
        selected_requisitions.forEach(requisition => {
            fetch(
                `${BASE_URL}/stationery_requisitions/${requisition.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => response.json())
                .then(data => {
                    if (data['success'] === true) {
                        setRequisitions(requisitions.filter(r => r.id !== requisition.id));
                        fetchStationeryRequisitions();
                    } else {
                        setError({
                            isError: true,
                            message: 'Delete failed!'
                        })
                    }
                })
                .catch(error => setError({
                    isError: true,
                    message: 'Could not perform operation!'
                }))
        });
    };

    const handleBulkUpload = event => {
        fetch(`${BASE_URL}/stationery_uploads`, {
            method: 'POST',
            body: JSON.stringify({ 'items': excelData }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setSuccess({ isSuccess: true, message: "items uploaded successfuly"});
                }
                else {
                    setError({isError: true, message: "upload failed"});
                }
            })
            .catch(error => console.log('-->', error))
    }


    const handleEditItemClick = item => {
        setItem({
            id: item.id,
            name: item.name,
            description: item.description
        });

        setShowAddStationeryForm(true);
    };

    const handleEditRequisitionClick = requisition => {
        setRequisition(requisition);
        setShowAddRequisitionForm(true);
    };

    const handleShowAddFormClick = () => {
        setShowAddStationeryForm(true);
    };

    const handleShowUploadFormClick = () => {
        setShowUploadStationeryForm(true);
    };

    const handleShowAddRequisitionFormClick = () => {
        setRequisition(initialRequisition);
        setShowAddRequisitionForm(true);
    }

    const handleAddStationeryFormClose = () => {
        setShowAddStationeryForm(false);
    };

    const handleUploadStationeryFormClose = () => {
        setShowUploadStationeryForm(false);
    };

    const handleAddRequisitionFormClose = () => {
        setShowAddRequisitionForm(false);
    };

    const handleSnackBarClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError({
            'isError': false,
            'message': ''
        });

        setSuccess({
            'isSuccess': false,
            'message': ''
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setItem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleValueChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFileChange = event => {
        const fileObj = event.target.files[0];

        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                const data = [];

                for (let i = 1; i < resp.rows.length; i++) {
                    data.push({
                        'name': resp.rows[i][0],
                        'description': resp.rows[i][1],
                    });
                }
                setExcelData(data);
            }
        });
    };


    return (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 100, left: 300 }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleValueChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Stationery" />
                    <Tab label="Requisitions" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <StationeryList
                        item={item}
                        error={error}
                        success={success}
                        isLoading={isLoading}
                        stationery={stationery}
                        showAddForm={showAddStationeryForm}
                        showUploadForm={showUploadStationeryForm}
                        onItemAdd={handleItemAdd}
                        onUpload={handleBulkUpload}
                        onItemEdit={handleItemEdit}
                        onHandleChange={handleChange}
                        onFileChange={handleFileChange}
                        handlePopperClose={handleClose}
                        onItemDelete={handleItemDelete}
                        onAddFormClose={handleAddStationeryFormClose}
                        onUploadFormClose={handleUploadStationeryFormClose}
                        onSnackBarClose={handleSnackBarClose}
                        onItemEditClick={handleEditItemClick}
                        onShowAddFormClick={handleShowAddFormClick}
                        onShowUploadFormClick={handleShowUploadFormClick}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <StationeryRequisition
                        error={error}
                        success={success}
                        isLoading={isLoading}
                        stationery={stationery}
                        requisition={requisition}
                        requisitions={requisitions}
                        onHandleChange={handleChange}
                        handlePopperClose={handleClose}
                        onRowAdd={handleAddRequisitionRow}
                        showAddForm={showAddRequisitionForm}
                        onSnackBarClose={handleSnackBarClose}
                        onRequisitionAdd={handleRequisitionAdd}
                        onRowDelete={handleDeleteRequisitionRow}
                        onRequisitionEdit={handleRequisitionEdit}
                        onRequisitionDelete={handleRequisitionDelete}
                        onAddFormClose={handleAddRequisitionFormClose}
                        onRequsitionEditClick={handleEditRequisitionClick}
                        onShowAddRequisitionClick={handleShowAddRequisitionFormClick}
                    />
                </TabPanel>
            </div>
        </Popover >
    );
};

export default withStyles(StationeryStyles)(StationeryRequisitionListing);
