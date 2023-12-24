import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";

const Editcategory = () => {

  const history = useNavigate();
  const { id } = useParams();

  const [editcategory, setEditcategory] = useState('');
  const [editorder, setEditorder] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await fetch(`${BASE_URL}/get-category/${id}`);
      const item = await response.json();
      //console.log(item);l
      setEditcategory(item.CategoryData.cat_name);
      setEditorder(item.CategoryData.order)
      setEditStatus(item.CategoryData.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const body = { cat_name: editcategory, status: editStatus, order: editorder, id };
      setLoading(true);
      const update = await axios.put(`${BASE_URL}/update-category`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then(response => {
          console.log(response);
          setErrorMsg('');
          setLoading(false);
          history('/view-all-category', { state: { msg: 'Data updated successfully' } });
        })
        .catch(error => {
          console.log(error);
          setErrorMsg(error.response.data.message);
          setLoading(false);
        });

      // const response = await fetch(`${BASE_URL}/update-category`, {
      //   method: 'PUT', // or 'PATCH' depending on your API
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },

      //   body: JSON.stringify({ cat_name: editcategory, status: editStatus, order: editorder, id }),
      // });

      // if (response.status === 200) {
      //   history('/view-all-category', { state: { msg: 'Data updated successfully' } });
      // }


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
                <h1>Edit Category</h1>
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
              <div className="col-md-12 text-center">
                {errorMsg && <span style={{ color: 'red', fontSize: '1.4rem', fontWeight: '600' }}>{errorMsg}</span>}
              </div>
              <div className="col-md-12">

                <div className="card card-primary">

                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Category Name</label>
                        <input type="text" name="category" className="form-control" id="category" maxLength="255" value={editcategory} onChange={(e) => setEditcategory(e.target.value)} />

                      </div>
                      <div className="form-group col-md-6">

                        <label ><span className="text-danger">*</span>Category Order</label>
                        <input type="text" name="category" className="form-control" id="category" maxLength="255" value={editorder} onChange={(e) => setEditorder(e.target.value)} />

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

                    <button className="btn btn-primary" onClick={handleSave}>Update {loading && <span className="custom-spinner"></span>}</button>
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

export default Editcategory