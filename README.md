# Portfolio — A²JR

Site portfolio réalisé avec [Angular](https://angular.dev) (v20).

## Prérequis

- [Node.js](https://nodejs.org) v20 ou plus récent (testé avec v24)
- npm v10 ou plus récent (installé avec Node.js)
- Angular CLI (`@angular/cli`) v20 — installé automatiquement via `npm install`, pas besoin de l'installer globalement

## Lancer le projet

### Option 1 — via le script (Windows)

Double-cliquer sur le fichier [`lancer-le-site.bat`](lancer-le-site.bat) à la racine du projet.

Le script installe automatiquement les dépendances si besoin, puis démarre le serveur.

### Option 2 — en ligne de commande

```bash
npm install      # à faire une seule fois (ou après avoir récupéré le projet / après un git pull)
npm start
```

Puis ouvrir **http://localhost:4200** dans le navigateur.

Le site se recharge automatiquement à chaque modification des fichiers.

## Autres commandes utiles

```bash
npm run build    # génère une version de production dans dist/
npm run watch    # build en continu (mode développement)
npm test         # lance les tests unitaires (Karma/Jasmine)
```
