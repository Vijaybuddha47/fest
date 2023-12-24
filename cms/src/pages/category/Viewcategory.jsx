import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopup from '../../components/Sidebar/DeletePopup';
import { Modal, Button } from 'react-bootstrap';

const Viewcategory = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [cnf, setCnf] = useState('');
  // const [showPopup, setShowPopup] = useState(false);
  const parameterValue = location.state && location.state.msg;
  //console.log(parameterValue)
  if (parameterValue) {
    toast.success(parameterValue, {
      toastId: 'success1',
    })
  }

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCnf(id)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-category`);
      // console.log(response.data)
      setData(response.data.CategorysList);

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
      const response = await fetch(`${BASE_URL}/delete-category/${id}`, {
        method: 'DELETE',
      });
      //console.log(response.status);
      if (response.status === 200) {
        // Data deleted successfully
        fetchData(); // Refresh data after deletion
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  //console.log(data);
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
                <h1>View All category</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right" data-toggle="modal" data-target="#addModal">
                  <li class="breadcrumb-item"><Link to='/add-category'><i class="fa fa-plus-circle"></i> Add Category</Link></li>
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
                    <th>category Name</th>
                    <th>Order</th>
                    <th>Created On</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((category, index) => (
                    <tr >
                      <td>{index + 1}</td>
                      <td>{category.cat_name}</td>
                      <td>{category.order}</td>
                      <td>{(category.createdAt).split("T")[0]}</td>

                      <td className="project-state">
                        <span className={category.status === 'A' ? 'badge badge-success' : 'badge badge-danger'}>{category.status === 'A' ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td class="project-actions text-center">

                        <Link to={`/edit-category/${category._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>

                        <span ><button class="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleShow(category._id)}> <i class="fas fa-trash"></i><span class="tooltiptext">Delete</span></button></span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

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
  )
}

export default Viewcategory