export default class Banco {

    async verificaUsuario() {

    }

    cadastrarUsuario() {

    }

    deletarUsuario() {

    }

    atualizarUsuario() {

    }

    static async #conectaAPI(id="", metodo, corpoDoConteudo=null) {
        const url = `http://localhost:1337/api/clientes/${id}`;
        const resp = await fetch(url, Banco.#verificaOpcao(metodo, corpoDoConteudo));

        return resp.json();
    }

    static #verificaOpcao(metodo, corpoDoConteudo) {
        let option;

        if(metodo === "GET" || metodo === "DELETE") {
            option = {
                method: metodo
            }
        }else if(metodo === "POST" || metodo === "PUT") {
            option = {
                method: `${metodo}`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(corpoDoConteudo)
            }
        }

        return option;
    }
}