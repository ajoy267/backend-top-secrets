const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.create(req.body);
      res.send(secret);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res) => {
    const secret = await Secret.findAllSecrets();
    res.send(secret);
  });
