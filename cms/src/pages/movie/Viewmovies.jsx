import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../config";
import makeAnimated from 'react-select/animated';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopup from '../../components/Sidebar/DeletePopup';
import { Modal, Button } from 'react-bootstrap';

const Viewmovies = () => {

  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [cnf, setCnf] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCnf(id)
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-film`);
      console.log(response);
      setData(response.data.film);
      //console.log(response.data.filmmaker);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleconfirm = (data) => {
    //console.log("confirmstatus",data);
    if (data == 1) {
      handleDelete(cnf);
    }

  };

  const handleDelete = async (id) => {
    //alert(id);
    try {
      const response = await fetch(`${BASE_URL}/delete-film/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        // Data deleted successfully
        toast.success("Record deleted successfully", {
          toastId: 'success1',
        })
        fetchData(); // Refresh data after deletion
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>

      {
        show
          ? <DeletePopup className='ded' show={true} cofirmstatus={handleconfirm} onHide={handleClose} />
          : <DeletePopup className='ded' cofirmstatus={handleconfirm} show={false} onHide={handleClose} c />
      }
      <div class="content-wrapper">

        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>View All Movies</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right" data-toggle="modal" data-target="#addModal">
                  <li class="breadcrumb-item"><Link to='/add-movie'><i class="fa fa-plus-circle"></i> Add Movie</Link></li>
                </ol>
              </div>
            </div>
          </div>

        </section>

        <section class="content">

          <div class="card">

            <div class="card-body p-0">
              <table class="table table-striped projects table-hover">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Title</th>
                    <th>Banner</th>
                    <th>Duration(In Minutes)</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Created At</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((film, index) => (
                    <tr >
                      <td>{index + 1}</td>
                      <td>{film.title}</td>
                      <td>  <img src={film.banner === undefined ? '/images/noimg.jpg' : film.banner} width="100" height="50" alt="API Image" /></td>
                      <td>{film.duration}</td>

                      <td className="project-state">
                        <span className={film.status == 'A' ? 'badge badge-success' : 'badge badge-danger'}>{film.status === 'A' ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td>{(film.createdAt).split("T")[0]}</td>
                      <td class="project-actions text-center">

                        <Link to={`/edit-movie/${film._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>

                        <span ><button className="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleShow(film._id)}> <i className="fas fa-trash"></i><span className="tooltiptext">Delete</span></button></span>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>

            </div>
            {Object.keys(data).length == 0 && <p className=' text-center '>No Data Found</p>}
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
  )
}

export default Viewmovies;