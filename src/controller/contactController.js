const contactService = require('../service/contactServices');

class ContactController {
    async createContact(req, res) {
        try {
            const contactData = req.body;
            console.log(contactData);
            const savedContact = await contactService.saveContact(contactData);
            res.status(201).json(savedContact);
        } catch (error) {
            res.status(500).json({ message: 'Error saving contact', error });
        }
    }

    async getContacts(req, res) {
        try {
            const contacts = await contactService.getAllContacts();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving contacts', error });
        }
    }

    async getContact(req, res) {
        try {
            const contact = await contactService.getContactById(req.params.id);
            if (contact) {
                res.status(200).json(contact);
            } else {
                res.status(404).json({ message: 'Contact not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving contact', error });
        }
    }
}

module.exports = new ContactController();
