// import express from 'express'
const express = require('express')
const router = express.Router();

// import { homeController } from '../controllers/homeController.js';
const homeController = require('../controllers/homeController.js')
router.get('/',homeController);

module.exports = router

