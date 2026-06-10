/* ==========================================================================
   MECANISMO DE FILTRO DINÂMICO DE CATEGORIAS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const botoesCategoria = document.querySelectorAll(".botao-categoria");
    const cartoesOng = document.querySelectorAll(".cartao-ong");

    botoesCategoria.forEach(botao => {
        botao.addEventListener("click", () => {
            // 1. Remove a classe 'ativo' de todos os botões e adiciona no clicado
            botoesCategoria.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            // 2. Obtém o filtro do botão clicado
            const filtroSelecionado = botao.getAttribute("data-filtro");

            // 3. Varre as ONGs aplicando a regra de ocultar/mostrar
            cartoesOng.forEach(cartao => {
                const categoriaCartao = cartao.getAttribute("data-categoria");

                if (filtroSelecionado === "todos" || categoriaCartao === filtroSelecionado) {
                    cartao.style.display = "flex"; // Ajuste para o tipo de display usado nos seus cards
                } else {
                    cartao.style.display = "none";
                }
            });
        });
    });
});