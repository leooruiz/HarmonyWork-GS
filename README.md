# HarmonyWork - Gestão Inteligente do Trabalho

> *"Seu dia organizado. Sua mente leve. Seu trabalho no ritmo certo."*

## 📱 Sobre o Projeto

HarmonyWork é uma plataforma inteligente que organiza o dia de trabalho das pessoas, equilibrando produtividade, descanso e saúde mental. Com o avanço do trabalho remoto e híbrido, as pessoas passaram a viver com agendas caóticas, excesso de notificações e sobrecarga. HarmonyWork é a resposta moderna para esse problema.

**Tema:** O Futuro do Trabalho

## ✨ Funcionalidades

### 🔐 Autenticação

- Sistema completo de login e cadastro
- Persistência de sessão com AsyncStorage
- Validação de campos e feedback visual

### 📋 Gerenciamento de Tarefas

- **Criar tarefas** com título, descrição e prioridade
- **Visualizar tarefas** organizadas automaticamente
- **Concluir tarefas** com confirmação visual
- **Excluir tarefas** com diálogo de confirmação
- **Priorização inteligente** (Alta 🔴 / Média 🟡 / Baixa 🟢)
- Ordenação automática por prioridade e status

### ⏱️ Modo Foco (Pomodoro)

- Timer de 25 minutos para trabalho focado
- Pausa de 5 minutos após cada sessão
- Contador de sessões completadas
- Vibração ao completar timer
- Estatísticas de tempo focado
- Dicas de produtividade integradas

### 📊 Relatórios e Estatísticas

- Visão geral de tarefas (total, concluídas, pendentes)
- Taxa de conclusão percentual
- Horas totais de foco (Pomodoro)
- Número de sessões completadas
- Distribuição de tarefas por prioridade
- Gráficos visuais e insights personalizados

### 🎨 Sistema de Design

- Tema consistente com cores definidas
- Tipografia padronizada
- Espaçamentos e sombras uniformes
- Componentes reutilizáveis (Button, Input, TaskCard)
- Interface intuitiva e responsiva

## 🚀 Tecnologias Utilizadas

### Core

- **React Native** `0.81.5` - Framework mobile cross-platform
- **TypeScript** `5.9.2` - Tipagem estática e segurança de tipos
- **Expo** `~54.0.25` - Plataforma de desenvolvimento e build

### Navegação

- **React Navigation** `7.1.20` - Sistema de navegação
- **Stack Navigator** `7.6.4` - Navegação em pilha entre telas

### Persistência

- **AsyncStorage** `2.2.0` - Armazenamento local de dados

### UI/UX

- **React Native Gesture Handler** `2.28.0` - Gestos nativos
- **React Native Reanimated** `4.1.5` - Animações performáticas
- **React Native Screens** `4.16.0` - Otimização de telas
- **Safe Area Context** `5.6.2` - Suporte a notch/safe areas
- **Expo Linear Gradient** `15.0.7` - Gradientes nativos
- **Expo Status Bar** `3.0.8` - Controle da status bar

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) no seu celular (iOS ou Android)

### Versões Recomendadas

- **Node.js**: 18.x ou 20.x
- **npm**: 9.x ou superior
- **Expo Go**: Última versão disponível na App Store/Play Store

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/leooruiz/HarmonyWork-GS.git
cd HarmonyWork-GS
```

### 2. Instale as dependências

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

### 3. Inicie o projeto

```bash
npm start
```

Comandos disponíveis:

```bash
npm start        # Inicia o servidor de desenvolvimento
npm run android  # Inicia no emulador/dispositivo Android
npm run ios      # Inicia no simulador iOS (somente macOS)
npm run web      # Inicia no navegador web
```

### 4. Execute no dispositivo

#### Usando Expo Go (Recomendado)

1. Abra o aplicativo **Expo Go** no seu celular
2. Escaneie o QR Code exibido no terminal ou navegador
3. Aguarde o carregamento do app (primeira vez pode demorar)

#### Usando Emulador

**Android (Android Studio)**

```bash
npm run android
```

**iOS (Xcode - somente macOS)**

```bash
npm run ios
```

### 5. Troubleshooting

#### Erro de Metro Bundler

```bash
npm start -- --clear
```

#### Erro de cache

```bash
rm -rf node_modules
npm install
```

#### Portas em uso

```bash
# Altere a porta padrão
npm start -- --port 19001
```

## 📱 Como Usar

### Primeira Utilização

1. **Cadastre-se**:
   - Na tela inicial, clique em "Não tem conta? Cadastre-se"
   - Preencha: Nome, Email e Senha
   - Clique em "Criar conta"

2. **Login**:
   - Caso já tenha conta, insira email e senha
   - Clique em "Entrar"

3. **Explorar**:
   - Acesse o dashboard com visão geral das tarefas
   - Use os atalhos rápidos para navegar

### 📝 Gerenciando Tarefas

#### Adicionar Nova Tarefa

1. No dashboard, toque em **"➕ Nova Tarefa"**
2. Preencha as informações:
   - **Título** (obrigatório) - Ex: "Preparar apresentação"
   - **Descrição** (opcional) - Detalhes adicionais
   - **Prioridade** - Escolha entre:
     - 🔴 **Alta** - Urgente e importante
     - 🟡 **Média** - Importante mas não urgente
     - 🟢 **Baixa** - Pode ser feita depois
3. Toque em **"Criar Tarefa"**

#### Visualizar Tarefas

- As tarefas são exibidas no dashboard
- Ordenação automática:
  1. Prioridade (Alta → Média → Baixa)
  2. Status (Pendentes → Concluídas)
- Pull to refresh para atualizar a lista

#### Concluir Tarefa

1. Localize a tarefa no dashboard
2. Toque no botão **"✓ Concluir"**
3. A tarefa ficará marcada como concluída
4. Aparecerá no final da lista com estilo diferenciado

#### Excluir Tarefa

1. Toque em **"Excluir"** no card da tarefa
2. Confirme a ação no diálogo
3. A tarefa será removida permanentemente

### ⏱️ Modo Foco (Técnica Pomodoro)

#### Como Usar

1. No dashboard, toque em **"⏱️ Modo Foco"**
2. Leia as dicas de produtividade
3. Toque em **"Iniciar"** para começar
4. Timer iniciará com 25 minutos
5. Mantenha o foco até o final

#### Durante a Sessão

- **Pausar**: Interrompe temporariamente o timer
- **Reiniciar**: Volta o timer para 25 minutos
- Acompanhe o progresso na barra visual

#### Ao Completar

1. Vibração indica fim da sessão
2. Escolha entre:
   - **Iniciar Pausa (5 min)** - Recomendado
   - **Pular Pausa** - Continuar trabalhando

#### Estatísticas

- **Sessões hoje**: Contador de pomodoros completos
- **Minutos focados**: Total acumulado do dia
- Dados salvos automaticamente

### 📊 Visualizando Relatórios

#### Acessar Relatórios

1. No dashboard, toque em **"📊 Relatórios"**
2. Visualize as estatísticas gerais

#### Métricas Disponíveis

**Visão Geral**

- Total de tarefas criadas
- Tarefas concluídas
- Tarefas pendentes
- Taxa de conclusão (%)

**Tempo de Foco**

- Horas totais focadas
- Número de sessões Pomodoro
- Média de minutos por sessão

**Distribuição por Prioridade**

- Quantidade de tarefas por prioridade
- Gráfico visual de distribuição
- Percentual de cada categoria

**Insights Personalizados**

- Análise do seu perfil de produtividade
- Recomendações baseadas em padrões
- Dicas para melhorar desempenho

#### Atualização dos Dados

- Relatórios atualizam automaticamente ao abrir a tela
- Pull to refresh disponível
- Dados em tempo real

## 📂 Estrutura do Projeto

```plaintext
HarmonyWork-GS/
├── assets/                # Recursos estáticos (imagens, ícones)
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.tsx         # Botão customizado com variants
│   │   ├── Input.tsx          # Campo de entrada com label e erro
│   │   └── TaskCard.tsx       # Card de tarefa com ações
│   │
│   ├── navigation/        # Configuração de navegação
│   │   └── AppNavigator.tsx   # Stack Navigator principal
│   │
│   ├── screens/          # Telas do aplicativo
│   │   ├── Auth/
│   │   │   └── LoginScreen.tsx        # Login e cadastro
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx         # Dashboard principal
│   │   ├── Task/
│   │   │   └── AddTaskScreen.tsx      # Criar nova tarefa
│   │   ├── Focus/
│   │   │   └── FocusScreen.tsx        # Timer Pomodoro
│   │   └── Report/
│   │       └── ReportScreen.tsx       # Estatísticas e relatórios
│   │
│   ├── services/         # Lógica de negócio e dados
│   │   ├── storage.ts         # Funções AsyncStorage
│   │   ├── authService.ts     # Autenticação (login, registro)
│   │   └── taskService.ts     # CRUD de tarefas e sessões
│   │
│   ├── theme/            # Sistema de design
│   │   ├── colors.ts          # Paleta de cores
│   │   ├── typography.ts      # Estilos de texto
│   │   ├── spacing.ts         # Espaçamentos
│   │   ├── shadows.ts         # Sombras e elevações
│   │   └── index.ts           # Export do tema
│   │
│   └── types/            # Definições TypeScript
│       └── index.ts           # Interfaces (User, Task, etc.)
│
├── App.tsx               # Ponto de entrada principal
├── index.ts              # Registro do componente
├── app.json              # Configuração do Expo
├── package.json          # Dependências do projeto
├── tsconfig.json         # Configuração TypeScript
└── README.md             # Documentação
```

## 🗂️ Arquitetura de Dados

### Tipos Principais

```typescript
interface User {
  id: string;
  email: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: string;
  completedAt?: string;
}

interface FocusSession {
  id: string;
  duration: number; // em minutos
  completedAt: string;
}
```

### Estrutura de Armazenamento

Todos os dados são salvos localmente via AsyncStorage na chave `@harmonywork:data`:

```typescript
{
  user: User | null,
  tasks: Task[],
  focusSessions: FocusSession[]
}
```

## 🎯 ODS - Objetivos de Desenvolvimento Sustentável

Este projeto está alinhado com os seguintes Objetivos de Desenvolvimento Sustentável da ONU:

### ODS 3 - Saúde e Bem-estar

**Impacto:**

- Reduz estresse e sobrecarga mental através de organização inteligente
- Promove pausas regulares com técnica Pomodoro
- Previne burnout com equilíbrio vida-trabalho
- Incentiva saúde mental no ambiente de trabalho

**Funcionalidades relacionadas:**

- Timer Pomodoro com pausas obrigatórias
- Visualização de carga de trabalho
- Insights sobre produtividade saudável

### ODS 8 - Trabalho Decente e Crescimento Econômico

**Impacto:**

- Promove produtividade sustentável e consciente
- Otimiza tempo de trabalho sem exploração
- Melhora qualidade do trabalho remoto/híbrido
- Reduz burnout profissional

**Funcionalidades relacionadas:**

- Priorização inteligente de tarefas
- Gestão eficiente do tempo
- Relatórios de produtividade
- Organização automática da agenda

### ODS 9 - Indústria, Inovação e Infraestrutura

**Impacto:**

- Uso de tecnologia mobile cross-platform
- Aplicação de técnicas comprovadas (Pomodoro)
- Interface intuitiva e acessível
- Inovação na gestão do trabalho moderno

**Funcionalidades relacionadas:**

- Sistema inteligente de priorização
- Análise de dados e insights
- Tecnologia React Native + TypeScript
- Design responsivo e performático

## 🔐 Segurança e Privacidade

- **Armazenamento Local**: Todos os dados ficam no dispositivo do usuário
- **Sem servidor externo**: Nenhuma informação é enviada para servidores
- **Privacidade total**: Suas tarefas e dados são completamente privados
- **Sem rastreamento**: Não coletamos analytics ou dados de uso
- **Offline-first**: Funciona completamente sem internet

## 🚧 Melhorias Futuras

### Versão 2.0 (Planejado)

- [ ] Sincronização em nuvem (opcional)
- [ ] Temas escuro/claro
- [ ] Widgets para tela inicial
- [ ] Notificações push
- [ ] Integração com calendário
- [ ] Categorias personalizadas
- [ ] Subtarefas e checklist
- [ ] Modo offline aprimorado

### Versão 3.0 (Futuro)

- [ ] IA para sugestão de prioridades
- [ ] Análise preditiva de produtividade
- [ ] Integração com ferramentas de trabalho
- [ ] Gamificação e conquistas
- [ ] Compartilhamento de tarefas
- [ ] Modo colaborativo em equipe

## 🐛 Problemas Conhecidos

Nenhum problema crítico conhecido no momento.

Para reportar bugs, abra uma [issue no GitHub](https://github.com/leooruiz/HarmonyWork-GS/issues).

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para novos arquivos
- Siga o padrão ESLint do projeto
- Escreva componentes funcionais com Hooks
- Documente funções complexas
- Teste em iOS e Android antes do PR

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

Desenvolvido como projeto acadêmico da FIAP - Global Solutions.

## 👥 Equipe

Desenvolvido por alunos da FIAP - Faculdade de Informática e Administração Paulista:

- **Leonardo de Oliveira Ruiz** - RM 98901
  - [GitHub](https://github.com/leooruiz)
  
- **Bruno Venturi Lopes Vieira** - RM 99431
  
- **Guilherme Alves de Lima** - RM 550433

--

**⚡ HarmonyWork - Seu dia organizado. Sua mente leve. ⚡**

Desenvolvido com ❤️ por estudantes da FIAP

[⬆ Voltar ao topo](#harmonywork---gestão-inteligente-do-trabalho)

</div>
