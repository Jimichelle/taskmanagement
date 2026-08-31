# Tests E2E (Selenium)

Tests end-to-end du parcours utilisateur avec Selenium WebDriver + Chrome.

## Prérequis
- Google Chrome installé
- Backend et frontend démarrés

## Lancer

    # terminal 1
    cd backend && npm run dev

    # terminal 2
    cd frontend && npm start

    # terminal 3
    cd tests && npm install && npm test

Pour voir le navigateur pendant le test : `HEADLESS=false npm test`
