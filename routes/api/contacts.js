const express = require('express');
const { contacts: controller } = require('../../controllers');
const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

router.get('/', controller.getContacts);

router.get('/:contactId', isValidId, controller.getContactById);

router.post('/', controller.addContact);

router.delete('/:contactId', isValidId, controller.removeContact);

router.put('/:contactId', isValidId, controller.updateContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  controller.updateContactFavoriteStatus
);

module.exports = router;
