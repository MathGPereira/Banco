export function imprimeErro(mensagem) {
    const span = $("[data-erro-login]");
    
    span.text(mensagem);
}
