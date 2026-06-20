const express = require('express');
const logRequest = require('./logger');
const validateTodo = require('./validator');
const validateTodoPatch = require('./validatorTODOpatch');
const cors = require('cors');
const app = express();
const errorHandler = require('./errorHandler');
app.use(validateTodoPatch); // Apply validation middleware for PATCH requests
app.use(express.json()); // Parse JSON bodies
app.use(validateTodo); // Apply validation middleware
app.use(errorHandler); // Apply error-handling middleware

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(logRequest); // Custom logging middleware


let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All – Read
app.get('/todos', (req, res, next) => {
  res.status(200).json(todos); // Send array as JSON
});
    // Get a SINGLE todo by ID using a URL parameter (:id)
    app.get('/todos/:id', (req, res, next) => {
      try { 
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
}
      catch (error) {
        next(error); // Pass error to error-handling middleware
      }   
    });

// POST New – Create
app.post('/todos', validateTodo, (req, res, next) => {
  try {
    const { task, completed = false } = req.body;
    if (!task || task.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "The 'task' field is required and cannot be empty."
    });
  }
  const newTodo = {
    id: todos.length + 1,
    task: task.trim(),
    completed,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
} catch (error) {
  next(error); // Pass error to error-handling middleware
}
});

// PATCH Update – Partial
app.patch('/todos/:id', validateTodoPatch, (req, res, next) => {
 try { const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
  }
  catch (error) {
    next(error); // Pass error to error-handling middleware
  }
});

// DELETE Remove
app.delete('/todos/:id', (req, res, next) => {
try {   const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
} catch (error) {
  next(error); // Pass error to error-handling middleware
}
});

app.get('/todos/completed', (req, res, next) => {
  try {
   const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
