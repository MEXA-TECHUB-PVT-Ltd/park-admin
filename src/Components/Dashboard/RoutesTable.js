import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { SearchOutlined, DeleteTwoTone, ExclamationCircleOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Form, Select, Upload, Badge ,Image}
    from 'antd';
import PetsIcon from '@mui/icons-material/Pets';

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
function RoutesTable() {
    //Get API Axios
    const [loading1, setLoading1] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllData = () => {
        axios.get(`${url}api/location/getAllLocations`)
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
            title: 'Image',
            width: '20%',
            key: 'title',
            render: (_, record) => (
                <Space size="middle">
                    {record.images.length === 0 ?
                        <span>Null</span> :
                        <Image
                            width={100}
                            src={record.images[0].image_url}
                        />
                    }

                </Space>
            ),
        },
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
            title: 'Type',
            width: '20%',
            key: 'type',
            render: (_, record) => (
                <Space size="middle">
                    {record.type==='dog-walk'?
                    <Badge
                    className="site-badge-count-109"
                    count='dog walk'
                    style={{
                      backgroundColor: 'blue',
                    }}
                  />
                  :null}
                  {record.type==='parking'?
                    <Badge
                    className="site-badge-count-109"
                    count='parking'
                    style={{
                      backgroundColor: '#52c41a',
                    }}
                  />
                  :null}
                  {record.type==='walking-route'?
                    <Badge
                    className="site-badge-count-109"
                    count='walking route'
                    style={{
                      backgroundColor: 'orange',
                    }}
                  />
                  :null}
                  {record.type==='toilet'?
                    <Badge
                    className="site-badge-count-109"
                    count='toilet'
                    style={{
                      backgroundColor: 'pink',
                    }}
                  />
                  :null}
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
            title: 'Are you sure delete this Dog Walk Track?',
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
                    content: 'Dog Walk Track Deleted Successfully',
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
           
            <div style={marginTop}>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={12}>
                        <Box
                            sx={{ display: 'flex', p: 1, bgcolor: 'transparent', borderRadius: 1 }}
                        >
                            <Item sx={{ flexGrow: 2 }}>
                                <Typography variant='h6' style={{ fontWeight: 700 }} >All Routes</Typography>
                            </Item>
                            
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className='tableResponsive'>
                            <Table columns={columns} dataSource={data} />
                        </div>
                      
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default RoutesTable
