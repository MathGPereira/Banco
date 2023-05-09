import Sistema from "./js/classes/controlador/Sistema.js";

const sistema = new Sistema();

export function requisitaLogin(cpf, senha) {
    sistema.verificaLogin(cpf, senha);
}
