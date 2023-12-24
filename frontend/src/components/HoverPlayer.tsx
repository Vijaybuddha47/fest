import React from 'react'

interface videoProps {
    url: string;
}
const HoverPlayer = (props: videoProps) => {
    return (
        <video width="220" height="200" className='hover-player'>
            <source src={props.url} type="video/mp4" />
        </video>
    )
}

export default HoverPlayer