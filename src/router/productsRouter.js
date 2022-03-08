import express from 'express';
import {productsService} from '../services/services.js'


const router = express.Router();

router.get('/',async(req,res)=>{
    let result = await productsService.getAll()
    res.send(result)
})

router.get("/:pid",async(req,res)=>{
    let id = req.params.pid
    let result = await productsService.getBy({_id:id})
    res.send(result)
})


export default router;