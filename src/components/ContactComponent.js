import React, { Component } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const ContactComponent = ({ keys, contact }) => {

    return (

        <div key={keys} className={keys + 1 === 1 ? "" : "mt-3"}>
            <div className="p-3 fw-bold text-primary">
                {contact.group}
            </div>

            <ul className="list-unstyled contact-list">
                {
                    contact.children.map((child, key) =>
                        <li key={child.id} >
                            <div className="d-flex align-items-center">
                                <div
                                    className={
                                        "chat-user-img " +
                                        " align-self-center me-3 ms-0"
                                    }
                                >
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                            {child.firstName.charAt(0)}{child.lastName.charAt(0)}

                                        </span>
                                    </div>

                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="font-size-14 m-0">{child.firstName} {child.lastName}</h5>
                                    <p>{child.email}</p>
                                </div>
                                {/* <UncontrolledDropdown>
                                                            <DropdownToggle tag="a" className="text-muted">
                                                                <i className="ri-more-2-fill"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem>{t('Share')} <i className="ri-share-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Block')} <i className="ri-forbid-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Remove')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown> */}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>


    )
}

export default ContactComponent;