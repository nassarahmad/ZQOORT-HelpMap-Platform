module.exports = {
  sendSuccess(res, data, status = 200, message = 'Success') {
    res.status(status).json({ success: true, message, ...data });
  }
};