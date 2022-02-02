const { Router } = require("express");
const Todo = require("../models/Todo");

const router = Router();

router.get("/todo", async (req, res) => {
  const todo = await Todo.find().sort({completed: 1})
  res.send(todo);
});
router.post("/todo", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  await todo.save();
  res.send(todo);
});

router.delete("/todo/delete/:id", async (req, res) => {
  const del = await Todo.deleteOne({ _id: req.params.id });
  res.send(del);
});

router.put("/todo/success/:id", async (req, res) => {
  const success = await Todo.updateOne({_id: req.params.id}, { completed: true })
  res.send(success)
})

module.exports = router;
