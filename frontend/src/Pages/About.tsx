import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material';
import aboutLogo from '../assets/images/aboutLogo.png'
import { Container } from 'react-bootstrap';

const About = () => {
    return (
        <Container className='about-container text-center' fluid>
            <Grid>
                <Typography>
                    <img className='about-logo' src={aboutLogo} alt='Filmfest' />
                </Typography>
                <Typography className='about-text-heading'>
                    Monthly Short film festival
                </Typography>
                <Typography className='about-text-heading'>
                    submit Your Short Film for a chance to Win
                </Typography>
                <Typography className='about-text-heading'>
                    $500
                </Typography>
                <Button className='about-buttons'>Submit Film</Button>
            </Grid>
            <Grid className='text-center black-box-container'>
                <Box className="black-box">
                </Box>
                <Typography className='about-text-heading my-5'>
                    Follow us on instagram for the latest updates
                </Typography>
                <Button className='about-buttons'>@Filmfest</Button>
            </Grid>
        </Container>
    )
}

export default About;
