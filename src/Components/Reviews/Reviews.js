import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { SearchOutlined, DeleteTwoTone, ExclamationCircleOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select, Upload, Image }
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
import url from '../url'
import googleMapsApiKey from '../mapKey'
import ClipLoader from "react-spinners/ClipLoader";
import RateReviewIcon from '@mui/icons-material/RateReview';
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
function Reviews() {
    //Get API Axios
    const [loading1, setLoading1] = useState(false);

    const [data, setData] = useState([]);


    const [loading, setLoading] = useState(false);
    // const getAllData1 = () => {
    //     axios.get(`${url}api/locationType/getAllLocationTypes`)
    //         .then((response) => {
    //             console.log("response.data");
    //             console.log(response.data.data);

    //             setDataLocationType(response.data.data);
    //             // setLoading(true)
    //         })
    //         .catch(error => console.error(`Error:${error}`));

    // }
    const getAllData = () => {
        axios.get(`${url}api/reviews/getAllReviews`)
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
        //     key: 'location_id',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Image
        //                 width={100}
        //                 src={record.location_id.images[0].image_url}
        //             />
        //             {/* {record.images.image_url} */}
        //         </Space>
        //     ),
        // },
        // {
        //     title: 'Title',
        //     width: '20%',
        //     key: 'title',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {record.location_id.title}
        //         </Space>
        //     ),
        // },
        // {
        //     title: 'Location Address',
        //     width: '20%',
        //     key: 'location',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {record.location_id.location.coordinates}
        //         </Space>
        //     ),
        // },
        // {
        //     title: 'Distance',
        //     width: '20%',
        //     key: 'distance',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {record.location_id.distance}
        //         </Space>
        //     ),
        // },
        // {
        //     title: 'Avg Time',
        //     width: '20%',
        //     key: 'avg_time',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {record.location_id.avg_time}
        //         </Space>
        //     ),
        // },
        {
            title: 'UserName',
            width: '20%',
            key: 'name',
            render: (_, record) => (
                <Space size="middle">
                    {record.name}
                </Space>
            ),
        },
        {
            title: 'Review',
            width: '20%',
            key: 'review',
            render: (_, record) => (
                <Space size="middle">
                    {record.review}
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
                setnameLocationEdit(response.data.data.title);
                setDistanceEdit(response.data.data.distance)
                setavg_timeEdit(response.data.data.avg_time)
                setdescriptionEdit(response.data.data.description)
                setVisibleView(true);


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
            title: 'Are you sure delete this Review?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                // Api 
                axios.delete(`${url}api/reviews/deleteReview/${IdData}`,
                 { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        getAllData();
                    }).catch(err => {
                        console.log(err)
                    })
                console.log('OK');
                Modal.success({
                    content: 'Review Deleted Successfully',
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
    const showModalAdd = () => {
        setVisibleAdd(true);
    };
    const [LatMark, setLatMark] = useState('');
    const [LngMark, setLngMark] = useState(false);

    const handleOkAdd = () => {
        setLoading1(true)
        setTimeout(() => {
            setLoading1(false)
            setLatMark(markers.lat)
            setLngMark(markers.lng)
            // if (markers === '') {
            //     console.log(markers)
            //     console.log(nameLocation)
            //     console.log('fill all fields')
            //     Modal.error({
            //         title: 'This is an error message',
            //         content: 'Please Fill All Fields!',
            //     });
            // } else {

                axios.post(`${url}api/location/createLocation`, {
                    type: "toilet",
                    location: {
                        "coordinates": [LatMark, LngMark]
                    },
                    title: nameLocation,
                    // images: images,
                    description: description,
                    distance: distance,
                    avg_time: avg_time

                }, { headers }).then(response => {
                    console.log(response.data)
                    getAllData();
                    // setVisibleAdd(false);
                    // setConfirmLoadingAdd(false);
                    // Modal.success({
                    //     content: 'Created Toilet Successfully',
                    // });
                    // setLocationIdType('')
                    // setnameLocation('')

                })
                    .catch(err => {
                        console.log(err)
                    })
            // }
        }, 3000)

    };
    const handleOkUpdate = () => {
        console.log(imagesEdit)
        console.log(editId)
        axios.put(`${url}api/location/updateLocation`, {
            location_id: editId,
            type: "toilet",
            title: nameLocationEdit,
            // location: { coordinates: [markers.lat, markers.lng] },
            long: markers.lat,
            lat: markers.lng,
            images: imagesEdit,
            description: descriptionEdit,
            distance: distanceEdit,
            avg_time: avg_timeEdit

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            setVisibleView(false);

            setConfirmLoadingAdd(false);
            Modal.success({
                content: 'Updated Toilet Successfully',
            });

        })
            .catch(err => {
                console.log(err)
            })
    };

    const handleCancelAdd = () => {
        console.log('Clicked cancel button');
        setVisibleAdd(false);
    };
    const [nameLocation, setnameLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setdescription] = useState('');
    const [avg_time, setavg_time] = useState('');


    const [nameLocationEdit, setnameLocationEdit] = useState('');
    const [imagesEdit, setImagesEdit] = useState([]);
    const [images, setImages] = useState([]);


    const [distanceEdit, setDistanceEdit] = useState('');
    const [avg_timeEdit, setavg_timeEdit] = useState('');
    const [descriptionEdit, setdescriptionEdit] = useState('');

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
        console.log(e.target.files)
        setImages(e.target.files)
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
                        <RateReviewIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Reviews
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
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Reviews</Typography>
                            </Item>
                            <Item>
                                
                                <Modal
                                    title="Add Toilet"
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

                                        {/* <Form.Item label="Name ">
                                            <Input value={nameLocation} placeholder="Enter Location Name"
                                                onChange={(e) => setnameLocation(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Location ">


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

                                        <Form.Item label="Type" style={{ marginTop: '20px' }}
                                        >
                                            <Select
                                                defaultValue=""
                                                value={LocationIdType}
                                                onChange={handleChange}
                                            >
                                                <Option value=''>Select Location Type</Option>

                                                {dataLocationType.map((row) => (
                                                    <Option value={row._id}>{row.locationType}</Option>
                                                ))}
                                            </Select>

                                        </Form.Item> */}
                                        <input type="file" multiple name="image" placeholder="image"
                                            onChange={(e) => handleImage(e)} />
                                        {/* <Form.Item label="Images" valuePropName="fileList">
          <Upload listType="picture-card" value={imagesEdit}  onChange={(e) => FileUploadImages(e)
                                        }>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
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
                            title="Toilet Details"
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
                                <input type="file" multiple name="image" placeholder="image"
                                    onChange={(e) => setImagesEdit(e.target.files)} />
                                {/* <Form.Item label="Images" valuePropName="fileList">
          <Upload listType="picture-card" value={imagesEdit}  onChange={(e) => FileUploadImages(e)
                                        }>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
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

export default Reviews
