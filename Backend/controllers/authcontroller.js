const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response');

module.exports = {
  register: asyncHandler(async (req, res) => {
    const token = await authService.register(req.body);
    sendSuccess(res, { token }, 201);
  }),
  login: asyncHandler(async (req, res) => {
    const token = await authService.login(req.body);
    sendSuccess(res, { token });
  })
};