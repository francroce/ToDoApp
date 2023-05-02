// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

const token = localStorage.getItem("jwt");
if (!token) {
  location.replace("index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */

  const btnCerrarSesion = document.querySelector("#closeApp");
  const url = "http://todo-api.ctd.academy:3000/v1";
  const nombreUsuario = this.document.querySelector("#nombreDelUsuario");
  const formCrearTarea = this.document.querySelector("#nueva-tarea");
  const nuevaTarea = this.document.querySelector("#nuevaTarea");
  const contenedorTareasPendientes = this.document.querySelector(".tareas-pendientes");
  const contenedorTareasFinalizadas = this.document.querySelector(".tareas-terminadas"); 
  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("jwt");
    location.replace("index.html");
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    let endpoint = `${url}/users/getMe`;

    const config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };

    fetch(endpoint, config)
      .then((response) => {
        return response.json();
      })
      .then((respuesta) => {
        console.log(respuesta.firstName);
        nombreUsuario.innerText = respuesta.firstName;
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    let endpoint = `${url}/tasks`;

    const config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };

    fetch(endpoint, config)
      .then((response) => {
        return response.json();
      })
      .then((respuesta) => {
        console.log(respuesta);
        renderizarTareas(respuesta);
        cambiarEstado();
        botonBorrarTarea();
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();
    const datos = {
      description: nuevaTarea.value,
      completed: false,
    };
    console.log(datos);
    crearTarea(datos);
  });

  function crearTarea(datos) {
    let endpoint = `${url}/tasks`;

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(datos),
    };

    fetch(endpoint, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        consultarTareas();
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    contenedorTareasFinalizadas.innerHTML= "";
    contenedorTareasPendientes.innerHTML= ""
    let htmlCompletas = "";
    let htmlPendientes = "";

    listado.forEach((tarea) => {

      if(tarea.completed){
        htmlCompletas +=
        `<li class="tarea">
        <button type="button" title="Completar tarea" class="change incompleta" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">10</p>
          <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
        </div>

      </li>`;

        contenedorTareasFinalizadas.innerHTML= htmlCompletas;
      }else{
        htmlPendientes +=
        `<li class="tarea">
        <button type="button" title="Completar tarea" class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">10</p>
          <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        
      </li>`;

        contenedorTareasPendientes.innerHTML= htmlPendientes;
      }
    });

  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function cambiarEstado() {

    const botonCambioEstado= this.document.querySelectorAll(".change")

    botonCambioEstado.forEach(boton => {
      boton.addEventListener("click",function(e){

        const id= e.target.id

        console.log(id)

        const datos={}

        if(e.target.classList.contains("incompleta")){
          datos.completed= false;
        }else{
          datos.completed= true;
        }

        let endpoint = `${url}/tasks/${id}`;

        const config = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(datos),
        };

        fetch(endpoint, config)
          .then((response) => {
            console.log(response.json());
            consultarTareas()
          })
        });  
  })
}
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {

    const botonBorrarTarea= document.querySelectorAll(".borrar")

    botonBorrarTarea.forEach(boton => {
      boton.addEventListener("click",function(e){

        const id= e.target.id

        const endpoint= `${url}/tasks/${id}`

        const config = {
          method: "DELETE",
          headers: {
            authorization: token
          }
        };

        fetch(endpoint,config)
        .then((response)=>{
          response.status
          consultarTareas()
        })
      })

    });
  
}

});
