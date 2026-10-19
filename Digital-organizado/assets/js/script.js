// 1. Alternador de Tema (Light / Dark Mode)
        function alternarTema() {
            const body = document.body;
            const botaoIcone = document.querySelector('#btn-tema i');
            body.classList.toggle('light-mode');
            
            if(body.classList.contains('light-mode')) {
                botaoIcone.className = "fa-solid fa-sun";
            } else {
                botaoIcone.className = "fa-solid fa-moon";
            }
        }

        // 2. Monitor de Rotas SPA & Estilo de Menu Ativo
        window.addEventListener('hashchange', atualizarNavegacao);
        window.addEventListener('load', atualizarNavegacao);

        function atualizarNavegacao() {
            const hash = window.location.hash || '#inicio';
            const links = document.querySelectorAll('#menu-navegacao a');
            
            links.forEach(link => {
                if(link.getAttribute('href') === hash) {
                    link.classList.add('ativo');
                } else {
                    link.classList.remove('ativo');
                }
            });

            window.scrollTo({top: 0});
        }

        // 3. Efeito Paralaxe 3D nos Cards da Hero
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                card.style.transform = `rotateY(${x / 10}deg) rotateX(${-y / 10}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
            });
        });

        // 4. Filtro do Portfólio
        function filtrarPortfolio(categoria, botao) {
            document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');

            const itens = document.querySelectorAll('.portfolio-item');
            itens.forEach(item => {
                if(categoria === 'todos' || item.getAttribute('data-categoria') === categoria) {
                    item.classList.remove('escondido');
                } else {
                    item.classList.add('escondido');
                }
            });
        }

        // 5. Carrossel de Depoimentos Funcional
        let depoimentoAtual = 0;
        const depoimentos = document.querySelectorAll('.depoimento');

        function mudarDepoimento(direcao) {
            depoimentos[depoimentoAtual].classList.remove('ativo');
            depoimentoAtual += direcao;

            if (depoimentoAtual >= depoimentos.length) depoimentoAtual = 0;
            if (depoimentoAtual < 0) depoimentoAtual = depoimentos.length - 1;

            depoimentos[depoimentoAtual].classList.add('ativo');
        }

        // 6. Calculadora de Orçamento
        function calcularPreco() {
            const selectBase = document.getElementById('calc-base');
            const selectUi = document.getElementById('calc-ui');
            const selectIdioma = document.getElementById('calc-idioma');
            const selectPrazo = document.getElementById('calc-prazo');
            const selectBanco = document.getElementById('calc-banco');
            const selectSeo = document.getElementById('calc-seo');
            
            const basePreco = parseFloat(selectBase.value);
            const uiPreco = parseFloat(selectUi.value);
            const idiomaPreco = parseFloat(selectIdioma.value);
            const bancoPreco = parseFloat(selectBanco.value);
            const seoPreco = parseFloat(selectSeo.value);
            const prazoMultiplicador = parseFloat(selectPrazo.value);
            
            const quantidadeTelas = parseInt(document.getElementById('calc-telas').value);
            document.getElementById('valor-telas').innerText = quantidadeTelas === 1 ? "1 Tela" : `${quantidadeTelas} Telas`;
            
            let fatorDesconto = 0;
            if (quantidadeTelas >= 5 && quantidadeTelas < 10) fatorDesconto = 0.10;
            if (quantidadeTelas >= 10) fatorDesconto = 0.20;
            
            document.getElementById('txt-desconto').innerText = `Desconto Progressivo: ${(fatorDesconto * 100)}%`;
            
            const custoTelasBruto = (quantidadeTelas - 1) * 200;
            const custoTelasComDesconto = custoTelasBruto * (1 - fatorDesconto);

            let adicionais = 0;
            document.querySelectorAll('.checkbox-container input:checked').forEach(checkbox => {
                adicionais += parseFloat(checkbox.value);
            });

            const somaEscopo = basePreco + uiPreco + idiomaPreco + bancoPreco + seoPreco + custoTelasComDesconto + adicionais;
            const totalFinal = somaEscopo * prazoMultiplicador;
            
            document.getElementById('preco-final').innerText = `R$ ${totalFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;

            const listaResumo = document.getElementById('lista-resumo');
            listaResumo.innerHTML = "";
            
            const itensFaturamento = [
                `• ${selectBase.options[selectBase.selectedIndex].text.split(' - ')[0]}`,
                uiPreco > 0 ? `• ${selectUi.options[selectUi.selectedIndex].text}` : null,
                bancoPreco > 0 ? `• ${selectBanco.options[selectBanco.selectedIndex].text}` : null,
                seoPreco > 0 ? `• ${selectSeo.options[selectSeo.selectedIndex].text}` : null,
                idiomaPreco > 0 ? `• Suporte Multi-idioma integrado` : null,
                quantidadeTelas > 1 ? `• Pacote de volume: ${quantidadeTelas} Telas desenvolvidas` : null,
                prazoMultiplicador > 1 ? `• Modo Prioritário: Entrega Acelerada` : null
            ];

            itensFaturamento.forEach(item => {
                if (item) {
                    const li = document.createElement('li');
                    li.innerText = item;
                    listaResumo.appendChild(li);
                }
            });
            if(listaResumo.children.length === 0) {
                listaResumo.innerHTML = "<li>• Configuração Essencial Ativa</li>";
            }

            const valorDesignTotal = uiPreco + (basePreco * 0.35); 
            const percentualDesign = Math.max(15, Math.min(85, (valorDesignTotal / totalFinal) * 100));
            const percentualDev = 100 - percentualDesign;

            document.getElementById('barra-design').style.width = `${percentualDesign}%`;
            document.getElementById('barra-dev').style.width = `${percentualDev}%`;
        }

        window.addEventListener('DOMContentLoaded', calcularPreco);

        // 7. Acordeão do FAQ
        function alternarFaq(elemento) {
            elemento.classList.toggle('ativo');
        }

        // 8. Monitor de Rolagem para Botão de Voltar ao Topo
        window.addEventListener('scroll', () => {
            const btnTopo = document.getElementById('subir-topo');
            if (window.scrollY > 400) {
                btnTopo.classList.add('visivel');
            } else {
                btnTopo.classList.remove('visivel');
            }
        });

        // 9. Integração Real com o Banco de Dados Python
        function enviarFormulario(event) {
            event.preventDefault();
            
            const alerta = document.getElementById('alerta');
            const alertaTexto = document.getElementById('alerta-texto');
            const form = document.getElementById('meuFormulario');
            
            // Captura os valores digitados pelo usuário
            const dadosFormulario = {
                nome: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                mensagem: form.querySelector('textarea').value
            };

            // Envia os dados estruturados para a API do Python
            fetch('http://127.0.0.1:5000/api/contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosFormulario)
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro na requisição');
                return response.json();
            })
            .then(data => {
                // Feedback visual de sucesso real para o usuário
                alertaTexto.innerText = "Proposta salva no Banco de Dados!";
                alerta.style.background = "var(--cor-sucesso)";
                alerta.classList.add('mostrar');
                form.reset();
            })
            .catch(error => {
                // Feedback visual elegante caso o servidor Python esteja offline
                alertaTexto.innerText = "Erro: Servidor Python offline.";
                alerta.style.background = "#ef4444"; 
                alerta.classList.add('mostrar');
                console.error('Erro ao conectar com o Python:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    alerta.classList.remove('mostrar');
                }, 4000);
            });
        }


// Eventos da interface: mantém o HTML separado da lógica JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('[data-action="alternar-tema"]')?.addEventListener('click', alternarTema);
    document.querySelector('[data-action="subir-topo"]')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('[data-filtro]').forEach(botao => {
        botao.addEventListener('click', () => filtrarPortfolio(botao.dataset.filtro, botao));
    });

    document.querySelectorAll('[data-depoimento]').forEach(botao => {
        botao.addEventListener('click', () => mudarDepoimento(Number(botao.dataset.depoimento)));
    });

    document.querySelectorAll('#lab select, #lab input').forEach(controle => {
        controle.addEventListener('change', calcularPreco);
        controle.addEventListener('input', calcularPreco);
    });

    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => alternarFaq(item));
    });

    document.getElementById('meuFormulario')?.addEventListener('submit', enviarFormulario);
});
