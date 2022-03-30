const { Router } = require('express');
const Secret = require('../models/Secret');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const secret = await Secret.create(req.body);
    res.send(secret);
  } catch (error) {
    next(error);
  }
});
