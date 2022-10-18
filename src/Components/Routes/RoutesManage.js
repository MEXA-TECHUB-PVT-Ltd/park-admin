import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { SearchOutlined, DeleteTwoTone, ExclamationCircleOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select, Upload, Image }
    from 'antd';
import PetsIcon from '@mui/icons-material/Pets';

import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { Modal } from 'antd';
import axios from "axios";
import RouteIcon from '@mui/icons-material/Route';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import Box from '@mui/material/Box';
import '../tableStyle.css'
import url from '../url'
import googleMapsApiKey from '../mapKey'
import ClipLoader from "react-spinners/ClipLoader";
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
    cursor: 'pointer',
    // borderRadius: '20px',
    backgroundColor: '#1A513B',
    color: 'white',
}
const override = {
    display: ' block',
    margin: '0 auto',
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
    const [loading1, setLoading1] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllData = () => {
        axios.get(`${url}api/location/getLocationByTypeWithOnePic/?type=walking-route`)
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setData(response.data.result);
                setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        setMarkers(
            {
                lat: 43.6532,
                lng: -79.3832,
            }
        )

    }, []);
    const [LocationIdType, setLocationIdType] = React.useState('');
    const [LocationIdTypeEdit, setLocationIdTypeEdit] = React.useState('');


    const handleChange = (event) => {
        // setLocationIdType(event.target.value);
        setLocationIdType(event);

    };

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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        // {
        //     title: 'Image',
        //     width: '20%',
        //     key: 'title',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Image
        //                 width={100}
        //                 src={record.images[0].image_url}
        //             />
        //         </Space>
        //     ),
        // },
        {
            title: 'Title',
            width: '20%',
            key: 'title',
            render: (_, record) => (
                <Space size="middle">
                    {record.title}
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
            title: 'Avg Time',
            width: '20%',
            key: 'avg_time',
            render: (_, record) => (
                <Space size="middle">
                    {record.avg_time}
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
                            onToggleView(record._id, record.location.coordinates)
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
    const handleCancelView = () => {
        console.log('Clicked cancel button');
        setVisibleView(false);
    };
    const [editId, setEditId] = React.useState('')
    const onToggleView = async (id, coordinates) => {
        setMarkers(
            {
                lat: coordinates[0],
                lng: coordinates[1]
            }
        );
        await axios.get(`${url}api/location/getLocationById/${id}`
            , { headers }).then(response => {
                console.log('response')
                console.log(response.data)

                console.log(coordinates[0]);
                setEditId(response.data.data._id)
                setImagesEdit(response.data.data.images)
                setnameLocationEdit(response.data.data.title);
                setDistanceEdit(response.data.data.distance)
                setavg_timeEdit(response.data.data.avg_time)
                setdescriptionEdit(response.data.data.description)
                setDisplay(true)
                setVisibleView(true);
                // console.log(response.data.data.images)


            })
            .catch(err => {
                console.log(err)
            })

        // setVisibleView(true);
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // Delete 
    const showDeleteConfirm = (IdData) => {
        confirm({
            title: 'Are you sure delete this Walking Route?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                // Api 
                axios.delete(`${url}api/location/deleteLocation/${IdData}`, { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        getAllData();
                    }).catch(err => {
                        console.log(err)
                    })
                console.log('OK');
                Modal.success({
                    content: 'Walking Route Deleted Successfully',
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
    const [nameLocation, setnameLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setdescription] = useState('');
    const [display, setDisplay] = useState(true);

    const [avg_time, setavg_time] = useState('');
    const [nameLocationEdit, setnameLocationEdit] = useState('');
    const [imagesEdit, setImagesEdit] = useState([]);
    const [images, setImages] = useState([]);
    const [distanceEdit, setDistanceEdit] = useState('');
    const [avg_timeEdit, setavg_timeEdit] = useState('');
    const [descriptionEdit, setdescriptionEdit] = useState('');
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [confirmLoadingAdd, setConfirmLoadingAdd] = useState(false);
    const showModalAdd = () => {
        setVisibleAdd(true);
    };

    const handleOkAdd = () => {
        console.log(images)
        const coordinates = {
            "coordinates": [markers.lat, markers.lng]
        }
        let formData = new FormData();
        console.log("coordinates");
        console.log(coordinates);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        formData.append('type', 'walking-route');
        formData.append('location', JSON.stringify(coordinates));
        formData.append('title', nameLocation);
        formData.append('description', description);
        formData.append('distance', distance);
        formData.append('avg_time', avg_time);
        console.log(formData)
        var config = {
            method: 'post',
            url: url + 'api/location/createLocation',
            headers: {
                'Content-Type': `multipart/form-data`,
            },
            data: formData
        };
        axios(config)
            .then(function (response) {
                console.log(response.data);
                setVisibleAdd(false);
                getAllData();
                Modal.success({
                    content: 'Added Walking Route Successfully',
                });
            })
    };
    const handleOkUpdate = () => {
        console.log(imagesEdit)
        console.log(editId)
        let formData = new FormData();
        for (let i = 0; i < imagesEdit.length; i++) {
            formData.append('images', imagesEdit[i])
        }
        //   formData.append(`images`, imagesEdit[0])
        formData.append('type', 'walking-route');
        formData.append('lat', markers.lat);
        formData.append('long', markers.lng);
        formData.append('location_id', editId);
        formData.append('title', nameLocationEdit);
        formData.append('description', descriptionEdit);
        formData.append('distance', distanceEdit);
        formData.append('avg_time', avg_timeEdit);
        var config = {
            method: 'put',
            url: url + 'api/location/updateLocation',
            headers: {
                'Content-Type': `multipart/form-data`,
            },
            data: formData
        };
        axios(config)
            .then(function (response) {
                console.log(response.data)
                getAllData();
                setVisibleView(false);
                setConfirmLoadingAdd(false);
                Modal.success({
                    content: 'Updated Walking Route Successfully',
                });
                setImagesEdit([])
            })
    };

    const handleCancelAdd = () => {
        console.log('Clicked cancel button');
        setVisibleAdd(false);
    };


    // Google Map 
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    const FileUploadImages = (e) => {
        console.log(e)
        setImagesEdit(e.fileList)
    }
    const handleImage = (e) => {
        console.log("e.target.files")
        setImages(e.target.files)
    }
    const handleImageEdit = (e) => {
        console.log("e.target.files")
        setImagesEdit(e.target.files)
        setDisplay(false)
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
                        <AltRouteIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Routes Manage
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
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Walking Route</Typography>
                            </Item>
                            <Item>
                                <Button variant="contained" style={addbtn}
                                    onClick={showModalAdd}
                                >
                                    + Walking Route
                                </Button>
                                <Modal
                                    title="Add Walking Route"
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
                                        <Form.Item label="Select" >
                                            <input type="file" multiple name="image" placeholder="image"
                                                onChange={(e) => handleImage(e)} />
                                        </Form.Item>

                                        <Form.Item label="Title ">
                                            <Input value={nameLocation} placeholder="Enter Location Name"
                                                onChange={(e) => setnameLocation(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Location">
                                        </Form.Item>

                                        <div>
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

                                            </GoogleMap>
                                        </div>
                                        <h5 style={{ margin: '20px' }}>Click on map to edit location</h5>
                                        <Form.Item label="Description ">
                                            <Input value={description} placeholder="Enter Description"
                                                onChange={(e) => setdescription(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Distance ">
                                            <Input value={distance} placeholder="Enter Distance"
                                                onChange={(e) => setDistance(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Avg Time ">
                                            <Input value={avg_time} placeholder="Enter Average Time"
                                                onChange={(e) => setavg_time(e.target.value)
                                                } />
                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button type="primary" htmlType="submit" onClick={handleOkAdd} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                                {loading1 ? <ClipLoader color='white' loading={loading1} css={override} size={10} /> : <h5 style={{ color: 'white' }}>
                                                    Save</h5>}
                                            </Button>

                                        </Form.Item>

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
                            title="Walking Route Details"
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
                                {display?
                                imagesEdit.map((row) => (
                                    <>
                                        <Image
                                            width={100}
                                            src={row.image_url}
                                        />
                                    </>
                                ))
                                :null}
                                {/* {imagesEdit.map((row) => (
                                    <>
                                        <Image
                                            width={100}
                                            src={row.image_url}
                                        />
                                    </>
                                ))} */}

                                <Form.Item label="Select" >
                                    <input type="file" multiple name="image" placeholder="image"
                                        onChange={(e) => handleImageEdit(e)} />
                                </Form.Item>
                                <Form.Item label="Title ">
                                    <Input value={nameLocationEdit} placeholder="Enter Location Name"
                                        onChange={(e) => setnameLocationEdit(e.target.value)
                                        } />
                                </Form.Item>
                                <Form.Item label="Location">
                                </Form.Item>

                                <div>
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
                                        <Marker key="added" position={markers}

                                        />
                                    </GoogleMap>
                                </div>
                                <h5 style={{ margin: '20px' }}>Click on map to edit location</h5>
                                <Form.Item label="Description ">
                                    <Input value={descriptionEdit} placeholder="Enter Description"
                                        onChange={(e) => setdescriptionEdit(e.target.value)
                                        } />
                                </Form.Item>
                                <Form.Item label="Distance ">
                                    <Input value={distanceEdit} placeholder="Enter Distance"
                                        onChange={(e) => setDistanceEdit(e.target.value)
                                        } />
                                </Form.Item>
                                <Form.Item label="Avg Time ">
                                    <Input value={avg_timeEdit} placeholder="Enter Average Time"
                                        onChange={(e) => setavg_timeEdit(e.target.value)
                                        } />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" onClick={handleOkUpdate} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default RoutesManage
