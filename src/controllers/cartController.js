import { cartService,userService } from "../services/services.js";
import upload from "../utils/upload.js"
import{passportGlobal,checkAuth} from '../utils/middleweres.js';

const cart = async (req,res)=>{
    try {
        let user = req.user;
        let userSerch = await userService.getBy({_id:user._id})
        console.log(userSerch.carts)
        let carritos = userSerch.carts
        if (carritos.length === 0) {
            return res.send({cart:null})
        }else{
            return res.send(carritos)
        }
    } catch (error) {
        console.log(error)
    }
}

const newCart = async (req,res)=>{
    try {
        let newIdProduct = req.body;
        let user = req.user;
        //primero busco si el usuario tiene carritos existentes, debo fijarme en MDB si no me inicia carritos nuevos infinitos
        let usuarioMongo = await userService.getBy({_id:user._id})
        let carros = usuarioMongo.carts;
        //si tiene un carrito, que agregue el producto alli mismo
        if (carros.length>0) {
            try {
                let Item=carros[carros.length-1]
                let result = await cartService.updateCart(Item,{products:newIdProduct._id})
                res.send({message:"se agrego al carrito", payload:result}) 
            } catch (error) {
                console.log(error)
            }
            //si no posee carrito, que cree uno nuevo
        }else{
            let result = await cartService.save({products:newIdProduct._id});
            try {
                await userService.addCart(user._id,{carts:result._id})
                res.send({message:'se agrego a un nuevo carrito', payload:result})
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log('aaayy eso si no se va a poder! mira con atencion el error: '+error)
    }
}
const showCart = async (req,res)=>{
    try {
        let cid = req.params.cid;
        console.log(cid)
        let result = await cartService.getBy({_id:cid})
        res.send(result) 
        
    } catch (error) {
        console.log(error)
    }
}
/*No lo utilizo en este momento... pero estoy trabajando en el carrito aun, lo dejo por las dudas */
const addToCart = async (req,res)=>{
    try {
        let cid = req.params.cid;
        let newIdProduct = req.body;
        let result = await cartService.updateCart(cid,{products:newIdProduct._id})
        res.send({message:"se agrego al carrito", payload:result}) 
        
    } catch (error) {
        console.log(error)
    }
}

const deleteCart = async (req,res)=>{
    try {
        let cid = req.params.cid
        let result = await cartService.delete({_id:cid})
        res.send({message:'se elimino tu carrito', payload:result})
    } catch (error) {
        console.log(error)
    }
}

export default{
    cart,newCart,showCart,addToCart,deleteCart
}