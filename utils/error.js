const { ERROR_MESSAGES } = require('./errorMessages');

function getErrorResponse(code) {
  return {
    code,
    message: ERROR_MESSAGES[code] || 'Unexpected error',
  };
}

module.exports = { getErrorResponse };
