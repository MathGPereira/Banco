export default class Conta {
    
    usuario;
    senha;
    numeroDaConta;
    agencia;
    valor = 0;

    constructor(usuario, senha, numeroDaConta, agencia) {
        this.usuario = usuario;
        this.senha = senha;
        this.numeroDaConta = numeroDaConta;
        this.agencia = agencia;
    }
}