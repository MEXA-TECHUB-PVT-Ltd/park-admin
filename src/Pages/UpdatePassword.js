import React,{ useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Grid } from '@mui/material'
import image from '../Components/Images/LOGOApp.png'
import background from '../Components/Images/bgImg.png'
import { useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import url from '../Components/url'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css'
import './stylesheet.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Modal } from 'antd';
import { useLocation } from 'react-router-dom';

const logoStyle = {
  width: '300px',
  height: '300px',
  marginBottom: '5px',
  marginTop:'-150px'
}
const logo = {
  padding: '40px 140px'
}
const ContainerStyle = {
  // paddingTop: '50px',
  backgroundColor: 'white',
  color: 'black',
  height: '110vh',
  // backgroundImage: 'linear-gradient(to right, #1A513B , #657e58)',
  backgroundImage: `url(${background})` ,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 800px'
}
const ContainerStyle3 = {
  paddingTop: '150px',
  justifyContent:'center',
  color: '#1A513B',
  height: '110vh',
  backgroundImage: `url(${background})` ,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 800px'
}

const headingStyle = {
  fontSize: '20px',
  marginTop:'10px',
  fontFamily: 'Roboto Slab',
  color: 'black'

}
const gridCont = {
  backgroundColor: 'transparent',
  paddingTop: '140px'
}
const override = {
  display: ' block',
  margin: '0 auto',
}
const color = "#1A513B"
const colorBtn = "white"


const heading = "UPDATE PASSWORD"
function UpdatePassword() {
    const { state } = useLocation();

  // Loading 
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log(state.email)
      setEmail(state.email)

    }, 3000)
  }, [])

  //    Get 
  let navigate = useNavigate();
  const UserEmail=state.email;
  const [email, setEmail] = useState(UserEmail);
  const [password, setPassword] = useState("");
  const headers = {
    'Content-Type': 'application/json'
  }

  const onFinish = () => {
     setLoading1(true)
     setTimeout(() => {
       setLoading1(false)
      console.log(state.email)
       axios.put(`${url}api/admin/updateAdminPassword/`, {
         email: email,
         newPassword: password,
         adminId:state.ID
       }, { headers }).then(response => {
         console.log(response)
         if(response.data.message==="password updated successfully"){
             navigate('/')
         }else{
            Modal.error({
                title: 'Error message',
                content: 'Password couldnot be updated right now!',
              });
         }
       
       })
         .catch(err => {
           console.log(err)
           Modal.error({
             title: 'Error message',
             content: 'Password couldnot be updated right now!',
           });
         })
     }, 3000)
  };
  return (
    <div >
    {loading ?
      // style={ContainerStyle3}
      < Grid container spacing={2} style={ContainerStyle3}>
        <ClipLoader color={color} loading={loading} css={override} size={30} />
      </Grid>
      :
      < Grid container spacing={2} style={ContainerStyle}>

        <Grid item xs={12} md={4} > </Grid>

        <Grid item xs={12} md={4} style={gridCont}>
          <Grid align='center'>
          <Avatar src={image} variant="square" style={logoStyle} ></Avatar>
          {/* <h6 style={headingStyle}>Logo</h6> */}
            <Card sx={{ minWidth: 275,borderRadius:5 }}>
            <h6 style={headingStyle}>{heading}</h6>

                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  // onFinish={onFinish}
                >
                  {/* <Form.Item
                    name="email"

                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    className="inputField"
                    value={UserEmail}
                    // onChange={
                    //   (e) => setEmail(e.target.value)
                    // }
                    placeholder="Email" />
                  </Form.Item> */}
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input New Password!',
                      },
                    ]}
                  >
                    <Input

                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      value={password}
                      onChange={
                        (e) => setPassword(e.target.value)
                      }
                      placeholder="Password"
                      className="inputField"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onFinish} >
                    {loading1?<ClipLoader color={colorBtn} loading={loading1} css={override} size={10} />:<h5 style={{color:'white'}}>
                                  Update Password</h5>}
                    </Button>
                  </Form.Item>
                  
                    
                </Form>

            </Card>

          </Grid>

        </Grid>
        <Grid item xs={12} md={4} > </Grid>

      </Grid>
    }
  </div>

  )
}

export default UpdatePassword