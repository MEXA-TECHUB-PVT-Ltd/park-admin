import React from 'react'
import Box from '@mui/material/Box';
import ResponsiveDrawer from '../Pages/ResponsiveDrawer';

const Container=(props)=> {
  return (
    <>
    {/* <Box sx={{ display: 'flex' }} > */}
        <ResponsiveDrawer data={props.data} Iduser={props.iduser} />


    {/* </Box> */}
    </>
  )
}
export default Container