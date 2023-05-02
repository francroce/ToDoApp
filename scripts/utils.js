// SELECCIONAMOS LOS ELEMENTOS
window.addEventListener('load',function(){

    const estadoUsuario = {
        email: '',
        password: '',
        passwordRep: '',
        nombre: '',
        apellido: ''
    }

    const estadoErroresOK = {
        email: false,
        password: false,
        passwordRep: false,
        nombre: false,
        apellido: false
    }

    const formulario = document.querySelector('form')
    const inputNombre= document.querySelector('#inputNombre')
    const inputApellido= document.querySelector('#inputApellido')
    const inputEmail= document.querySelector('#inputEmail')
    const inputPassword= document.querySelector('#inputPassword')
    const inputPasswordRespetida= document.querySelector('#inputPasswordRepetida')
    const errorNombre= document.querySelector('#nombreError')
    const errorApellido= document.querySelector('#apellidoError')
    const errorEmail= document.querySelector('#emailError')
    const errorPassword= document.querySelector('#passError')
    const errorPasswordRepetida= document.querySelector('#repPassError')
    
    

    formulario.addEventListener('change', function(){

        estadoUsuario.nombre = inputNombre.value
        estadoUsuario.apellido = inputApellido.value
        estadoUsuario.email = inputEmail.value
        estadoUsuario.password = inputPassword.value
        estadoUsuario.passwordRep= inputPasswordRespetida.value

        console.log(estadoUsuario)

        
        estadoErroresOK.nombre= validarTexto(estadoUsuario.nombre)
        estadoErroresOK.apellido= validarTexto(estadoUsuario.apellido)
        estadoErroresOK.email= validarEmail(estadoUsuario.email)
        estadoErroresOK.password= validarContrasenia(estadoUsuario.password)
        estadoErroresOK.passwordRep= compararContrasenias(estadoUsuario.password, estadoUsuario.passwordRep)
        console.log(estadoErroresOK);
        mostrarErorres()
    })
    
    /* ---------------------------------- texto --------------------------------- */
    function validarTexto(texto) {
        let resultado = false;

        function containsNumbers(str) {
            return /\d/.test(str);
          }
    
        if(texto.length == 0){
            resultado=false
        }else if( containsNumbers(texto) || texto.length < 3){
            resultado= true
        }
        
        return resultado

    }
    
    function normalizarTexto(texto) {
        
    }
    
    /* ---------------------------------- email --------------------------------- */
    function validarEmail(email) {

    let resultado = false;
    
    if(email.length == 0){
        resultado=false
    }else if( !email.includes('@') || !email.includes('.') ||  email.length < 5 ){
        resultado = true;
    }

    return resultado

    }

    function normalizarEmail(email) {
        
    }

    
    
    /* -------------------------------- password -------------------------------- */
    function validarContrasenia(contrasenia) {

        let resultado = false;
    
        if(contrasenia.length == 0){
            resultado=false
        }else if(contrasenia.length < 5 ){
            resultado = true;
        }

        return resultado

    }
    
    function compararContrasenias(contrasenia_1, contrasenia_2) {
        let resultado= false
        
        if( contrasenia_1 !== contrasenia_2){
            resultado=true
        }

        return resultado

        console.log(resultado)
        
    }


    /* -------------------------------- mostrar errores -------------------------------- */

function mostrarErorres(){

    estadoErroresOK.nombre ? errorNombre.classList.add('visible') : errorNombre.classList.remove('visible');
    estadoErroresOK.apellido? errorApellido.classList.add('visible') : errorApellido.classList.remove('visible');
    estadoErroresOK.email? errorEmail.classList.add('visible') : errorEmail.classList.remove('visible');
    estadoErroresOK.password? errorPassword.classList.add('visible') : errorPassword.classList.remove('visible');
    estadoErroresOK.passwordRep? errorPasswordRepetida.classList.add('visible') : errorPasswordRepetida.classList.remove('visible');

}








})


