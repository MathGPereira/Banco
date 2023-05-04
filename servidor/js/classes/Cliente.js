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

    async sacar(valor) {
        const sistema = new Sistema();

        if(sistema.verificaSaque(valor, conta)) {
            
        }


    }

    depositar() {

    }

    transferir() {
        
    }

    static async #getPostAPI() {
        const url = `http://localhost:1337/api/${tipo}/${id}`;
        const resp = await fetch(url);

        return resp.json();
    }
}