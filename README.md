# Projeto ZEUS - Frontend | Comp Júnior

Frontend para o Projeto ZEUS, um sistema de gestão interna (ERP), construído com React, TypeScript, Vite, e Tailwind CSS, utilizando Firebase para autenticação e persistência de dados. Este projeto foi desenvolvido como parte de um desafio da Comp Júnior.

O objetivo é demonstrar habilidades na construção de interfaces de usuário responsivas, componentização, gerenciamento de estado, roteamento e integração com serviços de backend (Firebase).

## ✨ Funcionalidades Implementadas

*   **Autenticação de Usuários:**
    *   Tela de Login com e-mail e senha.
    *   Registro de novos usuários.
    *   Fluxo de Recuperação de Senha.
    *   Persistência de sessão.
*   **Dashboard Principal:**
    *   Visão geral com cards de estatísticas.
    *   Tabelas de resumo e gráfico de status.
*   **Gerenciamento de Funcionários:**
    *   Listagem com busca, filtros e paginação.
    *   Cadastro de novos funcionários.
*   **Gerenciamento de Orçamentos de Projetos:**
    *   Listagem com estatísticas financeiras.
    *   Criação de novos orçamentos e fluxo de solicitação.
*   **Layout Responsivo:**
    *   Interface adaptada para desktop, tablet e mobile.
    *   Sidebar navegável e header com informações do usuário.
*   **Outros:**
    *   Tela de Splash animada.
    *   Modais de feedback ao usuário.
    *   Componentes reutilizáveis para UI.

## 🛠️ Tecnologias Utilizadas

*   **Framework/Biblioteca Principal:** [React](https://reactjs.org/) (v18)
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend e Banco de Dados:** [Firebase](https://firebase.google.com/) (Authentication, Firestore)
*   **Roteamento:** [React Router DOM](https://reactrouter.com/) (v6)
*   **Animações:** [Framer Motion](https://www.framer.com/motion/)
*   **Ícones:** [Lucide React](https://lucide.dev/)
*   **Manipulação de Datas:** [date-fns](https://date-fns.org/)
*   **Gerenciamento de Estado:** React Context API
*   **Linting:** ESLint

## 🚀 Rodando o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Clofender/Project_Zeus-CompJunior-Sistema_interno_de_Gestao.git
    cd Project_Zeus-CompJunior-Sistema_interno_de_Gestao
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração do Firebase:**
    *   Este projeto requer configuração com um projeto Firebase para as funcionalidades de autenticação e banco de dados. As credenciais devem ser configuradas via variáveis de ambiente (ex: `VITE_FIREBASE_API_KEY` em um arquivo `.env.local`).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se especificada pelo Vite).

## 🏗️ Estrutura de Pastas

O projeto segue uma estrutura modular:


src/
├── assets/ # Imagens, logos
├── components/ # Componentes React reutilizáveis
├── config/ # Configuração do Firebase
├── context/ # React Context (AuthProvider)
├── data/ # Dados mockados
├── pages/ # Componentes de página (rotas)
├── types/ # Definições de tipos TypeScript
├── App.tsx # Configuração de rotas
├── index.css # Estilos globais Tailwind
└── main.tsx # Ponto de entrada da aplicação

## 🤝 Contribuições

Este projeto foi desenvolvido como parte de um desafio específico. Contribuições não são esperadas no momento, mas feedbacks são bem-vindos!

## 📜 Licença

Este projeto está licenciado sob a Licença MIT.