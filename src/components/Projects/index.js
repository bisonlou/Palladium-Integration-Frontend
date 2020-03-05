import React, { useState, useEffect } from 'react';

// 3rd party components
import {
    Popover, withStyles, Tabs, Tab, Typography, Box
} from '@material-ui/core';

// custom components
import ProjectList from './ProjectList';

// styles
import ProjectStyles from './projectStyles';

// utils
import { BASE_URL, formatDate, dateToString } from '../../utils';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const Projects = ({
    open,
    classes,
    handleClose
}) => {
    const initialProject = {
        id: 0,
        project_name: "",
        country: "",
        client_name: "",
        contact_person_name: "",
        contact_person_title: "",
        contact_person_tel: "",
        start_date: formatDate(Date()),
        end_date: formatDate(Date()),
        contract_value: 0.00,
        staff_months: 0.0,
        consultant_months: 0.0,
        senior_proffesional: "",
        project_description: "",
        service_description: "",
            
        associate_consultants: [{
            name: ""
        }]
    }

    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    const [project, setProject] = useState(initialProject);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const [success, setSuccess] = useState({
        isSuccess: false,
        message: ''
    });


    useEffect(() => {
        fetchProjects();
    }, [])

    const fetchProjects = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/projects`)
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setProjects(data['data'])
                } else {
                    setIsLoading(false);
                    setError({ isError: true, message: data['description'] });
                }
            })
            .catch(error => {
                setIsLoading(false);
                setError({ isError: true, message: "unable to fetch project listing!" });
            })
    };

    const handleProjectAdd = () => {
        setIsLoading(true);

        fetch(`${BASE_URL}/projects`,
            {
                method: "POST",
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    setIsLoading(false);
                    setProjects([...projects, project]);
                    setProject(initialProject);
                    setSuccess({ isSuccess: true, message: "Project successfuly added!" });
                    fetchProjects();
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


    const handleProjectEdit = () => {
        fetch(
            `${BASE_URL}/projects/${project.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data['success'] === true) {
                    fetchProjects();
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

    const handleProjectDelete = (selected_projects) => {
        selected_projects.forEach(project => {
            fetch(
                `${BASE_URL}/projects/${project.id}`,
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
                        setProjects(projects.filter(p => p.id !== project.id));
                        fetchProjects();
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

    const handleEditProjectClick = project => {
        const { project_name, country, client_name, contact_person_name,
            contact_person_title, contact_person_tel, start_date, end_date,
            contract_value, staff_months, senior_proffesional, associate_consultants
        } = project;

        setProject({
            project_name: project_name,
            country: country,
            client_name: client_name,
            contact_person_name: contact_person_name,
            contact_person_title: contact_person_title,
            contact_person_tel: contact_person_tel,
            start_date: start_date,
            end_date: end_date,
            contract_value: contract_value,
            staff_months: staff_months,
            senior_proffesional: senior_proffesional,
            associate_consultants: associate_consultants
        });

        setShowAddProjectForm(true);
    };

    const handleShowAddFormClick = () => {
        setShowAddProjectForm(true);
    };

    const handleAddProjectFormClose = () => {
        setShowAddProjectForm(false);
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
        setProject(prevState => ({ ...prevState, [name]: value }));
    };

    const handleStartDateChange = date => {
        setProject(prevState => ({ ...prevState, start_date: dateToString(date) }));
    };

    
    const handleEndDateChange = date => {
        setProject(prevState => ({ ...prevState, end_date: dateToString(date) }));
    };

    const handleValueChange = (event, newValue) => {
        setValue(newValue);
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
                    <Tab label="Projects" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    <ProjectList
                        error={error}
                        project={project}
                        success={success}
                        projects={projects}
                        isLoading={isLoading}
                        onHandleChange={handleChange}
                        onProjectAdd={handleProjectAdd}
                        handlePopperClose={handleClose}
                        showAddForm={showAddProjectForm}
                        onProjectEdit={handleProjectEdit}
                        onEndDateChange={handleEndDateChange}
                        onProjectDelete={handleProjectDelete}
                        onSnackBarClose={handleSnackBarClose}
                        onStartDateChange={handleStartDateChange}
                        onAddFormClose={handleAddProjectFormClose}
                        onProjectEditClick={handleEditProjectClick}
                        onShowAddFormClick={handleShowAddFormClick}
                    />
                </TabPanel>
            </div>
        </Popover >
    );
};

export default withStyles(ProjectStyles)(Projects);
