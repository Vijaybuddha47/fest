import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from 'axios';
const Edit = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [social_link, setSocial] = useState("");
  const [status, setStatus] = useState("");
  const [file, setSelectedImage] = useState("");
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-filmmaker/${id}`);

      const item = await response.json();
      //console.log(item);
      setName(item.filmmaker.name);
      setSocial(item.filmmaker.social_link);
      setStatus(item.filmmaker.status);
      setSelectedImage(item.filmmaker.image);
      setDescription(item.filmmaker.description);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (name.length < 1) {
        setNameError('Please Enter Name');
        return
      } else {
        setNameError('');
        //flag=1;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('social_link', social_link);
      formData.append('status', status);
      formData.append('description', description)
      formData.append("file", file);
      formData.append("id", id);
      // console.log(formData);
      let response = axios.put(`${BASE_URL}/update-filmmaker`, formData, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        // body: JSON.stringify({ name,social_link,status,id,file }),
      });
      response = await response;
      //console.log(response.status)
      if (response.status === 200) {

        history('/view-all-filmmakers', { state: { msg: 'Data updated successfully' } });
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // console.log(file);

  return (
    <div className="content-wrapper" >
      <section className="content-header">

        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Update Filmmaker</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/view-all-filmmakers"><i className="fa fa-eye"></i>
                  View All </Link></li>
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
                    <div className="form-group col-md-4">

                      <label ><span className="text-danger">*</span>Filmmaker Name</label>
                      <input type="text" name="name" className="form-control" id="name" maxLength="255" value={name} onChange={(e) => setName(e.target.value)} />
                      <span className="text-danger">{nameError}</span>
                    </div>
                    <div className="form-group col-md-4">

                      <label >Social Link</label>
                      <input type="text" name="social_link" className="form-control" id="social_link" maxLength="255" value={social_link} onChange={(e) => setSocial(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12">
                      <label ><span className="text-danger">*</span>Description</label>
                      <textarea name="short_desc" id="short_desc" class="form-control" rows="3" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                    </div>
                  </div>
                  {/* {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>} */}
                  <div class="form-group bordergaps bdgaps posterGaps">
                    <label for="actor_image">Image</label>
                    <div class="row">
                      <div class="col-md-12">
                        <img src={file === undefined ? '/images/noimg.jpg' : file} alt="poster" />
                        <span id="actor_img" class="img-text"></span>
                        <label class="input_btn">Select File <input type="file" name="image" class="form-control" id="image" value="" onChange={handleImageChange} accept="image/png, image/jpg, image/jpeg" />
                          <span class="invalid-feedback text-danger poster_error" id="span_actor_image"></span>
                        </label><br />
                        <small class="text-muted text-image"><i class="fa fa-question-circle"></i>&nbsp;Dimension: 300 x 260px (png, jpg, jpeg)</small>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label ><span className="text-danger">*</span>Status</label>
                    <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)} value={status}>
                      <option value="A" selected='A'>Active</option>
                      <option value="I">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>

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
  )
}

export default Edit;