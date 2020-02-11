import React from 'react';

// 3rd party components
import {
    Popover, withStyles,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// custom components
import StationeryList from './StationeryList';

// styles
import StationeryStyles from './stationeryStyles';


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

const Stationery = ({
    open,
    classes
}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
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
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Staionery"  />
                    <Tab label="Applications"  />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <StationeryList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography>Item Two</Typography>
                    <Typography>Item Two</Typography>
                    <Typography>Item Two</Typography>
                    <Typography>Item Two</Typography>
                </TabPanel>
            </div>
        </Popover >
    );
};

export default withStyles(StationeryStyles)(Stationery);
