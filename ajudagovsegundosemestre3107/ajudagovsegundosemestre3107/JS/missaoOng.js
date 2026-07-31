let stepAtual = 1;

document.addEventListener("DOMContentLoaded", () => {
    const cnpj1 = document.getElementById('cnpj');
    const cnpj2 = document.getElementById('cnpjFinanceiro');
    [cnpj1, cnpj2].forEach(inp => {
        inp.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "").substring(0, 14);
            if (v.length > 12) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
            else if (v.length > 8) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
            else if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
            cnpj1.value = v; cnpj2.value = v;
        });
    });

    document.getElementById('nomeOng').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 100);
    });
    document.getElementById('banco').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 50);
    });

    const telefones = [document.getElementById('telefone'), document.getElementById('numeroPessoal')];
    telefones.forEach(t => {
        t.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, "").substring(0, 11);
            if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            else if (v.length > 5) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
            e.target.value = v;
        });
    });

    document.getElementById('agencia').addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 5);
        e.target.value = v.length > 4 ? v.substring(0, 4) + '-' + v.substring(4) : v;
    });

    document.getElementById('orcamento').addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if(!v) return e.target.value = '';
        v = (v / 100).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = "R$ " + v;
    });
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

function navigateStep(direction) {
    if (direction === 1 && !validateStep()) return;

    document.getElementById(`step-${stepAtual}`).classList.remove('active');
    document.getElementById(`tab-${stepAtual}`).classList.remove('active');
    
    stepAtual += direction;

    if (stepAtual > 4) {
        alert('Formulário enviado com sucesso!');
        location.reload();
        return;
    }

    document.getElementById(`step-${stepAtual}`).classList.add('active');
    document.getElementById(`tab-${stepAtual}`).classList.add('active');

    document.getElementById('btnVoltar').style.display = stepAtual === 1 ? 'none' : 'inline-block';
    document.getElementById('btnProsseguir').textContent = stepAtual === 4 ? 'Finalizar' : 'Prosseguir';
}

function validateStep() {
    let valid = true;
    const controls = document.querySelectorAll(`#step-${stepAtual} .input-control[required]`);
    
    controls.forEach(c => {
        c.classList.remove('invalid');
        const err = c.parentElement.querySelector('.error-message');
        if (err) err.style.display = 'none';

        if (!c.value.trim()) {
            c.classList.add('invalid');
            if (err) err.style.display = 'block';
            valid = false;
        }
    });
    return valid;
}