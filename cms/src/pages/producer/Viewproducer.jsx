import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopup from '../../components/Sidebar/DeletePopup';
import { Modal, Button } from 'react-bootstrap';

const Viewproducer = () => {

    const [data, setData] = useState([]);
    const location = useLocation();

    const [show, setShow] = useState(false);
    const [cnf, setCnf] = useState('');

    const parameterValue = location.state && location.state.msg;


    if(parameterValue)
    {
        toast.success(parameterValue,{
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
      const response = await axios.get(`${BASE_URL}/view-all-producer`); 
      setData(response.data.producers);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleconfirm = (data) => {
    //console.log("confirmstatus",data);
    if(data==1)
    {
      handleDelete(cnf);
    }

  };

  const handleDelete = async (id) => {
    //alert(id);
    try {
      const response = await fetch(`${BASE_URL}/delete-producer/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        // Data deleted successfully
        toast.success("Record deleted successfully",{
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
          ? <DeletePopup className='ded' show={true} cofirmstatus={handleconfirm}  onHide={handleClose} />
          : <DeletePopup className='ded' cofirmstatus={handleconfirm} show={false} onHide={handleClose} c/>
      }

    <div class="content-wrapper">

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>View All Producers</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right" data-toggle="modal" data-target="#addModal">
                        <li class="breadcrumb-item"><Link to='/add-producer'><i class="fa fa-plus-circle"></i> Add Producer</Link></li>
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
                            <th>Producer Name</th> 
                            <th>Social Link</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Created At</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {data.map((producer,index) => (
                        <tr >
                            <td>{index+1}</td>
                            <td>{producer.producer_name}</td>  
                            <td>{producer.social_link===undefined? 'N/A':producer.social_link}</td>
                            <td className="project-state">
                                <span className={producer.status==='A'?'badge badge-success':'badge badge-danger'}>{producer.status==='A'?'Active':'Inactive'}</span>
                            </td>
                            <td>{(producer.createdAt).split("T")[0]}</td>
                            <td class="project-actions text-center">
                                							
                                    <Link  to={`/edit-producer/${producer._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>
                                  
                                    <span ><button className="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleShow(producer._id)}> <i className="fas fa-trash"></i><span className="tooltiptext">Delete</span></button></span>
                            </td>
                        </tr>
                    ))} 

                    </tbody>
                </table>
        
            </div>
            {Object.keys(data).length==0 && <p className=' text-center '>No Data Found</p>}
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
export default Viewproducer;