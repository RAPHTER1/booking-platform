CREATE TABLE role (
  id_role SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  permissions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role_id INTEGER REFERENCES role(id_role),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


docker compose down -v

🚩 Liste des fonctionnalités possibles pour auth-api :
📌 Authentification et sécurité
✅ Login utilisateur

Reçoit email/password → Renvoie JWT

✅ Déconnexion utilisateur (Logout) (avec invalidation token côté client)

✅ Refresh Token

Permet de générer un nouveau JWT à partir d’un ancien valide (meilleure sécurité).

📌 Gestion des comptes utilisateur
✅ Inscription utilisateur (si nécessaire selon ton projet)

✅ Modifier son mot de passe (Change password)

Vérification ancien mot de passe requis.

✅ Réinitialisation de mot de passe oublié (Forgot Password)

Génère un lien sécurisé par email pour définir un nouveau mot de passe.

✅ Modification email utilisateur

📌 Gestion de profils utilisateur (optionnel selon projet)
✅ Voir son propre profil (récupération des données utilisateur actuelles)

✅ Modification des données du profil (nom, prénom, coordonnées, etc.)

✅ Suppression du compte utilisateur (soft-delete)

📌 Sécurité Avancée
✅ Vérification des JWT (middleware réutilisable)

✅ Limiter le nombre d’essais de connexion (prévention brute-force)

✅ 2FA (authentification à deux facteurs) (via email ou application authentification)

✅ Historique des connexions utilisateur (audits, journal des connexions)

📁 Organisation complète des fichiers par fonctionnalité :
Voici comment concrètement tout cela serait organisé dans ta structure recommandée :

pgsql
Copier
Modifier
auth-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js (login, logout, refresh token)
│   │   ├── userController.js (inscription, changement de mot de passe, reset password, gestion profil)
│   │   └── securityController.js (2FA, limiter essais connexion, historique connexions)
│   │
│   ├── routes/
│   │   ├── authRoutes.js (routes login, logout, refresh token)
│   │   ├── userRoutes.js (routes inscription, gestion mot de passe, profil utilisateur)
│   │   └── securityRoutes.js (routes sécurité avancée)
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js (vérification JWT)
│   │   ├── errorHandler.js (gestion globale des erreurs)
│   │   └── rateLimiter.js (limitation des tentatives de connexion)
│   │
│   ├── services/
│   │   ├── authService.js (gestion login, JWT, bcrypt)
│   │   ├── userService.js (inscription utilisateur, reset mot de passe, modification utilisateur)
│   │   └── securityService.js (gestion 2FA, audits de sécurité, historiques)
│   │
│   ├── utils/
│   │   ├── ApiError.js (gestion des erreurs)
│   │   ├── db.js (gestion DB PostgreSQL)
│   │   ├── email.js (envoi mails sécurité, reset mot de passe, 2FA)
│   │   └── tokenGenerator.js (génération tokens sécurisés pour reset password)
│   │
│   ├── config/
│   │   └── index.js (variables environnement et config globale)
│   │
│   ├── app.js (configuration Express)
│   └── index.js (point d'entrée du serveur)
🎯 Récapitulatif précis des rôles des dossiers principaux :
Dossier	À quoi ça sert concrètement ?
📂 controllers/	Gérer les requêtes HTTP et renvoyer des réponses (gère uniquement req/res)
📂 routes/	Définir les routes HTTP (associe une URL à une fonction controller)
📂 services/	Contient toute la logique métier (DB, sécurité, validation...)
📂 middlewares/	Traitement global réutilisable (authentification JWT, gestion erreur, limite essais, etc.)
📂 utils/	Fonctions utilitaires réutilisables partout (connexion DB, gestion erreurs custom, emails, etc.)
📂 config/	Gestion centralisée des variables d'environnement


Ok, allons-y de façon très concrète. Je te propose de **commencer par le README minimal** à la racine de ton projet (_booking-platform/_), puis ensuite on fera le fichier de doc détaillée pour l’Auth API (_docs/auth-api.md_).  

Voici le **plan** que je suggère :

---

# 1. **Créer le README minimal à la racine**  
- **Nom du projet** + brève intro  
- **Microservices existants** (Auth API, Admin API, Public API)  
- **Démarrage rapide** (Docker Compose)  
- **Lien vers la doc détaillée** (dans `docs/`)

# 2. **Créer la doc détaillée de l’Auth API** (_docs/auth-api.md_)  
- **Introduction** et but de l’API  
- **Installation & prérequis** (Node, Docker, .env)  
- **Architecture / Structure de fichiers** (controllers, models, routes...)  
- **Variables d’environnement** (JWT_SECRET, DB_HOST, etc.)  
- **Endpoints** (login, verify-token) + exemples Postman  
- **Validation des inputs** (Zod)  
- **Logs (Morgan + Winston)**  
- **Gestion des erreurs** (middleware errorHandler)  
- **Roadmap / évolutions futures** (refresh token, etc.)  

---

## On procède étape par étape :

1. **Je te propose** le contenu du **README.md** racine.  
2. **Ensuite**, on rédigera **auth-api.md** dans un deuxième temps.

### Let’s go !  

---

## 1) **README minimal à la racine : _booking-platform/README.md_**

```md
# Booking Platform

Bienvenue sur **Booking Platform**, un projet permettant de gérer la réservation (booking) d’artistes.  
Ce dépôt contient l’infrastructure Docker ainsi que plusieurs microservices :

- **Auth API** (authentification JWT, gestion des tokens)
- **Admin API** (CRUD artistes, bookings… _à venir_)
- **Public API** (routes publiques pour consulter les artistes… _à venir_)

## Démarrage rapide

1. **Cloner** ce repo :  
   ```bash
   git clone https://github.com/tonuser/booking-platform.git
   cd booking-platform
   ```
2. **Lancer Docker Compose** :  
   ```bash
   docker compose up --build
   ```
3. **Consulter** l’Auth API sur [http://localhost:3001](http://localhost:3001) (ou via la Gateway : [http://localhost:3000/api/auth](http://localhost:3000/api/auth))  

> **Note** : Pense à configurer tes variables d’environnement (JWT_SECRET, DB_HOST…) dans le `docker-compose.yml` ou dans un `.env`.

## Documentation

La documentation détaillée de chaque microservice se trouve dans le dossier [`docs/`](./docs).  

- [**Auth API**](./docs/auth-api.md) : présentation, endpoints, logs, etc.  
- _Prochainement_ : Admin API, Public API.

## Licence

*(Si tu as une licence, indique-la ici. Sinon supprime.)*

---

```

> **Remarque** : Ajuste le lien Git, le nom du repo, etc., selon ta configuration.

---

## 2) **Ensuite** : Doc détaillée de l’Auth API, dans `docs/auth-api.md`

On la fera dans le message suivant. Ça te va ?