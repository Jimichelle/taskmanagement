FROM node:22

# Dossier de l'application
WORKDIR /app

# Copier les fichiers package.json et installation
COPY package.json .
RUN npm install

COPY . .

# Build de production (fichiers statiques dans dist/)
RUN npm run build

# On expose le port 4173 pour l'application
EXPOSE 4173

# Commande pour servir le build de production
CMD ["npm", "run", "start"]
