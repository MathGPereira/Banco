import Sistema from "./controlador/Sistema.js";

export default class Banco {

    sistema = new Sistema();

    cadastrarUsuario(...listaDadosUsuario) {
        this.sistema.verificaCadastroDeUsuario(listaDadosUsuario) ? console.log("Cadastro realizado com sucesso!") : console.log("Cadastro negado!");
    }

    getUsuario(id) {
        this.sistema.verificaUsuarioCadastrado(id);
    }

    // async deletarUsuario(id) {
    //     await Banco.#conectaAPI(id, "DELETE");
    // }

    // async atualizarUsuario(id, listaDadosUsuario) {
    //     await Banco.#conectaAPI(id, "PUT", listaDadosUsuario);
    // }

    // async criarNovaConta(usuario, senha, numeroDaConta, agencia) {
    //     return new Conta(usuario, senha, numeroDaConta, agencia);
    // }
}