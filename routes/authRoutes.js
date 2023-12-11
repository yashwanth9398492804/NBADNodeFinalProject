// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticator');
const authenticateToken = require('../middleware/authMiddleware');
const token = require('./../token/token');


router.get('/refreshAccessToken', authController.refreshAccessToken);
router.post('/login', authController.login);
router.post('/register', authController.register);


router.get('/protected', (req, res, next) => {
  authenticateToken(req, res, next, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.json({ message: 'Protected Route', user: req.user });
  });
});

module.exports = router;
