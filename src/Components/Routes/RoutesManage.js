import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { SearchOutlined, DeleteTwoTone, ExclamationCircleOutlined, EditTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select }
    from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { Modal } from 'antd';
import axios from "axios";
import WcIcon from '@mui/icons-material/Wc';
import Box from '@mui/material/Box';
import '../tableStyle.css'
import AltRouteIcon from '@mui/icons-material/AltRoute';

import url from '../url'
import PropTypes from 'prop-types';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    DirectionsRenderer
} from "@react-google-maps/api";
const { Option } = Select;

const mapContainerStyle = {
    height: "300px",
    width: "100%",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = { lat: 56.002716, lng: -4.580081 }

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
function RoutesManage() {
    //Get API Axios
    const [data, setData] = useState([]);


    const [loading, setLoading] = useState(false);
    const getAllData1 = () => {
        axios.get(`${url}api/routes/getAllRoutesTypes`)
            .then((response) => {
                console.log("response.data");
                console.log(response.data.data);

                setDataLocationType(response.data.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData = () => {
        axios.get(`${url}api/routes/getRoutes`)
            .then((response) => {
                const allData = response.data.result;
                console.log(allData);
                setData(response.data.result);
                setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        getAllData1();
        setMarkers(
            {
                lat: 56.002716,
                lng: -4.580081
            }
        )
        setMarkersB(
            {
                lat: 56.00387929999999,
                lng: -4.576957
            }
        )

    }, []);
    const [LocationIdType, setLocationIdType] = React.useState('');
    const [LocationIdTypeEdit, setLocationIdTypeEdit] = React.useState('');


    const handleChange = (event) => {
        // setLocationIdType(event.target.value);
        setLocationIdType(event);

    };
    const handleChangeEdit = (event) => {
        setLocationIdTypeEdit(event.target.value);
    };
    // Add 
    function handleClick(event) {
        event.preventDefault();
        // navigate('/drawer');
        window.location.reload();

        console.info('You clicked a breadcrumb.');
    }
    const columns = [
        // {
        //     title: 'Name',
        //     width: '20%',
        //     key: 'locationName',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {record.name}
        //         </Space>
        //     ),
        // },
        {
            title: 'Route Type',
            width: '20%',
            key: 'routeType',
            render: (_, record) => (
                <Space size="middle">
                    {record.routeTypeId.routeType}
                </Space>

            ),
        },
        {
            title: 'Origin Coordinates',
            width: '20%',
            key: 'routeType',
            render: (_, record) => (
                <Space size="middle">
                    {record.pointA.location.coordinates}
                </Space>

            ),
        },
        {
            title: 'Destination Coordinates',
            width: '20%',
            key: 'routeType',
            render: (_, record) => (
                <Space size="middle">
                    {record.pointB.location.coordinates}
                </Space>

            ),
        },
        {
            title: 'Distance',
            width: '20%',
            key: 'distance',
            render: (_, record) => (
                <Space size="middle">
                    {record.distance}
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
                            onToggleView(record._id, record.routeTypeId._id, record.approxTime, record.distance, record.pointA.location.coordinates, record.pointB.location.coordinates)
                            // showModalAdd
                        }}
                    ><EditTwoTone style={iconFont} twoToneColor="green" /></a>


                </Space>

            ),
        },
    ];
    //   View 
    const [visibleView, setVisibleView] = useState(false);
    const [confirmLoadingView, setConfirmLoadingView] = useState(false);
    const [modalTextView, setModalTextView] = useState('Content of the modal');

    const showModalView = () => {
        setVisibleView(true);
    };

    const handleOkView = () => {
        setModalTextView('The modal will be closed after two seconds');
        setConfirmLoadingView(true);
        setTimeout(() => {
            setVisibleView(false);
            setConfirmLoadingView(false);
        }, 2000);
    };

    const handleCancelView = () => {
        // clearRoute()
        console.log('Clicked cancel button');
        setVisibleView(false);
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setAPlace('')
        setBPlace('')
        setpointAEdit('')
        setpointBEdit('')
    };
    const [editId, setEditId] = React.useState('')
    const onToggleView = async (id, routeType, time, distance, pointA, pointB) => {

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pointA[0]},${pointA[1]}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
            .then((response) => {
                const allData = response.data.results[0];
                console.log(allData);
                setMarkers(
                    {
                        lat: response.data.results[0].geometry.location.lat,
                        lng: response.data.results[0].geometry.location.lng
                    }
                )
                setpointAEdit(response.data.results[0].formatted_address)
                // Second API 
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pointB[0]},${pointB[1]}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
                    .then((response) => {
                        const allData = response.data.results[0];
                        console.log(allData);
                        setMarkersB(
                            {
                                lat: response.data.results[0].geometry.location.lat,
                                lng: response.data.results[0].geometry.location.lng
                            }
                        )
                        setpointBEdit(response.data.results[0].formatted_address)
                        // Other 
                        setEditId(id)
                        setapproxTimeEdit(time);
                        setrouteTypeEdit(routeType)
                        setdistanceCalculated(distance)
                        setmodeTravel("WALKING")



                    })
                    .catch(error => console.error(`Error:${error}`));

            })
            .catch(error => console.error(`Error:${error}`));

        //eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: pointAEdit,
            destination: pointBEdit,
            //eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode[modeTravel]
        })
        setDirectionsResponse(results)
        setVisibleView(true);


    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // Delete 
    const showDeleteConfirm = (IdData) => {
        confirm({
            title: 'Are you sure delete this Route?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                // Api 
                axios.delete(`${url}api/routes/deleteRoute/${IdData}`, { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        getAllData();
                    }).catch(err => {
                        console.log(err)
                    })
                console.log('OK');
                Modal.success({
                    content: 'Route Deleted Successfully',
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
    // Add 
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);

    const handleOkAdd = () => {
        if (markers === '' || LocationIdType === '' || distance === '') {
            Modal.success({
                content: 'Calculate Route Then Continue',
            });
        } else {
            axios.post(`${url}api/routes/createRoute`, {
                routeTypeId: LocationIdType,
                pointA: {
                    location: {
                        coordinates: [markers.lat, markers.lng]
                    }
                }, pointB: {
                    location: {
                        coordinates: [markersB.lat, markersB.lng]
                    }
                },
                distance: distance,
                approxTime: duration

            }, { headers }).then(response => {
                console.log(response)
                getAllData();
                setViewMapRoutes(false);
                setConfirmLoadingAdd(false);
                Modal.success({
                    content: 'Created Route Successfully',
                });
                setDirectionsResponse(null)
                setDistance('')
                setDuration('')
                setAPlace('')
                setBPlace('')
                setLocationIdType('')

            })
                .catch(err => {
                    console.log(err)
                })
        }
    };
    // View Map 
    const [viewMapRoutes, setViewMapRoutes] = useState(false);
    const [confirmMapAdd, setConfirmMapAdd] = useState(false);

    const showModalRoute = () => {
        setViewMapRoutes(true);
        setVisibleAdd(false)
    };

    const handleCancelMapRoute = () => {
        console.log('Clicked cancel button');
        setViewMapRoutes(false);
    };

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    //  const [markers, setMarkers] = React.useState([]);
    const [markersB, setMarkersB] = React.useState([]);
    const [APlace, setAPlace] = useState('')
    const [BPlace, setBPlace] = useState('')
    const [modeTravel, setmodeTravel] = useState('')

    // Map 
    async function calculateRoute() {
        setmodeTravel("WALKING")
        console.log(APlace)
        //eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: APlace,
            destination: BPlace,
            //eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode[modeTravel]
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    async function calculateRouteEdit() {
        setmodeTravel("WALKING")
        //eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const resultsA = await directionsService.route({
            origin: pointAEdit,
            destination: pointBEdit,
            //eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode[modeTravel]
        })
        console.log(resultsA)
        setDirectionsResponse(resultsA)
        setdistanceCalculated(resultsA.routes[0].legs[0].distance.text)
        setapproxTimeEdit(resultsA.routes[0].legs[0].duration.text)
    }
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setAPlace('')
        setBPlace('')
        setpointAEdit('')
        setpointBEdit('')
    }
    //   End 
    const handleOkUpdate = () => {
        axios.put(`${url}api/routes/updateRoute`, {
            routeId: editId,
            pointA: {
                location: {
                    coordinates: [markers.lat, markers.lng]
                }
            }

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            setVisibleView(false);
            setConfirmLoadingAdd(false);
            Modal.success({
                content: 'Updated Route Successfully',
            });


        })
            .catch(err => {
                console.log(err)
            })
    };

    const handleCancelAdd = () => {
        console.log('Clicked cancel button');
        setVisibleAdd(false);
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setAPlace('')
        setBPlace('')
        setpointAEdit('')
        setpointBEdit('')
    };
    const [dataLocationType, setDataLocationType] = useState([]);
    const [nameLocation, setnameLocation] = useState('');
    const [nameLocationEdit, setnameLocationEdit] = useState('');

    const [approxTimeEdit, setapproxTimeEdit] = useState('');
    const [distanceCalculated, setdistanceCalculated] = useState('');
    const [pointAEdit, setpointAEdit] = useState('');
    const [routeTypeEdit, setrouteTypeEdit] = useState('');

    const [pointBEdit, setpointBEdit] = useState('');



    // Google Map 
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk",
        libraries: ['places'],
    });
    const [markers, setMarkers] = React.useState([]);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return (
        <div style={{ marginBottom: '300px' }}>
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
                        <AltRouteIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Routes
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
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Routes</Typography>
                            </Item>
                            <Item>
                                <Button variant="contained" style={addbtn}
                                    onClick={showModalRoute}
                                >
                                    + Route
                                </Button>
                                <Modal
                                    width={850}
                                    title="Add Route"
                                    visible={visibleAdd}
                                    confirmLoading={confirmLoadingAdd}
                                    onCancel={handleCancelAdd}
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

                                        <Form.Item label="Name ">
                                            <Input value={nameLocation} placeholder="Enter Location Name"
                                                onChange={(e) => setnameLocation(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Location ">
                                            <Button type="primary" htmlType="submit" onClick={showModalRoute} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                                Select Route from Map
                                            </Button>

                                        </Form.Item>
                                        <div>
                                            {/* 
                                            <GoogleMap
                                                id="map"
                                                mapContainerStyle={mapContainerStyle}
                                                zoom={15}
                                                center={center}
                                                options={options}
                                                onClick={(e) => {
                                                    setMarkers(
                                                        {
                                                            lat: e.latLng.lat(),
                                                            lng: e.latLng.lng()
                                                        }
                                                    )

                                                }}
                                                onLoad={onMapLoad}
                                            >
                                                <Marker key="added" position={{ lat: markers.lat, lng: markers.lng }}

                                                />
                                            </GoogleMap> */}
                                        </div>

                                        <Form.Item label="Type" style={{ marginTop: '20px' }}
                                        >


                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button type="primary" htmlType="submit" onClick={handleOkAdd} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                                Submit
                                            </Button>
                                        </Form.Item>

                                    </Form>
                                </Modal>
                                {/* Map Modal  */}
                                <Modal
                                    width={850}
                                    title="Select Map Route"
                                    visible={viewMapRoutes}
                                    confirmLoading={confirmMapAdd}
                                    onCancel={handleCancelMapRoute}
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

                                        <Grid container spacing={2}>

                                            <Grid item xs={12} md={3}>
                                                Select Route Type:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    defaultValue=""
                                                    value={LocationIdType}
                                                    onChange={handleChange}
                                                >
                                                    <Option value=''>Select Route Type</Option>

                                                    {dataLocationType.map((row) => (
                                                        <Option value={row._id}>{row.routeType}</Option>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Location Name:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Input value={nameLocation} placeholder="Enter Location Name"
                                                    onChange={(e) => setnameLocation(e.target.value)
                                                    } />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Selected Start Route:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Input value={APlace}
                                                    disabled />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                Selected End Route:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Input value={BPlace}
                                                    disabled />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Selected Route Distance:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Input value={distance}
                                                    disabled />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Selected Route Duration:
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Input value={duration}
                                                    disabled />
                                            </Grid>


                                            <Grid item xs={12} md={3}>
                                                Route Mode:
                                            </Grid>
                                            <Grid item xs={12} md={9}>

                                                <Select style={{ width: '190px' }} disabled value="WALKING" onChange={(e) => { setmodeTravel(e) }} placeholder='Select Mode of Travel'>
                                                    <option value='DRIVING'>Driving </option>
                                                    <option value='WALKING'>Walking</option>
                                                    <option value='BICYCLING'>Bicycling</option>
                                                    <option value='TRANSIT'>Transit</option>

                                                </Select>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <Button onClick={clearRoute}>Clear Route</Button>
                                                <Button onClick={calculateRoute} style={{ backgroundColor: 'blue', color: 'white' }}>Calculate Route</Button>
                                                <Button onClick={() => map.panTo(center)} style={{ backgroundColor: 'orange', color: 'white' }}>Back to Center</Button>
                                                <Button style={{ backgroundColor: '#1a513b', color: 'white' }} onClick={handleOkAdd}>Save</Button>


                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <div>
                                                    <GoogleMap center={center} zoom={15}
                                                        mapContainerStyle={mapContainerStyle}
                                                        options={{
                                                            zoomControl: true,
                                                            streetViewControl: false,
                                                            mapTypeControl: false,
                                                            fullscreenControl: true
                                                        }}
                                                        onLoad={(map) => { setMap(map) }}
                                                    >
                                                        {/* Displaying Markers or directions */}
                                                        <Marker key="added" position={{ lat: markers.lat, lng: markers.lng }} label="A Marker" draggable={true} onDragEnd={(e) => {

                                                            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
                                                                .then((response) => {
                                                                    const allData = response.data.results[0];
                                                                    console.log(allData);
                                                                    setMarkers(
                                                                        {
                                                                            lat: response.data.results[0].geometry.location.lat,
                                                                            lng: response.data.results[0].geometry.location.lng
                                                                        }
                                                                    )
                                                                    setAPlace(response.data.results[0].formatted_address)

                                                                })
                                                                .catch(error => console.error(`Error:${error}`));
                                                            // )
                                                            // console.log(markers.lat)
                                                            // console.log(markers.lng)
                                                        }} />
                                                        <Marker key="addedB" position={{ lat: markersB.lat, lng: markersB.lng }} label="B Marker" draggable={true} onDragEnd={(e) => {

                                                            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
                                                                .then((response) => {
                                                                    const allData = response.data.results[0];
                                                                    console.log(allData);
                                                                    setMarkersB(
                                                                        {
                                                                            lat: response.data.results[0].geometry.location.lat,
                                                                            lng: response.data.results[0].geometry.location.lng
                                                                        }
                                                                    )
                                                                    setBPlace(response.data.results[0].formatted_address)


                                                                })
                                                                .catch(error => console.error(`Error:${error}`));
                                                            // )
                                                            // console.log(markers.lat)
                                                            // console.log(markers.lng)
                                                        }} />
                                                        {/* <Marker position={center} /> */}

                                                        {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}

                                                    </GoogleMap>
                                                </div>

                                            </Grid>


                                        </Grid>

                                    </Form>
                                </Modal>

                            </Item>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className='tableResponsive'>
                            <Table columns={columns} dataSource={data} />
                        </div>
                        <Modal
                            title="Routes Details"
                            visible={visibleView}
                            // onOk={handleOkView}
                            confirmLoading={confirmLoadingView}
                            onCancel={handleCancelView}
                            footer={null}
                            width={850}
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
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={3}>
                                        Select Route Type:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Select
                                            style={{ width: '100%' }}
                                            defaultValue=""
                                            value={routeTypeEdit}
                                            onChange={(e) => { setrouteTypeEdit(e) }}
                                        >
                                            <Option value=''>Select Route Type</Option>

                                            {dataLocationType.map((row) => (
                                                <Option value={row._id}>{row.routeType}</Option>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        Location Name:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input value={nameLocation} placeholder="Enter Location Name"
                                            onChange={(e) => setnameLocation(e.target.value)
                                            } />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        Selected Start Route:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input value={pointAEdit}
                                            disabled />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        Selected End Route:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input value={pointBEdit}
                                            disabled />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        Selected Route Distance:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input value={distanceCalculated}
                                            disabled />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        Selected Route Duration:
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Input value={approxTimeEdit}
                                            disabled />
                                    </Grid>


                                    <Grid item xs={12} md={3}>
                                        Route Mode:
                                    </Grid>
                                    <Grid item xs={12} md={9}>

                                        <Select style={{ width: '190px' }} disabled value="WALKING" onChange={(e) => { setmodeTravel(e) }} placeholder='Select Mode of Travel'>
                                            <option value='DRIVING'>Driving </option>
                                            <option value='WALKING'>Walking</option>
                                            <option value='BICYCLING'>Bicycling</option>
                                            <option value='TRANSIT'>Transit</option>

                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Button onClick={clearRoute}>Clear Route</Button>
                                        <Button onClick={calculateRouteEdit} style={{ backgroundColor: 'blue', color: 'white' }}>Calculate Route</Button>
                                        <Button onClick={() => map.panTo(center)} style={{ backgroundColor: 'orange', color: 'white' }}>Back to Center</Button>
                                        <Button style={{ backgroundColor: '#1a513b', color: 'white' }} onClick={handleOkUpdate}>Update</Button>


                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <div>
                                            <GoogleMap center={center} zoom={15}
                                                mapContainerStyle={mapContainerStyle}
                                                options={{
                                                    zoomControl: true,
                                                    streetViewControl: false,
                                                    mapTypeControl: false,
                                                    fullscreenControl: true
                                                }}
                                                onLoad={(map) => { setMap(map) }}
                                            >
                                                {/* Displaying Markers or directions */}
                                                <Marker key="added" position={{ lat: markers.lat, lng: markers.lng }} label="A Marker" draggable={true} onDragEnd={(e) => {

                                                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
                                                        .then((response) => {
                                                            const allData = response.data.results[0];
                                                            console.log(allData);
                                                            setMarkers(
                                                                {
                                                                    lat: response.data.results[0].geometry.location.lat,
                                                                    lng: response.data.results[0].geometry.location.lng
                                                                }
                                                            )
                                                            setpointAEdit(response.data.results[0].formatted_address)

                                                        })
                                                        .catch(error => console.error(`Error:${error}`));
                                                    // )
                                                    // console.log(markers.lat)
                                                    // console.log(markers.lng)
                                                }} />
                                                <Marker key="addedB" position={{ lat: markersB.lat, lng: markersB.lng }} label="B Marker"
                                                />
                                                {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}

                                            </GoogleMap>
                                        </div>

                                    </Grid>


                                </Grid>
                            </Form>
                        </Modal>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default RoutesManage
