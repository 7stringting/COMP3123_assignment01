const express = require('express');
const employeeModel = require('../model/employee'); 
const routes = express.Router();

// Get All Employees 
routes.get('/employees', async (req, res, next) => {
    try {
        const employeeList = await employeeModel.find();
        res.status(200).json(employeeList);
    } catch (error) {
        next(error); 
    }
});

// Create Employee
routes.post("/employees", async (req, res) => {
    console.log(req.body);
    try {
        const newEmployee = new employeeModel({
            ...req.body
        });
        await newEmployee.save();
        res.status(201).json(newEmployee); 
    } catch(error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Get Employee by ID 
routes.get('/employees/:eid', async (req, res, next) => {
    try {
        const employeeId = req.params.eid;
        const employee = await employeeModel.findById(employeeId);

        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json(employee);
        }
    } catch (error) {
        next(error);
    }
});

// Update Employee by ID
routes.put('/employees/:eid', async (req, res, next) => {
    try {
        const employeeId = req.params.eid;
        const updatedData = req.body;
        const updatedEmployee = await employeeModel.findByIdAndUpdate(employeeId, updatedData, { new: true });

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
routes.delete('/employees/:eid', async (req, res, next) => {
    try {
        const employeeId = req.params.eid;
        const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
});

routes.use((error, req, res, next) => {
  console.error(error); 

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid employee ID format' });
  }
  res.status(500).json({ message: 'An unexpected error occurred' });
});

module.exports = routes;
