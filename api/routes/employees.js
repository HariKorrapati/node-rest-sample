//router for end points related to Employee
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const EmployeeController = require('../controllers/employees.controller');

router.get('/', EmployeeController.get_all_employees);
router.post('/', checkAuth, EmployeeController.add_employee);
router.get('/:employeeNumber', EmployeeController.get_employee);
router.delete('/:employeeNumber', checkAuth, EmployeeController.delete_employee);

module.exports = router;