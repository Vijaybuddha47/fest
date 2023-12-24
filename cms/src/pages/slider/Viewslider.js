import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL,CLOUD_CDN } from "../../config";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePopup from '../../components/Sidebar/DeletePopup';
import { Modal, Button } from 'react-bootstrap';

const ViewSlider = () => {

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
      const response = await axios.get(`${BASE_URL}/get-slider`); 
      setData(response.data.slider);
      console.log(response.data.slider);
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
      const response = await fetch(`${BASE_URL}/remove-slider/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        // Data deleted successfully

        toast.success("Slider deleted successfully",{
            toastId: 'success1',
        })
        fetchData(); // Refresh data after deletion
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  //console.log(Object.keys(data).length);
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
                    <h1>View All Slider</h1>
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
                            <th>Banner Image</th>
                            <th>Order</th>
                            <th>Title</th> 
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                     {data.map((slider,index) => (
                        <tr >
                            <td>{index+1}</td>
                            <td>  <img src={slider.banner===undefined?'/images/noimg.jpg':CLOUD_CDN+slider.banner} width="100" height="50" alt="API Image" /></td>
                            <td>{slider.order}</td> 
                            <td>{slider.title}</td>  

                            <td class="project-actions text-center">
                            <Link  to={`/edit-slider/${slider._id}`} class="btn btn-info btn-sm tooltips"><i class="fas fa-pencil-alt"></i><span class="tooltiptext">Edit</span></Link>
                                    <span ><button className="btn btn-danger btn-sm tooltips delete-btn" onClick={() => handleShow(slider._id)}> <i className="fas fa-trash"></i><span className="tooltiptext">Delete</span></button></span>
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

export default ViewSlider;