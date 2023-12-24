import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from "../../config";
import DeletePopup from '../../components/Sidebar/DeletePopup';
import { Modal, Button } from 'react-bootstrap';

 const Viewuser = () => {
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

    const handleconfirm = (data) => {
      
      if(data==1)
      {
        handleDelete(cnf);
      }
  
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/view-all-users`); 
        setData(response.data.users);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleDelete = async (id) => {
      
      try {
        const response = await fetch(`${BASE_URL}/delete-user/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 200) {
          // Data deleted successfully
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
                <h1>View All Users</h1>
            </div>
            {/* <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right" data-toggle="modal" data-target="#addModal">
                    <li class="breadcrumb-item"><Link to='/add-producer'><i class="fa fa-plus-circle"></i> Add Producer</Link></li>
                </ol>
            </div> */}
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
                        <th>Name</th> 
                        <th>Email</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Created At</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                 {data.map((user,index) => (
                    <tr >
                        <td>{index+1}</td>
                        <td>{user.name}</td>  
                        <td>{user.email}</td>
                        <td className="project-state">
                            <span className={user.status==='A'?'badge badge-success':'badge badge-danger'}>{user.status==='A'?'Active':'Inactive'}</span>
                        </td>
                        <td>{(user.createdAt).split("T")[0]}</td>
                        <td class="project-actions text-center">
                                                        
                                <Link  to={`/edit-user/${user._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>
                              
                                <span ><button className="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleShow(user._id)}> <i className="fas fa-trash"></i><span className="tooltiptext">Delete</span></button></span>
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
    </>
  )
}

export default Viewuser;