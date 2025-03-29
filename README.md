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
