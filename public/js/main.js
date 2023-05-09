import { requisitaLogin } from "../../servidor/servidor.js";

const formulario = $("[data-formulario]");

formulario.submit(function(evento) {
    evento.preventDefault();

    const cpf = $("[data-cpf]").val();
    const senha = $("[data-senha]").val();

    requisitaLogin(cpf, senha);
});