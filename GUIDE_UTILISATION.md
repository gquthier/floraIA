# 📖 Guide d'Utilisation - ItinérairePro

## 🚀 Démarrage en 30 secondes

### Méthode 1 : Double-clic (Plus simple)
1. Ouvrez le fichier `index.html` avec votre navigateur
2. C'est tout ! L'application se lance

### Méthode 2 : Serveur local (Recommandé)
```bash
python3 -m http.server 8000
```
Puis ouvrez : http://localhost:8000

---

## 📋 Workflow Complet (5 Étapes)

### **Étape 1 : Informations Client** 👤

**Objectif :** Renseigner les détails du client et les dates du voyage

**Actions :**
1. Entrez le **nom du client** (obligatoire)
2. Email du client (optionnel)
3. **Nombre de personnes** (obligatoire)
4. Budget estimé (optionnel)
5. **Date de début** (obligatoire)
6. **Date de fin** (obligatoire)
7. Notes/préférences (allergies, mobilité réduite, etc.)

**✨ Automatique :**
- La durée du séjour se calcule automatiquement
- Affichage en temps réel : "Durée du séjour : X jours"

**Validation :**
- Nom, dates de début et fin sont obligatoires
- La date de fin doit être après la date de début

---

### **Étape 2 : Planification des Activités** 🎯

**Objectif :** Ajouter des activités jour par jour

**Actions :**
1. Vous voyez une **carte par jour** (basée sur les dates saisies)
2. Cliquez sur **"Ajouter une activité"** pour un jour
3. Une fenêtre s'ouvre avec les activités disponibles
4. Sélectionnez une activité
5. Elle s'ajoute automatiquement au jour

**Informations affichées :**
- Nom de l'activité
- Durée et localisation
- Prix par personne
- Capacité

**Options :**
- ➕ Ajouter plusieurs activités par jour
- 🗑️ Supprimer une activité (bouton poubelle)
- Les prix se calculent automatiquement

**💡 Astuce :** Vous pouvez ajouter autant d'activités que nécessaire par jour

---

### **Étape 3 : Transferts et Transport** 🚗

**Objectif :** Organiser les déplacements

**✨ Automatique :**
- Le système génère automatiquement les transferts suggérés
- Basé sur les activités sélectionnées
- Jour 1 : Aéroport → Première destination
- Autres jours : Hôtel → Destinations

**Actions :**
1. Vérifiez les transferts générés
2. Modifiez le type de véhicule si nécessaire :
   - Voiture privée
   - Minivan
   - Bus
3. ➕ Ajoutez un transfert manuel si besoin
4. 🗑️ Supprimez les transferts non nécessaires

**Informations affichées :**
- Jour du transfert
- Départ → Destination
- Type de véhicule

---

### **Étape 4 : Personnalisation & Photos** 📸

**Objectif :** Ajouter des visuels et prévisualiser l'itinéraire

**Aperçu de l'itinéraire :**
- Vue complète de tout l'itinéraire
- Client, dates, participants
- Activités jour par jour avec détails
- Prix automatiquement calculés

**Ajout de photos (3 méthodes) :**

1. **Drag & Drop** (Glisser-Déposer)
   - Faites glisser vos photos dans la zone
   - Dépôt multiple supporté

2. **Clic sur la zone**
   - Cliquez sur "Glissez-déposez vos photos ici"
   - Sélectionnez vos fichiers

3. **Upload classique**
   - Cliquez sur "ou cliquez pour parcourir"
   - Sélectionnez plusieurs photos

**Gestion des photos :**
- Prévisualisation en miniature
- ❌ Survolez une photo → bouton X pour supprimer
- Formats acceptés : JPG, PNG, GIF, etc.

---

### **Étape 5 : Export des Documents** 📤

**Objectif :** Générer et télécharger tous les documents nécessaires

#### 4 Types d'exports disponibles :

**1. 📄 Itinéraire Client (PDF)**
- Document professionnel complet
- Avec photos et détails
- Prêt à imprimer ou envoyer
- **Action :** S'ouvre dans nouvelle fenêtre → Imprimer ou Sauvegarder en PDF

**2. 📝 Document Word**
- Version éditable
- Modifications finales possibles
- Format .doc compatible Microsoft Word
- **Action :** Téléchargement automatique

**3. 🚗 Récapitulatif Chauffeurs**
- Contacts partenaires complets
- Liens Google Maps pour chaque trajet
- Horaires et itinéraires détaillés
- Informations client
- **Action :** S'ouvre dans nouvelle fenêtre → Imprimer ou PDF

**4. 📊 Quotation Excel**
- Tableau détaillé des coûts
- Activités avec prix unitaires
- Transferts estimés
- Total automatique
- Format CSV (ouvre dans Excel)
- **Action :** Téléchargement automatique

**Résumé Final :**
Avant l'export, vous voyez :
- ✅ Nom du client
- ✅ Durée du séjour
- ✅ Nombre d'activités
- ✅ Nombre de transferts
- ✅ **Prix total estimé**

---

## 🎨 Personnalisation de la Base de Données

### Ajouter vos propres activités

Ouvrez `database.js` et ajoutez dans `activitiesDatabase` :

```javascript
{
    id: 9,  // ID unique
    name: "Votre Activité",
    description: "Description complète de l'activité",
    duration: "3h",
    location: "Ville, Quartier",
    price: 50,  // Prix en euros
    category: "Culture",  // Culture, Loisirs, Gastronomie, etc.
    capacity: "2-10 personnes"
}
```

### Ajouter vos partenaires (hôtels, chauffeurs, guides)

Dans `database.js`, ajoutez dans `partnersDatabase` :

```javascript
{
    id: 5,
    name: "Nom du Partenaire",
    type: "hotel",  // hotel, transport, guide, restaurant
    contact: {
        phone: "+33 X XX XX XX XX",
        email: "contact@example.com",
        address: "Adresse complète"
    },
    googleMaps: "https://goo.gl/maps/VOTRE_LIEN"
}
```

**💡 Astuce :** Pour obtenir un lien Google Maps court :
1. Allez sur Google Maps
2. Recherchez l'adresse
3. Cliquez sur "Partager"
4. Copiez le lien court

---

## 🎯 Cas d'Usage Pratiques

### Scénario 1 : Week-end à Paris (2 jours)
1. **Jour 1 :** Visite du Louvre + Tour Eiffel + Croisière Seine
2. **Jour 2 :** Montmartre + Shopping + Restaurant

**Temps estimé :** 5 minutes pour créer l'itinéraire complet

### Scénario 2 : Séjour d'une semaine (7 jours)
1. Planifiez jour par jour
2. Alternez culture, loisirs, détente
3. Ajoutez photos pour chaque activité
4. Exportez tout en fin

**Temps estimé :** 15-20 minutes

---

## 🔧 Dépannage

### L'application ne se charge pas
- ✅ Vérifiez que tous les fichiers sont présents :
  - `index.html`
  - `styles.css`
  - `app.js`
  - `database.js`
  - `export-engine.js`
- ✅ Utilisez un serveur local au lieu du double-clic
- ✅ Vérifiez la console du navigateur (F12)

### Les photos ne s'ajoutent pas
- ✅ Vérifiez que ce sont des images (JPG, PNG, etc.)
- ✅ Taille raisonnable (< 5MB par photo recommandé)
- ✅ Rechargez la page et réessayez

### L'export ne fonctionne pas
- ✅ Autorisez les pop-ups dans votre navigateur
- ✅ Vérifiez les téléchargements automatiques
- ✅ Utilisez Chrome ou Firefox (meilleure compatibilité)

### Mes données disparaissent au refresh
- ⚠️ **Normal** : Les données sont en mémoire uniquement
- 💡 **Solution future** : Implémentation du localStorage ou base de données

---

## 💡 Conseils Pro

### Pour gagner du temps :
1. **Préparez vos activités à l'avance** dans `database.js`
2. **Utilisez des templates** : Créez des itinéraires types
3. **Photos organisées** : Préparez vos photos dans un dossier
4. **Contacts à jour** : Maintenez votre base de partenaires

### Pour un rendu professionnel :
1. **Photos haute qualité** (mais pas trop lourdes)
2. **Descriptions claires** dans les activités
3. **Vérifiez les prix** avant export
4. **Relisez l'aperçu** avant d'exporter

### Optimisation du workflow :
1. **Étape 1-2 :** 5 minutes (infos + activités)
2. **Étape 3 :** 2 minutes (transferts auto-générés)
3. **Étape 4 :** 3 minutes (photos + vérification)
4. **Étape 5 :** 1 minute (exports)

**Total : ~10-15 minutes par itinéraire complet** ⚡

---

## 📈 Évolutions Futures Possibles

### Version Pro (avec backend) :
- ✅ Sauvegarde des itinéraires
- ✅ Base de données cloud
- ✅ Génération PDF côté serveur
- ✅ Envoi email automatique aux clients
- ✅ Intégration Google Maps API réelle
- ✅ Système de facturation
- ✅ Multi-utilisateurs
- ✅ Templates personnalisables

---

## 🆘 Support

**Problème technique ?**
- Vérifiez le README.md
- Consultez la console du navigateur (F12)
- Vérifiez que JavaScript est activé

**Suggestions d'amélioration ?**
- Les suggestions sont les bienvenues !
- Personnalisez le code selon vos besoins

---

## ✅ Checklist Avant Export Final

- [ ] Toutes les informations client sont correctes
- [ ] Toutes les activités sont saisies
- [ ] Les transferts sont logiques et complets
- [ ] Les photos sont ajoutées et de bonne qualité
- [ ] L'aperçu est vérifié
- [ ] Le prix total est cohérent
- [ ] Les contacts partenaires sont à jour (dans database.js)

**Prêt à exporter !** 🎉

---

Bon voyage avec **ItinérairePro** ! 🗺️✈️
