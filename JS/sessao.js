/**
 * Controle de sessão do usuário logado (ONG ou Usuário comum).
 * Guardamos os dados no localStorage porque o cookie de sessão do
 * back-end (HttpSession) não é compartilhado de forma confiável entre
 * origens diferentes (ver observação sobre CORS na entrega).
 */
const CHAVE_SESSAO = "ajudaGovSessao";

function salvarSessao({ tipo, nome, email }) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ tipo, nome, email }));
}

function obterSessao() {
    const bruto = localStorage.getItem(CHAVE_SESSAO);
    if (!bruto) return null;
    try {
        return JSON.parse(bruto);
    } catch {
        return null;
    }
}

function encerrarSessao() {
    localStorage.removeItem(CHAVE_SESSAO);
}

/**
 * Troca "Entre na sua conta" pelo nome de quem está logado no cabeçalho.
 * Espera encontrar, no <header>, um link com id="linkConta" envolvendo
 * um elemento com id="areaConta".
 */
function atualizarCabecalho() {
    const linkConta = document.getElementById("linkConta");
    const areaConta = document.getElementById("areaConta");
    if (!linkConta || !areaConta) return;

    const sessao = obterSessao();

    if (sessao && sessao.nome) {
        areaConta.textContent = `Olá, ${sessao.nome} 👤`;
        linkConta.setAttribute("href", "#");
        linkConta.onclick = (evento) => {
            evento.preventDefault();
            if (confirm("Deseja sair da sua conta?")) {
                encerrarSessao();
                window.location.href = "paginaEntrada.html";
            }
        };
    } else {
        areaConta.textContent = "Entre na sua conta 👤";
        linkConta.setAttribute("href", "login.html");
        linkConta.onclick = null;
    }
}

document.addEventListener("DOMContentLoaded", atualizarCabecalho);
