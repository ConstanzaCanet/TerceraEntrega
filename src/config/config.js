import dotenv from 'dotenv';

dotenv.config();

export default{
    mongo:{
        url:process.env.baseMongo||"mongodb+srv://Constanza:Konecta+865@products.fq2mz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    session:{
        ADMIN:process.env.ADMIN,
        PASSWORD:process.env.PASSWORD
    },
    jwt:{
        SECRET:process.env.JWT_SECRET||'123456abcd'
    }
}