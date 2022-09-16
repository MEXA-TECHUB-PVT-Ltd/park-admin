import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import { Badge, Card, Button, Modal, Form, Input } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import axios from 'axios';
import url from '../url'
import '../tableStyle.css'
const { TextArea } = Input;
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
        marginTop: '-15px'
        // padding: '10px',
        // display: 'flex'
    }, remarksImg: {
        padding: "20px",
        alignContent: 'center'
    }, remarksHeader2: {
        padding: "10px",
        alignContent: "center",
        fontSize: '20px',
        fontWeight: '500'
    },
    remarksHeader3: {
        padding: '5px',
        alignContent: "center",
        fontSize: '14px'
    }
})
const styleBtn = {
    border: ' none',
    width: '100px',
    height: '100px',
    fontSize: ' 32px',
    cursor: 'pointer',
    borderRadius: '24px',

}
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


function GridDashboardWelcome() {
    const classes = useStyles();

    //get-all-title
    const [WelcomeTitle, setWelcomeTitle] = useState('');
    const [WelcomeDescription, setWelcomeDescription] = useState('');
    const [WelcomeId, setWelcomeId] = useState('');


    const getAllData = () => {
        axios.get(`${url}api/title/getTitles`)
            .then((response) => {
                const allData = response.data.result[0];
                console.log(allData);
                setWelcomeTitle(response.data.result[0].title)
                setWelcomeDescription(response.data.result[0].description)
                setWelcomeId(response.data.result[0]._id)


            })
            .catch(error => console.error(`Error:${error}`));
    }
    //get-all-contact
    const [contactDetails, setContactDetails] = useState('');
    const [contactId, setContactId] = useState('');


    const getAllData1 = () => {
        axios.get(`${url}api/contactDetails/getContactDetail`)
            .then((response) => {
                const allData = response.data.result[0];
                console.log(allData);
                setContactDetails(response.data.result[0].contactNumber)
                setContactId(response.data.result[0]._id)
            })
            .catch(error => console.error(`Error:${error}`));

    }

    useEffect(() => {
        getAllData();
        getAllData1();

    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        console.log("True")
        setIsModalOpen(true);
    };
    const headers = {
        'Content-Type': 'application/json'
    }
    const handleOk = () => {
        axios.put(`${url}api/title/updateTitle`, {
            titleId: WelcomeId,
            title: WelcomeTitle,
            description: WelcomeDescription,

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            setIsModalOpen(false);
            Modal.success({
                content: 'Updated Title Successfully',
            });

        })
            .catch(err => {
                console.log(err)
            })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [showContact, setshowContact] = useState(false);

    const showModalContact = () => {
        console.log("True")
        setshowContact(true);
    };

    const handleOkContact = () => {
        axios.post(`${url}api/contactDetails/createContactDetails`, {
            contactNumber: contactDetails

        }, { headers }).then(response => {
            console.log(response)
            getAllData();
            getAllData1();
            setshowContact(false);
            Modal.success({
                content: 'Updated Contact Successfully',
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
        <div>

            <Grid container spacing={2} >

                <Grid item xs={12} md={6}>
                    <Card title="  Welcome Title" size="small" >
                        {/* <Badge.Ribbon text="Edit" color="cyan" onClick={showModal}> */}
                        <Grid container spacing={2} >

                            <Grid item xs={10} md={11}>
                                {WelcomeTitle}

                            </Grid>
                            <Grid item xs={2} md={1}>
                                <EditTwoTone onClick={showModal} />
                                <Modal
                                    title="Edit Titles"
                                    open={isModalOpen}
                                    visible={isModalOpen}
                                    //    confirmLoading={confirmLoadingAdd}
                                    onCancel={handleCancel}
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

                                        <Form.Item label="Title ">
                                            <Input
                                                value={WelcomeTitle} placeholder="Enter Title"
                                                onChange={(e) => setWelcomeTitle(e.target.value)
                                                } />
                                        </Form.Item>
                                        <Form.Item label="Description">
                                            <TextArea rows={4} value={WelcomeDescription} onChange={(e) => setWelcomeDescription(e.target.value)
                                            } />
                                        </Form.Item>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button type="primary" htmlType="submit" onClick={handleOk} style={{ backgroundColor: '#1A513B', border: 'none' }}>
                                                Save
                                            </Button>
                                        </Form.Item>


                                    </Form>
                                </Modal>


                            </Grid>
                        </Grid>
                        {/* </Badge.Ribbon> */}

                    </Card>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Card title="  Contact Number" size="small">

                        <Grid container spacing={2} >

                            <Grid item xs={11} md={11}>
                                {contactDetails}

                            </Grid>
                            <Grid item xs={1} md={1}>
                                <EditTwoTone onClick={showModalContact} />
                                   {/* Contact  */}
                    <Modal
                        title="Edit Contact"
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

                            <Form.Item label="Contact ">
                                <Input
                                    value={contactDetails} placeholder="Enter Contact Number"
                                    onChange={(e) => setContactDetails(e.target.value)
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
                <Grid item xs={12} md={12}>

                    <Card title="Description" size="small" style={{ height: '300px' }}>

                        <Grid container spacing={2} >

                            <Grid item xs={11} md={11}>
                                {WelcomeDescription}

                            </Grid>
                            <Grid item xs={1} md={1}>
                                <EditTwoTone onClick={showModal} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>



            </Grid>
        </div>
    )
}

export default GridDashboardWelcome