import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import GridDashboard from './GridDashboard'
import { Grid } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import GridDashboard2 from './GridDashboard2';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
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
  }, remarksHeader: {
      fontSize: '16px',
      padding: '10px',
      fontWeight: '500',
      display:'flex'
  }, remarksImg: {
      padding: "20px",
      alignContent: 'center'
  }, remarksHeader2: {
      padding: "25px",
      alignContent: "center",
      fontSize: '42px'
  },
  remarksHeader3: {
      padding:'5px',
      alignContent: "center",
      fontSize: '14px'
  }, HeadingWelcome: {
    fontSize: '26px',

},HeadingWelcomePara:{
  marginTop:'10px',
  fontSize: '14px',
  lineHeight: '1.75',
  letterSpacing: '0px',
  fontWeight: '400',
  color: 'rgb(96, 125, 139)'

  }
})
function Dashboard() {
const classes = useStyles();

  return (
    <div>
      <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
          // href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
      </Breadcrumbs>
    </div>
    <div>
    <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                <div className={classes.HeadingWelcome}>Welcome Admin!</div>
                <div className={classes.HeadingWelcomePara}>This page is designed to give some important information about the application. Let's make someting together!</div>
                {/* <div className={classes.HeadingWelcome}>Avatar</div> */}

                </Grid>
                <Grid item xs={12} md={12}>

               {/* Cards  */}
               <GridDashboard/>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                <GridDashboard2/>
                </Grid> */}
                </Grid>
    {/* <GridDashboard/> 
    <TransactionsTable/> */}
     {/* <Orders/> */}
    </div>
    </div>
  )
}

export default Dashboard