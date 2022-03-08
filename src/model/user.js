import mongoose from "mongoose";

let Schema= mongoose.Schema;
export default class User{
    constructor(data){
        this.data =data;
    }
    static get model(){
        return 'users';
    }
    static get schema(){
        return{
            first_name:String,
            last_name:String,
            adress:String,
            age:String,
            phone:String,
            email:String,
            password:String,
            carts:[{
                type:Boolean,
                default:true
            }],
            role:String,
            profile_picture:String,
        }
    }
}