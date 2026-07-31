document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleção dos elementos do DOM
    const botoesCategoria = document.querySelectorAll(".botao-categoria");
    const cartoesOng = document.querySelectorAll(".cartao-ong");
    const campoPesquisa = document.querySelector(".barra-pesquisa input");

    // 2. Lógica para filtrar por Botão de Categoria
    botoesCategoria.forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove a classe 'ativo' de todos os botões e adiciona no clicado
            botoesCategoria.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtroSelecionado = botao.getAttribute("data-filtro");

            // Aplica o filtro nos cartões de ONGs
            filtrarOngs(filtroSelecionado, campoPesquisa ? campoPesquisa.value : "");
        });
    });

    // 3. Lógica para filtrar por Pesquisa de Texto (Barra de busca)
    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", () => {
            const botaoAtivo = document.querySelector(".botao-categoria.ativo");
            const filtroCategoria = botaoAtivo ? botaoAtivo.getAttribute("data-filtro") : "todos";
            
            filtrarOngs(filtroCategoria, campoPesquisa.value);
        });
    }
    
    function filtrarOngs(categoria, textoBusca) {
        const termo = textoBusca.toLowerCase().trim();

        cartoesOng.forEach(cartao => {
            const categoriaCartao = cartao.getAttribute("data-categoria");
            const textoConteudo = cartao.textContent.toLowerCase();

            // Verifica se o cartão atende ao filtro de categoria
            const combinaCategoria = (categoria === "todos" || categoriaCartao === categoria);
            
            // Verifica se o cartão atende ao filtro de busca por texto
            const combinaTexto = textoConteudo.includes(termo);

            // Exibe apenas se passar por ambos os filtros
            if (combinaCategoria && combinaTexto) {
                cartao.style.display = "flex"; // Mantém o display adequado para os cartões
            } else {
                cartao.style.display = "none";
            }
        });
    }
});