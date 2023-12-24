import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { FaFacebook, FaGooglePlus } from 'react-icons/fa'

export const SocialMediaButton = () => {
    const handleSocialMediaButton = () => {
        console.log("social media link click");
    }
    return (
        <Col>
            <Button className='whiteBtn facebook-icon my-2 p-0' size="lg" onClick={handleSocialMediaButton}><FaGooglePlus></FaGooglePlus> Continue with Google</Button>
            <Button className='whiteBtn google-icon p-0' size="lg" onClick={handleSocialMediaButton}><FaFacebook></FaFacebook> Continue with Facebook</Button>
        </Col>
    )
}
