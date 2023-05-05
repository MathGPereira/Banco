import Sistema from "./controlador/Sistema.js";

export default class Cliente {

    nome;
    sobrenome;
    email;
    cpf;
    conta;

    constructor(nome, sobrenome, email, cpf, conta) {
        this.nome   = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.conta = conta;
    }


    login() {

    }

    sacar(valor) {
        const sistema = new Sistema();

        if(!sistema.verificaSaque(valor, conta)) {
            return false;
        }

        return true;
    }

    depositar() {

    }

    transferir() {
        
    }
}