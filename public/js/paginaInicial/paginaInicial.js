import { verificaAcao } from "../funcoes/funcoes.js";

const botoesAcao = $("[data-acao]");

botoesAcao.each(function() {
    $(this).click(function() {
        verificaAcao($(this).attr("data-acao"));
    });
});
