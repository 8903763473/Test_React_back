const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.post('/send', contactController.createContact);
router.get('/getAllcontacts', contactController.getContacts);
router.get('/getcontactbyId/:id', contactController.getContact);

module.exports = router;
