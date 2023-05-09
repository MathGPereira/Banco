export default class Sistema {

    async verificaLogin(cpf, senha) {
        if(Sistema.#validaCpf(cpf)) {
            const bd = await Sistema.#conectaAPI();

            bd.data.map(cliente => {
                if(cliente.attributes.cpf === cpf && cliente.attributes.conta.senha === senha && Sistema.#validaSenha(senha)) {
                    Sistema.#logaUsuario(cpf);
                    return true;
                }
            })
        }

        return false;
    }

    static async #logaUsuario(cpf) {
        const url = "http://localhost:3000/entrada";

        try {
            await fetch(url, this.#verificaMetodo("POST", {cpf}));
        }catch(erro) {
            console.log(erro);
        }finally {
            window.location.replace("../../../public/paginas/funcionais/paginaInicial.html");
        }
    }

    async verificaCadastroDeUsuario(...listaDadosDoUsuario) {
        const cliente = listaDadosDoUsuario[0];

        if(Sistema.#validaNome(cliente.nome) && Sistema.#validaEmail(cliente.email) && Sistema.#validaCpf(cliente.cpf) && await Sistema.#validaInputsRepetidos(cliente.cpf, cliente.email, cliente.conta.usuario)) {
            try {
                Sistema.#cadastraUsuario(cliente);
            }catch(erro) {
                return erro;
            }finally {
                window.location.replace("../../../index.html");
                return true;
            }
        }

        return false;
    }

    static async #cadastraUsuario(cliente) {
        await Sistema.#conectaAPI("", "POST", cliente);
    }

    static async #validaInputsRepetidos(cpf, email, usuario) {
        let retorno;
        const bd = await Sistema.#conectaAPI();

        bd.data.map(cliente => {
            if(cliente.attributes.cpf === cpf || cliente.attributes.email === email || cliente.attributes.conta.usuario === usuario) {
                retorno = false;
            }else {
                retorno = true;
            }
        });

        return retorno;
    }

    static #validaNome(nome) {
        if(nome.length >= 3) {
            return true;
        }

        return false;
    }

    static #validaEmail(email) {
        const re = /\w+@\w+\.\w+/;
        const resultado = re.test(email);

        if(email.length >= 8 && resultado) {
            return true;
        }

        return false;
    }

    // async verificaUsuarioCadastrado(id) {
    //     const usuario = await Sistema.#conectaAPI(id);

    //     if(usuario.error) {
    //         return usuario.error;
    //     }else {
    //         Sistema.#mostraUsuarioCadastrado(id);
    //     }
    // }

    // async verificaUsuarioDeletado(id) {
    //     const usuario = await Sistema.#conectaAPI(id);

    //     if(!usuario.error) {
    //         Sistema.#deletaUsuario(id);

    //         return;
    //     }

    //     return usuario.error;
    // }

    // async verificaUsuarioAlterado(id, ...listaDadosUsuario) {
    //     const usuario = await Sistema.#conectaAPI(id);

    //     if(!usuario.error) {
    //         const cliente = listaDadosUsuario[0];

    //         Sistema.#atualizaUsuario(id, cliente);

    //         return;
    //     }

    //     return usuario.error;
    // }

    // verificaSaque(valor, conta) {
    //     if(Sistema.#verificaConta(conta) && conta.valor - valor > 0) {
    //         Sistema.#finalizaSaque(valor, conta);

    //         return true;
    //     }

    //     return false;
    // }

    // //verificaDeposito() {}

    // //verificaTransferencia() {}

    // static async #finalizaSaque() {

    // }

    // static async #atualizaUsuario(id, cliente) {
    //     await Sistema.#conectaAPI(id, "PUT", cliente);
    // }

    // static async #deletaUsuario(id) {
    //     await Sistema.#conectaAPI(id, "DELETE");
    // }

    // static async #mostraUsuarioCadastrado(id) {
    //     return await Sistema.#conectaAPI(id);
    // }

    static #validaSenha(senha) {
        if(senha >= 8) {
            return true;
        }

        return false;
    }

    static #validaCpf(cpf) {
        if(this.#validaPrimeiroDigito(cpf) && this.#validaSegundoDigito(cpf) && this.#validaNumeroRepetido(cpf)) {
            return true;
        }

        return false;
    }

    static #validaPrimeiroDigito(cpf) {
        let soma = 0;
        let multiplicador = 10;

        for(let tamanho = 0; tamanho < 9; tamanho++) {
            soma += cpf[tamanho] * multiplicador;
            multiplicador--;
        }

        soma = (soma * 10) % 11;

        if(soma == 10 || soma == 11) {
            soma = 0;
        }

        return soma == cpf[9];
    } 

    static #validaSegundoDigito(cpf) {
        let soma = 0;
        let multiplicador = 11;

        for(let tamanho = 0; tamanho < 10; tamanho++) {
            soma += cpf[tamanho] * multiplicador;
            multiplicador--;
        }

        soma = (soma * 10) % 11;

        if(soma == 10 || soma == 11) {
            soma = 0;
        }

        return soma == cpf[10];
    }

    static #validaNumeroRepetido(cpf) {
        const numerosRepetidos = [
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999"
        ]

        return !numerosRepetidos.includes(cpf);
    }

    static async #conectaAPI(id="", metodo="GET", corpoDoConteudo=[null], lugar="clientes") {
        const url = `http://localhost:1337/api/${lugar}/${id}`;
        const resp = await fetch(url, Sistema.#verificaMetodo(metodo, corpoDoConteudo));

        return resp.json();
    }

    static #verificaMetodo(metodo, conteudo) {
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
                body: JSON.stringify({data: conteudo})
            }
        }

        return option;
    }
}