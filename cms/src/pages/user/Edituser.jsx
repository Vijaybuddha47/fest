import React, { useState, useEffect } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from "../../config";


const Edituser = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [user_name, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-user/${id}`);
      const item = await response.json();

      setUser(item.users.name);
      setEmail(item.users.email);
      setStatus(item.users.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {

      const response = await fetch(`${BASE_URL}/update-user`, {
        method: 'POST', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({ name: user_name, status: status, id }),
      });

      if (response.status === 200) {

        history('/view-all-user');
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
              <div className="col-sm-6">
                <h1>Update User</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-all-user"><i className="fa fa-eye"></i>
                    View All Users</Link></li>
                </ol>
              </div>
            </div>
          </div>

        </section>


        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">

                <div className="card card-primary">

                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Name</label>
                        <input type="text" name="actor_name" value={user_name} className="form-control" id="actor_name" maxLength="255" onChange={(e) => setUser(e.target.value)} />

                      </div>
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Email</label>
                        <input type="text" name="social_link" value={email} className="form-control" id="social_link" maxLength="255" onChange={(e) => setEmail(e.target.value)} readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Status</label>
                        <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status}>

                          <option value="A" selected='A'>Active</option>
                          <option value="I">InActive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer col-md-12">

                    <button className="btn btn-primary" onClick={handleSave}><i  ></i> Update</button>
                  </div>

                </div>

              </div>

              {/* <div className="col-md-6">
                </div> */}

            </div>

          </div>

        </section>

      </div>
    </>
  )
}
export default Edituser;