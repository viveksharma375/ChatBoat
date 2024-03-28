import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, Button, UncontrolledDropdown, Input, Label, Form } from "reactstrap";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
//i18n
import { useTranslation } from 'react-i18next';
import API from '../../../helpers/api';

function Settings(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);

    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [profile, setProfile] = useState(false);
    const [currentImage, setcurrentImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showBTN, setShowBTN] = useState(false)
    const [showBTN2, setShowBTN2] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        location: "California, USA"
    });
    const token = localStorage.getItem("api-access-token") ? localStorage.getItem("api-access-token") : "";
    const apiInstance = new API();
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    const toggleCollapse2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    const toggleCollapse3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen4(false);
    };

    const toggleCollapse4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen2(false);
    };

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const handleFileChange = (e) => {
        console.log("testiiiiiiiiiiiiiiiiiing", e.target.files[0])

        setSelectedFile(e.target.files[0]);
        setShowBTN(true)
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setShowBTN2(true); // Show the submit button when any input field is changed
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        // const response = await fetch('http://10.10.1.75:3004/v1/user/uploadFile', {
        //     method: 'POST',
        //     headers: {
        //         // Add any necessary headers here
        //         'Authorization': `Bearer ${token}`,
        //     },
        //     body: formData,
        // });
        // Handle the response accordingly
    };

    const handleSubmit=async()=>{

    }

    const fetchDetails = async () => {
        const response = await apiInstance.getWithToken("/user/email", token)
        if (response.status) {


            const profileData = response.message.data;
            console.log("profile dats ", profileData)
            setProfile(profileData)
            if (profileData.profilePath) {

                setcurrentImage(profileData.profilePath)
            }
            setFormData({
                firstName: profileData.firstName || "",
                lastName: profileData.lastName || "",
                email: profileData.email || "",
                phoneNumber: profileData.phoneNumber || "",
            });
        }
    }

    const toggleLightbox = (currentImage) => {
        setisOpen(!isOpen);
    };
    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <>
            {profile && <div>
                <div className="px-4 pt-4">
                    <h4 className="mb-0">{t('Settings')}</h4>
                </div>

                <div className="text-center border-bottom p-4">
                    <div className="mb-4 profile-user">
                        {currentImage ?
                            <div className="">
                                <img
                                    src={currentImage}

                                    className="rounded-circle avatar-lg img-thumbnail"
                                    alt={profile.firstName}
                                    onClick={() => toggleLightbox(currentImage)}

                                />
                            </div>
                            :
                            <div
                                className={"d-flex align-items-center justify-content-center"
                                }
                            >
                                <div className="avatar-lg d-flex align-items-center justify-content-center rounded-circle bg-soft-primary text-primary">
                                    {/* <span className="avatar-title rounded-circle bg-soft-primary text-primary"> */}
                                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}

                                    {/* </span> */}
                                </div>

                            </div>
                        }


                        {/* <Button type="button" color="light" className="avatar-xs p-0 align-items-center rounded-circle profile-photo-edit"> */}
                        <Form onSubmit={(e) => handleUpload(e)}>
                            <Label for="profilePicture" color="light" className="avatar-xs bg-light p-0 align-items-center rounded-circle profile-photo-edit">
                                <i className="ri-pencil-fill"></i></Label>
                            <Input id="profilePicture" onChange={(e) => handleFileChange(e)} type="file" name="fileInput" size="60" style={{ display: 'none' }} />
                            <Button type="submit" className="avatar-xs  p-0 align-items-center "><i className='ri-upload-fill'></i></Button>
                            {/* </Button> */}
                        </Form>


                    </div>

                    <h5 className="font-size-16 mb-1 text-truncate">{t(profile.firstName + " " + profile.lastName)}</h5>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline-block mb-1">
                        <DropdownToggle tag="a" className="text-muted pb-1 d-block" >
                            {t('Available')} <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem>{t('Available')}</DropdownItem>
                            <DropdownItem>{t('Busy')}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {/* End profile user */}

                {/* Start User profile description */}
                <SimpleBar style={{ maxHeight: "100%" }} className="p-4 user-profile-desc">

                    <div id="profile-setting-accordion" className="custom-accordion">
                        <Card className="shadow-none border mb-2">
                            <Form onSubmit={handleSubmit}>
                                <CustomCollapse
                                    title="Personal Info"
                                    isOpen={isOpen1}
                                    toggleCollapse={toggleCollapse1}
                                >

                                    <div className="float-end">
                                        <Button color="light" size="sm" type="button" ><i className="ri-edit-fill me-1 align-middle"></i> {t('Edit')}</Button>
                                    </div>

                                    <div>
                                        <p className="text-muted mb-1">{t('FirstName')}</p>
                                        <h5 className="font-size-14">{t(profile.firstName)}</h5>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1">{t('Last Name')}</p>
                                        <h5 className="font-size-14">{t(profile.lastName)}</h5>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-muted mb-1">{t('Email')}</p>
                                        <h5 className="font-size-14">{t(profile.email)}</h5>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-muted mb-1">{t('Phone Number')}</p>
                                        <h5 className="font-size-14">{t(profile.phoneNumber)}</h5>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-muted mb-1">{t('Location')}</p>
                                        <h5 className="font-size-14 mb-0">{t('California, USA')}</h5>
                                    </div>
                                </CustomCollapse>
                            </Form>
                        </Card>
                        {/* end profile card */}

                        <Card className="shadow-none border mb-2">
                            <CustomCollapse
                                title="Privacy"
                                isOpen={isOpen2}
                                toggleCollapse={toggleCollapse2}
                            >

                                <div className="py-3">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Profile photo')}</h5>
                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>{t('Everyone')}</DropdownItem>
                                                <DropdownItem>{t('selected')}</DropdownItem>
                                                <DropdownItem>{t('Nobody')}</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Last seen')}</h5>

                                        </div>
                                        <div className="ms-2">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="privacy-lastseenSwitch" defaultChecked />
                                                <Label className="form-check-label" htmlFor="privacy-lastseenSwitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Status')}</h5>

                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>{t('Everyone')}</DropdownItem>
                                                <DropdownItem>{t('selected')}</DropdownItem>
                                                <DropdownItem>{t('Nobody')}</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Read receipts')}</h5>

                                        </div>
                                        <div className="ms-2">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="privacy-readreceiptSwitch" defaultChecked />
                                                <Label className="form-check-label" htmlFor="privacy-readreceiptSwitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-3 border-top">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Groups')}</h5>

                                        </div>
                                        <UncontrolledDropdown className="ms-2">
                                            <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-end">
                                                <DropdownItem>{t('Everyone')}</DropdownItem>
                                                <DropdownItem>{t('selected')}</DropdownItem>
                                                <DropdownItem>{t('Nobody')}</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>
                        {/* end Privacy card */}

                        <Card className="accordion-item border mb-2">
                            <CustomCollapse
                                title="Security"
                                isOpen={isOpen3}
                                toggleCollapse={toggleCollapse3}
                            >

                                <div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-13 mb-0 text-truncate">{t('Show security notification')}</h5>

                                        </div>
                                        <div className="ms-2 me-0">
                                            <div className="form-check form-switch">
                                                <Input type="checkbox" className="form-check-input" id="security-notificationswitch" />
                                                <Label className="form-check-label" htmlFor="security-notificationswitch"></Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>
                        {/* end Security card */}

                        <Card className="shadow-none border mb-2">
                            <CustomCollapse
                                title="Help"
                                isOpen={isOpen4}
                                toggleCollapse={toggleCollapse4}
                            >

                                <div>
                                    <div className="py-3">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('FAQs')}</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('Contact')}</Link></h5>
                                    </div>
                                    <div className="py-3 border-top">
                                        <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('Terms & Privacy policy')}</Link></h5>
                                    </div>
                                </div>
                            </CustomCollapse>
                        </Card>
                        {/* end Help card */}
                    </div>
                    {/* end profile-setting-accordion */}
                </SimpleBar>
                {/* End User profile description */}
                {isOpen && currentImage && (
                    <Lightbox
                        mainSrc={currentImage}
                        onCloseRequest={toggleLightbox}
                        imageTitle="Profile Picture"
                    />
                )}
            </div>}
        </>

    );
}

export default Settings;