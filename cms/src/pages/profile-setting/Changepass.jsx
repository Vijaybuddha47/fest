import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../config";

export const Changepass = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errormMessage, seterrorMessage] = useState('');
  let user = JSON.parse(localStorage.getItem('user'));
  const id = user._id;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      seterrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/update-password`, {
        id, // Provide the username of the user
        'new_password':newPassword,
        'current_password':oldPassword,
        confirmPassword
      });
      
      setMessage(response.data.message);
      // setOldPassword('');
      // setNewPassword('');
      // setConfirmPassword('');

    } catch (error) {
      //onsole.log(error.response.data)
      seterrorMessage(error.response.data.message);
    }
  };
  return (
    <>
    <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-12">
            <h1>My Account Settings</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div >      
        {message && <p className='bg-success text-center text-white'>{message}</p>}  
          <div className="col-md-12">
            <div className="card">
              <div className="card-header p-2">
                <ul className="nav nav-pills">                                   
                  <li className="nav-item"><Link className="nav-link" to='/profile-setting'>Profile Setting</Link></li>
				  <li className="nav-item"><Link  to='/change-password' className="nav-link active"  data-toggle="tab">Change Password</Link></li> 
                </ul>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                      <div className="form-group row">
                     
                        <label for="inputName" className="col-sm-2 col-form-label"><span className="text-danger">*</span>Current Password</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="oldPassword" name="oldPassword" onChange={(e) => setOldPassword(e.target.value)}/>
                         
                        </div>
                        
                      </div>
                      <div className="form-group row">
                  
                        <label for="inputEmail" className="col-sm-2 col-form-label"><span className="text-danger">*</span>New Password</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="newPassword" name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/>
                          
                      </div>
                        </div>
                        
                      <div className="form-group row">
             
                        <label for="inputName2" className="col-sm-2 col-form-label"><span className="text-danger">*</span>Confirm Password</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                          
                        </div>
                        {errormMessage && <p className='text-center text-danger'>{errormMessage}</p>}
                      </div>
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                      </div>
                      
                  </div>

                </div>
                
              </div>
              </form>
             
            </div>
   
          </div>
    
        </div>
       
      </div>
    </section>
    
  </div>
    </>
  )
}

  
