import express from "express";
import { userService } from "../services/services.js";
import{passportGlobal,checkAuth} from '../utils/middleweres.js';

const router =express.Router();

router.get('/',async(req,res)=>{
    let results = await userService.getAll();
    res.send(results)
});

router.get('/:uid',passportGlobal('jwt'),checkAuth(["ADMIN","USER"]),async(req,res)=>{
    let uid = req.params.uid
    let result = await userService.getBy({_id:uid});
    res.send(result)
})

export default router;