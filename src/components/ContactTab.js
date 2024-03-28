import React, { Component } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const ContactTab=({ keys, contact,t })=> {

    return (
      
        <div key={keys} className={keys + 1 === 1 ? "" : "mt-3"}>
                                    <div className="p-3 fw-bold text-primary">
                                        {contact.group}
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        {
                                            contact.children.map((child) =>
                                                <li key={child.id} >
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <h5 className="font-size-14 m-0">{child.firstName} {child.lastName}</h5>
                                                        </div>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag="a" className="text-muted">
                                                                <i className="ri-more-2-fill"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem>{t('Share')} <i className="ri-share-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Block')} <i className="ri-forbid-line float-end text-muted"></i></DropdownItem>
                                                                <DropdownItem>{t('Remove')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
        
     
    )
  }

  export default ContactTab;
