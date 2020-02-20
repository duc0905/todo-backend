const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));

let id = 0;
let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  todos.push({
    id,
    todo: req.body.newTodo
  });

  id++;
  res.json({ message: "Success" });
});

app.delete("/todos/:id", (req, res) => {
  let exists = false;
  for(let todo of todos) {
    if (todo.id == req.params.id) {
      exists = true;
    }
  }

  if (!exists) {
    res.json({ message: "Todo not found" });
  } else {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.json({ message: "Success" });
  }
});

app.listen(8080, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Server is listening on port 8080');
  }
});