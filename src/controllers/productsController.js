import {productsService} from '../services/services.js';

const productsAll= async (req,res)=>{
    try {
        let result = await productsService.getAll()
        res.send(result)
    } catch (error) {
        console.log(error)
    }
};

const productId= async (req,res)=>{
    let id = req.params.pid
    try {
        let result = await productsService.getBy({_id:id})
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

export default{
    productsAll, productId
}