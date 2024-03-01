import React, { useState } from 'react';
import "./CommonModal.scss";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {CommonModalProps} from "../../interfaces/index";



const CommonModal: React.FC<CommonModalProps> = ({children,  modalText }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
              {children}
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    {modalText}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CommonModal;
