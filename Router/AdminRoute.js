const express = require('express')
const admin = require('../Controllers/admin.js')
const refreshToken = require('../Controllers/RefreshToken.js')

const router = express.Router();

router.post('/register', admin.Register)
router.get('/token', refreshToken);
router.post('/login', admin.Login)
router.delete('/logout', admin.Logout)


module.exports = router;