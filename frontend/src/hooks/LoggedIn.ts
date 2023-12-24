import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const useLoggedIn = () => {
    const { isLoggedIn } = useAppSelector(state => state.user) || [];
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) return navigate('/');
    }, []);
}

export default useLoggedIn