import express from 'express';
import{passportGlobal,checkAuth} from '../utils/middleweres.js';
import upload from '../utils/upload.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const router =express.Router();

router.get('/current',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),(req, res)=>{
    let user = req.user;
    res.send(user);
})

router.post('/register',upload.single('avatar'),passportGlobal('register'),(req, res)=>{
    res.send({message:'user registrado!'})    
})

router.post('/login',upload.none(),passportGlobal('login'),(req,res)=>{
    let user = req.user;
    console.log(user)
    let token = jwt.sign(user,config.jwt.SECRET)
    res.cookie("JWT_COOKIE",token,{
        httpOnly:true,
        maxAge:1000*60*60
    })
    res.send({status:"success",message:"Estas logueado amigo"})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.send({message:"Hasta luego amigo! te has deslogueado"})
})
export default router;