import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
// import Topnav from '../../Topnav.jsx';
// import Leftnav from '../../Leftnav.jsx';
const Editactor = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [actor_name, setActor] = useState("");
  const [social_link, setSocial] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-actor/${id}`);
      const item = await response.json();

      setActor(item.ActorData.actor_name);
      setSocial(item.ActorData.social_link);
      setStatus(item.ActorData.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (actor_name.length < 1) {
        setNameError('Please Enter Actor Name');
        return
      } else {
        setNameError('');
        //flag=1;
      }
      const response = await fetch(`${BASE_URL}/actorupdate`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({ actor_name: actor_name, social_link, status: status, id }),
      });

      if (response.status === 200) {

        history('/view-all-actors', { state: { msg: 'Data updated successfully' } });
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
                <h1>Add Actor</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-all-actors"><i className="fa fa-eye"></i>
                    View All Actors</Link></li>
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

                        <label ><span className="text-danger">*</span>Actor Name</label>
                        <input type="text" name="actor_name" value={actor_name} className="form-control" id="actor_name" maxLength="255" onChange={(e) => setActor(e.target.value)} />
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
export default Editactor;