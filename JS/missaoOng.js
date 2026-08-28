let stepAtual = 1;

document.addEventListener("DOMContentLoaded", () => {
    // CNPJ
    const inputFoto = document.getElementById('inputFoto');
    const nomeArquivo = document.getElementById('nomeArquivo');

    const cnpj1 = document.getElementById('cnpj');
    const cnpj2 = document.getElementById('cnpjFinanceiro');
    [cnpj1, cnpj2].forEach(inp => {
        if(inp) {
            inp.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, "").substring(0, 14);
                if (v.length > 12) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                else if (v.length > 8) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
                else if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
                else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
                if (cnpj1) cnpj1.value = v; 
                if (cnpj2) cnpj2.value = v;
            });
        }
    });

    // Filtros de texto
    const nomeOng = document.getElementById('nomeOng');
    if (nomeOng) {
        nomeOng.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 100);
        });
    }

    const banco = document.getElementById('banco');
    if (banco) {
        banco.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').substring(0, 50);
        });
    }

    // Trava para o campo de Endereço não aceitar sequências longas só de números
    const enderecoInput = document.getElementById('endereco');
    if (enderecoInput) {
        enderecoInput.addEventListener('input', (e) => {
            if (/^\d{9,}$/.test(e.target.value)) {
                e.target.value = e.target.value.substring(0, 8);
            }
        });
    }

    // Telefones
    const telefones = [document.getElementById('telefone'), document.getElementById('numeroPessoal')];
    telefones.forEach(t => {
        if(t) {
            t.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, "").substring(0, 11);
                if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
                else if (v.length > 5) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
                else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
                e.target.value = v;
            });
        }
    });

    // Agência
    const agencia = document.getElementById('agencia');
    if (agencia) {
        agencia.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').substring(0, 5);
            e.target.value = v.length > 4 ? v.substring(0, 4) + '-' + v.substring(4) : v;
        });
    }

    // Orçamento
    const orcamento = document.getElementById('orcamento');
    if (orcamento) {
        orcamento.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if(!v) return e.target.value = '';
            v = (v / 100).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            e.target.value = "R$ " + v;
        });
    }

    // LÓGICA DO CEP E REVELAÇÃO DO CAMPO DE NÚMERO
    const cepInput = document.getElementById('cep');
    const balao = document.getElementById('balaoNumero');
    const numInput = document.getElementById('numeroResidencia');
    const colNumero = document.getElementById('col-numero');

    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let rawValue = e.target.value.replace(/\D/g, "").substring(0, 8);
            
            // Formatando o CEP (00000-000)
            if (rawValue.length > 5) {
                e.target.value = rawValue.substring(0, 5) + "-" + rawValue.substring(5);
            } else {
                e.target.value = rawValue;
            }

            // Exibe o campo apenas quando tiver os 8 números
            if (rawValue.length === 8) {
                if(colNumero) colNumero.style.display = 'table-cell';
                if(numInput) numInput.setAttribute('required', 'true');
                if(balao) balao.style.display = 'block';
                
                buscarCep(rawValue);
                
                setTimeout(() => {
                    if(balao) balao.style.display = 'none';
                }, 6000);
            } else {
                if(colNumero) colNumero.style.display = 'none';
                if(numInput) {
                    numInput.removeAttribute('required');
                    numInput.value = '';
                }
                if(balao) balao.style.display = 'none';
            }
        });
    }

    if (numInput && balao) {
        numInput.addEventListener('focus', () => {
            balao.style.display = 'none';
        });
    }

    if (inputFoto && nomeArquivo) {
        inputFoto.addEventListener('change', (e) => {
            const arquivos = e.target.files;
            if (arquivos.length > 0) {
                // Mapeia o nome de cada arquivo selecionado
                const nomes = Array.from(arquivos).map(file => file.name).join(', ');
                nomeArquivo.textContent = `Selecionado(s): ${nomes}`;
                nomeArquivo.style.color = '#28a745'; // Cor verde de confirmação
            } else {
                nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                nomeArquivo.style.color = '#666666';
            }
        });
    }
});

// Busca na API ViaCEP
function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (!data.erro) {
                const campoEndereco = document.getElementById('endereco');
                if(campoEndereco) {
                    campoEndereco.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                }
            }
        })
        .catch(() => {});
}

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
        stepAtual = 4;
        document.getElementById(`step-${stepAtual}`).classList.add('active');
        document.getElementById(`tab-${stepAtual}`).classList.add('active');
        finalizarCadastroOng();
        return;
    }

    document.getElementById(`step-${stepAtual}`).classList.add('active');
    document.getElementById(`tab-${stepAtual}`).classList.add('active');

    document.getElementById('btnVoltar').style.display = stepAtual === 1 ? 'none' : 'inline-block';
    document.getElementById('btnProsseguir').textContent = stepAtual === 4 ? 'Finalizar' : 'Prosseguir';
}

// Monta o objeto que o back-end espera (entidade Instituicao) e envia via POST /instituicao.
// Campos do wizard que não existem na entidade (missão, visão, upload de fotos, etc.)
// ficam só na experiência do formulário e não são enviados, pois o back-end não os persiste.
async function finalizarCadastroOng() {
    const termos = document.getElementById('termos');
    if (termos && !termos.checked) {
        alert('É necessário aceitar os termos e condições de uso para finalizar.');
        return;
    }

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    const cnpjLimpo = document.getElementById('cnpj').value.replace(/\D/g, '');

    const instituicao = {
        cnpj: cnpjLimpo,
        nome: document.getElementById('nomeOng').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: senha,
        telefone: document.getElementById('telefone').value.trim(),
        contaBancaria: {
            numeroConta: document.getElementById('conta').value.trim(),
            agencia: document.getElementById('agencia').value.trim()
        }
    };

    const btnProsseguir = document.getElementById('btnProsseguir');
    btnProsseguir.disabled = true;
    btnProsseguir.textContent = 'Enviando...';

    try {
        const resposta = await apiFetch('/instituicao', {
            method: 'POST',
            body: JSON.stringify(instituicao)
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            salvarSessao({ tipo: 'ong', nome: dados.nome, email: dados.email });
            alert('Cadastro da ONG realizado com sucesso!');
            window.location.href = 'paginaEntrada.html';
        } else {
            const texto = await resposta.text();
            alert(texto || 'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.');
        }
    } catch (erro) {
        console.error(erro);
        alert('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
        btnProsseguir.disabled = false;
        btnProsseguir.textContent = 'Finalizar';
    }
}

function validateStep() {
    let valid = true;
    const controls = document.querySelectorAll(`#step-${stepAtual} .input-control[required]`);
    
    controls.forEach(c => {
        // Se a coluna pai estiver visível ou não existir
        const parentCol = c.closest('.grid-col');
        if (parentCol && parentCol.style.display === 'none') {
            return;
        }

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
