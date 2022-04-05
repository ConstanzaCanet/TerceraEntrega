import axios from 'axios';

/*probando GET con axios */
/*
axios('http://localhost:8080/testeoHome')
.then(result=>{
    console.log(result.data)
})
*/
/*PROBANDO POST CON AXIOS---> en este caso un logueo */
axios('http://localhost:8080/session/login',{
    method:'POST',
    data:{
        email:"papa@correo.com",
        password:'123'
    }
})
.then(result=>{
    console.log(result.data)
})