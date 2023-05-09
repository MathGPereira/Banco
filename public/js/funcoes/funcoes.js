import { requisitaAcao } from "../../../servidor/servidor.js";

export function imprimeErro(mensagem) {
    const span = $("[data-erro-login]");
    
    span.text(mensagem);
}

export function verificaAcao(acao) {
    requisitaAcao(acao);
}
