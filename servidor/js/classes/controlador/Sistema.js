export default class Sistema {

    verificaCadastroDeUsuario(listaDadosDoUsuario) {
        const [nome, sobrenome, email, cpf, conta] = [...listaDadosDoUsuario]

        if(Sistema.#validaNome(nome) && Sistema.#validaEmail(email) && Sistema.#validaCpf(cpf)) {
            this.#cadastraUsuario(listaDadosDoUsuario);

            return true;
        }

        return false;
    }

    async #cadastraUsuario(...listaDadosDoUsuario) {
        await Sistema.#conectaAPI("", "POST", listaDadosDoUsuario);
    }

    //verificaLogin() {}

    // verificaSaque(valor, conta) {
    //     if(conta.valor - valor > 0) {
    //         Sistema.#finalizaSaque(valor, conta)

    //         return true;
    //     }

    //     return false;
    // }

    //verificaDeposito() {}

    //verificaTransferencia() {}

    //static #finalizaSaque() {}

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

    static async #conectaAPI(id="", metodo="GET", corpoDoConteudo=null) {
        const url = `http://localhost:1337/api/clientes/${id}`;
        const resp = await fetch(url, Sistema.#verificaMetodo(metodo, ...corpoDoConteudo));

        return resp.json();
    }

    static #verificaMetodo(metodo, corpoDoConteudo) {
        let option;

        if(metodo === "GET" || metodo === "DELETE") {
            option = {
                method: metodo
            }
        }else if(metodo === "POST" || metodo === "PUT") {
            const [nome, sobrenome, email, cpf, conta] = [...corpoDoConteudo];

            option = {
                method: `${metodo}`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({data: {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    cpf: cpf,
                    conta: conta
                }})
            }
        }

        return option;
    }
}