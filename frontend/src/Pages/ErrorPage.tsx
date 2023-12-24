import React from 'react';
import { useRouteError } from "react-router-dom";
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from 'react-bootstrap/Button';
import useCustomScroll from '../hooks/Scroll';

export default function ErrorPage() {
    const error: any = useRouteError();
    useCustomScroll();
    console.error(error);


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                   
                    <Grid item xs={12} className='text-center'>

                    <Typography variant="h1"  className='nfoundTxt text-white'>
                            404
                        </Typography>
                        
                         {/* <Typography variant="h1">
                            {error.status}
                        </Typography> */}
                        <Typography variant="h6" className='text-white errorMessage'>
                            {error.statusText || error.message}
                        </Typography>
                        <Button className="default-btn mt-3 errorBtn" href="/" >Back Home</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
