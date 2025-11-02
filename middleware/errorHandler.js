const { ERROR_CODES } = require('../utils/errorCodes');
const { getErrorResponse } = require('../utils/errors');

function errorHandler(error, res) {
  const status =
    error.code === ERROR_CODES.ITEM_NOT_FOUND ? 404 : 400;

  res.status(status).json(getErrorResponse(error.code));
}

module.exports = { errorHandler };

