const TodoController = require("../Controllers/TodoController");

module.exports = function (express) {
  var router = express.Router();

  /*
    |--------------------------------------------------------------------------
    |  Todo Routes
    |--------------------------------------------------------------------------
    */
  router.get("/todos", TodoController.fetch);
  router.get("/todos/:id", TodoController.single);
  router.post("/todos", TodoController.create);
  router.put("/todos/:id", TodoController.update);
  router.delete("/todos/:id", TodoController.delete);

  return router;
};
