import React, { Component } from 'react'
import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default class AddContactModal extends Component {

    
  render() {
    const {t,isOpen,toggle} = this.props;
    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
        <ModalHeader tag="h5" className="font-size-16" toggle={toggle}>
            {t('Add Contacts')}
        </ModalHeader>
        <ModalBody className="p-4">
            <Form>
                <div className="mb-4">
                    <Label className="form-label" htmlFor="addcontactemail-input">{t('Email')}</Label>
                    <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
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
  }
}
