# Cypress Automation Lab

[![Cypress Tests](https://github.com/samuelmmjr/cypress-automation-lab/actions/workflows/cypress.yml/badge.svg)](https://github.com/samuelmmjr/cypress-automation-lab/actions/workflows/cypress.yml)

Laboratório prático de automação de testes **UI e API com Cypress**, utilizando cenários públicos da plataforma DemoQA.

O foco deste repositório não é apenas demonstrar comandos do Cypress. A proposta é aplicar princípios de **Quality Engineering**: cenários independentes, assertions relevantes, organização por responsabilidade, redução de flakiness e código de teste legível e sustentável.

> Este projeto surgiu originalmente de um desafio técnico e foi posteriormente reorganizado como laboratório de automação.

## Objetivos

- Exercitar automação E2E de interface web.
- Validar fluxos de API REST com criação e limpeza de dados.
- Separar cenários de UI e API.
- Aplicar Page Objects onde há ganho real de manutenção.
- Priorizar sincronização baseada no estado da aplicação.
- Evitar dependência de ordem entre testes.
- Demonstrar assertions sobre comportamento e dados, não apenas status HTTP.
- Executar a suíte automaticamente em CI.
- Gerar evidências e relatórios das execuções.

## Cobertura atual

### API — Book Store

O cenário automatizado executa um fluxo completo e autocontido:

1. cria um usuário temporário;
2. gera o token de autenticação;
3. consulta os livros disponíveis;
4. adiciona dois livros ao usuário;
5. consulta o perfil e valida os ISBNs associados;
6. remove o usuário criado ao final do fluxo.

O cenário cria e remove seus próprios dados, evitando dependência de estado previamente existente.

### UI

| Área            | Validação                                                                       |
| --------------- | ------------------------------------------------------------------------------- |
| Practice Form   | preenchimento com dados dinâmicos e validação dos dados no modal de confirmação |
| Progress Bar    | interrupção antes de 25%, conclusão em 100% e validação do reset                |
| Browser Windows | interceptação da chamada de nova janela e validação da página de destino        |
| Web Tables      | criação, edição e exclusão de registro localizado pelo e-mail                   |
| Sortable        | validação da ordem padrão da lista                                              |

> O cenário de Sortable valida a ordem exibida. Ele não é apresentado como teste de drag-and-drop porque a implementação atual não realiza reordenação dos itens.

## Estrutura do projeto

```text
cypress-automation-lab/
├── .github/
│   └── workflows/
│       └── cypress.yml
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
├── package-lock.json
└── README.md
```

## Decisões de engenharia

### Cenário de API autocontido

O fluxo de Book Store é tratado como um único cenário de negócio.

Isso elimina a dependência entre múltiplos testes compartilhando valores como `userId`, `token` e ISBNs.

O cenário:

```text
Cria usuário
     ↓
Gera token
     ↓
Consulta livros
     ↓
Adiciona livros
     ↓
Valida perfil
     ↓
Remove usuário
```

Dessa forma, o teste controla seu próprio estado e realiza a limpeza dos dados utilizados.

### Assertions orientadas ao comportamento

As validações não se limitam aos códigos HTTP.

Na API são verificados, entre outros pontos:

- conteúdo das respostas;
- usuário criado;
- token de autenticação;
- quantidade de livros;
- ISBNs associados ao usuário.

Nos testes de UI, as operações também são confirmadas através do estado final apresentado pela aplicação.

### Sincronização e estabilidade

A automação prioriza estados observáveis da aplicação e o mecanismo de retry do Cypress em vez de esperas arbitrárias.

No cenário de Progress Bar, por exemplo, o atributo semântico `aria-valuenow` é utilizado para acompanhar a evolução do componente.

Como o DemoQA é uma aplicação externa e apresenta uma pequena janela de atualização assíncrona após atingir 100%, uma espera curta e controlada é utilizada antes da operação de reset.

Essa exceção é mantida localizada no comportamento específico, sem aumentar desnecessariamente os timeouts de toda a suíte.

### Seleção por identidade do dado

No cenário de Web Tables, edição e exclusão localizam o registro através do e-mail criado pelo próprio teste.

Isso evita seletores dependentes da posição do elemento, como:

```js
.last()
```

que poderiam produzir resultados incorretos caso o estado da tabela fosse alterado.

### Page Objects com responsabilidade limitada

Os Page Objects encapsulam navegação e interação com componentes específicos da aplicação.

Dados e intenção do cenário permanecem visíveis nas specs, evitando abstrações excessivas que dificultariam compreender o comportamento validado.

### Aplicação externa

Os testes utilizam o DemoQA como sistema sob teste.

Por se tratar de uma aplicação pública e externa ao projeto, fatores como anúncios, latência e alterações no DOM podem afetar as execuções.

O projeto procura tratar essas condições de forma localizada, evitando mascarar problemas através de retries ou waits indiscriminados.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

Clone o repositório:

```bash
git clone https://github.com/samuelmmjr/cypress-automation-lab.git
```

Acesse o projeto:

```bash
cd cypress-automation-lab
```

Instale as dependências:

```bash
npm install
```

## Execução

### Modo interativo

```bash
npm run cy:open
```

### Toda a suíte em modo headless

```bash
npm test
```

### Somente testes de API

```bash
npm run cy:run:api
```

### Somente testes de UI

```bash
npm run cy:run:ui
```

### Executar testes e gerar relatório HTML

```bash
npm run test:report
```

## Relatórios

O projeto utiliza **Mochawesome** para geração de evidências de execução.

Durante a execução são produzidos arquivos JSON que posteriormente são consolidados em um relatório HTML.

Execute:

```bash
npm run test:report
```

O relatório final é gerado em:

```text
reports/mochawesome/html/index.html
```

A pasta de relatórios não é versionada no repositório.

## Integração contínua

O projeto utiliza **GitHub Actions** para executar a suíte automaticamente.

A pipeline é acionada em:

```text
push → main
pull request → main
```

O fluxo executado no CI é:

```text
Checkout
   ↓
Instalação das dependências
   ↓
Execução dos testes Cypress
   ↓
Geração do relatório Mochawesome
   ↓
Publicação dos artefatos
```

Quando ocorre uma falha, screenshots gerados pelo Cypress também são preservados como artefatos para auxiliar no diagnóstico.

O status da última execução pode ser acompanhado pelo badge no início deste README.

## Stack

**Automação**

`Cypress`

**Linguagem e runtime**

`JavaScript` · `Node.js`

**Dados de teste**

`Faker`

**API**

`REST API`

**Relatórios**

`Mochawesome`

**CI/CD**

`GitHub Actions`

## Boas práticas aplicadas

- separação entre testes UI e API;
- cenários de API autocontidos;
- criação e limpeza dos próprios dados de teste;
- assertions sobre comportamento e dados;
- Page Objects utilizados de forma seletiva;
- localização de registros por identidade;
- sincronização baseada no estado da aplicação;
- tratamento localizado de instabilidades externas;
- geração automática de evidências;
- execução automatizada em CI.

## Próximas evoluções

- adicionar cenários negativos de API;
- evoluir o cenário Sortable para uma interação real de drag-and-drop quando houver valor para o laboratório;
- avaliar uma camada de API reutilizável quando a quantidade de cenários justificar a abstração;
- ampliar a cobertura mantendo foco em cenários relevantes, evitando crescimento de suíte apenas por quantidade.

## Autor

**Samuel Melo — Quality Engineer**

Quality Engineering, estratégia de testes e automação com foco em soluções confiáveis, organizadas e sustentáveis.

GitHub: `samuelmmjr`  
LinkedIn: `samuelmelojr`
