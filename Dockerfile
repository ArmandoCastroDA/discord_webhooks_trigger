FROM node:20.18.0

WORKDIR /app

COPY . .

# Remover node_modules caso exista
RUN rm -rf node_modules

# Remover env caso exista
RUN rm -rf src\.env

# Instalar as dependências
RUN npm install

# Mudar para o diretório src e iniciar a aplicação
CMD ["sh", "-c", "cd src && node index.js && node deploy-commands.js"]
