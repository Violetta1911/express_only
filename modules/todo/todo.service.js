const { ERROR_CODES } = require('../../utils/errorCodes');

let items = [];
let nextId = 1;

function getAllItems() {
  return items;
}

function getItemById(id) {
  const item = items.find((item) => item.id === parseInt(id));
  if (!item) {
    const error = new Error();
    error.code = ERROR_CODES.ITEM_NOT_FOUND;
    throw error;
  }
  return item;
}

function createItem(text) {
  const newItem = { id: nextId++, text };
  items.push(newItem);
  return newItem;
}

function updateItem(id, text) {
  const item = getItemById(id);

  if (!item) {
    const error = new Error();
    error.code = ERROR_CODES.ITEM_NOT_FOUND;
    throw error;
  }

  item.text = text;
  return item;
}

function deleteItem(id) {
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index === -1) {
    const error = new Error();
    error.code = ERROR_CODES.ITEM_NOT_FOUND;
    throw error;
  }

  const deleted = items.splice(index, 1)[0];
  return deleted;
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
