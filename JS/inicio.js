document.addEventListener('DOMContentLoaded', () => {
    
    const botaoEntrar = document.getElementById('btnEntrar');

    botaoEntrar.addEventListener('click', () => {
        
        botaoEntrar.innerText = "CARREGANDO...";
        botaoEntrar.style.opacity = "0.7";

        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 1000);
        
    });

    const botaoCadastrar = document.getElementById('btnCadastrar');

    botaoCadastrar.addEventListener('click', () => {
        
        botaoCadastrar.innerText = "CARREGANDO...";
        botaoCadastrar.style.opacity = "0.7";

        setTimeout(() => {
            window.location.href = "dashboard.html"; 
        }, 1000);
        
    });

});