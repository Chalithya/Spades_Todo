const router = require('express').Router();
const Todo = require('../models/Todo');

//Get todo
router.get('/', (req, res) => {
    Todo.find((err, result) => {
        if (err) throw new Error(err);
        res.json(result);
    });
});


//Create new Todo
router.post('/', (req, res) => {
    Todo.create(req.body, (err, result) => {
        if (err) throw new Error(err);
        res.json(result);
    });;
});


//Update Todo
router.put('/:id', (req, res) => {
    Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { returnOriginal: false }, (err, result) => {
        if (err) throw new Error(err);
        res.json(result);
    });
});


//Remove todo
router.delete('/:id', (req, res) => {
    Todo.findOneAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) throw new Error(err);
        res.end();
    });
});




module.exports = router;