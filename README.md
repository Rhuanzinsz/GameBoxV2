Game Box 🎮
Um aplicativo social para catalogar, avaliar e criar listas de jogos, inspirado no conceito do Letterboxd. Este projeto foi construído com React Native (usando Expo) e se conecta ao Firebase para autenticação e armazenamento de dados, e à API da RAWG.io para informações sobre os jogos.

(Sugestão: troque o link acima por um GIF ou uma montagem de screenshots do seu app funcionando!)

📋 Índice
Funcionalidades
Tecnologias Utilizadas
Como Instalar e Rodar
Pré-requisitos
Instalação
Configuração do Firebase
Estrutura do Projeto
Próximos Passos
✨ Funcionalidades
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
Perfil do Usuário: Uma área de perfil com abas para visualizar os jogos Favoritos e as Listas criadas.
Detalhes da Lista: Tela para visualizar todos os jogos contidos em uma lista específica.
✅ Código Limpo:
Estrutura de pastas organizada.
Lógica de autenticação encapsulada em um Hook Customizado (useAuth).
Componentes reutilizáveis como o GameCard.
🛠️ Tecnologias Utilizadas
React Native (Expo): Framework para desenvolvimento de aplicativos móveis.
JavaScript: Linguagem de programação principal.
React Navigation: Biblioteca para gerenciamento de rotas e navegação.
@react-navigation/bottom-tabs
@react-navigation/stack
@react-navigation/material-top-tabs
Firebase: Plataforma de backend do Google.
Authentication: Para gerenciamento de usuários.
Cloud Firestore: Como banco de dados NoSQL em tempo real.
Axios: Cliente HTTP para fazer as chamadas à API de jogos.
RAWG.io API: Fonte de dados para os jogos.
