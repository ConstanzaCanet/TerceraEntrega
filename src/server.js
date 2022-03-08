import express from "express";
import passport from "passport";
import initializePassport from "./config/passport-config.js";
import sessionRouter from "./router/session.js";
import productsRouter from "./router/productsRouter.js";
import userRuter from "./router/userRuter.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log('escuchando desde el puerto '+PORT))

/*configuro como recibo info*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
/*middle passport */
initializePassport();
app.use(passport.initialize())

/*ruteo basicon */
app.use('/',productsRouter)
app.use('/session',sessionRouter)
app.use('/users', userRuter)


