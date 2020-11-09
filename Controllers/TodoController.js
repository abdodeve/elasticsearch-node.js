/**
 * GET /api/todos
 * Get All Todos
 */
module.exports = function (elasticClient) {
  return {
    /**
     * GET /api/todos
     * Get All Todos
     */
    fetch: async function (req, res) {
      try {
        const result = await elasticClient.search({
          index: "my_index_products",
        });
        res.json({ success: true, todos: result });
      } catch (error) {
        console.error(error);
        res.json({ error: true, details: error });
      }
    },
    /**
     * GET /api/todos/:id
     * Get Single Todo
     */
    single: async function (req, res) {
      try {
        const result = await elasticClient.get({
          index: "my_index_products",
          id: req.params.id,
        });
        res.json({ success: true, todos: result });
      } catch (error) {
        console.error(error);
        res.json({ error: true, details: error });
      }
    },
    /**
     * POST /api/todos
     * Create new Todo
     */
    index: async function (req, res) {
      try {
        const result = await elasticClient.index({
          index: "my_index_products",
          body: {
            product_name: req.body.product_name,
            price: req.body.price,
          },
          refresh: true,
        });
        res.json({ success: true, todos: result });
      } catch (error) {
        console.error(error);
        res.json({ error: true, details: error });
      }
    },
    /**
     * PUT /api/todos/:id
     * Update Todo
     */
    update: async function (req, res) {
      try {
        const result = await elasticClient.update({
          index: "my_index_products",
          id: req.params.id,
          body: {
            doc: {
              price: req.body.price,
            },
          },
        });
        res.json({ success: true, todos: result });
      } catch (error) {
        console.error(error);
        res.json({ error: true, details: error });
      }
    },
    /**
     * DELETE /api/todos/:id
     * Delete todo
     */
    delete: async function (req, res) {
      try {
        const result = await elasticClient.delete({
          index: "my_index_products",
          id: req.params.id,
        });
        res.json({ success: true, todos: result });
      } catch (error) {
        console.error(error);
        res.json({ error: true, details: error });
      }
    },
  };
};
