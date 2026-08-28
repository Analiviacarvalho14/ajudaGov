document.addEventListener('DOMContentLoaded', () => {
    // Nome - apenas letras e espaços
    const nome = document.getElementById('nome');
    if (nome) {
        nome.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 100);
        });
    }

    // CPF - máscara 000.000.000-00
    const cpf = document.getElementById('cpf');
    if (cpf) {
        cpf.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').substring(0, 11);
            if (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
            else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
            else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
            e.target.value = v;
        });
    }

    // Telefone - máscara (00) 00000-0000
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "").substring(0, 11);
            if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            else if (v.length > 5) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            e.target.value = v;
        });
    }
});

function togglePassword(id) {
    const el = document.getElementById(id);
    const btn = el.nextElementSibling;
    if (el.type === "password") {
        el.type = "text";
        btn.textContent = "Ocultar";
    } else {
        el.type = "password";
        btn.textContent = "Ver";
    }
}

function validarCamposUsuario() {
    let valid = true;
    const controls = document.querySelectorAll('#usuarioForm .input-control[required]');

    controls.forEach(c => {
        c.classList.remove('invalid');
        const err = c.closest('.form-group')?.querySelector('.error-message');
        if (err) err.style.display = 'none';

        if (!c.value.trim()) {
            c.classList.add('invalid');
            if (err) err.style.display = 'block';
            valid = false;
        }
    });

    return valid;
}

function mostrarErroCadastro(mensagem) {
    const el = document.getElementById('mensagem-erro-cadastro');
    if (el) {
        el.textContent = mensagem;
        el.style.display = 'block';
    } else {
        alert(mensagem);
    }
}

function esconderErroCadastro() {
    const el = document.getElementById('mensagem-erro-cadastro');
    if (el) el.style.display = 'none';
}

// Monta o objeto que o back-end espera (entidade Usuario) e envia via POST /usuario.
async function finalizarCadastroUsuario() {
    esconderErroCadastro();

    if (!validarCamposUsuario()) return;

    const termos = document.getElementById('termos');
    if (termos && !termos.checked) {
        mostrarErroCadastro('É necessário aceitar os termos e condições de uso.');
        return;
    }

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    if (senha.length < 8) {
        mostrarErroCadastro('A senha deve ter no mínimo 8 caracteres.');
        return;
    }
    if (senha !== confirmarSenha) {
        mostrarErroCadastro('As senhas não coincidem.');
        return;
    }

    const cpfLimpo = document.getElementById('cpf').value.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        mostrarErroCadastro('Insira um CPF válido com 11 dígitos.');
        return;
    }

    const usuario = {
        cpf: cpfLimpo,
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: senha,
        telefone: document.getElementById('telefone').value.trim()
    };

    const botao = document.getElementById('btnFinalizarUsuario');
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    try {
        const resposta = await apiFetch('/usuario', {
            method: 'POST',
            body: JSON.stringify(usuario)
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            salvarSessao({ tipo: 'usuario', nome: dados.nome, email: dados.email });
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'paginaEntrada.html';
        } else {
            const texto = await resposta.text();
            mostrarErroCadastro(texto || 'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.');
        }
    } catch (erro) {
        console.error(erro);
        mostrarErroCadastro('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
        botao.disabled = false;
        botao.textContent = 'Finalizar Cadastro';
    }
}
