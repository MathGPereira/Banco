import { requisitaLogin } from "../../servidor/servidor.js";
import { imprimeErro } from "./funcoes/funcoes.js";

const formulario = $("[data-formulario]");

formulario.submit(function(evento) {
    evento.preventDefault();

    const cpf = $("[data-cpf]").val();
    const senha = $("[data-senha]").val();

    if(requisitaLogin(cpf, senha)) {
        imprimeErro("CPF ou senha inválidos!");
    }
});
