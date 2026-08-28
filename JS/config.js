/**
 * Configuração central do front-end.
 * Se o back-end rodar em outra porta/host, basta alterar aqui.
 */
const API_BASE = "http://localhost:8080";

/**
 * Wrapper de fetch já configurado para falar com o back-end:
 * - monta a URL completa a partir do API_BASE
 * - define Content-Type JSON
 * - envia credenciais (cookie de sessão) quando front e back
 *   estiverem na mesma origem (ver observação no README/entrega)
 */
async function apiFetch(caminho, opcoes = {}) {
    const resposta = await fetch(`${API_BASE}${caminho}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(opcoes.headers || {})
        },
        ...opcoes
    });
    return resposta;
}
