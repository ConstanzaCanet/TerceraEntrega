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
})





fetch('/cart').then(result=>result.json()).then(json=>{
    const carrosT = json;
    let Item=carrosT[carrosT.length-1]
    fetch(`/cart/${Item}`).then(result=>result.json()).then(json=>{
        carro=json
    })
})


function verCarro(idCarro){
    carroView.innerHTML=''
    let boton = document.getElementById('boton');
    boton.innerHTML=`<button type="button" class="btn btn-success" onclick=Enviar("${idCarro}")>Finalizar Compra</button>`
    
    
    fetch(`/cart/${idCarro}`).then(result=>result.json()).then(json=>{
        let prodId = json.products
        let tablaTk = document.getElementById('productosT');
        prodId.forEach((result)=>{
            fetch(`/home/${result}`).then(result=>result.json()).then(json=>{
                const content = `

                    <tr>
                        <td>${json.name}</td>
                        <td>${json.price}</td>
                    </tr>
                `;
            
                // Append newyly created card element to the container
                tablaTk.innerHTML += content;
            })
        })
    })
}


function Enviar(idCarro){
}