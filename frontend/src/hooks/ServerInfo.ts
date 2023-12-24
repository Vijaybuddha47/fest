import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import configData from '../config/Config';
import axios from 'axios';

interface IServer {
    IPv4: string;
    city: string;
    country_code: string;
    country_name: string;
    latitude: number;
    longitude: number;
    postal: string;
    state: string;
}

const useServerInfo = () => {
    const [serverInfo, setServerInfo] = useState<IServer>({
        IPv4: '',
        city: '',
        country_code: '',
        country_name: '',
        latitude: 0,
        longitude: 0,
        postal: '',
        state: '',
    });
    // console.log("useServerInfo");

    useEffect(() => {
        const getServerInfo = async () => {
            await axios.get<IServer[], any>('https://geolocation-db.com/json/')
                // .then(response => console.log(response))
                .then(response => {
                    // console.log(response.data);
                    setServerInfo(response.data);
                })
                .catch(error => console.log(error))
        }

        getServerInfo();

    }, []);
    // console.log(serverInfo);
    // configData.API_URL = serverInfo.IPv4;
    // console.log(configData.API_URL);
}

export default useServerInfo