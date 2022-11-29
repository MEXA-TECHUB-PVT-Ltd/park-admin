import React from 'react'
import Container from '../Components/Container';
import { useLocation } from 'react-router-dom';

function Home() {
    const { state } = useLocation();
    
    return (
        <>
       { console.log('Home session')}
        {console.log(state.email)}
        {console.log(state.ID)}

        <Container data={state.email}
        iduser={state.ID}
        />
        </>
    )
}

export default Home