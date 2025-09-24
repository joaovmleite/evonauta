# Evonauta - Desafio Técnico Evolucional

Este repositório contém minha solução para o desafio técnico da Evolucional, desenvolvido com React e Vite. Aqui, compartilho as decisões técnicas, a estrutura do projeto, as principais funcionalidades e as instruções de execução.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Decisões Técnicas](#decisões-técnicas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Validação e Segurança](#validação-e-segurança)
- [Testes Automatizados](#testes-automatizados)
- [Como Executar](#como-executar)
- [Capturas de Tela](#capturas-de-tela)
- [Considerações Finais](#considerações-finais)

---

## Sobre o Projeto

O objetivo deste projeto foi criar uma aplicação web para a gestão de alunos, professores, matérias, cursos e turmas, utilizando dados fornecidos em arquivos JSON. Busquei entregar uma solução funcional, clara e alinhada com o escopo do desafio, priorizando organização, eficiência e experiência do usuário.

Desde o início, analisei cuidadosamente o arquivo de instruções e os dados, garantindo que cada funcionalidade implementada estivesse de acordo com o solicitado. Optei por React com Vite para obter performance, modularidade e facilidade de manutenção.

## Principais Funcionalidades

- **Centralização do estado com Context API:**
	- Utilizei a Context API do React para compartilhar dados e funções entre todas as páginas, facilitando a manutenção e evitando duplicação de lógica.
- **Filtros dinâmicos e geração em massa:**
	- Implementei filtros por série e turma, além da geração em massa de alunos, para agilizar a manipulação de dados e simular cenários reais de uso.
- **Visualização de dados com gráficos:**
	- Na tela de alunos, é exibido um gráfico de distribuição por série, facilitando a análise visual dos dados.
- **Relacionamentos entre professores, matérias e turmas:**
	- É possível visualizar e editar vínculos entre professores, matérias, séries e turmas, com uma interface clara e uso de modais para evitar navegação excessiva.
- **Interface moderna e responsiva:**
	- Toda a interface foi construída com UIKit, garantindo responsividade, design limpo e alinhamento com o padrão institucional.

## Decisões Técnicas

- **Stack:** React + Vite, UIKit para UI, Chart.js para gráficos, React Router para navegação.
- **Testes unitários com Vitest:** Implementei testes unitários automatizados com Vitest e Testing Library, cobrindo o componente Navbar e as principais funcionalidades das páginas do sistema. Os testes garantem que mudanças futuras não quebrem funcionalidades essenciais e aumentam a confiança no desenvolvimento.
- **Carga de dados:** Todos os dados são carregados via fetch a partir dos arquivos JSON localizados em `public/data/`, centralizados no contexto global.
- **Componentização:** Separei o código em componentes reutilizáveis, páginas e utilitários, facilitando a manutenção e a evolução.
- **Validação e segurança:** Implementei validação de campos obrigatórios, sanitização de entradas (escape de HTML) e feedback imediato ao usuário.
- **Responsividade:** Usei classes do UIKit e ajustes de layout para garantir uma boa visualização em diferentes tamanhos de tela.

## Estrutura do Projeto

```
├── public/
│   └── data/           # Arquivos JSON de dados (alunos, professores, etc.)
├── src/
│   ├── assets/         # Recursos estáticos (CSS, JS, imagens)
│   ├── components/     # Componentes reutilizáveis (Navbar, Modal, etc.)
│   ├── context/        # Contexto global (AppContext)
│   ├── pages/          # Páginas principais (Home, Alunos, Professores)
│   ├── utils/          # Funções utilitárias (fetchJson, etc.)
│   ├── App.jsx         # Componente raiz
│   └── main.jsx        # Ponto de entrada da aplicação
├── tests/
│   ├── components/     # Testes para componentes (Navbar, etc.)
│   └── pages/          # Testes para páginas (Alunos, Professores, etc.)
├── index.html          # HTML principal, inclui UIKit e fontes
├── package.json        # Dependências e scripts
└── README.md           # Este arquivo
```

## Validação e Segurança

- **Validação de campos obrigatórios:**
	- Todos os formulários e campos editáveis evitam o envio de dados vazios ou inválidos.
- **Sanitização contra XSS:**
	- Todas as entradas do usuário são sanitizadas com escape de HTML antes de serem salvas ou exibidas.
- **Feedback imediato:**
	- Mensagens de alerta e bloqueio de ações sempre que o usuário tentar inserir dados inválidos.
- **Validação no fluxo de atualização do estado:**
	- As validações são aplicadas diretamente nas funções de manipulação de estado, evitando inconsistências.

## Testes Automatizados

O projeto conta com testes unitários implementados com [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/), cobrindo componentes e funcionalidades essenciais:

**Cobertura dos testes:**
	- Testes para o componente `Navbar` (ver em `tests/components/Navbar.test.jsx`).
	- Testes para as principais funcionalidades das páginas de Alunos e Professores (ver em `tests/pages/Students.test.jsx` e `tests/pages/Teachers.test.jsx`).

**Execução dos testes:**
	- Para executar todos os testes, utilize:
		```bash
		npx vitest run
		```
	- Os testes são executados automaticamente no ambiente de desenvolvimento para garantir que as funcionalidades principais estejam sempre validadas.

## Como executar

1. **Requisitos prévios:**
	- Node.js (versão 18+ recomendada)
	- npm ou yarn

2. **Instalação:**
	```bash
	npm install
	# ou
	yarn
	```

3. **Execução em modo desenvolvimento:**
	```bash
	npm run dev
	# ou
	yarn dev
	```
	Acesse [http://localhost:5173](http://localhost:5173) no navegador.

4. **Build para produção:**
	```bash
	npm run build
	# ou
	yarn build
	```

5. **Preview do build:**
	```bash
	npm run preview
	# ou
	yarn preview
	```

## Capturas de Tela

![Imagem da Página Inicial](https://i.postimg.cc/ZYj7k1Ds/evolucional-homepage.png)  
![Imagem da Página de Alunos](https://i.postimg.cc/FsBTz0vj/evolucional-studentpage.png)  
![Imagem da Página de Alunos com Gráfico de Distribuição](https://i.postimg.cc/htVZYfFT/evolucional-studentpage-graphics.png)  
![Imagem da Página de Professores](https://i.postimg.cc/fRSB9kW1/evolucional-teacherspage.png)  
![Imagem da Página de Professores mostrando Formulário de Novo Relacionamento](https://i.postimg.cc/KYNqZw8Y/evolucional-teacherspage-new-relationships.png)

## Considerações Finais

Desenvolvi este projeto priorizando eficiência, clareza e aderência ao escopo do desafio, sem exagerar nos aspectos visuais, mas sempre buscando entregar um sistema funcional, limpo e fácil de usar. Meu foco foi garantir que cada requisito estivesse coberto e que o código estivesse bem organizado para facilitar manutenções e evoluções futuras. Não sou especialista em design, mas procurei oferecer uma interface agradável e responsiva, alinhada com o padrão institucional.

---

**Autor:** João (Evonauta)  
**Blog Personal:** [Astral Thoughts](https://astralfracture.bearblog.dev/)

---
