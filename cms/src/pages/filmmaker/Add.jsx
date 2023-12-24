import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../../config";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Add = () => {
    const [name, setName] = useState('');
    const [social_link, setSocial] = useState('');
    const [status, setStatus] = useState("A");
    const [description, setDescription] = useState('');
    const [file, setSelectedImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const history = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const filmmakerAdd = async (e) => {
        //console.log(file);
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

        let response = await axios.post(`${BASE_URL}/add-filmmaker`, formData, {

            headers: {
                'Content-type': 'multipart/form-data',
            },
            //body: image
        });

        if (response.status === 201) {
            // Date added successfully
            history('/view-all-filmmakers', { state: { msg: 'Actor Added successfully' } });
        }
        if (response.status != 201) {
            // Handle error
            response = await response.json();
            setErrorMessage(response.message)
        }
    }
    return (
        <>

            <div className="content-wrapper" >
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Add Filmmaker</h1>
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
                                                <input type="text" name="name" className="form-control" id="name" maxLength="255" onChange={(e) => setName(e.target.value)} />
                                                <span className="text-danger">{nameError}</span>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label >Social Link</label>
                                                <input type="text" name="social_link" className="form-control" id="social_link" maxLength="255" onChange={(e) => setSocial(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label >Desciption</label>
                                                <textarea name="short_desc" id="short_desc" class="form-control" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        {/* {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>} */}
                                        <div class="form-group bordergaps bdgaps posterGaps">
                                            <label for="actor_image">Filmmaker Image</label>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <img src="/images/noimg.jpg" alt="poster" />
                                                    <span id="actor_img" class="img-text"></span>
                                                    <label class="input_btn">Select File <input type="file" name="image" class="form-control" id="image" value="" onChange={handleImageChange} accept="image/png, image/jpg, image/jpeg" />
                                                    </label> <b>{file.name}</b><br />
                                                    <small class="text-muted text-image"><i class="fa fa-question-circle"></i>&nbsp;Dimension: 300 x 260px (png, jpg, jpeg)</small>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label ><span className="text-danger">*</span>Status</label>
                                            <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)}>

                                                <option value="A" selected='A'>Active</option>
                                                <option value="I">InActive</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div>

                                    </div>

                                    <div className="card-footer col-md-12">

                                        <button className="btn btn-primary" onClick={filmmakerAdd}><i  ></i> Submit</button>
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

export default Add 