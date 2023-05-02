window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */

  const form = this.document.querySelector("form");
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputPasswordRepetida = document.querySelector("#inputPasswordRepetida");
  const url = "http://todo-api.ctd.academy:3000/v1/users";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let datos = {
      firstName: inputNombre.value,
      lastName: inputApellido.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datos),
    };

    realizarRegister(config);
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(config) {
    fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta.jwt) {
          localStorage.setItem("jwt", respuesta.jwt);
          location.replace("mis-tareas.html");
        }
      });
  }
});
