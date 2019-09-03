let element = document.getElementById("newitem")
let tabla = document.getElementById("list")

var sigValor = 7;
element.addEventListener("keyup", function(event) {
    if(event.keyCode == 13)
    {
    var elementoLista = document.createElement("li");
    var checkbox = document.createElement('input'); 
    checkbox.type= 'checkbox';
    checkbox.name = "todo";
    checkbox.classList.add("check");
    checkbox.onclick = "check()";
    checkbox.id = sigValor;
    elementoLista.appendChild(checkbox);
    sigValor++;
        
    var span = document.createElement("SPAN");
    span.textContent = element.value;
    span.name = "spans";
    elementoLista.appendChild(span);
        
    tabla.appendChild(elementoLista);   
    }
})

function check(){
    let sender = document.getElementsByClassName("check");
    
    let spans = document.getElementsByClassName("spans");
    console.log("sender " + sender.length);
    console.log("spans " + spans.length);

    var i = 0;
    for(i; i < sender.length; i++ ){
        var checkbox = sender[i];
        var span = spans[i];
        
        if(checkbox.checked == true){
            span.classList.add("done");
        }
        else {
            span.classList.remove("done");
            
            
        }
    }

}


 



