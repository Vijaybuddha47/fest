
import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function Login()
{

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [errorMessage, setErrorMessage] = useState('');
      const history = useNavigate();
      async function login()
      {
            try{
                  let item = {email, password };
                  let result = await fetch(`${BASE_URL}/admin-login`,{
                        method:'POST',
                        headers: {
                              'Content-type': 'application/json',
                              'Accept': 'application/json'
                        },
                        body: JSON.stringify(item)
                  });
                  //console.log(result.status)
                  if(result.status===200)
                  {
                        result = await result.json();
                  
                        //return false
                        //console.log(JSON.stringify(result.user));
                        localStorage.setItem("user",JSON.stringify(result.user));
                        history('/')
                        window.location.reload();
                  }
                  if(result.status==401)
                  {
                        result = await result.json();
                        setErrorMessage(result.message)
                  }
            }
            catch(error)
            {
                  console.log(error)
            }
      }
    return(
        <>
<section className="credential_form logForm">
<div className="login_page main_pg">
    <div className="inner-cred">
      <div className="cred_form">

            <div className="row credential_row">
                  <div className="logo_centeralize">
                        <img src="/images/logo/logo.png" className="logo_image" alt="logo"/>
                  </div>

                  <div className="col-md-12">
                        <div className="inner-div centerincenter">
                              <h4>SIGN IN</h4>
                              <div className="input_groupbox">
                                    <label className="contact-label">

                                          <input id="email" type="text" className="form-control "
                                                placeholder="Email" name="email"
                                                onChange={(e)=>setEmail(e.target.value)} />

                                    </label>
                                   
                              </div>
                              <div className="input_groupbox">
                                    <label className="contact-label btmLabel">

                                          <input id="password" type="password" className="form-control pswFld"
                                                name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                        
                                    </label>
                                   
                              </div>
                            
                              <div className="form-group mb-0">
                                    <button className="btn submit" onClick={login}>SIGN IN</button>
                              </div>
                              {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>}
                        </div>
                  </div>
            </div>
      </div>
</div>
</div>
</section>
        </>
    );
}

export default Login;