LinkMark Shop Front - Projeto de E-commerce
Este projeto é um sistema de e-commerce desenvolvido como parte das atividades acadêmicas da Faculdade Impacta. O sistema consiste em uma API RESTful com Node.js e Express, e um front-end utilizando Next.js. O banco de dados utilizado é o MariaDB, e a aplicação segue princípios de arquitetura limpa e boas práticas de desenvolvimento.

Índice
Descrição
Tecnologias Utilizadas
Funcionalidades
Requisitos de Sistema
Instalação
Estrutura de Pastas
Endpoints da API
Contribuição
Licença
Descrição
O LinkMark Shop Front é um projeto desenvolvido para simular um sistema de e-commerce simples. Ele permite que os usuários naveguem por produtos, vejam detalhes específicos, e administradores possam adicionar, editar e excluir produtos. Além disso, o sistema oferece suporte a operações CRUD em produtos e permite a integração de um front-end para exibição dos produtos.

Tecnologias Utilizadas
Back-end:
Node.js (v18+)
Express.js
MariaDB (v10+)
Sequelize (ORM)
Docker (para gerenciamento de containers)
Front-end:
Next.js (v14+)
React.js
Tailwind CSS
Outros:
GitHub Actions (CI/CD)
Docker Compose (para ambientes de desenvolvimento)
Funcionalidades
CRUD de Produtos: Os usuários podem visualizar produtos e administradores podem criar, editar e deletar.
Busca e Filtros: Filtrar produtos por categorias, preço e avaliação.
API RESTful: Endpoints para gerenciar produtos, autores e usuários.
Autenticação JWT: Implementação futura de autenticação e autorização.
Integração com Banco de Dados MariaDB: Utilizando Sequelize como ORM para facilitar as operações.
Requisitos de Sistema
Node.js 18.x ou superior
Docker e Docker Compose instalados
MariaDB ou MySQL para banco de dados (recomendado usar Docker)
Git para versionamento de código
Instalação

1. Clonar o repositório
   bash
   Copy code
   git clone https://github.com/seu-usuario/linkmark-shop-front.git
   cd linkmark-shop-front
2. Configurar o Banco de Dados (MariaDB)
   Crie um banco de dados MariaDB com o seguinte comando no terminal:

bash
Copy code
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=linkmark -d -p 3306:3306 mariadb 3. Instalar Dependências
Instale as dependências tanto para o back-end quanto para o front-end.

bash
Copy code

# Instalar dependências do back-end

cd server
npm install

# Instalar dependências do front-end

cd ../client
npm install 4. Configurar Variáveis de Ambiente
Crie um arquivo .env na pasta do back-end com as seguintes variáveis de ambiente:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=linkmark
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
PORT=3001 5. Executar o Projeto
Back-end
bash
Copy code
cd server
npm start
Front-end
bash
Copy code
cd client
npm run dev 6. Acessar o Sistema
Back-end: http://localhost:3001/api
Front-end: http://localhost:3000
Estrutura de Pastas
bash
Copy code
├── client/ # Front-end (Next.js)
│ └── public/ # Imagens e arquivos estáticos
│ └── src/ # Código-fonte do front-end
├── server/ # Back-end (Node.js/Express)
│ └── controllers/ # Controladores da API
│ └── models/ # Modelos Sequelize
│ └── routes/ # Rotas da API
│ └── config/ # Configurações da aplicação
├── docker-compose.yml # Arquivo para rodar containers
└── README.md # Documentação do projeto
Endpoints da API
Produtos
GET /api/products - Lista todos os produtos
GET /api/products/:id - Detalhes de um produto
POST /api/products - Adiciona um novo produto (admin)
PUT /api/products/:id - Atualiza um produto (admin)
DELETE /api/products/:id - Deleta um produto (admin)
Autores
GET /api/authors - Lista todos os autores
POST /api/authors - Adiciona um novo autor
Usuários
POST /api/register - Cria um novo usuário
POST /api/login - Autentica um usuário
Contribuição
Este projeto é desenvolvido para fins acadêmicos, mas contribuições são bem-vindas. Para contribuir, siga as etapas abaixo:

Faça um fork do projeto
Crie uma nova branch: git checkout -b minha-feature
Envie suas alterações: git commit -am 'Minha nova feature'
Envie para o repositório remoto: git push origin minha-feature
Crie um Pull Request
Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

Esse README oferece uma visão geral sobre o projeto, suas tecnologias e como instalá-lo, seguindo as práticas comuns em projetos acadêmicos e profissionais.
