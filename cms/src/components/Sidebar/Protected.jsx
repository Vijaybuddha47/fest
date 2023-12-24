import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Protected = (props) => {
    const {Componet} = props;

    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('user');
        if(!login)
        {
            navigate('/login');
        }
    })
  return (
    <div><Componet/></div>
  )
}
export default Protected;