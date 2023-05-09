import Sistema from "./js/classes/controlador/Sistema.js";

const sistema = new Sistema();

export function requisitaLogin(cpf, senha) {
    if(!sistema.verificaLogin(cpf, senha)) {
        return false;
    }

    return true;
}

export function requisitaCadastro(...infoUsuario) {
    console.log(infoUsuario);
}
