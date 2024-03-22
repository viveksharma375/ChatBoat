import React, { Component, useEffect, useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, InputGroup, } from 'reactstrap';
import SimpleBar from "simplebar-react";

import { connect } from "react-redux";

import { withTranslation } from 'react-i18next';
import ContactTab from '../../../components/ContactTab';
import AddContactModal from '../../../components/AddContactModal';
import axios from 'axios';

//use sortedContacts variable as global variable to sort contacts
let sortedContacts = [
    {
        group: "A",
        children: [{ name: "Demo" }]
    }
]

const Contacts = ({ t }) => {
    const [modal, setModal] = useState(false);
    const [contacts, setContacts] = useState([]);

    const toggle = () => {
        setModal(!modal);
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://10.10.1.75:3004/v1/contact/find/', {
                method: "GET",
                headers: {
                    'Content-type': "application/json",
                    'api-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMSsrRVN0QnFBMkowL3ZzYkhGZ3dKcU1wbng2MVVUUXFZd2gvYm43bGk1RDl2MDBMV2pKZDR1UzE1NmMrZWhKNURrdllORkVnT3Uwd2xycFYxajNNbTFOcDZQRzhhYnIyaTVCVVFvMmRRSnE5czVrVHMvbTFKMmtES3NpTUVZbHZkUzdLcWRKdXorWC9iVU9EUWNrdVFOZ09lbW1EUDN4Q1lBPSIsImlhdCI6MTcxMTA5MDg2NSwiaXNzIjoieHJwYXltZW50In0.tl9IFYmWf2UtQteLUtQu69qa6xg7DifJN8BNwHZBRNM`
                }
            });

            const responseData = await response.json();
            const contactsData = responseData.data.result.data;
            setContacts(contactsData);
            sortContact(contactsData);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const sortContact = (contactsData) => {
        let data = contactsData.reduce((r, e) => {
            try {
                let group = e.firstName[0];
                if (!r[group]) r[group] = { group, children: [e] };
                else r[group].children.push(e);
            } catch (error) {
                return sortedContacts;
            }
            return r;
        }, {});
        let result = Object.values(data);
        setContacts(result);
        sortedContacts = result;
        return result;
    };


    
        return (

            <div>
                <div className="p-4">
                    <div className="user-chat-nav float-end">
                        <div id="add-contact">
                            {/* Button trigger modal */}
                            <Button type="button" color="link" onClick={toggle} className="text-decoration-none text-muted font-size-18 py-0">
                                <i className="ri-user-add-line"></i>
                            </Button>
                        </div>
                        <UncontrolledTooltip target="add-contact" placement="bottom">
                            Add Contact
                        </UncontrolledTooltip>
                    </div>
                    <h4 className="mb-4">Contacts</h4>

                    {/* Start Add contact Modal */}

                    <AddContactModal t={t} isOpen={modal} toggle={toggle} />
                    {/* End Add contact Modal */}

                    <div className="search-box chat-search-box">
                        <InputGroup size="lg" className="bg-light rounded-lg">
                            <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </Button>
                            <Input type="text" className="form-control bg-light " placeholder={t('Search users..')} />
                        </InputGroup>
                    </div>
                    {/* End search-box */}
                </div>
                {/* end p-4 */}

                {/* Start contact lists */}
                <SimpleBar style={{ maxHeight: "100%" }} id="chat-room" className="p-4 chat-message-list chat-group-list">

                    {
                        sortedContacts.map((contact, key) =>
                            <ContactTab keys={key} contact={contact} t={t} />
                        )
                    }

                </SimpleBar>
                {/* end contact lists */}
            </div>
        );
    }


// const mapStateToProps = (state) => {
//     const { contacts } = state.Chat;
//     return { contacts };
// };

export default withTranslation()(Contacts);