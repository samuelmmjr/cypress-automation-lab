# Cypress Automation Lab

Laboratório prático de automação de testes **UI e API com Cypress**, estruturado a partir de cenários públicos da plataforma [DemoQA](https://demoqa.com/).

O foco deste repositório não é apenas demonstrar comandos do Cypress. A proposta é aplicar princípios de **Quality Engineering**: cenários independentes, assertions relevantes, organização por responsabilidade, redução de flakiness e código de teste legível e sustentável.

> Este projeto surgiu originalmente de um desafio técnico e foi posteriormente reorganizado como laboratório de automação.

## Objetivos

- Exercitar automação E2E de interface web.
- Validar fluxos de API REST com criação e limpeza de dados.
- Separar specs de UI e API.
- Aplicar Page Objects onde há ganho real de manutenção.
- Evitar waits fixos e dependência de ordem entre testes.
- Demonstrar assertions sobre comportamento e dados, não apenas status HTTP.

## Cobertura atual

### API — Book Store

O cenário automatizado executa um fluxo completo e autocontido:

1. cria um usuário temporário;
2. gera o token de autenticação;
3. consulta livros disponíveis;
4. adiciona dois livros ao usuário;
5. consulta o perfil e valida os ISBNs associados;
6. remove o usuário criado ao final do fluxo.

### UI

| Área | Validação |
| --- | --- |
| Practice Form | preenchimento com dados dinâmicos e validação dos dados no modal de confirmação |
| Progress Bar | interrupção antes de 25%, conclusão em 100% e reset sem wait fixo |
| Browser Windows | interceptação da chamada de nova janela e validação da página de destino |
| Web Tables | criação, edição e exclusão de registro localizado pelo e-mail |
| Sortable | validação da ordem padrão da lista |

> O cenário de Sortable valida a ordem exibida. Ele não é apresentado como teste de drag-and-drop porque a implementação atual não realiza reordenação de itens.

## Estrutura

```text
cypress-automation-lab/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── book-store.cy.js
│   │   └── ui/
│   │       ├── browser-windows.cy.js
│   │       ├── practice-form.cy.js
│   │       ├── progress-bar.cy.js
│   │       ├── sortable.cy.js
│   │       └── web-tables.cy.js
│   ├── fixtures/
│   │   └── exemplo.txt
│   └── support/
│       ├── commands.js
│       ├── e2e.js
│       └── pages/
│           ├── browser-windows.page.js
│           ├── practice-form.page.js
│           ├── progress-bar.page.js
│           ├── sortable.page.js
│           └── web-tables.page.js
├── .gitignore
├── cypress.config.js
├── package.json
└── README.md
```

## Decisões de engenharia

### Cenário de API autocontido

O fluxo de Book Store é tratado como um único cenário de negócio. Isso elimina a dependência entre vários `it()` que compartilhavam `userId`, `token` e ISBNs. O teste cria seu próprio estado, valida o resultado e remove o usuário criado.

### Assertions mais relevantes

Além dos códigos HTTP, o projeto valida conteúdo de respostas, username, token, quantidade de livros e ISBNs associados ao usuário.

Nos testes de UI, operações de CRUD são confirmadas na tabela e o formulário verifica os dados exibidos após o envio.

### Sem `cy.wait()` fixo no Progress Bar

A automação observa o valor semântico exposto em `aria-valuenow` e usa o mecanismo de retry do Cypress. Isso reduz dependência de velocidade de máquina ou ambiente.

### Seleção por identidade do dado

No Web Tables, edição e exclusão localizam o registro pelo e-mail criado pelo teste. Isso evita depender de posições como `.last()`, que podem mudar conforme o estado da aplicação.

### Page Objects com responsabilidade limitada

Os Page Objects encapsulam navegação e interação com componentes específicos. Dados e intenção do cenário permanecem visíveis nas specs para não esconder excessivamente a regra de teste.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
git clone https://github.com/samuelmmjr/cypress-automation-lab.git
cd cypress-automation-lab
npm install
```

## Execução

Abrir o Cypress em modo interativo:

```bash
npm run cy:open
```

Executar toda a suíte em modo headless:

```bash
npm test
```

Somente API:

```bash
npm run cy:run:api
```

Somente UI:

```bash
npm run cy:run:ui
```

## Stack

`Cypress` · `JavaScript` · `Node.js` · `Faker` · `REST API`

## Próximas evoluções

- adicionar CI com GitHub Actions;
- produzir relatório de execução na pipeline;
- adicionar cenários negativos de API;
- evoluir o cenário Sortable para uma interação real de drag-and-drop se isso trouxer valor ao laboratório;
- avaliar uma camada de API reutilizável quando a quantidade de cenários justificar a abstração.

## Autor

**Samuel Melo — Quality Engineer**

- GitHub: https://github.com/samuelmmjr
- LinkedIn: https://www.linkedin.com/in/samuelmelojr/
