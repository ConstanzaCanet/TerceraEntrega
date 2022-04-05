import express from "express";
import{passportGlobal,checkAuth} from '../utils/middleweres.js';
import userController from "../controllers/userController.js"

const router =express.Router();

router.get('/',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),userController.user);

router.get('/:uid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),userController.userId)

export default router;