document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById('necessidadesOng');
    const counter = document.getElementById('counter');

    if (textarea && counter) {
        textarea.addEventListener('input', (e) => {
            const comprimentoTexto = e.target.value.length;
            counter.textContent = comprimentoTexto;

            if (comprimentoTexto >= 280) {
                counter.parentElement.style.color = '#dc3545';
                counter.parentElement.style.fontWeight = '700';
            } else {
                counter.parentElement.style.color = '#666666';
                counter.parentElement.style.fontWeight = '400';
            }
        });
    }
});