const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

let items = [];
let nextId = 1;

const emptyContentError = 'Text field is required and cannot be empty';
const noItemError = 'Item not found';

app.get('/', (req, res) => {
  res.send('Welcome to the TODO API! Use /items to manage your TODO list.');
});

app.post('/items', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: emptyContentError });
  }

  const newItem = { id: nextId++, text };
  items.push(newItem);

  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: noItemError });
  }

  if (!text) {
    return res.status(400).json({ error: emptyContentError });
  }

  item.text = text;
  res.json(item);
});


app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: noItemError });
  }

  const deleted = items.splice(index, 1)[0];
  res.json({ message: 'Item deleted', deleted });
});

app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: noItemError });
  }

  res.json(item);
});

app.get('/items', (_, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
