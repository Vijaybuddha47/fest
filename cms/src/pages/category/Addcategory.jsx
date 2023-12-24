import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
function AddCategory() {
    const [category, setGenre] = useState("");
    const [status, setStatus] = useState("A");
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    async function addgenre() {
        let item = { cat_name: category, status };

        let result = await fetch(`${BASE_URL}/add-category`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        });

        //result = await result.json();
        if (result.status === 201) {
            // Date added successfully
            history('/view-all-category', { state: { msg: 'category Added successfully' } });
        }
        if (result.status != 201) {
            // Handle error
            result = await result.json();
            setErrorMessage(result.message)
        }

    }

    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">

                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Add Category</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/view-all-category"><i className="fa fa-eye"></i>
                                        View All Category</Link></li>
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

                                                <label ><span className="text-danger">*</span>Category Name</label>
                                                <input type="text" name="category" className="form-control" id="category" maxLength="255" onChange={(e) => setGenre(e.target.value)} />

                                            </div>
                                            <div className="form-group col-md-6">

                                                <label ><span className="text-danger">*</span>Status</label>
                                                <select className="form-control select2" style={{ width: '100%' }} name="status" id="status" onChange={(e) => setStatus(e.target.value)} defaultValue={status}
                                                    required>

                                                    <option value="A" selected='A'>Active</option>
                                                    <option value="I">InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                        {errorMessage && <p className="text-danger">Error Message: {errorMessage}</p>}
                                    </div>

                                    <div className="card-footer col-md-12">

                                        <button className="btn btn-primary" onClick={addgenre}><i  ></i> Submit</button>
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
    );
}

export default AddCategory;
