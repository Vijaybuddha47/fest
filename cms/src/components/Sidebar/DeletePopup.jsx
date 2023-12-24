import React from 'react'
import {Modal,Button } from 'react-bootstrap';

export default function DeletePopup(props) {
  const handleButtonClick = () => {
    // Call the additional function here
   // handleconfirm();
   console.log("button is clicked")
    props.cofirmstatus(1);
    // Call the original onHide function passed via props
    props.onHide();
  };

  const handleconfirm = () => {
    
  };
  //console.log(props)
  return (

      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>
          {/* <Modal.Title>Delete</Modal.Title> */}
        </Modal.Header>
        <Modal.Body><b>Are you sure you want to delete this ?</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleButtonClick}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
   
  )
}
