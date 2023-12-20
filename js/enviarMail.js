var inp_nombre = document.getElementById("nombre");
var inp_email = document.getElementById("correo");
var inp_asunto = document.getElementById("asunto");
var inp_mensaje = document.getElementById("mensaje");
var span_nombre = document.getElementsByClassName("nombre_msj");
var span_email = document.getElementsByClassName("email_msj");
var span_asunto = document.getElementsByClassName("asunto_msj");
var span_mens = document.getElementsByClassName("mens_msj");
var nombre = document.getElementById("nombre").value.trim();
var email = document.getElementById("correo").value.trim();
var asunto = document.getElementById("asunto").value.trim();
var mensaje = document.getElementById("mensaje").value.trim();
var expreValidar = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
var expreVacio = /(^$)|(\s+$)/;
var expreEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var letras = /^([a-z ñáéíóú]{4,60})$/i;
var msjr = document.getElementById("res");
var boton = document.getElementById("env");

function ponerEstilo(input, opc, msj = "", span_op) {
    if (opc) {
        input.classList.remove("valid");
        input.classList.add("invalid");
        span_op[0].style.color = "var(--rojo)";
        span_op[0].innerText = msj;
    } else {
        span_op[0].innerText = null;
        input.classList.remove("invalid");
        input.classList.add("valid");
    }
}

function quitarEstilos() {
    inp_nombre.classList.contains("valid") ? inp_nombre.classList.remove("valid") : inp_nombre.classList.remove("invalid");
    inp_email.classList.contains("valid") ? inp_email.classList.remove("valid") : inp_email.classList.remove("invalid");
    inp_asunto.classList.contains("valid") ? inp_asunto.classList.remove("valid") : inp_asunto.classList.remove("invalid");
    inp_mensaje.classList.contains("valid") ? inp_mensaje.classList.remove("valid") : inp_mensaje.classList.remove("invalid");
}

function validar() {
    nombre = document.getElementById("nombre").value.trim();
    email = document.getElementById("correo").value.trim();
    asunto = document.getElementById("asunto").value.trim();
    mensaje = document.getElementById("mensaje").value.trim();
    msj_input = "";
    enviarForm = 0;
    if (expreVacio.test(nombre)) {
        msj_input = "El campo nombre no puede quedar vacio.";
        ponerEstilo(inp_nombre, true, msj_input, span_nombre);
    } else if (nombre.length < 4) {
        msj_input = "El nombre debe contener al menos 4 letras.";
        ponerEstilo(inp_nombre, true, msj_input, span_nombre);
    } else if (!letras.test(nombre)) {
        msj_input = "El nombre solo debe contener letras.";
        ponerEstilo(inp_nombre, true, msj_input, span_nombre);
    } else {
        ponerEstilo(inp_nombre, false, null, span_nombre);
        enviarForm += 1;
    }

    if (expreVacio.test(email)) {
        msj_input = "El campo email no puede quedar vacio.";
        ponerEstilo(inp_email, true, msj_input, span_email);
    } else {
        if (!expreValidar.test(email)) {
            msj_input = "Email incorrecto, ingrese uno válido.";
            ponerEstilo(inp_email, true, msj_input, span_email);
        } else {
            ponerEstilo(inp_email, false, null, span_email);
            enviarForm += 1;
        }
    }

    if (expreVacio.test(asunto)) {
        msj_input = "El campo asunto no puede quedar vacio.";
        ponerEstilo(inp_asunto, true, msj_input, span_asunto);
    } else if (asunto.length < 5) {
        msj_input = "El asunto debe tener mínimo 5 letras.";
        ponerEstilo(inp_asunto, true, msj_input, span_asunto);
    } else {
        ponerEstilo(inp_asunto, false, null, span_asunto);
        enviarForm += 1;
    }
    if (expreVacio.test(mensaje)) {
        msj_input = "El campo mensaje no puede quedar vacio.";
        ponerEstilo(inp_mensaje, true, msj_input, span_mens);
    } else if (mensaje.length < 10) {
        msj_input = "El mensaje debe tener mínimo 10 letras.";
        ponerEstilo(inp_mensaje, true, msj_input, span_mens);
    } else {
        ponerEstilo(inp_mensaje, false, null, span_mens);
        enviarForm += 1;
    }
    return enviarForm == 4 ? true : false;
}

function enviar() {

    boton.value = "Enviandoo...";
    boton.disabled = true;
    boton.style.backgroundColor = "gray";
    if (validar()) {
        datos = {
            nombre: nombre,
            correo: email,
            asunto: asunto,
            mensaje: mensaje
        };
        emailjs.send('service_opehjhw', 'template_06ffzic', datos)
            .then(function() {
                    msjr.style.visibility = "visible";
                    msjr.style.display = "block";
                    boton.disabled = false;
                    boton.style.backgroundColor = "";
                    boton.value = "Enviar";
                    msjr.style.color = "green";
                    msjr.innerHTML = "<span>Email enviado correctamente</span>";
                    quitarEstilos();
                    document.getElementById("nombre").value = "";
                    document.getElementById("correo").value = "";
                    document.getElementById("asunto").value = "";
                    document.getElementById("mensaje").value = "";
                },
                function(error) {
                    msjr.style.color = "red";
                    msjr.innerHTML = "<span>No se pudo enviar el email, inténtelo nuevamente</span>"
                    console.log('Ocurrio un error: ', error.status, error.text);
                });
    } else {
        inp_nombre.addEventListener("keyup", validar, false);
        inp_email.addEventListener("keyup", validar, false);
        inp_asunto.addEventListener("keyup", validar, false);
        inp_mensaje.addEventListener("keyup", validar, false);
        boton.disabled = false;
        boton.style.backgroundColor = "";
        boton.value = "Enviar";
    }
}
boton.addEventListener("click", enviar, false);