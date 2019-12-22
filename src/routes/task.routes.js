//Express tools
const express = require('express');
const router = express.Router();

//Task schema
const  Task = require('../models/task');

//Get all task
router.get('/', async (req, res) => {
    const task = await Task.find();
    res.json(task);
});

//Get an specific task
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//Add a new task
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({
        status : 'Task saved!'
    });
});

//Update a task
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({
        status : 'Task updated!'
    })
});

//Delete an specific task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        status : "Task Deleted!"
    })
});

module.exports = router;
