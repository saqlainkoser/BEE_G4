
const express= require("express");

const usersRouter = express.Router();
const authController= require('./../Controllers/authController.js')

usersRouter.route('/signup').post(authController.signup);

usersRouter.route('/:id').patch(authController.updateUser);

module.exports = usersRouter
