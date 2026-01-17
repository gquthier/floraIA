# ItinérairePro - Générateur d'itinéraires automatique

## 🎯 Description

Application SaaS pour automatiser la création d'itinéraires de voyage personnalisés. Gagnez du temps en générant automatiquement des itinéraires professionnels avec activités, transferts, photos et documents d'export.

## ✨ Fonctionnalités

### ✅ Implémenté

1. **Saisie des informations client**
   - Nom, email, nombre de personnes
   - Dates de séjour avec calcul automatique de durée
   - Budget et notes/préférences

2. **Planification jour par jour**
   - Ajout d'activités depuis une base de données
   - Sélection visuelle d'activités avec prix et détails
   - Suppression/modification facile

3. **Gestion des transferts**
   - Génération automatique des transferts suggérés
   - Personnalisation des véhicules
   - Vue d'ensemble des déplacements

4. **Personnalisation avec photos**
   - Drag & drop de photos
   - Prévisualisation en temps réel
   - Gestion des images (ajout/suppression)

5. **Aperçu et résumé**
   - Prévisualisation de l'itinéraire complet
   - Calcul automatique du prix total
   - Résumé des activités et transferts

6. **Export multiple**
   - PDF itinéraire client
   - Document Word éditable
   - Récapitulatif chauffeurs (contacts + Google Maps)
   - Quotation Excel

### 🔄 Navigation progressive

Interface en 5 étapes avec:
- Indicateurs de progression visuels
- Validation à chaque étape
- Sauvegarde automatique des données
- Navigation avant/arrière

## 🚀 Démarrage rapide

### Option 1: Ouverture locale simple

```bash
# Ouvrez simplement index.html dans votre navigateur
open index.html
```

### Option 2: Serveur local

```bash
# Python 3
python3 -m http.server 8000

# Puis ouvrez: http://localhost:8000
```

### Option 3: Live Server (VS Code)

1. Installez l'extension "Live Server"
2. Clic droit sur `index.html` → "Open with Live Server"

## 📁 Structure du projet

```
.
├── index.html          # Interface principale
├── styles.css          # Styles et design
├── app.js             # Logique application
├── database.js        # Base de données (activités, partenaires)
├── automjson.json     # Configuration (optionnel)
└── README.md          # Documentation
```

## 🎨 Personnalisation

### Ajouter des activités

Éditez `database.js` et ajoutez dans `activitiesDatabase`:

```javascript
{
    id: 9,
    name: "Nouvelle Activité",
    description: "Description détaillée",
    duration: "2h",
    location: "Lieu",
    price: 50,
    category: "Catégorie",
    capacity: "2-10 personnes"
}
```

### Ajouter des partenaires

Éditez `database.js` et ajoutez dans `partnersDatabase`:

```javascript
{
    id: 5,
    name: "Nom du partenaire",
    type: "hotel|transport|guide|restaurant",
    contact: {
        phone: "+33...",
        email: "...",
        address: "..."
    },
    googleMaps: "https://goo.gl/maps/..."
}
```

### Modifier les couleurs

Dans `styles.css`, changez les variables CSS:

```css
:root {
    --primary-color: #2563eb;  /* Votre couleur principale */
    --primary-dark: #1e40af;
    /* ... */
}
```

## 🔧 Prochaines étapes (Backend)

Pour une version production complète, il faudra:

1. **Backend API** (Node.js/Python/PHP)
   - Gestion base de données (PostgreSQL/MongoDB)
   - Authentification utilisateurs
   - Stockage des itinéraires

2. **Génération de documents**
   - PDF: utiliser jsPDF ou PDFKit
   - Word: utiliser docxtemplater ou python-docx
   - Excel: utiliser ExcelJS ou openpyxl

3. **Stockage des images**
   - AWS S3 / Cloudinary
   - Compression et optimisation

4. **Fonctionnalités avancées**
   - Templates personnalisables
   - Envoi email automatique
   - Intégration Google Maps API
   - Système de facturation

## 💡 Utilisation

1. **Étape 1**: Renseignez les informations du client et les dates
2. **Étape 2**: Ajoutez les activités jour par jour
3. **Étape 3**: Vérifiez/ajustez les transferts
4. **Étape 4**: Ajoutez des photos par drag & drop
5. **Étape 5**: Exportez les documents (PDF, Word, Excel)

## 📱 Responsive

L'interface s'adapte automatiquement aux écrans:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🎯 Points clés

- ✅ Interface moderne et intuitive
- ✅ Workflow en 5 étapes claires
- ✅ Base de données extensible
- ✅ Drag & drop pour les photos
- ✅ Calculs automatiques (prix, durée)
- ✅ Exports multiples
- ⏳ Backend à implémenter pour génération réelle des documents

## 📝 Notes

- Les exports sont actuellement des simulations (alerts)
- Pour une vraie génération PDF/Word, il faut un backend
- Les données sont stockées en mémoire (perdues au refresh)
- Pour persistance: ajouter localStorage ou base de données

## 🤝 Contribution

N'hésitez pas à personnaliser selon vos besoins spécifiques !
