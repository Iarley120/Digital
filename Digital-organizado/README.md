# AuraDigital

Site institucional interativo separado em arquivos e pastas para facilitar manutenção e publicação.

## Estrutura

```text
AuraDigital-organizado/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── README.md
```

## Como executar

1. Extraia a pasta do projeto.
2. Abra `index.html` no navegador ou use a extensão **Live Server** no Visual Studio Code.
3. Para o formulário salvar dados, execute também a API Python que disponibiliza `POST /api/contato` em `http://127.0.0.1:5000`. Sem essa API, o formulário mostrará a mensagem de erro de conexão.

## Funcionalidades incluídas

- Navegação por seções usando âncoras.
- Alternância entre tema escuro e claro.
- Filtro do portfólio por categoria.
- Carrossel de depoimentos.
- Simulador de orçamento com adicionais, telas e desconto progressivo.
- Perguntas frequentes expansíveis.
- Botão de voltar ao topo.
- Formulário de contato integrado à API local configurada no código.

## Observações

- Os ícones usam Font Awesome via CDN e algumas imagens são carregadas do Unsplash; esses recursos precisam de conexão com a internet.
- O formulário depende de uma API Python local. O front-end não cria nem configura o banco de dados sozinho.
