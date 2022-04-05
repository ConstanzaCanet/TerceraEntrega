import express from "express";
import upload from "../utils/upload.js"
import{passportGlobal,checkAuth} from '../utils/middleweres.js';
import cartController from '../controllers/cartController.js'

const router =express.Router();

/*en este caso que estamos con sesiones, tendria que mostrar unicamente los carritos asociados al usuario logueado o registrado */
router.get('/',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),cartController.cart);

//Comprar--> perdon si es engorroso el codigo a continuacion trate de hacer un carrito con passport pero me rompia todo,
//lo que hice fue seleccionar el ultimo carro creado y agregar alli los servicios.
/*en este caso tendria que tener en cuenta si el usuario esta logueado, por ello
se autoriza primero con el token y luego con el metodo addCart agrego el _id carrito al usuario logueado */
router.post('/',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),upload.none(),cartController.newCart);

//Veo informacion de carrito existente
router.get('/:cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),cartController.showCart)

//Agrego producto a carrito existente
router.post('/:cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),upload.none(),cartController.addToCart)

//Elimino carrito existente
router.delete('/delete/:cid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),cartController.deleteCart)




export default router;