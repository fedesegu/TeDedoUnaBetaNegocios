import { Router } from "express";
//import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from "passport";
import { findUserById, findAllUsers, createUser  } from "../controllers/user.controller.js";

const router = Router();


router.get("/", passport.authenticate("current", {session:false}), findAllUsers
  );

router.get("/:uid", findUserById);

router.post("/", createUser);

export default router



// import express from 'express'
// const userController = require('../controllers/user.controller.js');
// const router = express.Router();

// router.post('/register', userController.register);
// router.post('/login', userController.login);

// export default router;
