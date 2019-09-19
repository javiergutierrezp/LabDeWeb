
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
let botonResena = document.getElementById("escribe_reseña")

botonResena.addEventListener("click", function(event) {

    let coments = document.getElementById("coments")
    let comentario = document.getElementById("comentario")
    
    coments.classList.remove("hidden")
    comentario.classList.remove("hidden")
    
})


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url: "https://tc2026daw.github.io/instrucciones/misc/comentarios.xml",
  type: "GET",
  dataType: "xml",
  success: function(data) {
    // console.log(data);
    let new_html = "";

    $(data).find("comment").each(function(event) {
      new_html += `
      <tr>
        <td>${$(this).find("name").text()}</td>
        <td>
          ${$(this).find("stars").text()}         
        </td>
        <td>${$(this).find("date").text()}</td>
        <td>${$(this).find("text").text()}</td>
      </tr>

      `;
    });
    $("#seccion_reviews").append(new_html);
  },
  error: function(error_msg) {
    console.log(error_msg);
  }
});


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

function newInput() {
    var name = document.getElementById("nombre").value;

    var comment = document.getElementById("comentario").textContent
    
    
    var li = document.createElement("li")
    var nombre = document.createTextNode(name)
    
    var lii = document.createElement("li")
    var cmt = document.createTextNode(comment)
    
    document.getElementById("seccion_reviews").appendChild(li)
    document.getElementById("seccion_reviews").appendChild(lii)
    
    li.appendChild(nombre)
    lii.appendChild(cmt)
    
    event.preventDefault()
}
let publish = document.getElementById("btn-publicar")


publish.addEventListener("click", function(event) {
     newInput()    
})



/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/

let botonClean = document.getElementById("btn-limpiar")

botonClean.addEventListener("click", function(event) {

    let nombre = document.getElementById("nombre")
    let email = document.getElementById("email")
    let comentario = document.getElementById("comentario")
    
    nombre.value = ""
    email.value = ""
    comentario.textContent = ""
})


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
