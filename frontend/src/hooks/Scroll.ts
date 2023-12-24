import React, { useEffect } from 'react'

const useCustomScroll = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
}

export default useCustomScroll