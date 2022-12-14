import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WcIcon from '@mui/icons-material/Wc';
import axios from 'axios';
import url from '../url'
import '../tableStyle.css'

const useStyles = makeStyles({
    number: {
        fontSize: '20px',
        lineHeight: '32px',
        display: 'flex'

    },
    remarks: {
        lineHeight: '25px',
        marginTop: '10px',
        fontSize: '13px',
        color: '#9a9cab',
        fontFamily: 'Roboto Slab',
    },
    btn: {
        border: ' none',
        width: '70px',
        fontSize: ' 32px',
        cursor: 'pointer',
        borderRadius: '20px',
    },
    btn1: {
        backgroundColor: '#fc9494',
        border: ' none',
        color: 'black',
        padding: '12px 16px',
        fontSize: ' 16px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    btn2: {
        backgroundColor: '#ada6f2',
        border: ' none',
        color: 'white',
        padding: '12px 16px',
        fontSize: ' 16px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    btn4: {
        backgroundColor: '#5044c9',
        border: ' none',
        color: 'white',
        padding: ' 11px 24px',
        fontSize: '39px',
        cursor: 'pointer',
        borderRadius: '17px'
    },
    iconStyle: {
        marginTop: '3px',
        marginRight: '4px'
    }, HeadingWelcome: {
        fontSize: '26px',

    }, remarksHeader: {
        fontSize: '16px',
        marginTop: '-15px',
        paddingLeft: "20px",
    }, remarksImg: {
        padding: "20px",
        alignContent: 'center'
    }, remarksHeader2: {
        paddingLeft: "20px",
        alignContent: "center",
        fontSize: '20px',
        fontWeight: '500'
    },
    remarksHeader3: {
        paddingLeft: "20px",
        alignContent: "center",
        fontSize: '14px'
    }
})
function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'white'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'black'),

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


function GridDashboard() {
    const classes = useStyles();
    //get-all-topics
    const [data, setData] = useState([]);
    const getAllData = () => {
        axios.get(`${url}api/user/getAllUsers/`)
            .then((response) => {
                const allData = response.data.userDetails;
                // console.log(allData);
                setData(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    //get-all-transactions
    const [data1, setData1] = useState([]);
    const getAllData1 = () => {
        axios.get(`${url}api/location/getLocationByTypeWithOnePic/?type=walking-route`)
            .then((response) => {
                const allData = response.data.result;
                console.log("allData.length");
                console.log(response);
                setData1(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data2, setData2] = useState([]);
    const getAllData2 = () => {
        axios.get(`${url}api/location/getLocationByTypeWithOnePic/?type=dog-walk`)
            .then((response) => {
                const allData = response.data.result;
                console.log(allData.length);
                setData2(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data3, setData3] = useState([]);
    const getAllData3 = () => {
        axios.get(`${url}api/location/getLocationByTypeWithOnePic/?type=toilet`)
            .then((response) => {
                const allData = response.data.result;
                console.log(allData);

                setData3(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
   

    useEffect(() => {
        getAllData();
        getAllData1();
        getAllData2();
        getAllData3();

    }, []);

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style3"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <GroupIcon className='iconStyleCard2' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data}</div>
                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Total Users</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Second  */}
                <Grid item xs={12} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style2"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <DirectionsWalkIcon  className='iconStyleCard2' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data1}</div>

                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Walking Routes</div>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                 {/* Third  */}
                 <Grid item xs={12} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style1"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <PetsIcon   className='iconStyleCard2'/>
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data2}</div>

                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Dog Walks</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                 {/* 4Th large  */}
                 <Grid item xs={12} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <WcIcon  className='iconStyleCard2' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data3}</div>
                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Total Toilets</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default GridDashboard