const express = require('express');

const UserController = require('../../controllers/user-controller');
const {validateRequestValidator} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',
    validateRequestValidator.validateUserAuth,
    UserController.create
);

router.post('/signin',
    validateRequestValidator.validateUserAuth,
    UserController.signIn
);

module.exports = router;