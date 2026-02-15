# Asset Progression Terminal 📈

Asset Progression Terminal é um terminal de gestão e progressão de ativos financeiros desenvolvido com React e Tailwind CSS.  
O projeto foi desenhado para investidores que procuram uma interface sofisticada, em estilo Neon / Terminal, para monitorizar o crescimento do capital através de uma matriz de aportes estratégicos, para sua organização capital.

---

## 🚀 Funcionalidades

- Matriz de Aportes Estratégicos  
  Visualização em grelha para consolidação de aportes baseada em unidades de valor, com click selector.

- Gestão de Liquidez  
  Sistema de injeção de capital para gestão do fluxo de caixa disponível.

- Análise Preditiva  
  Algoritmo que sugere o melhor índice de aporte com base na liquidez atual.

- Persistência de Dados  
  Integração com LocalStorage para salvamento automático dos dados no navegador.

- Interface Adaptável  
  Suporte completo para Dark Mode (Neon Blue) e Light Mode.

- Monitorização de Performance  
  Cálculo em tempo real da taxa de conclusão, gap de objetivo e património total.

---

## 🛠️ Tecnologias Utilizadas

- React.js — Biblioteca principal da interface  
- Vite — Build tool ultra-rápida  
- Tailwind CSS v4 — Framework de estilização utilitária  
- Lucide React — Biblioteca de ícones vetoriais  
- PostCSS — Processamento moderno de CSS  

---

## 📦 Como Instalar e Rodar

Siga os passos abaixo para executar o projeto localmente ou no Google Cloud Shell.

### 1. Criar a pasta do projeto  
   ```bash
   mkdir terminal-financeiro && cd terminal-financeiro
   ```

### 2. Iniciar o projeto com Vite  
   ```bash
   npm create vite@latest . -- --template react  
   Selecione “No” para a opção Rolldown-Vite (Experimental)
   ```

### 3. Instalar dependências  
   ```bash
   npm install  
   npm install lucide-react @tailwindcss/postcss postcss autoprefixer
   ```

### 4. Configurar o Tailwind CSS  
   Configure o arquivo postcss.config.js com os plugins:
   ```bash
   @tailwindcss/postcss e autoprefixer
   ```

### 5. Executar em modo de desenvolvimento  
   ```bash
   npm run dev
   ```

O projeto estará disponível por padrão em http://localhost:5173

---

## 📂 Estrutura de Ficheiros

```bash
src/App.jsx — Código principal da aplicação e lógica de estado  
src/index.css — Configurações globais do Tailwind  
```

Persistência local via LocalStorage:
- wp_positions
- wp_liquidity
- wp_target

---

## 🛡️ Segurança e Privacidade

Este terminal opera inteiramente no lado do cliente (Client-side).  
Nenhum dado financeiro é enviado para servidores externos.  
Todas as informações são armazenadas localmente no navegador.

Projeto desenvolvido para fins de organização financeira e simulação de progresso de ativos por Hyago Santos
