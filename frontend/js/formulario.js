window.onload = () => {
    if(window.location.search) {
        let id = window.location.search.substring(window.location.search.indexOf("=") + 1)
      
        fetch(`http://localhost:3031/api/movies/${id}`)
      .then(function(response){
          return response.json()
      })
      .then((peliculas)=>{
    
        document.querySelector('#title').value = peliculas.data.title
        document.querySelector('#rating').value = peliculas.data.rating
        document.querySelector('#awards').value = peliculas.data.awards
        document.querySelector('#release_date').value = peliculas.data.release_date.slice(0,10)
        document.querySelector('#length').value = peliculas.data.length

        document.getElementById("createButton").disabled = "true"
        document.getElementById("createButton").style.display = "none"
    })
    } else {
        console.log("formulario de crear")
        document.getElementById("editButton").disabled = "true"
        document.getElementById("editButton").style.display = "none"

        document.getElementById("deleteButton").disabled = "true"
        document.getElementById("deleteButton").style.display = "none"
    }
   
    const agregar = document.getElementById("createButton");

  
    const editar = document.getElementById("editButton")
    const borrar = document.getElementById("deleteButton");
    

// Aqui debemos agregar nuestro fetch

agregar.addEventListener("click", function(e) {
    e.preventDefault()

    const movie = {
        title: document.querySelector('#title').value,
        rating: document.querySelector('#rating').value,
        awards: document.querySelector('#awards').value,
        release_date: document.querySelector('#release_date').value += "T00:00:00.000Z",
        length: document.querySelector('#length').value,
    };

    fetch('http://localhost:3031/api/movies/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = window.location.href.replace("formulario", "home")
    })
    
 })




editar.addEventListener("click", function (e) {
    e.preventDefault()
    const id = window.location.href.match(/\d+$/)[0]

    const movieEdit = {
        title: document.querySelector('#title').value,
        rating: document.querySelector('#rating').value,
        awards: document.querySelector('#awards').value,
        release_date: document.querySelector('#release_date').value,
        length: document.querySelector('#length').value,
    };

    fetch(`http://localhost:3031/api/movies/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieEdit)
    }).then(response => {
        return response.json()
    }).then(data =>{
        window.location.href = window.location.href.replace("formulario", "home")
    })

})


borrar.addEventListener("click", (e => {
    e.preventDefault()
    const id = window.location.href.match(/\d+$/)[0]

    fetch(`http://localhost:3031/api/movies/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(response => {
        return response.json()
    }).then(data => {
        window.location.href = window.location.href.replace("formulario", "home")
    })
}))
}