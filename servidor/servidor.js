import Sistema from "./js/classes/controlador/Sistema.js";
import Cliente from "./js/classes/Cliente.js";
import Conta from "./js/classes/Conta.js";

const sistema = new Sistema();

export function requisitaLogin(cpf, senha) {
    if(!sistema.verificaLogin(cpf, senha)) {
        return false;
    }

    return true;
}

export function requisitaCadastro(...infoUsuario) {
    const [nome, sobrenome, email, usuario, cpf, senha] = infoUsuario;
    const cliente = new Cliente(nome, sobrenome, email, cpf, new Conta(usuario, senha));

    if(!sistema.verificaCadastroDeUsuario(cliente)) {
        return false;
    }

    return true;
}
