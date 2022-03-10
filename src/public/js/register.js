let form = document.getElementById('registerForm');

form.addEventListener('submit',function(event){
    event.preventDefault();
    let info= new FormData(form);
    fetch('/session/register',{
        method:"POST",
        body:info,
    }).then(json=>{
        form.reset();
        alert('Usuario Registrado! Ahora puedes logearte');
        return location.href='/login'
    })
})

