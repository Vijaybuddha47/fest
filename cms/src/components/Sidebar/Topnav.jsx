import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Topnav = () => {
    const history = useNavigate ();
    const [name,setName] = useState(0);
    
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            history('/');
        }
        if(user)
        {
            setName(user.name);
        }
        
    })
    function Logout(){
        localStorage.clear();
        history('/');
    }

        
    
    
    
        
    //console.log(user)
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light topbar">
        <div className="full">
            {/* <button type="button" id="sidebarCollapse" className="sidebar_toggle"><i className="fa fa-bars"></i></button>  */}
            <div className="right_topbar">
                <div className="icon_info">
                    <ul className="user_profile_dd">
                        <li>
                            <a className="dropdown-toggle" data-toggle="dropdown"><img className="img-responsive rounded-circle" src="/images/user.png" alt="#" /><span className="name_user">{name}</span></a>
                            <div className="dropdown-menu">
                                
                                <Link className="dropdown-item" to='/profile-setting'>My Profile</Link>
                                <Link className="dropdown-item" to='/change-password'>Change Password</Link>
                                
                                <a className="dropdown-item" href="" onClick={Logout}><span>Log Out</span></a>
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Topnav