import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, EyeTwoTone, DeleteTwoTone, ExclamationCircleOutlined,EditTwoTone  } from '@ant-design/icons';
import { Button, Input, Space, Table, Form } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { Modal } from 'antd';
import Box from '@mui/material/Box';
import ParkIcon from '@mui/icons-material/Park';
import '../tableStyle.css'
import PropTypes from 'prop-types';
import GridDashboardWelcome from '../Dashboard/GridDashboardWelcome';
const { confirm } = Modal;
const iconFont = {
    fontSize: '20px'
}
const marginTop = {
    marginTop: '10px'
}
function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'transparent' : 'transparent'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'black'),
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'white' : 'white',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};
function ManageWelcome() {
   
    // Add 
    function handleClick(event) {
        event.preventDefault();
        window.location.reload();

        console.info('You clicked a breadcrumb.');
    }

    return (
        <div >
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        onClick={handleClick}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <ParkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Welcome
                    </Link>
                </Breadcrumbs>
            </div>
            <div style={marginTop}>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={12}>
                        <Box
                            sx={{ display: 'flex', p: 1, bgcolor: 'transparent', borderRadius: 1 }}
                        >
                            <Item sx={{ flexGrow: 2 }}>
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Titles</Typography>
                            </Item>
                         
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={12}><GridDashboardWelcome/></Grid>
                  

                </Grid>


            </div>
        </div>
    )
}

export default ManageWelcome
