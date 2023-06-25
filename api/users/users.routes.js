const express = require('express');
const passport = require("passport")
const router = express.Router();

const { signup, signin, getUsers } = require('./users.controllers');

router.post('/signup', signup);
router.post("/signin/user", passport.authenticate("local-username", { session: false }),
signin
);
router.get('/users', getUsers);

module.exports = router;
