# 📊 Application d’Évaluation de la Satisfaction des Employés – OCP

> Projet réalisé dans le cadre d’un stage au sein du service informatique du site OCP de Benguerir.

## 🧩 Objectif

Cette application web vise à mesurer la satisfaction des employés vis-à-vis du service informatique (notamment le **Digital Corner**) en recueillant leurs avis via une interface intuitive sur tablette. L'objectif est d'améliorer en continu la qualité du support informatique sur site.

---

## ⚙️ Fonctionnalités

### 🎯 Employés
- Accès à une interface de feedback via une tablette.
- Évaluation de :
  - la qualité du service,
  - le temps de réponse,
  - le comportement du personnel.
- Ajout facultatif de commentaires.

### 🔐 Administrateurs
- Authentification sécurisée.
- Visualisation des statistiques du **centre assigné**.
- Accès aux retours commentés.

### 🧑‍💼 Super Administrateur
- Gestion des comptes administrateurs.
- Visualisation globale des statistiques de tous les centres.
- Comparaison des performances des centres.

---

## 🧪 Technologies Utilisées

| Composant     | Technologie         |
|---------------|---------------------|
| Backend       | Spring Boot (Java)  |
| Frontend      | React + TailwindCSS |
| Base de données | MySQL             |
| Authentification | JWT + Spring Security |
| Tests API     | Postman             |
| Audit Frontend | Google Lighthouse  |

---

## 🧱 Architecture

Architecture full-stack découplée basée sur le modèle MVC :

- **Frontend (React)** : Composants, routing, Axios.
- **Backend (Spring Boot)** : REST API, services métier, JPA.
- **Sécurité** : Authentification/autorisation via Spring Security.

---

## 🚀 Installation (en local)

### 1. Cloner le projet
```bash
git clone https://github.com/walid-mataich/DigitalCornerEvaluation.git
cd DigitalCornerEvaluation
```

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```

###3. Frontend
```bash
cd frontend
npm install
npm run dev
```
