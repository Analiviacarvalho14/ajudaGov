function validarSenha() {
    const senhaInput = document.getElementById('senha').value;
    const caixaValidacao = document.getElementById('caixa-validacao');
    const regraEspecial = document.getElementById('regra-especial');
    const regraTamanho = document.getElementById('regra-tamanho');

    if (senhaInput.length > 0) {
        caixaValidacao.style.display = 'block';
    } else {
        caixaValidacao.style.display = 'none';
    }

    if (senhaInput.length >= 8) {
        regraTamanho.classList.add('regra-valida');
        regraTamanho.innerText = "✔️ No mínimo 8 caracteres";
    } else {
        regraTamanho.classList.remove('regra-valida');
        regraTamanho.innerText = "❌ No mínimo 8 caracteres";
    }

    const temEspecial = /[@#$!]/.test(senhaInput);
    if (temEspecial) {
        regraEspecial.classList.add('regra-valida');
        regraEspecial.innerText = "✔️ Um caractere especial (@, #, $, !)";
    } else {
        regraEspecial.classList.remove('regra-valida');
        regraEspecial.innerText = "❌ Um caractere especial (@, #, $, !)";
    }
}

function tentarEntrar() {
    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !login || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    console.log("Tentando logar usuário:", login);
}