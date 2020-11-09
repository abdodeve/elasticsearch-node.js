module.exports = function (express, elasticClient) {
  var router = express.Router();
  const TodoController = require("../Controllers/TodoController")(
    elasticClient
  );

  /*
    |--------------------------------------------------------------------------
    |  Todo Routes
    |--------------------------------------------------------------------------
    */
  router.get("/todos", TodoController.fetch);
  router.get("/todos/:id", TodoController.single);
  router.post("/todos", TodoController.index);
  router.put("/todos/:id", TodoController.update);
  router.delete("/todos/:id", TodoController.delete);

  return router;
};
