import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import image from '../Components/Images/LOGOApp.png'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import { Link, useNavigate } from 'react-router-dom'
import DashboardUser from '../Components/Dashboard/Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';
import axios from 'axios';
import url from '../Components/url';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material'
import { Dropdown, Menu, Modal, Form, Input ,Button} from 'antd'
import RoutesManage from '../Components/Routes/RoutesManage';
import BgImg from '../Components/Images/mapImg.jpg'
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ParkIcon from '@mui/icons-material/Park';
import WcIcon from '@mui/icons-material/Wc';
import PetsIcon from '@mui/icons-material/Pets';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import Toilets from '../Components/Toilets/Toilets';
import DogWalkTrack from '../Components/DogWalkTrack/DogWalkTrack';
import CarParkingSpace from '../Components/CarParkingSpace/CarParkingSpace';
import ManageWelcome from '../Components/ManageWelcome/ManageWelcome';
const drawerWidth = 240;
const useStyles = makeStyles({
  BackGround: {
    backgroundColor: 'white',
    // filter: 'blur(8px)',
    // WebkitFilter: 'blur(8px)',
    color: 'black',
    // opacity: 0.75,
    paddingLeft: '65px',
    // backgroundImage: `url(${BgImg})` ,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '100% 800px'
   

  }, iconColor: {
    color: '#455a64'
  },
  Header: {
    // backgroundColor: '#2ab97b',
    // borderRadius:' 0px 0px 50% 50%',
    height: '10px',
    margin: '20px auto',
  }, ListStyle1: {
    marginTop: '-10px'
  }, listStyle: {
    backgroundColor: '#112337',
    fontFamily: 'Roboto Slab',
    color: '#455a64',
    height: '100vh',
    overflowY: 'hidden',
    cursor: 'pointer'
  }, head: {
    backgroundColor: '#112337',
    color: '#9a9cab',
  }, btnSubmit: {
    width: '50%',
    backgroundColor: '#36f195',
    height: '50px',
    fontSize: '15px',
    fontFamily: 'Roboto Slab',
    border: 'transparent',
    borderRadius: '5px',
    fontFamily: 'Tiro Gurmukhi, serif',
    color: 'white',
    textAlign: 'center',
    marginLeft: '200px'
  }, inputStyle: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '1px solid grey',
    height: '20px'
  }, TextStyle: {
    color: 'black',
    marginTop: '10px',
    fontFamily: 'Tiro Gurmukhi, serif',
    fontWeight: 'bold',
    fontFamily: 'Roboto Slab',
  }

})
// const logoStyle = {
//   width: '200px',
//   height: '200px',
//   // marginBottom: '5px',
//   marginTop:'-40px'
// }
const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "transparent",
      color: "#ede2e2",
      // borderLeft: "10px solid white",
      fontWeight:'700',
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      opacity: "0.2",
      color:"white",
      backgrounColor: "white",
      borderRadius: "0px",

      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "white",
      opacity: "0.2",
      color: "black",
      borderRadius: "0px",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(MuiListItem);
// Drawer Header 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const MarginTop = {
  paddingTop: "70px",
  // padding: '0',
  overflow: 'hidden',
}
const paddingGrid = {
  // paddingLeft: '300px'
}
// Main 
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    backgroundColor:'#eceff1',
    height:'100%',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
// appbar 


function ResponsiveDrawer(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles();
  const getAllData = () => {
    axios.get(`${url}api/admin/specificAdmin/${props.Iduser}`)
      .then((response) => {
        const allData = response.data;
        console.log('get profile state')
        console.log(allData);
        setemail(allData.foundResult[0].email)
        setpassword(allData.foundResult[0].password)

      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();

  }, []);

  console.log('appbar session')
  console.log(props.data);
  console.log(props.Iduser);

  const [loading1, setLoading1] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  // Pages
  const [show, setShow] = React.useState(true);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

  const [show4, setShow4] = React.useState(false);
  const [show5, setShow5] = React.useState(false);


  const headers = {
    'Content-Type': 'application/json'
  }
  // Logout Admin Profile
  const logout = () => {
    // navigate('/')
    // console.log('Logout');
    axios.get(`${url}api/admin/logout`
    , { headers }).then(response => {
      console.log(response.data);
      console.log('Logout Successfull');
      navigate('/')
    })
      .catch(err => {
        console.log(err)
      })
  };
  // Modal 
  // Second modal Account
  const [visibleAccount, setVisibleAccount] = useState(false);
  const [confirmLoadingAccount, setConfirmLoadingAccount] = useState(false);
  const [modalTextAccount, setModalTextAccount] = useState('Content of the modal');

  const showModalAccount = () => {
    setAnchorEl(null);
    setVisibleAccount(true);
  };

  const handleOkAccount = () => {
    setModalTextAccount('The modal will be closed after two seconds');
    setConfirmLoadingAccount(true);
    setTimeout(() => {
      // Account Update 
      axios.put(`${url}api/admin/updateAdminPassword/`, {
        email: email,
        newPassword: password,
        adminId:props.Iduser
      }, { headers }).then(response => {
        console.log(response.data);
        console.log('Updated Account Successfully');
        setVisibleAccount(false);
        setConfirmLoadingAccount(false);
        Modal.success({
          content: 'Password Updated Successfully',
        });

      })
        .catch(err => {
          console.log(err)
          Modal.error({
            title: 'Error ',
            content: 'Password Update Failed',
          });
        })


    }, 2000);
  };

  const handleCancelAccount = () => {
    console.log('Clicked cancel button');
    setVisibleAccount(false);
  };

  // Menu 

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setAnchorEl(null);
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('Updating Profile');
    setConfirmLoading(true);
    setTimeout(() => {
      Modal.success({
        content: 'Profile Updated Successfully',
      });
      // Api update profile 
      // axios.put(`${url}admin/update-admin`, {
      //   _id: props.Iduser,
      //   username: username,
      //   Dob: dobUser,
      //   image: selectedFile1,

      // }, { headers }).then(response => {
      //   console.log(response.data);
      //   console.log('Updated Profie Successfully');
      //   setVisible(false);
      //   setConfirmLoading(false);
      //   Modal.success({
      //     content: 'Profile Updated Successfully',
      //   });
      //   getAllData();
      //   setSelectedFile1("")

      // })
      //   .catch(err => {
      //     console.log(err)
      //     Modal.error({
      //       title: 'Error ',
      //       content: 'Profile Update Failed',
      //     });
      //   })

    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  // Menu 
  const menu = (
    <Menu 
      items={[
        {
          key: '1',
          label: (
            <a onClick={showModalAccount}>
              Settings
            </a>
          ),
        },
        {
          key: '2',
          danger: true,
          label: (
            <a onClick={logout}>
              Logout
            </a>
          ),
        },
      ]}
    />
  );


  const [openProfile, setOpenProfile] = React.useState(false);


  const handleMenu = () => {
    setOpenProfile(true)
  };

  const handleClose = () => {
    setOpenProfile(false)

  };
  const [open3, setOpen3] = React.useState(false);

  // submit add 
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  const [username, setusername] = useState([]);
  const [ImgUserData, setImgUserData] = useState([]);
  const [dobUser, setdobUser] = useState([]);

  // Upload File
  const [selectedFile1, setSelectedFile1] = useState('')
  const onFileChange = (e) => {
    console.log(e)
    const formData = new FormData();
    formData.append(
      "image",
      e,
    );
    axios.post(`${url}upload-image`, formData,
      { headers }).then(response => {
        console.log(response.data)
        setSelectedFile1(response.data)

      })

  }
  const drawer = (
    <div style={{overflow:'hidden'}}>
      <DrawerHeader className={classes.head}>
        <div className={classes.Header} onClick={() => {
          setShow(true);
          setShow1(false);
          setShow2(false)
          setShow3(false)
          setShow4(false)
          setShow5(false)



        }}>
          <Typography variant="h6" noWrap component="div">
            BALOCHPARKGUIDE
          </Typography>
          {/* <Avatar src={image} variant="square" style={logoStyle} ></Avatar> */}
        </div>

      </DrawerHeader>
      <List className={classes.listStyle}>
        <ListItem disablePadding button
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0)
            setShow(true);
            setShow1(false);
            setShow2(false)
            setShow3(false)
            setShow4(false)
          setShow5(false)


          }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <DashboardIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />


        </ListItem>

        <ListItem disablePadding selected={selectedIndex === 1} onClick={(event) => {
          handleListItemClick(event, 1)
          setShow(false);
          setShow1(true);
          setShow2(false)
          setShow3(false)
          setShow4(false)
          setShow5(false)


        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <AltRouteIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Manage Routes" />
        </ListItem>

        <ListItem disablePadding selected={selectedIndex === 2} onClick={(event) => {
          handleListItemClick(event, 2)
          setShow(false);
          setShow1(false);
          setShow2(true)
          setShow3(false)
          setShow4(false)
          setShow5(false)



        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <WcIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Manage Toilets" />
        </ListItem>

        <ListItem disablePadding selected={selectedIndex === 3} onClick={(event) => {
          handleListItemClick(event, 3)
          setShow(false);
          setShow1(false);
          setShow2(false)
          setShow3(true)
          setShow4(false)
          setShow5(false)

          


        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <PetsIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Manage Dog Walks" />
        </ListItem>
        <ListItem disablePadding selected={selectedIndex === 4} onClick={(event) => {
          handleListItemClick(event, 4)
          setShow(false);
          setShow1(false);
          setShow2(false)
          setShow3(false)
          setShow4(true)
          setShow5(false)


        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <DirectionsCarFilledIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Car Parking Space" />
        </ListItem>
        <ListItem disablePadding selected={selectedIndex === 5} onClick={(event) => {
          handleListItemClick(event, 5)
          setShow(false);
          setShow1(false);
          setShow2(false)
          setShow3(false)
          setShow4(false)
          setShow5(true)


        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <ParkIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Manage Titles" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  // App bar 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <Box sx={{ display: 'flex' }}>
       
      {/* <AppBar position="fixed" sx={{ flexGrow: 1 }}>
        <Toolbar className={classes.BackGround}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: '#455a64' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Dropdown overlay={menu}>
              
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle  />
              </IconButton>
            </Dropdown>
          </Box>
        
          <Modal
            title="Update Profile"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
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
              <Form.Item label="Image">
                <Avatar alt="Admin" className="AvatarProfile" src={`${url}${ImgUserData}`} />
              </Form.Item>

              <Form.Item label="Username">
                <Input value={username} onChange={
                  (e) => setusername(e.target.value)
                } />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={email} disabled />
              </Form.Item>
              <Form.Item label="DOB">
                <Input value={dobUser} onChange={
                  (e) => setdobUser(e.target.value)
                } />
              </Form.Item>
              <Form.Item label="Image" valuePropName="fileList">
                <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Update Account"
            visible={visibleAccount}
            onOk={handleOkAccount}
            confirmLoading={confirmLoadingAccount}
            onCancel={handleCancelAccount}
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


              <Form.Item label="Email">
                <Input value={email} disabled />
              </Form.Item>
              <Form.Item label="Password">
                <Input onChange={
                  (e) => setpassword(e.target.value)
                } />
              </Form.Item>
            </Form>
          </Modal>
        </Toolbar>
      </AppBar> */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, backgroundColor: 'black',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Main open={open} style={MarginTop} className={classes.BackGround}>
      <Box
      sx={{
        marginTop:'-50px',
        width: '100%',
        height: 100,
        // backgroundColor: '#f2e8e2',
      }}
   >
      <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: '#455a64' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Dropdown overlay={menu}>
              
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle  />
              </IconButton>
            </Dropdown>
          </Box>
        
          <Modal
            title="Update Profile"
            visible={visible}
            // onOk={handleOk}
            confirmLoading={confirmLoading}
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
              <Form.Item label="Image">
                <Avatar alt="Admin" className="AvatarProfile" src={`${url}${ImgUserData}`} />
              </Form.Item>

              <Form.Item label="Username">
                <Input value={username} onChange={
                  (e) => setusername(e.target.value)
                } />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={email} disabled />
              </Form.Item>
              <Form.Item label="DOB">
                <Input value={dobUser} onChange={
                  (e) => setdobUser(e.target.value)
                } />
              </Form.Item>
              <Form.Item label="Image" valuePropName="fileList">
                <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
              </Form.Item>
              <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={handleOk} style={{backgroundColor:'#1A513B',border:'none'}}>
          Submit
        </Button>
        </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Update Account"
            visible={visibleAccount}
            // onOk={handleOkAccount}
            confirmLoading={confirmLoadingAccount}
            onCancel={handleCancelAccount}
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


              <Form.Item label="Email">
                <Input value={email} disabled />
              </Form.Item>
              <Form.Item label="Password">
                <Input onChange={
                  (e) => setpassword(e.target.value)
                } />
              </Form.Item>
              <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={handleOkAccount} style={{backgroundColor:'#1A513B',border:'none'}}>
          Submit
        </Button>
      </Form.Item>
            </Form>
          </Modal>
        </Toolbar>

   </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} style={paddingGrid}>
            {/* data={props.data} */}
            {show ? <DashboardUser /> : null}
            {show1 ? <RoutesManage /> : null}
            {show2 ? <Toilets /> : null}
            {show3 ? <DogWalkTrack /> : null}
            {show4 ? <CarParkingSpace /> : null}
            {show5 ? <ManageWelcome /> : null}

          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;