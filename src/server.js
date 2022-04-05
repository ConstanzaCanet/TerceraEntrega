import express from "express";
import passport from "passport";
import __dirname from "./utils.js"
import initializePassport from "./config/passport-config.js";
import sessionRouter from "./router/session.js";
import productsRouter from "./router/productsRouter.js";
import userRuter from "./router/userRuter.js";
import cartRouter from "./router/cartRouter.js";
import cookieParser from "cookie-parser";
import { createLogger } from "./utils.js";
import config from "./config/config.js";
import{passportGlobal,checkAuth} from './utils/middleweres.js';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log('escuchando desde el puerto '+PORT))
const logger = createLogger(config.env.NODE_ENV)


/*configuro como recibo info*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
/*middle passport */
initializePassport();
app.use(passport.initialize())

/*ruteo basicon */
app.use(express.static(__dirname+'/public'))
app.use('/home',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),productsRouter)
app.use('/session',sessionRouter)
app.use('/users', userRuter)
app.use('/cart', cartRouter)


/*Testeo de endpoints---> al tener el authToken realice esto aparte */
app.use('/testeoHome',productsRouter)





/*renderizo front! */
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/pages/login.html')
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/pages/register.html')
})

app.get('/view/cart',(req,res)=>{
    res.sendFile(__dirname+'/public/pages/cart.html')
})



/*Configuro Winston como logger*/
app.use((req,res,next)=>{
    logger.log('info',`${req.method} at ${req.path}`)
    next()
});

app.on('error',(error)=>{
    logger.warn("Advertencia! Algo anda fallando")
    console.log("Algo anda mal aqui: "+error)
})
app.get('/*',(req,res)=>{
    logger.warn("Endpoint invalido")
    res.status(404).send({error:'Invalid endpoint'})
})