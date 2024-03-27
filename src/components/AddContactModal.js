import React, { Component, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import MultiselectCheckboxes from 'react-multiselect-checkboxes'; 
import API from '../helpers/api';
import ContactItem from './ContactItem';
const AddContactModal = ({ t, isOpen, toggle }) => {
    const [selectedEmails, setSelectedEmails] = useState([]); // State variable to hold selected emails
    const [emailData, setEmailData] = useState([]); // State variable to hold email data fetched from API
    const apiInstance = new API();
    const token = localStorage.getItem("api-access-token")?localStorage.getItem("api-access-token"):null
    useEffect(() => {
        // Fetch email data from API using useEffect
        // Example: Replace the fetchEmailData function with your actual API call
        const fetchEmailData = async () => {
            try {
                const response = await apiInstance.getWithToken("/user/",token)
               
                if (response.status) {
            
            
                    const data = response.message.data;
                   console.log("sdifhoesofihsoihf",data)
                    setEmailData(data);
                }
                // setEmailData(data); // Set email data in state
            } catch (error) {
                console.error('Error fetching email data:', error);
            }
        };

        fetchEmailData(); // Call fetchEmailData function
    }, []);

  

    // Function to handle selection of emails
    const handleEmailSelection = (selectedItems) => {
        setSelectedEmails(selectedItems); // Update selectedEmails state variable
    };


    return (
        (emailData.length>0 &&
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggle}>
                {t('Add Contacts')}
            </ModalHeader>
            <ModalBody className="p-4">
                <Form>
                    <div className="mb-4" style={{
   
    height: 400,
    padding: '8px',
    minWidth:400,
   
  }}>
                        <Label className="form-label" htmlFor="addcontactemail-input">{t('Select contact')}</Label>
                        <ContactItem allcontacts={emailData}/>
                        {/* <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" /> */}
                    </div>
                    <div>
                        <Label className="form-label" htmlFor="addcontact-invitemessage-input">{t('Invatation Message')}</Label>
                        <textarea className="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="link" onClick={toggle}>Close</Button>
                <Button type="button" color="primary">Invite Contact</Button>
            </ModalFooter>
        </Modal>
        )
    )

}

export default AddContactModal;