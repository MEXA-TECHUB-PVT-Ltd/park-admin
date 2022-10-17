import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import {  Space, Table, Select,Badge, Modal, Tabs, Card }
    from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import axios from "axios";
import ParkIcon from '@mui/icons-material/Park';
import Box from '@mui/material/Box';
import '../tableStyle.css'
import url from '../url'
import PropTypes from 'prop-types';

const { confirm } = Modal;

const iconFont = {
    fontSize: '20px'
}

const marginTop = {
    marginTop: '10px'
}
const addbtn = {
    height: '50px',
    borderRadius: '20px',
    backgroundColor: '#1A513B',
    color: 'white',
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
function CarParkingSpace() {
    //Get API Axios
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);



    const getAllData1 = () => {
        axios.get(`${url}api/parking/getOnlyParkedCars`)
            .then((response) => {
                const allData = response.data.data;
                console.log(allData);
                setData1(response.data.data);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData = () => {
        axios.get(`${url}api/parking/getParkings`)
            .then((response) => {
                const allData = response.data.data;
                console.log(allData);
                setData(response.data.data);
            })
            .catch(error => console.error(`Error:${error}`));

    }

    useEffect(() => {
        getAllData();
        getAllData1();

    }, []);
    // Add 
    function handleClick(event) {
        event.preventDefault();
        // navigate('/drawer');
        window.location.reload();

        console.info('You clicked a breadcrumb.');
    }

    const columns = [
        {
            title: 'Car Plate Number',
            width: '20%',
            key: 'carPlateNumber',
            render: (_, record) => (
                <Space size="middle">
                    {record.plateNumber}
                </Space>
            ),
        },
        {
            title: 'Car Color',
            width: '20%',
            key: 'location',
            render: (_, record) => (
                <Space size="middle">
                    {record.carColor}
                </Space>
            ),
        },
        {
            title: 'Parking Time',
            width: '20%',
            key: 'totalParkingTime',
            render: (_, record) => (
                <Space size="middle">
                    {record.totalParkingTime}
                </Space>
            ),
        },
        {
            title: 'UnPark Time',
            width: '20%',
            key: 'unParkTime',
            render: (_, record) => (
                <Space size="middle">
                    {record.unParkTime}
                </Space>
            ),
        },
        {
            title: 'Lane No',
            width: '20%',
            key: 'lane_number',
            render: (_, record) => (
                <Space size="middle">
                    {record.lane_number}
                </Space>
            ),
        },
        {
            title: 'Park Time',
            width: '20%',
            key: 'parkTime',
            render: (_, record) => (
                <Space size="middle">
                    {record.parkTime}
                </Space>
            ),
        },
        {
            title: 'Parked Now',
            width: '20%',
            key: 'parkTime',
            render: (_, record) => (
                <Space size="middle">
                    {record.isParked? 
                   <Badge
                   className="site-badge-count-109"
                   count="Yes"
                   style={{
                     backgroundColor: '#52c41a',
                   }}
                 />
                    : <Badge
                    className="site-badge-count-109"
                    count="No"
                    style={{
                      backgroundColor: 'red',
                    }}
                  />}
                </Space>
            ),
        },
        {
            title: 'Action',
            width: '20%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a
                        onClick={() => {
                            // console.log(row._id)
                            deleteData(record._id)
                        }}
                    ><DeleteTwoTone style={iconFont} twoToneColor="red" /></a>
                   


                </Space>

            ),
        },
    ];
    const headers = {
        'Content-Type': 'application/json'
    }
    // Delete 
    const showDeleteConfirm = (IdData) => {
        confirm({
            title: 'Are you sure delete this Car Parked?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                // Api 
                axios.delete(`${url}api/parking/deleteParking/${IdData}`, { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        getAllData();
                    }).catch(err => {
                        console.log(err)
                    })
                console.log('OK');
                Modal.success({
                    content: 'Parking Car Deleted Successfully',
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const deleteData = (IdData) => {
        console.log(IdData)
        showDeleteConfirm(IdData)
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
                        Car Parking Space
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
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Car Parking Space</Typography>
                            </Item>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card title="Total Parking Space" size="small">
                            {data.length}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card title="Total Parked Cars" size="small">
                            {data1.length}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Tabs defaultActiveKey="1" centered type="card">
                            <Tabs.TabPane tab="All Parkings" key="1">
                                <div className='tableResponsive'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Car Parked Now" key="2">
                                <div className='tableResponsive'>
                                    <Table columns={columns} dataSource={data1} />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default CarParkingSpace
