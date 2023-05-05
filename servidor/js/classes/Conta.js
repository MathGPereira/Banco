export default class Conta {
    
    id;
    usuario;
    senha;
    numeroDaConta;
    agencia;
    valor = 0;

    constructor(id, usuario, senha, numeroDaConta, agencia) {
        this.id = id;
        this.usuario = usuario;
        this.senha = senha;
        this.numeroDaConta = numeroDaConta;
        this.agencia = agencia;
    }
}