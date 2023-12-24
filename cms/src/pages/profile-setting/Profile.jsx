
import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { BASE_URL } from "../../config";

export const Profile = () => {
  //const hiddenInputRef = useRef(null);
  
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const id = user._id;
  const username = user.name;
  const [name, setName] = useState(username);
  const [message, setMessage] = useState('');
 
  //setName('dsadsada');
  const handleUpdate = async () => {
    try {
      //console.log(name,id)
      //const id = hiddenInputRef.current.value;
      let response = await fetch(`${BASE_URL}/update-user`, {
        method: 'POST', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        
        body: JSON.stringify({ name,id}),
      });

      if (response.status === 200) {
        
        response = await response.json();
        //console.log(response.message);
        //localStorage.clear();
        localStorage.setItem("user",JSON.stringify(response.userddata));
        setName(response.userddata.name);
        setMessage(response.message)
       
      }
    } catch (error) {
      console.error('Error updating data:', error);
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
     {message && <p className="bg-success text-white text-center">{message}</p>}     
       <div classNameName="col-md-12">
         <div className="card">
           <div className="card-header p-2">
             <ul className="nav nav-pills">
       <li className="nav-item"><a className="nav-link active" href="#settings" data-toggle="tab">Profile Setting</a></li>
       <li className="nav-item"><Link className="nav-link " to='/change-password'>Change Password</Link></li> 
             </ul>
           </div>
           <div className="card-body">
             <div className="tab-content">
              <div className="tab-pane active" id="settings">
                
                   <div className="form-group row">
                     <label for="inputName" className="col-sm-2 col-form-label"><span className="text-danger">*</span>Name</label>
                     <div className="col-sm-10">
                       <input type="text" className="form-control" name="username" value={name} onChange={(e)=>setName(e.target.value)} />
                     </div>
                   </div>
                   <div className="form-group row">
                     <label for="inputEmail" className="col-sm-2 col-form-label"><span className="text-danger">*</span>Email</label>
                     <div className="col-sm-10">
                       <input type="email" className="form-control" id="email" name="email" readonly="readonly" value={user.email} />
                     </div>
                   </div>
                   
                   <div className="form-group row">
                     <div className="offset-sm-2 col-sm-10">
                       <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Submit</button>
                     </div>
                   </div>
                
               </div>

             </div>

           </div>
         </div>

       </div>

     </div>

   </div>
 </section>
 </div>
    </>
  )
}

  
  
