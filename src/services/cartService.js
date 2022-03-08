import Carts from "../model/carts.js";
import GenericQueries from "./genericQueries.js"

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,Carts.model);
    }
}  