let products;
let user;
//Valido si esta logueado o no
fetch('/session/current').then(result=>result.json()).then(json=>{
   user=json;
   console.log(user)
   if (!user._id||user._id==='undefined') {
     return location.href='/login'
  }else{
    return console.log('holis')
   }
})
//Validado el logueo o registro, le permito ingresar a ver los datos
fetch('/home').then(result=>result.json()).then(json=>{
    products=json;
    let tabla = document.getElementById('productsTable')

    products.forEach((result) => {
      // Create card element
      const card = document.createElement('div');
      card.classList = 'card-body';
    
      // Construct card content
      const content = `

        <div class="col-sm-6">
        <div class="card">
            <div class="card-body">
            <img class="card-img-top" src="${result.thumbnail}" alt="Card image cap">
            <h5 class="card-title">${result.name}</h5>
            <p class="card-text">$${result.price}</p>
            <a href="#" onclick='verProducto("${result._id}")' id="botoVer" class="btn btn-primary">VER</a>
            </div>
        </div>
        </div>
      `;
    
      // Append newyly created card element to the container
      tabla.innerHTML += content;
    })

})

//Logout
function logout(){
  fetch('/session/logout')
  return location.href='/login'
}


//VER CADA PRODUCTO Y AGREGAR AL CARRO
function verProducto(id){
  fetch(`/home/${id}`).then(result=>result.json()).then(json=>{
    let result=json;
    let tabla = document.getElementById('productsTable')


    const content = `
    <div class="card m-4">
      <div class="row" style="height: 500px;">
        <div class="col-md-4">
            <img src="${result.thumbnail}" alt="${result._id}" class="w-100" style="height: 500px; object-fit: cover;">
          </div>
          <div class="col-md-8 px-3 mr-2">
            <div class="card-block px-3 m-4">
              <h4 class="card-title">${result.name}</h4>
              <p class="card-text">${result.description}</p>
              <p class="card-text"><b>Precio: $${result.price}</b></p>
              
              <div style="margin-top: 10%;">
                <button type="button" oncliclass="btn btn-warning" onclick='alCarro("${result._id}")'>Comprar</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  tabla.innerHTML = content;
  })
};


//Compra de productos, falta agregar funcionalidad de cantidad(stock + cantidad que lleva el cliente)
function alCarro(id){
  let sendObject={
    _id:id
  }
    fetch('/cart',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
          'Content-Type':'application/json'
      }
    }).then(json=>{
        console.log(json)  
        alert('Agregado al carro');
    })
  

}