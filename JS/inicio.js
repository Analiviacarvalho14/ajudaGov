document.addEventListener('DOMContentLoaded', () => {
    
    const botaoEntrar = document.getElementById('btnEntrar');
    const botaoCadastrar = document.getElementById('btnCadastrar');

    function navegarPara(botao, destino) {
        botao.disabled = true;
        
        botao.innerText = "CARREGANDO...";
        botao.style.opacity = "0.7";
        botao.style.cursor = "not-allowed";

        setTimeout(() => {
            window.location.href = destino; 
        }, 1000);
    }

    if(botaoEntrar) {
        botaoEntrar.addEventListener('click', () => {
            navegarPara(botaoEntrar, "HTML/login.html"); 
        });
    }

    if(botaoCadastrar) {
        botaoCadastrar.addEventListener('click', () => {
            navegarPara(botaoCadastrar, "HTML/cadastro.html"); 
        });
    }
});