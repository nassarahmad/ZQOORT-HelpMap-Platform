const express = require('express');
const router = express.Router();

router.use('/health', require('./health'));
router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/requests', require('./request'));
router.use('/chats', require('./chat'));
router.use('/notifications', require('./notification'));
router.use('/ratings', require('./rating'));
router.use('/badges', require('./badge'));
router.use('/admin', require('./admin'));
router.use('/map', require('./map'));
router.use('/payments', require('./payment'));

module.exports = router;