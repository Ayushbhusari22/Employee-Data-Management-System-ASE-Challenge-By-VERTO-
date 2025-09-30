const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');

router.get('/', empController.getAllEmployees);

router.get('/:id', empController.getEmployeeById);

router.post('/', empController.createEmployee);

router.put('/:id', empController.updateEmployee);

router.delete('/:id', empController.deleteEmployee);

module.exports = router;