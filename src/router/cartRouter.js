import express from "express";
import { cartService,userService } from "../services/services.js";
import upload from "../utils/upload.js"
import{passportGlobal,checkAuth} from '../utils/middleweres.js';

const router =express.Router();

/*en este caso que estamos con sesiones, tendria que mostrar unicamente los carritos asociados al usuario logueado o registrado */
router.get('/',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),async(req,res)=>{
    let user = req.user;
    let userSerch = await userService.getBy({_id:user._id})
    console.log(userSerch.carts)
    let carritos = userSerch.carts
    if (carritos.length === 0) {
        return res.send({message:"en este momento no tienes carritos a la vista", payload:user.carts})
    }else{
        return res.send(carritos)
    }
});

/*creo un carrito nuevo, en este caso tendria que tener en cuenta si el usuario esta logueado, por ello
se autoriza primero con el token y luego con el metodo addCart agrego el _id carrito al usuario logueado */
router.post('/',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),upload.none(),async(req,res)=>{
    try {
        let newIdProduct = req.body;
        let user = req.user;
        let result = await cartService.save({products:newIdProduct._id});
        try {
            await userService.addCart(user._id,{carts:result._id})
            res.send({message:'se agrego a un nuevo carrito', payload:result})
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log('aaayy eso si no se va a poder! mira con atencion el error: '+error)
    }
});

router.get('/:cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),async(req, res)=>{
    try {
        let cid = req.params.cid;
        let result = await cartService.getBy({_id:cid})
        res.send(result) 
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),async(req, res)=>{
    try {
        let cid = req.params.cid;
        let newIdProduct = req.body;
        let result = await cartService.updateCart(cid,{products:newIdProduct._id})
        res.send({message:"se agrego al carrito", payload:result}) 
        
    } catch (error) {
        console.log(error)
    }
})

router.delete(':/cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),async(req, res)=>{
    try {
        let cid = req.params.cid
        let result = await cartService.delete({_id:cid})
        res.send({message:'se elimino tu carrito', payload:result})
    } catch (error) {
        console.log(error)
    }
})




export default router;