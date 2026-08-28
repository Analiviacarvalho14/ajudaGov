document.addEventListener('DOMContentLoaded', () => {

    const botoes = document.querySelectorAll('.botao-categoria');
    const cartoes = document.querySelectorAll('.cartao-ong');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const filtroSelecionado = botao.getAttribute('data-filtro');

            cartoes.forEach(cartao => {
                const categoriaCartao = cartao.getAttribute('data-categoria');

                if (filtroSelecionado === 'todos' || categoriaCartao === filtroSelecionado) {
                    cartao.classList.remove('escondido'); 
                } else {
                    cartao.classList.add('escondido'); 
                }
            });
        });
    });
});
