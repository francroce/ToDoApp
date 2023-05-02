window.addEventListener("load", function (e) {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = this.document.querySelector("form");
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const button = document.querySelector("button"); 


  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const datos = {
        email: inputEmail.value, 
        password: inputPassword.value
    }
    console.log(datos);
    realizarLogin(datos)
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(datos) {
    const url = "http://todo-api.ctd.academy:3000/v1/users/login";
    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datos),
    };

    fetch(url, config)
    .then((response)=> {
        return response.json()
    }).then ((data)=> { console.log(data)
        if(data.jwt){
            localStorage.setItem('jwt', data.jwt);
            location.replace("mis-tareas.html")
        }
    })

  }
});
