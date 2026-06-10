document.addEventListener("DOMContentLoaded", () => {
    const botoesRegiao = document.querySelectorAll(".botao-categoria");
    const cartoesOng = document.querySelectorAll(".cartao-ong");

    botoesRegiao.forEach(botao => {
        botao.addEventListener("click", () => {
            // 1. Alterna o estado visual ativo dos botões
            botoesRegiao.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            // 2. Captura o filtro selecionado (ex: "nordeste", "sul", "todos")
            const filtroSelecionado = botao.getAttribute("data-filtro");

            // 3. Varre os cartões filtrando pelo atributo 'data-regiao'
            cartoesOng.forEach(cartao => {
                const regiaoCartao = cartao.getAttribute("data-regiao");

                if (filtroSelecionado === "todos" || regiaoCartao === filtroSelecionado) {
                    cartao.style.display = "flex";
                } else {
                    cartao.style.display = "none";
                }
            });
        });
    });
});