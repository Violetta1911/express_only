const { ERROR_CODES } = require('./errorCodes');

const ERROR_MESSAGES = {
  [ERROR_CODES.EMPTY_CONTENT]: 'Text field is required and cannot be empty',
  [ERROR_CODES.ITEM_NOT_FOUND]: 'Item not found',
};

module.exports = { ERROR_MESSAGES };
