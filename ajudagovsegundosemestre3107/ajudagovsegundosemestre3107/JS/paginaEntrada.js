const campo = document.getElementById('campo-digitar');
const lista = document.getElementById('lista-sugestoes');

campo.addEventListener('focus', () => {
    lista.style.display = 'block';
});

document.addEventListener('click', (evento) => {
    if (!campo.contains(evento.target) && !lista.contains(evento.target)) {
        lista.style.display = 'none';
    }
});