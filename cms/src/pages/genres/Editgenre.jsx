import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from "../../config";
// import Topnav from '../../Topnav.jsx';
// import Leftnav from '../../Leftnav.jsx';

const Editgenre = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [editGenre, setEditGenre] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-genre/${id}`);
      const item = await response.json();

      setEditGenre(item.genreData.genre);
      setEditStatus(item.genreData.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {

      if (editGenre.length < 1) {
        setNameError('Please Enter Genre Name');
        return
      } else {
        setNameError('');
        //flag=1;
      }

      const response = await fetch(`${BASE_URL}/update-genre`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({ genre: editGenre, status: editStatus, id }),
      });

      if (response.status === 200) {

        history('/view-all-genres', { state: { msg: 'Data updated successfully' } });
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
                <h1>Edit Genre</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/view-all-genre"><i className="fa fa-eye"></i>
                    View All Genre</Link></li>
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

                        <label ><span className="text-danger">*</span>Genre Name</label>
                        <input type="text" name="genre" className="form-control" id="genre" maxLength="255" value={editGenre} onChange={(e) => setEditGenre(e.target.value)} />
                        <span className="text-danger">{nameError}</span>
                      </div>
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Status</label>
                        <select className="form-control select2" style={{ width: '100%' }} name="status" value={editStatus} id="status" onChange={(e) => setEditStatus(e.target.value)}
                          required>

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

export default Editgenre