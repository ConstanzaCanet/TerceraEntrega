let tikets;
let carro;
let user;



  //Valido si esta logueado o no
fetch('/session/current').then(result=>result.json()).then(json=>{
    user=json;
    if (!user._id||user._id==='undefined') {
        return location.href='/login'
    }else{
        return console.log(user)
    }
})  

    //Logout
function logout(){
    fetch('/session/logout')
    return location.href='/login'
    }

    //Muestro carritos o tikets de compra
let carroView = document.getElementById('dataCart')


fetch('/cart').then(result=>result.json()).then(json=>{
    const carrosT = json;
    console.log(carrosT)
    if (!carrosT||carrosT.cart===null) {
        const content = `
            <div class="alert alert-info" role="alert">
                Aun no has realizado compras, sigue mirando
            </div>
        `
        carroView.innerHTML += content;
    }else{

        carrosT.forEach((tiket)=>{
            const content = `
    
            <div class="col-sm-6 m-4">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">TIKET DE COMPRA: ${tiket}</h5>
                <a href="#" onclick='verCarro("${tiket}")' id="botoVer" class="btn btn-primary">VER</a>
                </div>
            </div>
            </div>
            `;
        
            // Append newyly created card element to the container
            carroView.innerHTML += content;
        })
    }
})



//Tikets o carritos existentes(1 por el momento no he agregado mas)

fetch('/cart').then(result=>result.json()).then(json=>{
    const carrosT = json;
    let Item=carrosT[carrosT.length-1]
    fetch(`/cart/${Item}`).then(result=>result.json()).then(json=>{
        carro=json
    })
})


function verCarro(idCarro){
    carroView.innerHTML=''
    let botonE = document.getElementById('botonEnvio');
    let botonM = document.getElementById('botonMeArrepiento');
    botonE.innerHTML=`<button type="button" class="btn btn-success" onclick=Enviar("${idCarro}")>Finalizar Compra</button>`
    botonM.innerHTML=`<button type="button" class="btn btn-danger" onclick=Eliminar("${idCarro}")>Cancelar Compra</button>`
    
    fetch(`/cart/${idCarro}`).then(result=>result.json()).then(json=>{
        let prodId = json.products
        let tablaTk = document.getElementById('productosT');
        prodId.forEach((result)=>{
            fetch(`/home/${result}`).then(result=>result.json()).then(json=>{
                const content = `

                    <tr>
                        <td>${json.name}</td>
                        <td>${json.price}</td>
                        <td><button type="button" class="btn btn-danger" onclick=Eliminar("${json._id}")> X </button></td>
                    </tr>
                `;
            
                // Append newyly created card element to the container
                tablaTk.innerHTML += content;
            })
        })
    })
}


//Aqui es donde se complica, debo eliminar no solo el carrito, si no que ademas debo eliminar EL id_cart DEL USUARIO en carts
function Eliminar(idCarro){
    let sendObject={
        _id:idCarro
      }
      if (window.confirm("Seguro que quieres eliminar el carrito?")) {
        fetch(`/cart/delete/${idCarro}`,{
            method:"DELETE",
            body:JSON.stringify(sendObject),
            headers:{
              'Content-Type':'application/json'
          }
        }).then(json=>{
            console.log(json)  
            alert('Carro eliminado!');
        })
      }else{
        return console.log('se mantiene compra')
      }
      
}

function Enviar(idCarro){
}