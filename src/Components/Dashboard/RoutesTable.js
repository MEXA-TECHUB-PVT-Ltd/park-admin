import { Space, Table, Badge ,Image}
    from 'antd';
import React, {  useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import axios from "axios";
import Box from '@mui/material/Box';
import '../tableStyle.css'
import url from '../url'
import PropTypes from 'prop-types';
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
function RoutesTable() {
    //Get API Axios

    const [data, setData] = useState([]);
    const getAllData = () => {
        axios.get(`${url}api/location/getAllLocations`)
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setData(response.data.data);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();

    }, []);
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
                      backgroundColor: '#ffc400',
                    }}
                  />
                  :null}
                  {record.type==='parking'?
                    <Badge
                    className="site-badge-count-109"
                    count='parking'
                    style={{
                      backgroundColor: 'grey',
                    }}
                  />
                  :null}
                  {record.type==='walking-route'?
                    <Badge
                    className="site-badge-count-109"
                    count='walking route'
                    style={{
                      backgroundColor: 'rgb(41, 98, 255)',
                    }}
                  />
                  :null}
                  {record.type==='toilet'?
                    <Badge
                    className="site-badge-count-109"
                    count='toilet'
                    style={{
                      backgroundColor: 'rgb(20, 175, 72)',
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
    // Delete 
 
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
