import passport from "passport";
import local from "passport-local";
import { userService } from "../services/services.js";
import { createHash,isValidPass,cookieExtractor } from "../utils.js"
import config from "./config.js"
import jwt from "passport-jwt"

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;


const initializePassport=()=>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email",session:false},async(req,username,password,done)=>{
        let  {first_name,last_name,email,phone,age,adress} = req.body;
        try{

            let user = await userService.getBy({email:email})
            if(user) return done(null,false,{messages:"Mmm ese ente ya se encuentra registrado"});
            const newUser = {
                first_name,
                last_name,
                age,
                adress,
                phone,
                email,
                password:createHash(password),
                carts:[],
                role:"user",
                profile_picture:req.file.filename
            }
            let result = await userService.save(newUser);
            return done(null,result);
        }catch(err){
            console.log(err);
            return done(err);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:"email"},async(username,password,done)=>{
        try {
            if(username===config.session.ADMIN&&password===config.session.PASSWORD){
                return done(null,{id:0,role:"admin"})
            }
            const user = await userService.getBy({email:username})
            if(!user) return done(null,false,{messages:"No se encontro el usuario"})
            //if(user.password!== password) return done(null,false,{messages:"password erroneo"})
            if(!isValidPass(user,password)) return done(null,false,{messages:"password erroneo"})
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('jwt',new JWTStrategy({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:config.jwt.SECRET},async(jwt_payload,done)=>{
        try {
            if(jwt_payload.role==="user") return done(null,jwt_payload)
            console.log(jwt_payload)
            let user = await userService.getBy({_id:jwt_payload._id})
            if(!user) return done(null,false,{messages:"Usuario no encontrado..."})
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.getBy({_id:id})
        done(null,result)
    })
}
export default initializePassport;