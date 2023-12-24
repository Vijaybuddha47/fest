import React, { useState, useEffect } from 'react';
import {useNavigate, Link, useLocation} from "react-router-dom";
import axios from 'axios';
import { BASE_URL,CLOUD_CDN } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewfestivalVote = () => {

  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchData();
  }, []);

  const parameterValue = location.state && location.state.msg;
  //console.log(parameterValue)
  if(parameterValue)
  {
      toast.success(parameterValue,{
        toastId: 'success1',
    })
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view-all-festival`); 
      setData(response.data.festival);
      //console.log(response.data.filmmaker);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    //alert(id);
    try {
      const response = await fetch(`${BASE_URL}/delete-festival/${id}`, {
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
    <div class="content-wrapper">

<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>View All Vote</h1>
            </div>
            {/* <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right" data-toggle="modal" data-target="#addModal">
                    <li class="breadcrumb-item"><Link to='/add-festival'><i class="fa fa-plus-circle"></i> Add Festival</Link></li>
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
                        <th>Title</th>
                        <th>Thumbnail</th> 
                        <th>Duration(In Minutes)</th>
                        <th>No.Votes per Festival</th>
                        <th class="text-center">Status</th>
                        {/* <th class="text-center">Created At</th> */}
                        {/* <th class="text-center">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                 {data.map((film,index) => (
                    <tr >
                        <td>{index+1}</td>
                        <td>{film.title}</td>
                        <td>  <img src={film.thumbnail===undefined?'/images/noimg.jpg':film.thumbnail} width="100" height="50" alt="API Image" /></td>
                        <td>{film.duration}</td>
                        <td>{film.is_vote}</td>
                      
                        <td className="project-state">
                            <span className={film.status=='A'?'badge badge-success':'badge badge-danger'}>{film.status==='A'?'Active':'Inactive'}</span>
                        </td>
                        <td>{film.createdAt}</td>
                        {/* <td class="project-actions text-center">
                                          
                                <Link  to={`/edit-festival/${film._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>
                              
                                <span ><button className="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleDelete(film._id)}> <i className="fas fa-trash"></i><span className="tooltiptext">Delete</span></button></span>
                        </td> */}
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

export default ViewfestivalVote;