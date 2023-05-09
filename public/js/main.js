import { requisitaLogin, requisitaCadastro } from "../../servidor/servidor.js";
import { imprimeErro } from "./funcoes/funcoes.js";

const formulario = $("[data-formulario]");

formulario.submit(function(evento) {
    evento.preventDefault();

    const nome = $("[data-nome]").val();
    const sobrenome = $("[data-sobrenome]").val();
    const email = $("[data-email]").val();
    const usuario = $("[data-usuario]").val();
    const cpf = $("[data-cpf]").val();
    const senha = $("[data-senha]").val();

    if(formulario.attr("data-formulario") === "login") {
        if(requisitaLogin(cpf, senha)) {
            imprimeErro("CPF ou senha inválidos!");
        }
    }else if(formulario.attr("data-formulario") === "criarConta"){
        requisitaCadastro(nome, sobrenome, email, usuario, cpf, senha);
    }

    
});
