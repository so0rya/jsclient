
function getToken(){
    let token=localStorage.getItem("token")
    let tk=`Token ${token}`
    return tk
}
fetch('http://127.0.0.1:8000/mdishes/', {
  method: 'GET',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization':getToken()
  },
})
  .then((response) => response.json())
  .then((data) => populateDishes(data));

  function populateDishes(dishes){
    let htmlData=``

    dishes.forEach(dish=>{
        htmlData+=`
        <div class="col-4 mt-5">
        <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${dish.name}</li>
          <li class="list-group-item">${dish.category}</li>
          <li class="list-group-item">${dish.price}</li>
          <li class="list-group-item">            <button name="${dish.id}" onclick="fetchDish(event)" class="btn btn-info"> View</button>
          </li>
          
        </ul>
      </div>
            </div>`
    })
    id_result.innerHTML=htmlData
  }

  function fetchDish(event){
    let id=event.target.name
    console.log(id);
    fetch(`http://127.0.0.1:8000/mdishes/${id}/`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization':getToken()
  },
})
  .then((response) => response.json())
  .then((data) => populateDish(data));
  }

  var modalDiv=null
  function populateDish(data){
    
    modalDiv=document.createElement('div')
   modalDiv.innerHTML=`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <h1>${data.name}</h1>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    </div>
  `
  document.body.append(modalDiv)
  let modal=new bootstrap.Modal(modalDiv.querySelector('#exampleModal'))
  modal.show()
  }