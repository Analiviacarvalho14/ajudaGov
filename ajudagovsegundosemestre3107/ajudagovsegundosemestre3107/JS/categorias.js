// Aguarda a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de filtro e todos os cartões de ONGs
    const botoes = document.querySelectorAll('.botao-categoria');
    const cartoes = document.querySelectorAll('.cartao-ong');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            
            // 1. Remove a cor de "ativo" de todos os botões e deixa só no clicado
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            // 2. Pega o tipo de categoria que o usuário quer ver
            const filtroSelecionado = botao.getAttribute('data-filtro');

            // 3. Controla o que aparece e o que some na tela
            cartoes.forEach(cartao => {
                const categoriaCartao = cartao.getAttribute('data-categoria');

                // Se clicou em 'todos' ou se a categoria do cartão for a escolhida
                if (filtroSelecionado === 'todos' || categoriaCartao === filtroSelecionado) {
                    cartao.classList.remove('escondido'); // Mostra o cartão
                } else {
                    cartao.classList.add('escondido'); // Esconde o cartão
                }
            });
        });
    });
});
