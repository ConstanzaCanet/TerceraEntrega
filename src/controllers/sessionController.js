import{passportGlobal,checkAuth} from '../utils/middleweres.js';
import upload from '../utils/upload.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const register = async (req,res)=>{
    let file = req.file;
    try {
        res.send({message:'user registrado!'})    
    } catch (error) {
        console.log(error)
    }
}
const current = async(req,res)=>{
    let user = req.user;
    try {
        res.send(user);
    } catch (error) {
        console.log(error)
    }
}

const login= async (req,res)=>{
    let user = req.user;
    console.log(user)
    try {
        let token = jwt.sign(user,config.jwt.SECRET)
        res.cookie("JWT_COOKIE",token,{
            httpOnly:true,
            maxAge:1000*60*60,
        })
        res.send({status:"success",message:"Bienvendo amigo! Estas logueado"})
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req,res)=>{
    try {        
        res.clearCookie('JWT_COOKIE')
        res.send({message:"Hasta luego amigo! te has deslogueado"})
    } catch (error) {
        console.log(error)
    }
}

export default{
    register,current,login,logout
}