import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select, Modal, Tabs, Card }
    from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import axios from "axios";
import WcIcon from '@mui/icons-material/Wc';
import Box from '@mui/material/Box';
import '../tableStyle.css'
import url from '../url'
import PropTypes from 'prop-types';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
const { Option } = Select;

const libraries = ["places"];
const mapContainerStyle = {
    height: "300px",
    width: "470px",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 43.6532,
    lng: -79.3832,
};

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



    const [loading, setLoading] = useState(false);
    const getAllData1 = () => {
        axios.get(`${url}api/parking/getOnlyParkedCars`)
            .then((response) => {
                const allData = response.data.data;
                console.log(allData);
                setData1(response.data.data);
                setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData = () => {
        axios.get(`${url}api/parking/getParkings`)
            .then((response) => {
                const allData = response.data.data;
                console.log(allData);
                setData(response.data.data);
                setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [capacity, setCapacity] = useState([]);

    const getAllDataCapacity = () => {
        axios.get(`${url}api/parkCapacity/getParkingCapacity`)
            .then((response) => {
                const allData = response.data.result[0];
                console.log(allData);
                setCapacity(response.data.result[0].capacity);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        getAllData1();
        getAllDataCapacity();

    }, []);
    const [LocationIdType, setLocationIdType] = React.useState('');
    // Add 
    function handleClick(event) {
        event.preventDefault();
        // navigate('/drawer');
        window.location.reload();

        console.info('You clicked a breadcrumb.');
    }
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };



    const columns = [
        {
            title: 'Car Plate Number',
            width: '20%',
            key: 'carPlateNumber',
            render: (_, record) => (
                <Space size="middle">
                    {record.carPlateNumber}
                </Space>
            ),
        },
        {
            title: 'Location Address',
            width: '20%',
            key: 'location',
            render: (_, record) => (
                <Space size="middle">
                    {record.location.coordinates}
                </Space>
            ),
        },
        {
            title: 'Comment',
            width: '20%',
            key: 'comment',
            render: (_, record) => (
                <Space size="middle">
                    {record.comment}
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
                    <a
                        onClick={() => {
                            // console.log(row._id)
                            onToggleView(record._id, record.userId, record.location.coordinates, record.carPlateNumber, record.comment)
                            // showModalAdd
                        }}
                    ><EyeTwoTone style={iconFont} twoToneColor="green" /></a>


                </Space>

            ),
        },
    ];
    //   View 
    const [visibleView, setVisibleView] = useState(false);
    const [confirmLoadingView, setConfirmLoadingView] = useState(false);

    const handleCancelView = () => {
        console.log('Clicked cancel button');
        setVisibleView(false);
    };
    const [editId, setEditId] = React.useState('')
    const [plateNo, setPlateNo] = React.useState('')
    const [showContact, setshowContact] = useState(false);


    const onToggleView = async (id, userId, coordinates, carPlateNo, comment) => {
        setEditId(id)
        console.log(id);
        console.log(userId);
        console.log(coordinates[0]);
        console.log(carPlateNo);
        setPlateNo(carPlateNo)
        setcommentEdit(comment);
        setMarkers(
            {
                lat: coordinates[0],
                lng: coordinates[1]
            }
        );
        // setLocationIdTypeEdit(locationType);
        setVisibleView(true);
    }
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
    const [commentEdit, setcommentEdit] = useState('');
    // Google Map 
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk",
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    // Modal Capacity Edit 

    const showModalContact = () => {
        console.log("True")
        setshowContact(true);
    };

    const handleOkContact = () => {
        axios.post(`${url}api/parkCapacity/addCapacity`, {
            capacity: capacity

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            getAllData1();
            setshowContact(false);
            Modal.success({
                content: 'Updated Capacity Successfully',
            });

        })
            .catch(err => {
                console.log(err)
            })
    };

    const handleCancelContact = () => {
        setshowContact(false);
    };
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
                        <WcIcon sx={{ mr: 0.5 }} fontSize="inherit" />
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
                    <Grid item xs={12} md={4}>
                        <Card title="Car Parking Capacity" size="small">

                            <Grid container spacing={2} >

                                <Grid item xs={11} md={11}>
                                    {capacity}

                                </Grid>
                                <Grid item xs={1} md={1}>
                                    <EditTwoTone
                                        onClick={showModalContact}
                                    />
                                    {/* Contact  */}
                                    <Modal
                                        title="Edit Car Parking Space Capacity"
                                        open={showContact}
                                        visible={showContact}
                                        // //    confirmLoading={confirmLoadingAdd}
                                        onCancel={handleCancelContact}
                                        footer={null}
                                    >
                                        <Form
                                            labelCol={{
                                                span: 4,
                                            }}
                                            wrapperCol={{
                                                span: 14,
                                            }}
                                            layout="horizontal"
                                        >

                                            <Form.Item label="Capacity ">
                                                <Input
                                                    value={capacity} placeholder="Enter Capacity"
                                                    onChange={(e) => setCapacity(e.target.value)
                                                    }
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{
                                                    offset: 8,
                                                    span: 16,
                                                }}
                                            >
                                                <Button type="primary" htmlType="submit" onClick={handleOkContact} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                                    Save
                                                </Button>
                                            </Form.Item>


                                        </Form>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card title="Total Parking Space" size="small">
                            {data.length}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card title="Total Parked Cars" size="small">
                            {data1.length}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Tabs defaultActiveKey="1" centered type="card">
                            <Tabs.TabPane tab="Parking Space" key="1">
                                <div className='tableResponsive'>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                                <Modal
                                    title="Car Parking Details"
                                    visible={visibleView}
                                    // onOk={handleOkView}
                                    confirmLoading={confirmLoadingView}
                                    onCancel={handleCancelView}
                                    footer={null}
                                >
                                    <Form
                                        labelCol={{
                                            span: 4,
                                        }}
                                        wrapperCol={{
                                            span: 14,
                                        }}
                                        layout="horizontal"
                                    >
                                        <Form.Item label="Comment ">
                                            <Input value={commentEdit} disabled placeholder="Enter Location Name"
                                                onChange={(e) => setcommentEdit(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Plate No">
                                            <Input value={plateNo} disabled placeholder="Enter Location Name"
                                                onChange={(e) => setPlateNo(e.target.value)
                                                } />
                                        </Form.Item>

                                        <Form.Item label="Location ">
                                        </Form.Item>
                                        <div>
                                            <GoogleMap
                                                id="map"
                                                mapContainerStyle={mapContainerStyle}
                                                zoom={15}
                                                center={markers}
                                                options={options}
                                                onLoad={onMapLoad}
                                            >
                                                <Marker key="added" position={markers}
                                                />
                                            </GoogleMap>
                                        </div>
                                    </Form>
                                </Modal>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Car Parked" key="2">
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
