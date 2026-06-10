document.addEventListener("DOMContentLoaded", () => {
    const opcoesPorCategoria = {
        roupas: ["Casacos", "Camisetas", "Calças", "Bermudas", "Calçados"],
        alimentos: ["Arroz (kg)", "Feijão (kg)", "Macarrão (pct)", "Óleo (un)", "Leite (L)"],
        outra: ["Brinquedos", "Produtos de Higiene", "Produtos de Limpeza", "Móveis"]
    };

    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('tipo') ? urlParams.get('tipo').toLowerCase() : 'roupas';

    let nomeFormatado = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    if (!nomeFormatado.endsWith('s') && categoria !== 'outra') {
        nomeFormatado += 's';
    }

    document.querySelectorAll('.badge-categoria').forEach(el => {
        el.textContent = nomeFormatado;
    });

    const inputsTipo = [document.getElementById('tipo1'), document.getElementById('tipo2')];
    const listaItens = opcoesPorCategoria[categoria] || opcoesPorCategoria['roupas'];

    inputsTipo.forEach(selectElement => {
        if (selectElement) {
            selectElement.innerHTML = '<option value="" disabled selected>Selecione</option>';
            listaItens.forEach(item => {
                const option = document.createElement('option');
                option.value = item.toLowerCase().replace(/[^a-z0-9]/g, '');
                option.textContent = item;
                selectElement.appendChild(option);
            });
        }
    });

    const botoesMais = document.querySelectorAll('.btn-add-item');
    const toastContainer = document.getElementById('toast-container');

    botoesMais.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            const numeroBloco = index + 1;
            const selectTipo = document.getElementById(`tipo${numeroBloco}`);
            const selectQtd = document.getElementById(`qtd${numeroBloco}`);

            if (selectTipo && selectQtd) {
                const tipoEscolhido = selectTipo.options[selectTipo.selectedIndex].text;
                const qtdEscolhida = selectQtd.value;

                if (selectTipo.value === "" || selectQtd.value === "") {
                    alert("Por favor, selecione o Tipo e a Quantidade antes de adicionar!");
                    return;
                }

                const aviso = document.createElement('div');
                aviso.className = 'toast-aviso';
                aviso.innerHTML = `✓ Sucesso! ${tipoEscolhido} (Qtd: ${qtdEscolhida}) foi adicionada ao sistema.`;

                if (toastContainer) {
                    toastContainer.appendChild(aviso);
                }

                setTimeout(() => {
                    aviso.style.transition = "opacity 0.3s ease";
                    aviso.style.opacity = "0";
                    setTimeout(() => aviso.remove(), 300);
                }, 3000);

                selectTipo.value = "";
                selectQtd.value = "";
            }
        });
    });
});