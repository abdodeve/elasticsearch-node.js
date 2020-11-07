const TodoModel = require('../Models/TodoModel');


/**
 * GET /api/todos
 * Get All Todos
 */
exports.fetch = function (req, res) {
    TodoModel.find({}, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "todos": data});
    })
};

/**
 * GET /api/todos/:id
 * Get Single Todo
 */
exports.single = function (req, res) {
    TodoModel.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        res.json({"success": true, "todo": data});
    })
};

/**
 * POST /api/todos
 * Create new Todo
 */
exports.create = function (req, res) {
    // Prepare object
    let todoModel = new TodoModel(
        {
            title: req.body.title,
            description: req.body.description,
            is_done: req.body.is_done
        }
    );

    // Save
    todoModel.save(function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "Todo Created successfully"});
    });
};

/**
 * PUT /api/todos
 * Update Todo
 */
exports.update = function (req, res, next) {
    TodoModel.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
        if (err) return next(err);
        res.json({"success": true, "message": "Todo upated"});
    });
};

/**
 * DELETE /api/todos
 * Delete todo
 */
exports.delete = function (req, res, next) {
    TodoModel.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({"success": true, "message": "Todo deleted"});
    })
};