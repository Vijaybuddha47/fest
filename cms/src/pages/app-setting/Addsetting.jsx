import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Addsetting() {
  const [appname, setAppname] = useState("");
  const [label, setLabel] = useState("");
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState("A");
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();
  const location = useLocation();
  // const [showPopup, setShowPopup] = useState(false);
  const parameterValue = location.state && location.state.msg;

  useEffect(() => {
    fetchData();
  }, []);

  if (parameterValue) {
    toast.success(parameterValue, {
      toastId: 'success1',
    })
  }
  const id = '65265a23c190d4ce1633f7fb'
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-appsetting/${id}`);
      const item = await response.json();

      setAppname(item.appSetting.name);
      setLabel(item.appSetting.label);
      setMail(item.appSetting.mail);

      setStatus(item.appSetting.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {

      const response = await fetch(`${BASE_URL}/update-appsetting`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({ name: appname, label, mail, status, id }),
      });

      if (response.status === 200) {

        history('/app-setting', { state: { msg: 'Data updated successfully' } });
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
                <h1>Website/App Setup</h1>
              </div>
              {/* <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to="/view-all-genre"><i className="fa fa-eye"></i>
View All Genre</Link></li>
                    </ol>
                </div> */}
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
                      <div className="form-group col-md-3">

                        <label ><span className="text-danger">*</span>App Name</label>
                        <input type="text" name="genre" className="form-control" id="genre" value={appname} maxLength="255" onChange={(e) => setAppname(e.target.value)} />

                      </div>
                      <div className="form-group col-md-3">

                        <label ><span className="text-danger">*</span>Feedback Label</label>
                        <input type="text" name="genre" calue={label} className="form-control" id="genre" value={label} maxLength="255" onChange={(e) => setLabel(e.target.value)} />

                      </div>
                      <div className="form-group col-md-3">

                        <label ><span className="text-danger">*</span>Feedback Email</label>
                        <input type="text" name="genre" value={mail} className="form-control" id="genre" maxLength="255" onChange={(e) => setMail(e.target.value)} />

                      </div>
                      <div className="form-group col-md-3">

                        <label ><span className="text-danger">*</span>Status</label>
                        <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status} defaultValue={status}
                          required>

                          <option value="A" selected='A'>Active</option>
                          <option value="I">InActive</option>
                        </select>
                      </div>
                    </div>
                    {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>}
                  </div>

                  <div className="card-footer col-md-12">

                    <button className="btn btn-primary" onClick={handleSave}><i  ></i> Submit</button>
                  </div>

                </div>

              </div>

              {/* <div className="col-md-6">
                </div> */}

            </div>

          </div>

        </section>

      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Addsetting;
