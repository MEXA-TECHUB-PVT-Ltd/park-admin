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
import url from '../url'
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
    borderRadius: '20px',
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
function Toilets() {
    //Get API Axios
  const [loading1, setLoading1] = useState(false);

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
                            onToggleView(record._id, record.name, record.location.coordinates, record.locationType.locationType)
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
        console.log('Clicked cancel button');
        setVisibleView(false);
    };
    const [editId, setEditId] = React.useState('')
    const onToggleView = async (id, name, coordinates, locationType) => {
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
                Modal.success({
                    content: 'Toilet Deleted Successfully',
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
          if (markers === '' || LocationIdType === '' || nameLocation === '') {
              console.log(markers)
              console.log(LocationIdType)
              console.log(nameLocation)
              console.log('fill all fields')
              Modal.error({
                  title: 'This is an error message',
                  content: 'Please Fill All Fields!',
              });
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
                  setVisibleAdd(false);
                  setConfirmLoadingAdd(false);
                  Modal.success({
                      content: 'Created Toilet Successfully',
                  });
                  setLocationIdType('')
                  setnameLocation('')
  
              })
                  .catch(err => {
                      console.log(err)
                  })
          }
        }, 3000)
       
    };
    const handleOkUpdate = () => {
        console.log(LocationIdType)
        axios.put(`${url}api/toilet/updateToiletDetails`, {
            toiletId: editId,
            name: nameLocationEdit,
            long: markers.lat,
            lat: markers.lng

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
    const [dataLocationType, setDataLocationType] = useState([]);
    const [nameLocation, setnameLocation] = useState('');
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

                                        </Form.Item>

                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button type="primary" htmlType="submit" onClick={handleOkAdd} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                            {loading1 ? <ClipLoader color='white' loading={loading1} css={override} size={10} /> : <h5 style={{color:'white'}}>
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
                        </Modal>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Toilets
