import express from "express";
import { userService } from "../services/services.js";

const router =express.Router();

router.get('/',async(req,res)=>{
    let results = await userService.getAll();
    res.send(results)
});


export default router;