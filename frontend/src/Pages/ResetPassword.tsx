import React, { useEffect, useState } from 'react'
import { useRouteError, useSearchParams, useParams, Navigate } from "react-router-dom";
import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import useCustomScroll from '../hooks/Scroll';


import 'bootstrap/dist/css/bootstrap.css';
import '../assets/style/style.css';
import configData from '../config/Config';
import axios from 'axios';

const ActivationUrl: string = configData.API_URL + "/verify-user";

function ResetPassword() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // activateAccount();
    }, []);
    const scroll = useCustomScroll();

    const { id } = useParams();
    console.log(id);
    if (!id) return <Navigate to='/' />

    const headers = {
        'Content-Type': 'application/json'
    }
    const data = {
        'id': id,
    }

    const activateAccount = async () => {
        await axios.post(ActivationUrl, data, {
            headers: headers
        })
            .then(res => {
                console.log(res);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 40,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" >
                        Reset Link
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h5" >
                            Email Address
                        </Typography>
                        <TextField
                            hiddenLabel
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            color="secondary"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Reset Link
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Typography component="h6" variant="h6">
                                    Please check your email to reset the passowrd.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {/* <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="center" className='activation-page'>
                    {
                        false
                            ? <Spinner animation="grow" variant="light" size="sm" />
                            : <Grid item xs={12} className='text-center'>
                                <Typography variant="h3" className='p-3 text-white' >
                                    Filmfest
                                </Typography>
                                <Typography variant="h6" className='p-3 text-white'>
                                    Please enter your registered email id.
                                </Typography>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                <Button className="whiteBtn" href="/login" >Send Reset Link</Button>
                            </Grid>
                    }
                </Grid>
            </Container> */}
        </Box>
    )
}

export default ResetPassword