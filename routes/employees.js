const express = require('express');
const Employee = require('../model/employee'); 
const routes = express.Router();

// Get All Employees 
routes.get('/emp/employees', async (req, res, next) => {
    try {
        const employeeList = await Employee.find();
        res.status(200).json(employeeList);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

// Get Employee by ID 
routes.get('/emp/employees/:eid', async (req, res, next) => {
    try {
        const employeeId = req.params.eid;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json(employee);
        }
    } catch (error) {
        next(error);
    }
});

// Update Employee 
routes.put('/emp/employees/:eid', async (req, res, next) => {
    try {
        const employeeId = req.params.eid;
        const updatedData = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });

        if (!updatedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json(updatedEmployee);
        }
    } catch (error) {
        next(error);
    }
});

// Delete Employee 
routes.delete('/emp/employees', async (req, res, next) => {
    try {
        const employeeId = req.query.eid;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
routes.use((error, req, res, next) => {
  console.error(error); // Log the error for server-side debugging

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid employee ID format' });
  }
  // Add more error types as necessary

  res.status(500).json({ message: 'An unexpected error occurred' });
});

module.exports = routes;
