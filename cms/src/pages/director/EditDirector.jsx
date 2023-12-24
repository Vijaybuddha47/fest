import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
// import Topnav from '../../Topnav.jsx';
// import Leftnav from '../../Leftnav.jsx';
const EditDirector = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [director_name, setActor] = useState("");
  const [social_link, setSocial] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-director/${id}`);
      const item = await response.json();

      setActor(item.DirectorData.director_name);
      setSocial(item.DirectorData.social_link);
      setStatus(item.DirectorData.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {

      if (director_name.length < 1) {
        setNameError('Please Enter Director Name');
        return
      } else {
        setNameError('');
        //flag=1;
      }

      const response = await fetch(`${BASE_URL}/update-director`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({ director_name, social_link, status, id }),
      });

      if (response.status === 200) {

        history('/view-all-directors', { state: { msg: 'Data updated successfully' } });
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <>
      {/* <Leftnav/>
    <Topnav/> */}
      <div className="content-wrapper">
        <section className="content-header">

          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update Director</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-all-directors"><i className="fa fa-eye"></i>
                    View All Director</Link></li>
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

                        <label ><span className="text-danger">*</span>Director Name</label>
                        <input type="text" name="director_name" value={director_name} className="form-control" id="director_name" maxLength="255" onChange={(e) => setActor(e.target.value)} />
                        <span className="text-danger">{nameError}</span>
                      </div>
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Social Link</label>
                        <input type="text" name="social_link" value={social_link} className="form-control" id="social_link" maxLength="255" onChange={(e) => setSocial(e.target.value)} />
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

export default EditDirector;