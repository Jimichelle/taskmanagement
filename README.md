# Task Management

**Application de gestion de tâches**

## Participants

**FALL Ndeye Fatima**  
**CHAUDEMANCHE Mathis**  
**DENYSIAK Jimi**  

## Structure

```
taskmanagement/
├── .gitignore
├── LICENSE
├── README.md
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package.json.backup
│   ├── public/
│   │   └── manifest.json
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── Register.js
│   │   │   ├── TaskCard.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskList.js
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   └── TaskContext.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── setupTests.js
│   └── vite.config.js
└── projet_gestionnaire_taches_examen.md

```
## Requis

- Node.js >= 22
- npm >= 11

*Requis approximatifs*

## Installations & Lancement

### Front-End

**Installation**

```shell
cd frontend #Déplacement vers le répertoire de travail

npm install # Installation des dépendances
```

**Lancement**

```shell
npm run dev # Lancement du serveur de développement

npm run build # Compilation du projet

npm run start # Lancement du projet compilé

npm run preview # Prévisualisation du projet compilé

npm run test # Test unitaire
```