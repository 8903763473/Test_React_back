const Contact = require('../model/contactModel');

class ContactService {
    async saveContact(contactData) {
        const contact = new Contact(contactData);
        return await contact.save();
    }

    async getAllContacts() {
        return await Contact.find({});
    }

    async getContactById(id) {
        return await Contact.findById(id);
    }
}

module.exports = new ContactService();
