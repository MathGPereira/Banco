import Sistema from "./controlador/Sistema.js";

export default class Banco {

    async cadastrarUsuario(...listaDadosUsuario) {
        const sistema = new Sistema();

        sistema.verificaCadastroDeUsuario(listaDadosUsuario);
    }

    // async verificaUsuario(id) {
    //     const usuario = await Banco.#conectaAPI(id);

    //     return usuario;
    // }

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