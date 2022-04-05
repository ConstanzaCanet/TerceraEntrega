import express from 'express';
import{passportGlobal,checkAuth} from '../utils/middleweres.js';
import upload from '../utils/upload.js';
import sessionController from '../controllers/sessionController.js';

const router =express.Router();


router.get('/current',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),sessionController.current)

router.post('/register',upload.single('avatar'),passportGlobal('register'),sessionController.register)

router.post('/login',upload.none(),passportGlobal('login'),sessionController.login)

router.get('/logout',sessionController.logout)


export default router;