# HarmonyWork - Gestão Inteligente do Trabalho

> *"Seu dia organizado. Sua mente leve. Seu trabalho no ritmo certo."*

## 📱 Sobre o Projeto

HarmonyWork é uma plataforma inteligente que organiza o dia de trabalho das pessoas, equilibrando produtividade, descanso e saúde mental. Com o avanço do trabalho remoto e híbrido, as pessoas passaram a viver com agendas caóticas, excesso de notificações e sobrecarga. HarmonyWork é a resposta moderna para esse problema.

**Tema:** O Futuro do Trabalho

## ✨ Funcionalidades

- ✅ **Autenticação** - Login e cadastro com persistência local
- 📋 **Gerenciamento de Tarefas** - Adicionar, visualizar, concluir e excluir tarefas
- 🎯 **Priorização Inteligente** - Organização automática por prioridade (Alta, Média, Baixa)
- ⏱️ **Modo Foco** - Timer Pomodoro (25 min trabalho / 5 min pausa)
- 📊 **Relatórios** - Visualização de produtividade e estatísticas
- 💾 **Persistência Local** - Todos os dados salvos com AsyncStorage

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **TypeScript** - Tipagem estática
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Persistência de dados local
- **React Native Picker** - Seletor de prioridades

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) no seu celular (iOS ou Android)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <https://github.com/leooruiz/HarmonyWork-GS>
cd HarmonyWork-GS
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o projeto

```bash
npm start
```

Ou use um dos comandos específicos:

```bash
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

### 4. Execute no dispositivo

1. Abra o aplicativo **Expo Go** no seu celular
2. Escaneie o QR Code exibido no terminal
3. Aguarde o carregamento do app

## 📱 Como Usar

### Primeira Utilização

1. **Cadastre-se**: Na tela inicial, clique em "Não tem conta? Cadastre-se"
2. **Preencha seus dados**: Nome, email e senha
3. **Acesse o app**: Faça login com suas credenciais

### Gerenciando Tarefas

1. **Adicionar Tarefa**: Na tela inicial, clique em "➕ Nova Tarefa"
2. **Preencha os dados**:
   - Título (obrigatório)
   - Descrição (opcional)
   - Prioridade (Alta/Média/Baixa)
3. **Visualizar**: Tarefas são ordenadas automaticamente por prioridade
4. **Concluir**: Clique no botão "✓ Concluir" no card da tarefa
5. **Excluir**: Clique em "Excluir" e confirme

### Modo Foco (Pomodoro)

1. Na tela inicial, clique em "⏱️ Modo Foco"
2. Clique em "Iniciar" para começar uma sessão de 25 minutos
3. Mantenha o foco durante o timer
4. Ao completar, faça uma pausa de 5 minutos
5. Repita o ciclo

### Visualizando Relatórios

1. Na tela inicial, clique em "📊 Relatórios"
2. Veja suas estatísticas:
   - Total de tarefas
   - Taxa de conclusão
   - Horas focadas
   - Distribuição por prioridade
   - Insights personalizados

## 📂 Estrutura do Projeto

```
HarmonyWork-GS/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── TaskCard.tsx
│   ├── navigation/        # Configuração de rotas
│   │   └── AppNavigator.tsx
│   ├── screens/          # Telas do aplicativo
│   │   ├── Auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx
│   │   ├── Task/
│   │   │   └── AddTaskScreen.tsx
│   │   ├── Focus/
│   │   │   └── FocusScreen.tsx
│   │   └── Report/
│   │       └── ReportScreen.tsx
│   ├── services/         # Lógica de negócio
│   │   ├── storage.ts
│   │   ├── authService.ts
│   │   └── taskService.ts
│   └── types/            # Definições TypeScript
│       └── index.ts
├── App.tsx               # Ponto de entrada
├── package.json
└── README.md
```

## 🎯 ODS - Objetivos de Desenvolvimento Sustentável

Este projeto está alinhado com:

- **ODS 8** - Trabalho Decente e Crescimento Econômico
  - Promove produtividade sustentável
  - Reduz burnout no trabalho

- **ODS 9** - Inovação, Indústria e Infraestrutura
  - Uso de IA e automação inteligente
  - Tecnologia para gestão moderna do trabalho

- **ODS 3** - Saúde e Bem-estar
  - Reduz estresse e sobrecarga mental
  - Promove equilíbrio vida-trabalho

## 👥 Equipe

- [Leonardo de Oliveira Ruiz] - RM 98901
- [Bruno Venturi Lopes Vieira] - RM 99431
- [Guilherme Alves de Lima] - RM 550433

---
