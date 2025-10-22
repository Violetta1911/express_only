let items = [];
let nextId = 1;

const emptyContentError = 'Text field is required and cannot be empty';
const noItemError = 'Item not found';

exports.getWelcome = (req, res) => {
  res.send('Welcome to the TODO API! Use /items to manage your TODO list.');
};

exports.getAllItems = (_, res) => {
  res.json(items);
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: noItemError });
  }

  res.json(item);
};

exports.createItem = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: emptyContentError });
  }

  const newItem = { id: nextId++, text };
  items.push(newItem);

  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
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
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: noItemError });
  }

  const deleted = items.splice(index, 1)[0];
  res.json({ message: 'Item deleted', deleted });
};
