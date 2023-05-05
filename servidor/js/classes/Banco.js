import Sistema from "./controlador/Sistema.js";

export default class Banco {

    sistema = new Sistema();

    cadastrarUsuario(...listaDadosUsuario) {
        this.sistema.verificaCadastroDeUsuario(listaDadosUsuario) ? console.log("Cadastro realizado com sucesso!") : console.log("Cadastro negado!");
    }

    getUsuario(id) {
        this.sistema.verificaUsuarioCadastrado(id);
    }

    deletarUsuario(id) {
        this.sistema.verificaUsuarioDeletado(id);
    }

    atualizarUsuario(id, listaDadosUsuario) {
        
    }

    // async criarNovaConta(usuario, senha, numeroDaConta, agencia) {
    //     return new Conta(usuario, senha, numeroDaConta, agencia);
    // }
}