document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do DOM
    const campoBusca = document.querySelector(".busca input");
    const itensLegenda = document.querySelectorAll(".legenda li");
    const cards = document.querySelectorAll(".card");

    /* --- 1. FILTRO POR DIGITAÇÃO (BARRA DE PESQUISA) --- */
    campoBusca.addEventListener("input", () => {
        const termoPesquisa = campoBusca.value.toLowerCase().trim();

        cards.forEach(card => {
            const nomeONG = card.querySelector(".card-info strong").textContent.toLowerCase();
            
            // Verifica se o texto digitado bate com o nome da ONG
            if (nomeONG.includes(termoPesquisa)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    /* --- 2. FILTRO POR COR (MURAL DA LEGENDA) --- */
    itensLegenda.forEach(item => {
        item.addEventListener("click", () => {
            let classeAlvo = "";

            // Mapeia o emoji da legenda para a classe respectiva do card
            if (item.textContent.includes("🔴")) classeAlvo = "card-vermelho";
            if (item.textContent.includes("🟠")) classeAlvo = "card-laranja";
            if (item.textContent.includes("🟡")) classeAlvo = "card-amarelo";
            if (item.textContent.includes("🟢")) classeAlvo = "card-verde";

            // Se o usuário clicar no item que já está ativo, desativa o filtro e exibe tudo
            if (item.classList.contains("ativo")) {
                item.classList.remove("ativo");
                cards.forEach(card => card.style.display = "flex");
                return;
            }

            // Remove a classe ativo dos outros itens e adiciona no clicado
            itensLegenda.forEach(i => i.classList.remove("ativo"));
            item.classList.add("ativo");

            // Oculta ou exibe os cards baseado na classe alvo correspondente
            cards.forEach(card => {
                if (card.classList.contains(classeAlvo)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
