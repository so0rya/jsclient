function login(){
    let data={
        "username":id_username.value,
        "password":id_password.value
    }
    fetch('http://127.0.0.1:8000/api/v2/token', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => addToLocalStorage(data));
  
}

function addToLocalStorage(data){
    
    let token=data.token
    localStorage.setItem("token",token)
    window.location.href="home.html"
}