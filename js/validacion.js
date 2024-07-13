//Haz tú validación en javascript acá
import { tiposError, mensajes } from "../js/cutomErrors.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespuestas = {
        nombre: e.target.elements["nombre"].value,
        email: e.target.elements["email"].value,
        asunto: e.target.elements["asunto"].value,
        mensaje: e.target.elements["mensaje"].value,
    };

    localStorage.setItem("registro", JSON.stringify(listaRespuestas));

    let nombre = encodeURIComponent(listaRespuestas.nombre);
    let email = encodeURIComponent(listaRespuestas.email);
    let asunto = encodeURIComponent(listaRespuestas.asunto);
    let mensaje = encodeURIComponent(listaRespuestas.mensaje);

    let mailtoLink = `mailto:shmariajesus@gmail.com?subject=${asunto}&body=Nombre%3A%20${nombre}%0ACorreo%3A%20${email}%0A%0A${mensaje}`;
    window.open(mailtoLink, '_blank');
});

camposDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
    let mensaje = "";
    campo.setCustomValidity("");

    //campos validity
    tiposError.forEach((error) => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error];
        }
    });

    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity();

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = "";
    }
}