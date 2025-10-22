const express = require('express');
const app = express();
const port = 8000;
const todoRoutes = require('./modules/todo/todo.routes');

app.use(express.json());
app.use('/', todoRoutes);


app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
