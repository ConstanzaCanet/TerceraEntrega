import supertest from "supertest";
import chai,{expect} from "chai";

const request = supertest('http://localhost:8080');

describe('testeando mi API',()=>{
    describe('GET',()=>{
        it('Si todo va bien se mostrara un 200',async()=>{
            let res = await request.get('/testeoHome'); 
            expect(res.status).to.equal(200)
        })
    })
    describe('POST',()=>{
        it('yo intentare un logueo',()=>{
            let user={
                email:"papa@correo.com",
                password:'123'
            } 
            let res = await request.post('/session/login').send(user);
            expect(res.status).to.be.equal(200);
        })
    })
})