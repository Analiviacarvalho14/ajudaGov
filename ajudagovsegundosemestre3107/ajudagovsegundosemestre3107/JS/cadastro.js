document.addEventListener("DOMContentLoaded", () => {
    const btnCadastrar = document.getElementById("btnCadastrar");

    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", (e) => {
            e.preventDefault();
            abrirFormularioCadastro();
        });
    }
});

function abrirFormularioCadastro() {
    const abaCadastro = document.querySelector(".aba-cadastro");
    if (!abaCadastro) return;

    abaCadastro.innerHTML = `
        <form id="formCadastro" class="form-cadastro">
            <h3>Criar Conta</h3>
            
            <input type="text" id="nome" placeholder="Nome Completo" required>
            <input type="email" id="email" placeholder="E-mail" required>
            <input type="tel" id="telefone" placeholder="Telefone" required>
            <input type="password" id="senha" placeholder="Senha" required>
            
            <button type="submit" class="botao-cadastrar" style="width: 100%; margin-top: 10px;">ENVIAR</button>
        </form>
    `;

    document.getElementById("formCadastro").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
        };

        console.log("Dados cadastrados:", dados);
        alert("Cadastro realizado com sucesso!");
    });
}