
# 📈 Asset Progression Terminal

O Asset Progression Terminal é uma aplicação de gestão e progressão de ativos financeiros desenvolvida com React e Tailwind CSS.

O projeto foi pensado para investidores que buscam uma interface diferenciada — com estética Neon / Terminal — para acompanhar o crescimento do capital através de uma matriz estratégica de aportes e gestão de liquidez.

# 🚀 Funcionalidades
### 📊 Matriz de Aportes Estratégicos

Visualização em formato de grelha que permite consolidar aportes com base em unidades de valor, utilizando um sistema intuitivo de seleção por clique.

### 💧 Gestão de Liquidez

Controle do fluxo de caixa com sistema de injeção de capital, permitindo melhor tomada de decisão sobre novos aportes.

### 🧠 Análise Preditiva

Algoritmo que sugere o índice ideal de aporte com base na liquidez atual disponível.

### 💾 Persistência de Dados

Armazenamento automático via LocalStorage, garantindo que os dados permaneçam no navegador do utilizador.

### 🌗 Interface Adaptável

Suporte completo a:

- Dark Mode (tema Neon Blue)
- Light Mode
### 📉 Monitorização de Performance

Cálculos em tempo real incluindo:

- Taxa de conclusão
- Gap para o objetivo
- Património total
### 🛠️ Tecnologias Utilizadas
- React — Interface e gestão de estado
- Vite — Build tool rápida e moderna
- Tailwind CSS — Estilização utilitária
- Lucide React — Ícones vetoriais
- PostCSS — Processamento de CSS moderno
### 📦 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. Criar a pasta do projeto
```bash
mkdir terminal-financeiro
cd terminal-financeiro
```
2. Inicializar com Vite
```bash
npm create vite@latest . -- --template react
```
_Se solicitado, selecione "No" para a opção Rolldown-Vite (Experimental)_

3. Instalar dependências
```bash
npm install
npm install lucide-react @tailwindcss/postcss postcss autoprefixer
```
4. Configurar o Tailwind CSS

No arquivo postcss.config.js, adicione os plugins:

```JavaScript
@tailwindcss/postcss
autoprefixer
```
5. Executar o projeto
```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```
📂 Estrutura do Projeto
```bash
src/
 ├── App.jsx        # Lógica principal e estado da aplicação
 ├── index.css      # Configurações globais (Tailwind)
```
### 🔐 Armazenamento Local

Os dados são persistidos no navegador através das seguintes chaves:

- wp_positions
- wp_liquidity
- wp_target

### 🛡️ Segurança e Privacidade
- Aplicação 100% client-side
- Nenhum dado financeiro é enviado para servidores externos
- Todas as informações permanecem armazenadas localmente no navegador
### 📌 Observações

Este projeto foi desenvolvido com foco em:

- Organização financeira pessoal
- Simulação de progressão patrimonial
- Visualização estratégica de aportes
### 👨‍💻 Autor

Desenvolvido por Hyago Santos
