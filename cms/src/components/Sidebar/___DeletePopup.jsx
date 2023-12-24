import React from 'react'
import {Modal,Button } from 'react-bootstrap';

export default function DeletePopup(props) {
  console.log(props)
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
          <Button variant="primary" onClick={props.onHide}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
   
  )
}
