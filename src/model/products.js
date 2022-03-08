import mongoose from "mongoose";

let Schema= mongoose.Schema;

export default class Products{
    constructor(data){
        this.data =data;
    }
    static get model(){
        return 'products';
    }
    static get schema(){
        return{
            name:String,
            description:String,
            price:String,
            stock:String,
            role:String,
            thumbnail:String,
        }
    }
}