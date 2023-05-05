export default class Conta {
    
    usuario;
    senha;
    numeroDaConta = Math.floor(Math.random() * 999999999);
    agencia = "0486";
    valor = 0;

    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
}