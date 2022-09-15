import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, EyeTwoTone, DeleteTwoTone, ExclamationCircleOutlined, EditTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select }
    from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { Modal } from 'antd';
import axios from "axios";
// import Select from '@mui/material/Select';
import WcIcon from '@mui/icons-material/Wc';
import Box from '@mui/material/Box';
import '../tableStyle.css'
import url from '../url'
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
const { Option } = Select;

const libraries = ["places"];
const mapContainerStyle = {
    height: "500px",
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
    // borderRadius:'50px'
}
// const data = [
//     {
//       key: '1',
//       startingRoute:'any route',
//       endingRoute:'any route',
//       distance:'12km',
//       walktime:'12 minutes',

//     },
// ]
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
function Toilets() {
    let navigate = useNavigate();
    //Get API Axios
    const [data, setData] = useState([]);


    const [loading, setLoading] = useState(false);
    const getAllData1 = () => {
        axios.get(`${url}api/locationType/getAllLocationTypes`)
            .then((response) => {
                console.log("response.data");
                console.log(response.data.data);

                setDataLocationType(response.data.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData = () => {
        axios.get(`${url}api/toilet/getToilets`)
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setData(response.data.data);
                setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        getAllData1();

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
        {
            title: 'Name',
            width: '20%',
            key: 'locationName',
            render: (_, record) => (
                <Space size="middle">
                    {record.name}
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
            title: 'Location Type',
            width: '20%',
            key: 'locationType',
            render: (_, record) => (
                <Space size="middle">
                    {record.locationType.locationType}
                </Space>

            ),
            //   ...getColumnSearchProps('LocationIdType'),
        },
        // {
        //     title: 'Ending Route',
        //     dataIndex: 'endingRoute',
        //     key: 'endingRoute',
        //     width: '20%',
        //     ...getColumnSearchProps('endingRoute'),
        // },
        // {
        //     title: 'Distance',
        //     dataIndex: 'distance',
        //     key: 'distance',
        //     width: '20%',
        //     ...getColumnSearchProps('distance'),
        // },
        // {
        //     title: 'Walk Time',
        //     dataIndex: 'walktime',
        //     key: 'walktime',
        //     width: '20%',
        //     ...getColumnSearchProps('walktime'),
        // },
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
                            onToggleView(record._id, record.name, record.location.coordinates, record.locationType.locationType)
                            // showModalAdd
                        }}
                    ><EditTwoTone style={iconFont} twoToneColor="green" /></a>
                    {/* <a
            onClick={() => {
              // console.log(row._id)
              onToggleView("record._id")
            }}
          >< EyeTwoTone style={iconFont} twoToneColor="orange" /></a> */}

                </Space>

            ),
            //   ...getColumnSearchProps('LocationIdType'),
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
    const onToggleView = async (id, name, coordinates, locationType) => {
        // setOpenUpdate(true);
        // setVisibleView(true);
        setEditId(id)
        console.log(id);
        console.log(name);
        console.log(coordinates[0]);
        console.log(locationType);



        setnameLocationEdit(name);
        setMarkers(
            {
                lat: coordinates[0],
                lng: coordinates[1]
            }
        );
        // handleChangeEdit(locationType)
        setLocationIdTypeEdit(locationType);


        setVisibleView(true);



    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // Delete 
    const showDeleteConfirm = (IdData) => {
        confirm({
            title: 'Are you sure delete this Toilet?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                // Api 
                axios.delete(`${url}api/toilet/removeToilet/${IdData}`, { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        getAllData();
                    }).catch(err => {
                        console.log(err)
                    })
                console.log('OK');

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
    const [modalTextAdd, setModalTextAdd] = useState('Content of the modal');

    const showModalAdd = () => {
        setVisibleAdd(true);
    };
    const [LatMark, setLatMark] = useState('');
    const [LngMark, setLngMark] = useState(false);

    const handleOkAdd = () => {
        setModalTextAdd('Creating Toilet Location');
        setLatMark(markers.lat)
        setLngMark(markers.lng)
        if (markers === '' || LocationIdType === '' || nameLocation === '') {
            console.log(markers)
            console.log(LocationIdType)
            console.log(nameLocation)


            console.log('fill all fields')
        } else {
            // POst Request Create Toilet
            console.log(LocationIdType)

            axios.post(`${url}api/toilet/createToilet`, {
                name: nameLocation,
                location: {
                    coordinates: [LatMark, LngMark]
                },
                locationTypeId: LocationIdType

            }, { headers }).then(response => {
                console.log(response)
                getAllData();
                // setsupplyOrderId('');
                // setdeliveryStatus('');
                setVisibleAdd(false);
                setConfirmLoadingAdd(false);
                Modal.success({
                    content: 'Created Toilet Successfully',
                });

            })
                .catch(err => {
                    console.log(err)
                })
        }


    };
    const handleOkUpdate = () => {
        // POst Request Create Toilet
        console.log(LocationIdType)

        axios.put(`${url}api/toilet/updateToiletDetails`, {
            // name: nameLocation,
            // location: {
            //     coordinates: [LatMark, LngMark]
            // },
            // locationTypeId: LocationIdType
            toiletId: editId,
            name: nameLocationEdit,
            long: markers.lat,
            lat: markers.lng

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            // setsupplyOrderId('');
            // setdeliveryStatus('');
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
    const [discount, setdiscount] = useState("");
    const [dataLocationType, setDataLocationType] = useState([]);
    const [locationTypeId, setlocationTypeId] = useState('');
    const [nameLocation, setnameLocation] = useState('');
    const [dataLocationTypeEdit, setDataLocationTypeEdit] = useState([]);
    const [locationTypeIdEdit, setlocationTypeIdEdit] = useState('');
    const [nameLocationEdit, setnameLocationEdit] = useState('');


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
                        <WcIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Toilets
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
                                <Typography variant='h6' style={{ fontWeight: 700 }} >Toilets</Typography>
                            </Item>
                            <Item>
                                <Button variant="contained" style={addbtn}
                                    onClick={showModalAdd}
                                >
                                    + Toilet
                                </Button>
                                <Modal
                                    title="Add Toilet"
                                    visible={visibleAdd}
                                    // onOk={handleOkAdd}
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
                                            <Input value={discount} placeholder="Enter Location"
                                                onChange={(e) => setdiscount(e.target.value)
                                                } />
                                        </Form.Item> */}
                                        <Form.Item label="Name ">
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

                                            {/* <FormControl fullWidth className='selectorInput'> */}
                                            {/* <Select className='selectorInput'
                                                    value={LocationIdType}
                                                    onChange={handleChange}
                                                >
                                                    {dataLocationType.map((row) => (
                                                        <MenuItem value={row._id}>{row.locationType}</MenuItem>
                                                    ))}

                                                </Select> */}
                                            {/* </FormControl> */}

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
                                {/* <Form.Item label="Name ">
                                            <Input value={discount} placeholder="Enter Location"
                                                onChange={(e) => setdiscount(e.target.value)
                                                } />
                                        </Form.Item> */}
                                <Form.Item label="Name ">
                                    <Input value={nameLocationEdit} placeholder="Enter Location Name"
                                        onChange={(e) => setnameLocationEdit(e.target.value)
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
                                        <Marker key="added" position={markers}

                                        />
                                    </GoogleMap>
                                </div>
                                <Form.Item label="Type" style={{ marginTop: '20px' }}
                                >

                                    {/* <Select  placeholder="Enter Location"
                                                onChange={(e) => 
                                                    // console.log(e)
                                                    setlocationTypeId(e.target.value)
                                                }>
          {dataLocationType.map((row) => (
            <Select.Option value={row._id}>{row.locationType}</Select.Option>
          ))}

          </Select> */}
                                    {/* <FormControl fullWidth className='selectorInput'> */}
                                    {/* <Select className='selectorInput'
                                                    value={LocationIdTypeEdit}
                                                    onChange={handleChangeEdit}
                                                >
                                                    {dataLocationType.map((row) => (
                                                        <MenuItem value={row._id}>{row.locationType}</MenuItem>
                                                    ))}

                                                </Select> */}
                                    {/* </FormControl> */}
                                    {/* <Input value={LocationIdTypeEdit} placeholder="Enter Location Type"
                                        onChange={(e) => setLocationIdTypeEdit(e.target.value)
                                        } /> */}
                                        <Select
                                                defaultValue=""
                                                disabled
                                                value={LocationIdTypeEdit}
                                                onChange={
                                                    (e) => console.log(e)
                                                    // setLocationIdTypeEdit(e)
                                                }
                                            >
                                                <Option value=''>Select Location Type</Option>

                                                {dataLocationType.map((row) => (
                                                    <Option value={row._id}>{row.locationType}</Option>
                                                ))}
                                            </Select>

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

                            {/* <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  

                                </Grid>
                                <Grid item xs={6}>
                                    

                                </Grid>
                                 <Grid item xs={6}>
                                    <Typography >some location</Typography>

                                </Grid>
                               
                            </Grid> */}

                        </Modal>
                    </Grid>

                </Grid>


            </div>
        </div>
    )
}

export default Toilets
