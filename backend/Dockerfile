FROM node:22

# Dossier de l'application
WORKDIR /app

# Copier les fichiers package.json et installation
COPY package.json .
RUN npm install

COPY . .

# On expose le port 3001 pour l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]