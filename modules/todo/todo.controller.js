const todoService = require('./todo.service');
const { ERROR_CODES } = require('../../utils/errorCodes');

const getWelcome = (_, res) => {
  res.send('Welcome to the TODO API! Use /items to manage your TODO list.');
};

const getAllItems = (_, res) => {
  res.json(todoService.getAllItems());
};

const getItemById = (req, res, next) => {
  const { id } = req.params;
  try {
    const item = todoService.getItemById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const createItem = (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      const error = new Error();
      error.code = ERROR_CODES.EMPTY_CONTENT;
      throw error;
    }

    const newItem = todoService.createItem(text.trim());
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

const updateItem = (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      const error = new Error();
      error.code = ERROR_CODES.EMPTY_CONTENT;
      throw error;
    }

    const updated = todoService.updateItem(id, text);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = todoService.deleteItem(id);
    res.json({ message: 'Item deleted', deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWelcome,
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
