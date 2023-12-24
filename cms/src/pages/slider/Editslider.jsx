import React, { useState, useEffect } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from "../../config";
import { Spinner } from 'react-bootstrap';


const Editslider = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  // const [status, setStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const hideError = setTimeout(() => {
      setErrorMsg('');
    }, 3000);

    return () => {
      clearTimeout(hideError);
    }
  }, [errorMsg]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-sliderbyId/${id}`);
      //console.log(response);
      const item = await response.json();

      setTitle(item.slider.title);
      setOrder(item.slider.order);
      console.log(response);
      //setStatus(item.users.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {

      const body = { id, order };
      setLoading(true);
      const update = await axios.put(`${BASE_URL}/update-slider`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then(response => {
          console.log(response);
          setErrorMsg('');
          setLoading(false);
          history('/view-slider', { state: { msg: 'Slider updated successfully' } });
        })
        .catch(error => {
          setLoading(false);
          setErrorMsg(error.response.data.message);
        });

      // const response = await fetch(`${BASE_URL}/update-slider`, {
      //   method: 'PUT', // or 'PATCH' depending on your API
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },

      //   body: JSON.stringify({ id, order }),
      // });

      // if (response.status === 200) {

      //   history('/view-slider');
      // }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  //console.log(id)

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">

          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update Slider</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-slider"><i className="fa fa-eye"></i>
                    View All Slider</Link></li>
                </ol>
              </div>
            </div>
          </div>

        </section>


        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                {errorMsg && <span style={{ color: 'red', fontSize: '1.4rem', fontWeight: '600' }}>{errorMsg}</span>}
              </div>
              <div className="col-md-12">

                <div className="card card-primary">

                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Name</label>
                        <input type="text" name="actor_name" value={title} className="form-control" id="actor_name" maxLength="255" onChange={(e) => setTitle(e.target.value)} readOnly />

                      </div>
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Order</label>
                        <input type="text" name="social_link" value={order} className="form-control" id="social_link" maxLength="255" onChange={(e) => setOrder(e.target.value)} />
                      </div>
                    </div>
                    {/* <div className="row">
                                <div className="form-group col-md-6">
                                    
                                    <label ><span className="text-danger">*</span>Status</label>
                                    <select className="form-control select2" style={{width: '100%'}} name="status" id="status" onChange={(e)=>setStatus(e.target.value)} value={status}>
                                      
                                        <option value="A" selected='A'>Active</option>
                                        <option value="I">InActive</option>
                                    </select>
                                </div>
                                </div> */}
                  </div>

                  <div className="card-footer col-md-12">
                    <button type='submit' className="btn btn-primary d-flex" onClick={handleSave}>Update  {loading && <span className="custom-spinner"></span>} </button>
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
export default Editslider;