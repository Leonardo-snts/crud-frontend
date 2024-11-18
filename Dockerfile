# Usar uma imagem oficial Node.js
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar os demais arquivos do projeto
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando padrão para rodar o React.js
CMD ["npm", "start"]
