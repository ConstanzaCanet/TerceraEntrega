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
            <a href="http://localhost:8080/home/${result._id}" class="btn btn-primary">VER</a>
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