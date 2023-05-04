export default class Banco {

    async verificaUsuario(id) {
        const usuario = await Banco.#conectaAPI(id);

        return usuario;
    }

    async cadastrarUsuario(listaDadosUsuario) {
        await Banco.#conectaAPI("", "POST", listaDadosUsuario);
    }

    async deletarUsuario(id) {
        await Banco.#conectaAPI(id, "DELETE");
    }

    async atualizarUsuario(id, listaDadosUsuario) {
        await Banco.#conectaAPI("", "PUT", listaDadosUsuario);
    }

    static async #conectaAPI(id="", metodo="GET", corpoDoConteudo=null) {
        const url = `http://localhost:1337/api/clientes/${id}`;
        const resp = await fetch(url, Banco.#verificaMetodo(metodo, corpoDoConteudo));
        
        return resp.json();
    }

    static #verificaMetodo(metodo, corpoDoConteudo) {
        let option;

        if(metodo === "GET" || metodo === "DELETE") {
            option = {
                method: metodo
            }
        }else if(metodo === "POST" || metodo === "PUT") {
            const [nome, sobrenome, email, usuario, senha] = [...corpoDoConteudo];

            option = {
                method: `${metodo}`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    usuario: usuario,
                    senha: senha
                }})
            }
        }

        return option;
    }
}