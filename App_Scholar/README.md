# 📚 App Scholar

Sistema acadêmico mobile completo para gestão de alunos, professores, disciplinas e boletins, desenvolvido com React Native (Expo) e backend Node.js com Prisma + Supabase.

> **Projeto Acadêmico:** Programação de dispositivos móveis - 4º Semestre
> **Desenvolvido por:** Andressa Stéphane Toledo da Silva

## 🚀 Demonstração
*https://youtu.be/UUNXfWb3yjQ*

## ✨ Visão Geral

O App Scholar é uma aplicação mobile full-stack voltada para o ambiente acadêmico, permitindo gerenciamento de usuários, autenticação segura e organização de disciplinas.

O sistema foi projetado com foco em:
* **Arquitetura moderna:** Frontend e backend totalmente desacoplados.
* **Escalabilidade:** Estrutura pronta para a adição de novas funcionalidades.
* **Persistência segura de dados:** Utilização de banco de dados relacional em nuvem.
* **Experiência mobile fluida:** Interfaces limpas e responsivas.

---

## 🧰 Stack Tecnológica

### 📱 Mobile (Frontend)
* **React Native** (Expo SDK 54)
* **Expo Router**
* **TypeScript**
* **Axios** (Integração de serviços reais, sem dados mockados)
* **React Hook Form + Zod**
* **AsyncStorage**
* **React Navigation**

### ⚙️ Backend (API)
* **Node.js**
* **Express**
* **Prisma ORM**
* **PostgreSQL** (Supabase)
* **JWT Authentication**
* **bcrypt**

### ☁️ Infraestrutura
* **Render** (Backend Deploy)
* **Supabase** (Database)
* **EAS Build** (APK Android)

---

## 🏗️ Arquitetura

```text
Frontend (Expo)  →  API (Render)  →  PostgreSQL (Supabase)
      ↑                  ↓
AsyncStorage         JWT Auth

## ⚙️ Como rodar localmente

### 📱 Frontend (Expo)

Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/app-scholar.git](https://github.com/seu-usuario/app-scholar.git)
cd App_Scholar/frontend
```

Instale as dependências:
```bash
npm install
```

Inicie o projeto:
```bash
npx expo start
```

---

### 🌐 Backend (API)

Acesse o diretório do backend:
```bash
cd backend
```

Instale as dependências:
```bash
npm install
```

Configure as variáveis de ambiente criando um arquivo `.env` na raiz do backend:
```env
DATABASE_URL="sua_url_supabase"
JWT_SECRET="sua_chave_secreta"
```

Rode o servidor em modo de desenvolvimento:
```bash
npm run dev
```

Para gerar o build de produção:
```bash
npm run build
npm start
```

---

### 🔗 Configuração do Frontend

No frontend, certifique-se de configurar a variável da API com a URL correta de deploy para consumo dos serviços:
```typescript
export const API_URL = "[https://seu-backend.onrender.com](https://seu-backend.onrender.com)";
```

---

### 👤 Usuários de Teste

Para facilitar a avaliação acadêmica e os testes de autenticação, utilize as credenciais pré-configuradas:

| Perfil | Email | Senha |
| :--- | :--- | :--- |
| 🎓 **Aluno** | `aluno@teste.com` | `123456` |
| 👨‍🏫 **Professor** | `professor@teste.com` | `123456` |
| 👑 **Admin** | `admin@teste.com` | `123456` |
