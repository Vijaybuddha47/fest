import React, { useEffect, useState } from 'react'
import { useRouteError, useSearchParams, useParams, Navigate } from "react-router-dom";
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import '../assets/style/style.css';
import configData from '../config/Config';
import axios from 'axios';
import useCustomScroll from '../hooks/Scroll';

const ActivationUrl: string = configData.API_URL + "/verify-user";

function AccountVerify() {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    useCustomScroll();
    const { id } = useParams();

    useEffect(() => {

        const activateAccount = async () => {
            await axios.post(ActivationUrl, { id })
                .then(res => {
                    setLoading(false);
                    setError('');
                    if (res.data.message == 'VERIFIED') setRedirect(true);
                })
                .catch(error => {
                    setLoading(true);
                    setError(error.response.data.message);
                });
        };

        activateAccount();

    }, []);

    return redirect
        ? <Navigate to='/' />
        : (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={2} justifyContent="center" className='activation-page'>
                        {
                            loading
                                ? <Spinner animation="grow" variant="light" size="sm" />
                                : <Grid item xs={12} className='text-center'>
                                    <Typography variant="h3" className='p-3 text-white' >
                                        Filmfest
                                    </Typography>
                                    <Typography variant="h6" className='p-3 text-white'>
                                        {error ? error : 'Account verified successfully. Please log in to enter the festival.'}
                                    </Typography>
                                    <Link to="/login" className='m-0'><Button className="deskfilmbtn btn default-btn mx-2">Login</Button></Link>
                                </Grid>
                        }
                    </Grid>
                </Container>
            </Box>
        )
}

export default AccountVerify