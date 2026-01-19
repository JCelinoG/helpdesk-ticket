# 🎫 Sistema de Tickets de Helpdesk

Uma aplicação CRUD completa para gerenciamento de tickets de suporte, desenvolvida com **Next.js 14**, com foco em **acessibilidade total** e **boas práticas modernas de desenvolvimento**.

## 📋 Funcionalidades

### ✅ Funcionalidades Principais
- **CRUD Completo**: Criar, Ler, Atualizar e Excluir tickets de suporte  
- **Design Responsivo**: Layout mobile-first totalmente responsivo  
- **Segurança de Tipos**: Integração completa com TypeScript  
- **Validação de Formulários**: React Hook Form + Zod com validações condicionais  
- **Gerenciamento de Estado**: Zustand para estado global  
- **API Mockada**: Route Handlers do Next.js com armazenamento em memória  

### 🎯 Funcionalidades Avançadas
- **Filtros em Tempo Real**: Filtrar por status, prioridade e categoria  
- **Busca em Texto Completo**: Pesquisa por título, descrição e e-mail  
- **Notificações Toast**: Sistema global de feedback com animações  
- **Acessibilidade**: Compatível com WCAG 2.1 nível AA  
- **Modo Escuro**: Detecção automática da preferência do sistema  
- **Movimento Reduzido**: Respeita a preferência do usuário por menos animações  

### 🔐 Validações Condicionais
1. **Categoria Billing (Cobrança)**: Requer domínio de e-mail corporativo  
2. **Alta Prioridade**: Requer descrição com no mínimo 60 caracteres  
3. **Categoria Bug**: Requer prefixo `[BUG]` no título  

## 🛠️ Stack Tecnológica

### Frontend
- Next.js 14 (App Router)  
- React 18  
- TypeScript  
- SCSS Modules  

### Estado & Formulários
- Zustand (Gerenciamento de Estado)  
- React Hook Form (Manipulação de formulários)  
- Zod (Validação de schemas)  

### Desenvolvimento
- ESLint + Prettier  
- Conventional Commits  
- Git Hooks (opcional)  

## 🚦 Como Começar

### Pré-requisitos
- Node.js 18+  
- npm ou yarn  

### Instalação

1. **Clone o repositório**
   ```bash
     git clone https://github.com/JCelinoG/helpdesk-ticket.git
     cd helpdesk-ticket
  
2. **Instale as dependências**
   ```bash
    npm install
  
   ou
  
    yarn install
  
3. **Inicie o servidor de desenvolvimento**
  ```bash
    npm run dev
    
    ou
  
    yarn dev

  ```
4. **Abra o navegador**
Acesse: http://localhost:3000

## ⚠️ Configuração de Porta

Por padrão, o projeto espera que o servidor esteja rodando na porta **3000**.

### Se estiver usando outra porta:

1. Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:SUA_PORTA_AQUI
```


**🧪 Scripts Disponíveis**

npm run dev – Inicia o servidor de desenvolvimento

npm run build – Gera o build para produção

npm start – Inicia o servidor em produção

npm run lint – Executa o ESLint

npm run format – Formata o código com Prettier

npm run format:check – Verifica a formatação do código


**♿ Recursos de Acessibilidade**

Navegação por Teclado: Navegação completa via Tab com skip links

Suporte a Leitores de Tela: Labels ARIA, roles e regiões live

Gerenciamento de Foco: Controle adequado de foco em modais

Contraste de Cores: Compatível com WCAG 2.1 AA

Movimento Reduzido: Respeita prefers-reduced-motion

Modo Escuro: Suporte a prefers-color-scheme