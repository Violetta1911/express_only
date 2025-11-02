const express = require('express');
const app = express();
const port = 8000;
const todoRoutes = require('./modules/todo/todo.routes');
const { errorHandler } = require('./middleware/errorHandler');

app.use(express.json());

app.use('/', todoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
