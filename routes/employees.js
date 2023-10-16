const express = require('express');
const Employee = require('../model/employee'); 
const routes = express.Router();

// Get All Employees 
routes.get('/emp/employees', async (req, res) => {
    try {
        const employeeList = await Employee.find();
        res.status(200).json(employeeList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Employee by ID 
routes.get('/emp/employees/:eid', async (req, res) => {
    try {
        const employeeId = req.params.eid;

        // Find the employee in the database based on the provided ID
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee); // Return the employee details
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Employee 
routes.put('/emp/employees/:eid', async (req, res) => {
    try {
        const employeeId = req.params.eid;
        const updatedData = req.body;

        // Update the employee's information in the database
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee); // Return the updated employee details
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Employee 
routes.delete('/emp/employees', async (req, res) => {
    try {
        const employeeId = req.query.eid;

        // Find and remove the employee from the database based on the provided ID
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = routes;
