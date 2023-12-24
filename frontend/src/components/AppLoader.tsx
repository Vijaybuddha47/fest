import React from 'react'
import { CircularProgress } from '@mui/material'
import { Container } from 'react-bootstrap'


const AppLoader = () => {
    return (
        <Container className='loader-container'>
            <CircularProgress className='loader' size={60} />
        </Container>
    )
}

export default AppLoader