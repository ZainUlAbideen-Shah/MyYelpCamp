const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

const catchAsync = require('../utilities/catchasync');

const passport = require('passport');

const { storeReturnTo } = require('../middleware');


router.route('/register')
        .get(users.renderRegister)
        .post(catchAsync(users.register))

router.route('/login')
        .get(users.login)
        .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.renderLogin)

router.get('/logout', users.logout);


module.exports = router;