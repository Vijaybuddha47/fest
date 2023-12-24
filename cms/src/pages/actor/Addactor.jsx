import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
// import Topnav from '../../Topnav.jsx';
// import Leftnav from '../../Leftnav.jsx';

const Addactor = () => {
    //console.log(BASE_URL);
    const [actor_name, setActor] = useState("");
    const [social_link, setSocial] = useState(undefined);
    const [status, setStatus] = useState("A");
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const history = useNavigate();

    const addActor = async (e) => {
        e.preventDefault();
        if (actor_name.length < 1) {
            setNameError('Please Enter Actor Name');
            return
        } else {
            setNameError('');
            //flag=1;
        }
        let item = { actor_name, social_link, status };
        //console.log(item)
        let response = await fetch(`${BASE_URL}/addactor`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        });

        // result = await result.json();
        if (response.status === 201) {
            // Date added successfully
            history('/view-all-actors', { state: { msg: 'Actor Added successfully' } });
        }
        if (response.status != 201) {
            // Handle error
            response = await response.json();
            setErrorMessage(response.message)
        }


    }

    return (
        <>
            {/* <Leftnav/>
    <Topnav/> */}
            <div className="content-wrapper ">
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
                                                <input type="text" name="actor_name" className="form-control" id="actor_name" maxLength="255" onChange={(e) => setActor(e.target.value)} />
                                                <span className="text-danger">{nameError}</span>
                                            </div>
                                            <div className="form-group col-md-6">

                                                <label >Social Link</label>
                                                <input type="text" name="social_link" className="form-control" id="social_link" maxLength="255" onChange={(e) => setSocial(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">

                                                <label ><span className="text-danger">*</span>Status</label>
                                                <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)}>

                                                    <option value="A" selected='A'>Active</option>
                                                    <option value="I">InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                        {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>}
                                    </div>

                                    <div className="card-footer col-md-12">

                                        <button className="btn btn-primary" onClick={addActor}><i  ></i> Submit</button>
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

export default Addactor