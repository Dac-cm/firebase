# SEG3502 — Laboratoire 5 — Code de départ

Ce dossier contient l'application **Employee** de départ pour le laboratoire 5.

## Démarrage

Dans un terminal ouvert à la racine du projet :

```bash
npm install
npm start
```

Puis ouvrez l'application à l'adresse indiquée par Angular, normalement :

```text
http://localhost:4200/
```

## Firebase / AngularFire

Ce projet utilise **Angular 18**. Pour ce laboratoire, utilisez la version AngularFire compatible avec cette version d'Angular :

```bash
ng add @angular/fire@18.0.1
```

Pendant la configuration, sélectionnez **Firestore** et votre propre projet Firebase.

> N'utilisez pas simplement `ng add @angular/fire` sans version : la version la plus récente d'AngularFire peut cibler une version plus récente d'Angular que celle utilisée par ce starter.

## Point de départ

Le projet contient déjà :

- le formulaire **Employee Entry Form** ;
- le modèle `Employee` ;
- le bouton **Employee List** ;
- le tableau d'affichage des employés ;
- un `EmployeeService` qui garde actuellement les employés seulement en mémoire.

Le travail du laboratoire consiste à remplacer/étendre cette persistance en mémoire avec **Cloud Firestore**, conformément aux consignes du laboratoire.

## Important

Utilisez votre propre configuration Firebase. Ne partagez pas les paramètres ou fichiers d'un autre projet Firebase.
