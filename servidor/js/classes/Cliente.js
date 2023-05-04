export default class Cliente {

    #nome;
    #sobrenome;
    #email;
    #conta;

    constructor(nome, sobrenome, email, conta) {
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#email = email;
    }

    login() {

    }

    sacar(valor) {

    }

    depositar() {

    }

    transferir() {
        
    }

    static async #getAPI() {
        const url = `http://localhost:1337/api/${tipo}/${id}`;
        const resp = await fetch(url);

        return resp.json();
    }
}