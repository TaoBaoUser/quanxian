const sendResponse = (ctx, status, message, data = null) => {
  ctx.status = status;
  ctx.body = {
    status,
    message,
    data,
  };
};

module.exports = sendResponse;
