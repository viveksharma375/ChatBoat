import React, { useEffect, useState } from "react";
import { Button, Input, InputGroup, UncontrolledTooltip } from "reactstrap";
import API from "../../../helpers/api";
import { useSelector } from "react-redux";
import config from "../../../config";

const Invites = () => {
  const [contacts, setContacts] = useState([]);
  const apiInstance = new API();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiInstance.getWithToken(
        "/contact/fetchInvites",
        token
      );
      if (response.status) {
        setContacts(response.message.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleIgnore = (contactId) => {
    // Handle ignore action
  };

  const handleAccept = async (contactemail) => {
    // Handle accept action
    let obj = {
      senderEmail: contactemail,
    };
    const response = await apiInstance.postWithToken(
      "/contact/connect",
      obj,
      token
    );
    if (response.status) {
      fetchContacts();
    }
  };

  return (
    <div>
      <div className="p-4">
        <h4 className="mb-4">Notifications</h4>

        <div className="search-box chat-search-box">
          <InputGroup size="lg" className="mb-3 rounded-lg">
            <span className="input-group-text text-muted bg-light pe-1 ps-3">
              <i className="ri-search-line search-icon font-size-18"></i>
            </span>
            <Input
              type="text"
              className="form-control bg-light"
              placeholder="Search Invites"
            />
          </InputGroup>
        </div>
        {contacts ? (
          <div>
            <ul className="list-unstyled contact-list">
              {contacts?.map((contact) => (
                <li key={contact.id}>
                  <div className="d-flex align-items-center">
                    {contact.profilePath ? (
                      <div
                        className={
                          "chat-user-img " + " align-self-center me-3 ms-0"
                        }
                      >
                        <img
                          src={`${config.BASE_URL}${contact.profilePath}`}
                          className="rounded-circle avatar-xs"
                          alt="pic"
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          "chat-user-img " + " align-self-center me-3 ms-0"
                        }
                      >
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                            {contact.firstName.charAt(0)}
                            {contact.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                      <div className="mr-3">
                        <h5 className="font-size-14 m-0">
                          {contact.firstName} {contact.lastName}
                        </h5>
                        <p>{contact.email}</p>
                      </div>
                      <div>
                        <Button
                          color="secondary"
                          className="btn-sm me-2"
                          onClick={() => handleIgnore(contact.email)}
                        >
                          Ignore
                        </Button>
                        <Button
                          color="primary"
                          className="btn-sm"
                          onClick={() => handleAccept(contact.email)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <span>No new invites</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invites;
