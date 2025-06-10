# 🎮 Game Box
Um aplicativo social para catalogar, avaliar e criar listas de jogos, inspirado no conceito do Letterboxd. Este projeto foi construído com React Native (usando Expo) e se conecta ao Firebase para autenticação e armazenamento de dados, e à API da RAWG.io para informações sobre os jogos.

# 📋 Índice
Funcionalidades

Tecnologias Utilizadas

Como Instalar e Rodar

Pré-requisitos

Instalação

Configuração de Chaves

Estrutura do Projeto

Próximos Passos

# ✨ Funcionalidades
✅ Autenticação de Usuário: Sistema completo de Registro e Login com E-mail/Senha via Firebase Authentication.

✅ Integração com API Externa: Consumo da RAWG.io API para obter uma base de dados rica e atualizada de jogos.

✅ Navegação Moderna: Interface fluida com Abas Inferiores (Bottom Tabs) e navegação em Pilha (Stack) para uma experiência de usuário intuitiva.

✅ Feed e Busca:

Tela inicial com uma lista de jogos populares.

Funcionalidade de busca para encontrar jogos específicos.

✅ Interação do Usuário:

Favoritar: Usuários podem marcar jogos como favoritos.

Listas Customizadas: Usuários podem criar listas personalizadas (ex: "Jogos para Zerar", "Melhores RPGs"), adicionar e remover jogos delas.

✅ Persistência de Dados: Todas as interações do usuário (favoritos, listas) são salvas em tempo real no banco de dados Cloud Firestore.

✅ Telas Dedicadas:

Detalhes do Jogo: Tela com informações completas, incluindo imagem e descrição.

Perfil do Usuário: Uma área de perfil com informações da conta e botão para sair.

Tela de Favoritos: Exibe todos os jogos favoritados pelo usuário.

Tela de Listas: Permite criar novas listas e navegar para ver os jogos dentro de cada uma.

✅ Código Limpo:

Estrutura de pastas organizada.

Lógica de autenticação encapsulada em um Hook Customizado (useAuth).

Componentes reutilizáveis como o GameCard.

# 🛠️ Tecnologias Utilizadas
React Native (Expo): Framework para desenvolvimento de aplicativos móveis.

JavaScript: Linguagem de programação principal.

React Navigation: Biblioteca para gerenciamento de rotas e navegação.

@react-navigation/bottom-tabs

@react-navigation/stack

Firebase: Plataforma de backend do Google.

Authentication: Para gerenciamento de usuários.

Cloud Firestore: Como banco de dados NoSQL em tempo real.

Axios: Cliente HTTP para fazer as chamadas à API de jogos.

RAWG.io API: Fonte de dados para os jogos.

# 🚀 Como Instalar e Rodar
Siga os passos abaixo para ter uma cópia do projeto rodando na sua máquina.

Pré-requisitos
Node.js: https://nodejs.org/

Git: https://git-scm.com/

Uma conta no Firebase e na RAWG.io.

Instalação
Clone o repositório:

git clone https://github.com/seu-usuario/GameBoxV2.git

Navegue até a pasta do projeto:

cd GameBoxV2

Instale todas as dependências:

npm install

Configuração de Chaves
Para o aplicativo funcionar, você precisa fornecer suas chaves de API pessoais.

Firebase:

Crie um projeto no console do Firebase.

Habilite Authentication com o provedor "E-mail/senha".

Crie um banco de dados Firestore e, na aba "Regras", libere para desenvolvimento:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

Adicione um App da Web (</>) ao seu projeto Firebase e copie o objeto firebaseConfig.

Cole esse objeto no arquivo src/services/firebaseConfig.js.

RAWG.io:

Obtenha sua chave de API em rawg.io/apikey.

Cole a sua chave no arquivo src/services/api.js, na variável API_KEY.

Rodando o Aplicativo
Com tudo configurado, inicie o servidor do Expo:

npx expo start

Abra o aplicativo no seu navegador para testar a versão web, ou escaneie o QR Code com o app Expo Go no seu celular.

# 📁 Estrutura do Projeto
O projeto segue uma estrutura de pastas organizada para separar as responsabilidades:

/src
├── assets/         # Imagens, fontes, etc.
├── components/     # Componentes reutilizáveis (ex: GameCard)
├── hooks/          # Hooks customizados (ex: useAuth)
├── navigation/     # Arquivos de configuração da navegação (Stacks, Tabs)
├── screens/        # As telas principais do aplicativo
└── services/       # Módulos para conversar com serviços externos (Firebase, API)

# 🔮 Próximos Passos
Idéias para a evolução do projeto:

[ ] Implementar um Feed de Atividades social na aba ❤️.

[ ] Adicionar um sistema de avaliação por estrelas na tela de detalhes.

[ ] Criar um sistema para seguir outros usuários e ver seus perfis.

[ ] Melhorar a tela de criação de listas com mais opções (descrição, capa, etc.).

[ ] Implementar testes unitários e de integração.
