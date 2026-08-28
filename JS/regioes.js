document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.botao-categoria');
    const cartoes = document.querySelectorAll('.cartao-ong');
    const inputBusca = document.getElementById('input-busca');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const filtroSelecionado = botao.getAttribute('data-filtro');

            cartoes.forEach(cartao => {
                const regiaoCartao = cartao.getAttribute('data-categoria');

                if (filtroSelecionado === 'todos' || regiaoCartao === filtroSelecionado) {
                    cartao.classList.remove('escondido');
                } else {
                    cartao.classList.add('escondido');
                }
            });
        });
    });

    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            const termoBusca = e.target.value.toLowerCase();

            cartoes.forEach(cartao => {
                const conteudoTexto = cartao.textContent.toLowerCase();
                
                if (conteudoTexto.includes(termoBusca)) {
                    cartao.classList.remove('escondido');
                } else {
                    cartao.classList.add('escondido');
                }
            });
        });
    }
});
