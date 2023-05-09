export default class Sistema {

    async verificaLogin(cpf, senha) {
        if(Sistema.#validaCpf(cpf)) {
            const bd = await Sistema.#conectaAPI();
            
            bd.data.map(cliente => {
                if(cliente.attributes.cpf === cpf && cliente.attributes.conta.senha === senha) {
                    Sistema.#logaUsuario();
                    return true;
                }
            })
        }

        return false;
    }

    static #logaUsuario() {
        //window.location.replace("../../../public/paginas/paginaInicial.html");
        console.log("Login finalizado!");
    }

    // verificaCadastroDeConta(...listaDadosDoUsuario) {
    //     const conta = listaDadosDoUsuario[0].conta;
        
    //     if(Sistema.#validaSenha(conta.senha)) {
    //         Sistema.#criaConta(conta);

    //         return true;
    //     }

    //     return false;
    // }

    // verificaCadastroDeUsuario(...listaDadosDoUsuario) {
    //     const cliente = listaDadosDoUsuario[0];

    //     if(Sistema.#validaNome(cliente.nome) && Sistema.#validaEmail(cliente.email) && Sistema.#validaCpf(cliente.cpf)) {
    //         try {
    //             Sistema.#cadastraUsuario(cliente);
    //         }catch(erro) {
    //             return erro;
    //         }finally {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

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

    // static async #criaConta(conta) {
    //     await Sistema.#conectaAPI("", "POST", conta, "contas");
    // }

    // static async #verificaConta(id) {
    //     const conta = await Sistema.#conectaAPI(id, "GET", [null], "contas")

    //     console.log(conta);
    // }

    // static async #finalizaSaque() {

    // }

    // static async #atualizaUsuario(id, cliente) {
    //     await Sistema.#conectaAPI(id, "PUT", cliente);
    // }

    // static async #deletaUsuario(id) {
    //     await Sistema.#conectaAPI(id, "DELETE");
    // }

    // static async #cadastraUsuario(cliente) {
    //     await Sistema.#conectaAPI("", "POST", cliente);
    // }

    // static async #mostraUsuarioCadastrado(id) {
    //     return await Sistema.#conectaAPI(id);
    // }

    // static #validaSenha(senha) {
    //     if(senha >= 8) {
    //         return true;
    //     }

    //     return false;
    // }

    // static #validaNome(nome) {
    //     if(nome.length >= 3) {
    //         return true;
    //     }

    //     return false;
    // }

    // static #validaEmail(email) {
    //     const re = /\w+@\w+\.\w+/;
    //     const resultado = re.test(email);

    //     if(email.length >= 8 && resultado) {
    //         return true;
    //     }

    //     return false;
    // }

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