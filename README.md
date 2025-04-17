---

# Mon Dev
Une plateforme pour que les freelances et les employeurs publient des offres, soumettent des candidatures et gèrent des contrats et paiements (via Stripe Sandbox).

---

## ⚙️ Prérequis

- Node.js v16+ & npm ou yarn
- MongoDB (local ou Atlas)
- Compte Stripe (mode test)

---

## 🚀 Installation et Déploiement

### 1. Back‑end
```bash
cd src
npm install
node server.js
```
### 2. Front-end
```bash
cd frontend
npm install
npm start
```
## 📝 Variables d’environnement

### Back-end .env
```ini
MONGODB_URI=lien_de_connexion_a_la_bdd
JWT_SECRET=une_clé_secrète_pour_jwt
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXX
```
### Front-end .env
```ini
REACT_APP_API_URL=http://localhost:3000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXX
```

## 🖥️ Fonctionnalités
- Inscription / Connexion avec JWT

- Affichage d’offres (liste & détail)

- Postuler pour les freelances

- Gestion des candidatures (accepter / refuser)

- Paiement via Stripe Sandbox

- Messagerie temps réel avec Socket.IO

- Routing protégé (RequireAuth / NoAuth)

- Navbar adaptée au rôle et état de connexion
