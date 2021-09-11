boton = document.getElementById("env");
boton.addEventListener("click", (e) => {
    nombre = document.getElementById("nombre").value;
    email = document.getElementById("correo").value;
    asunto = document.getElementById("asunto").value;
    mensaje = document.getElementById("mensaje").value;
    expreValidar = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    expreVacio = /^\s+$/;
    boton.value = "Enviandoo...";
    boton.disabled = true;
    boton.style.backgroundColor = "gray";

    if (expreValidar.test(email) && mensaje != null && mensaje.length != 0 && !expreVacio.test(mensaje)) {
        datos = {
            nombre: nombre,
            correo: email,
            asunto: asunto,
            mensaje: mensaje
        };
        emailjs.send('service_opehjhw', 'template_06ffzic', datos)
            .then(function(resultado) {
                    msjr = document.getElementById("res");
                    msjr.style.visibility = "visible";
                    msjr.style.display = "block";

                    boton.disabled = false;
                    boton.style.backgroundColor = "";
                    boton.value = "Enviar";


                    msjr.style.color = "green";

                    msjr.innerHTML = "<span>Email enviado correctamente</span>";
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
        /*e.preventDefault();
    $.ajax({
        url: "../enviar/enviarMail.php",
        data: {
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje
        },
        method: "POST",
        cache: "false",
        dataType: "text",

        success: (resultado) => {
            msjr = document.getElementById("res");
            msjr.style.visibility = "visible";
            msjr.style.display = "block";

            boton.disabled = false;
            boton.style.backgroundColor = "";
            boton.value = "Enviar";
            if (resultado) {

                msjr.style.color = "green";

                msjr.innerHTML = "<span>Email enviado correctamente</span>";
                document.getElementById("nombre").value = "";
                document.getElementById("correo").value = "";
                document.getElementById("asunto").value = "";
                document.getElementById("mensaje").value = "";


            } else {
                msjr.style.color = "red";
                msjr.innerHTML = "<span>No se pudo enviar el email, inténtelo nuevamente</span>"
            }

        }

    });
*/
    } else {
        boton.disabled = false;
        boton.style.backgroundColor = "";
        boton.value = "Enviar";

        msjr = document.getElementById("res");
        msjr.style.visibility = "visible";
        msjr.style.display = "block";
        msjr.style.color = "red";
        msjr.innerHTML = "<span>No se pudo enviar, algo esta mal, recuerde llenar todos los campos</span>";

    }




});

//});