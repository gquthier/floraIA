# 🧪 Scénarios de Test - ItinérairePro avec RAG

## 📋 Test Complet du Système

### **Scénario 1 : Création d'un Itinéraire Plongée à Bali (5 jours)**

#### Étape 1 : Informations Client ✅
**Actions :**
1. Ouvrir http://localhost:8000
2. Remplir le formulaire :
   - **Nom** : "Thomas & Marie Dubois"
   - **Email** : "thomas.dubois@email.com"
   - **Nombre de personnes** : 2
   - **Budget** : 1500
   - **Date début** : Aujourd'hui
   - **Date fin** : Dans 5 jours
   - **Notes** : "Passionnés de plongée, niveau Advanced"
3. Vérifier que la durée affiche "5 jours"
4. Cliquer "Suivant"

**Résultat attendu :** ✅ Passage à l'étape 2 avec 5 jours générés

---

#### Étape 2 : Planification avec RAG 🔍

**Jour 1 - Nusa Penida**
1. Cliquer "Ajouter une activité" pour Jour 1
2. **Test du filtre localisation** :
   - Sélectionner "Nusa Penida" dans le dropdown
   - Vérifier que seules les activités Nusa Penida apparaissent
3. **Test de la recherche** :
   - Taper "manta" dans la barre de recherche
   - Vérifier que les activités avec manta rays remontent en premier
4. Sélectionner : "Diving Manta Rays - Certified Diver"
5. Vérifier la notification "✅ Activité ajoutée"

**Résultat attendu :**
- Filtres fonctionnels
- Recherche réactive
- Activité ajoutée avec toutes les infos (prix EUR, localisation, durée)

---

**Jour 2 - Amed**
1. Cliquer "Ajouter une activité" pour Jour 2
2. Sélectionner localisation "Amed"
3. Chercher "wreck"
4. Ajouter "Diving Liberty Wreck - Certified Diver"

---

**Jour 3 - Culture à Ubud**
1. Cliquer "Ajouter une activité" pour Jour 3
2. **Test du filtre catégorie** :
   - Sélectionner "Culture & Spiritualité"
3. Chercher "melukat"
4. Ajouter "Balinese Purification Melukat"

---

**Jour 4 - Trekking**
1. Jour 4 : Chercher "batur sunrise"
2. Ajouter "Batur Sunrise by Jeep"

---

**Jour 5 - Détente**
1. Jour 5 : Sélectionner catégorie "Détente"
2. Ajouter "Free Day in Canggu"

**Résultat attendu :** 5 jours avec activités variées

---

#### Étape 3 : Transferts 🚗
1. Cliquer "Suivant"
2. Vérifier que les transferts sont générés automatiquement
3. Vérifier les trajets :
   - Jour 1 : Aéroport → Nusa Penida
   - Jour 2 : Hôtel → Amed
   - etc.

**Résultat attendu :** Transferts auto-générés cohérents

---

#### Étape 4 : Photos & Aperçu 📸
1. Tester le **drag & drop** :
   - Glisser 3-4 photos de plongée
   - Vérifier l'aperçu en miniature
2. Vérifier l'**aperçu de l'itinéraire** :
   - Client : Thomas & Marie Dubois
   - 5 jours affichés
   - Toutes les activités présentes
   - Prix calculés correctement

**Résultat attendu :** Aperçu complet et professionnel

---

#### Étape 5 : Exports 📤
1. Tester chaque export :
   - **PDF Itinéraire Client** → Nouvelle fenêtre s'ouvre
   - **Document Word** → Téléchargement .doc
   - **Récapitulatif Chauffeurs** → PDF avec contacts et Google Maps
   - **Quotation Excel** → Téléchargement CSV

**Résultat attendu :** 4 documents générés correctement

---

## 🔍 Tests RAG Spécifiques

### Test 1 : Recherche Intelligente

**Test de pertinence :**
- Rechercher "diving" → Doit afficher toutes les plongées en premier
- Rechercher "snorkel manta" → Doit scorer plus haut les activités avec manta
- Rechercher "temple" → Doit afficher les activités culturelles

**Scoring attendu :**
```
"Diving Manta Rays" = Score élevé (nom + description)
"Nusa Penida Snorkeling with Manta" = Score élevé
"Batur Sunrise" = Score faible (pas de match)
```

---

### Test 2 : Filtres Combinés

**Scénario :** Trouver une activité de plongée à Candidasa

1. Localisation = "Candidasa"
2. Catégorie = "Plongée & Snorkeling"
3. Recherche = "conservation"

**Résultat attendu :**
- "Coral Reef Conservation Diving" en tête
- Autres activités Candidasa plongée ensuite
- Activités hors critères masquées

---

### Test 3 : Compteur de Résultats

**Actions :**
1. Ouvrir modal → Afficher "XX activités trouvées"
2. Filtrer par "Ubud" → Le compteur s'actualise
3. Chercher "bike" → Le compteur diminue
4. Effacer la recherche → Le compteur revient au total Ubud

---

### Test 4 : Gestion du "Pas de résultat"

**Actions :**
1. Chercher "zzzzz" (mot inexistant)
2. Vérifier l'affichage :
   - Icône loupe grise
   - Message "Aucune activité trouvée"
   - Compteur vide

---

### Test 5 : Catégorisation Automatique

**Vérifier que ces activités sont bien catégorisées :**

| Activité | Catégorie Attendue |
|----------|-------------------|
| Diving Liberty Wreck | Plongée & Snorkeling |
| Surf in Canggu | Surf |
| Balinese Purification Melukat | Culture & Spiritualité |
| Batur Sunrise by Jeep | Aventure |
| E-Bike Trip in Jatiluwih | Vélo |
| Rafting on Ayung River | Sports aquatiques |
| Free Day in Amed | Détente |

---

### Test 6 : Conversion Prix IDR → EUR

**Vérifier quelques conversions :**

| Prix IDR (CSV) | Prix EUR attendu (÷17000) |
|---------------|--------------------------|
| Rp 1,500,000 | ~88€ |
| Rp 600,000 | ~35€ |
| Rp 2,100,000 | ~124€ |

---

## 🐛 Tests de Robustesse

### Test Error Handling

1. **CSV manquant** :
   - Renommer temporairement le CSV
   - Recharger la page
   - Vérifier l'alerte d'erreur
   - Vérifier le fallback sur database.js

2. **Ligne CSV malformée** :
   - Le parser doit ignorer les lignes vides
   - Les activités valides doivent être chargées

3. **Recherche avec caractères spéciaux** :
   - Chercher "é@#$%"
   - Ne doit pas crasher
   - Doit retourner 0 résultats proprement

---

## 📊 Tests de Performance

### Chargement Initial
- **Temps de parsing CSV** : < 200ms
- **Affichage initial** : < 500ms
- **Console doit afficher** :
  ```
  ✅ 62 activités chargées depuis CSV
  📍 Localisations: Amed, Canggu, Candidasa, ...
  📊 Statistiques: {...}
  ```

### Recherche
- **Temps de réponse** : < 50ms
- **Mise à jour UI** : Instantanée
- **Pas de lag** pendant la frappe

### Filtrage
- **Changement de filtre** : < 20ms
- **Animation fluide** : 60fps

---

## ✅ Checklist de Validation

### Interface
- [ ] Navigation entre les 5 étapes fonctionne
- [ ] Validation des champs obligatoires
- [ ] Calcul automatique de la durée
- [ ] Indicateurs de progression à jour

### RAG
- [ ] CSV chargé (vérifier console)
- [ ] 62 activités disponibles
- [ ] Recherche temps réel
- [ ] Filtres par localisation
- [ ] Filtres par catégorie
- [ ] Compteur de résultats
- [ ] Catégories colorées
- [ ] Prix en EUR affichés

### Activités
- [ ] Modal s'ouvre correctement
- [ ] Activités affichent toutes les infos
- [ ] Hover sur carte fonctionne
- [ ] Clic ajoute au bon jour
- [ ] Notification de succès
- [ ] Suppression d'activité fonctionne

### Transferts
- [ ] Auto-générés depuis activités
- [ ] Modifiables
- [ ] Ajout/suppression manuel possible

### Photos
- [ ] Drag & drop fonctionne
- [ ] Upload par clic fonctionne
- [ ] Prévisualisation correcte
- [ ] Suppression de photo fonctionne

### Exports
- [ ] PDF Client s'ouvre
- [ ] Word se télécharge
- [ ] Récap Chauffeurs correct
- [ ] Quotation CSV téléchargeable

### Responsive
- [ ] Fonctionne sur mobile
- [ ] Fonctionne sur tablette
- [ ] Fonctionne sur desktop

---

## 🎯 KPIs de Succès

**Temps de création d'un itinéraire 5 jours :**
- **Cible** : < 15 minutes
- **Avec RAG** : ~10 minutes (gain de 33%)

**Satisfaction utilisateur :**
- Recherche intuitive : ⭐⭐⭐⭐⭐
- Filtres utiles : ⭐⭐⭐⭐⭐
- Gain de temps : ⭐⭐⭐⭐⭐

---

## 🚀 Test en Conditions Réelles

**Créer 3 itinéraires types :**

1. **Lune de miel romantique (7 jours)**
   - Culture à Ubud
   - Plages d'Uluwatu
   - Détente à Canggu

2. **Famille aventure (10 jours)**
   - Trekking Mont Batur
   - Snorkeling Nusa Penida
   - Vélo dans les rizières

3. **Couple plongeurs (5 jours)**
   - Amed Liberty Wreck
   - Nusa Penida Manta Rays
   - Candidasa Conservation

**Mesurer :**
- Temps de création
- Facilité d'utilisation
- Qualité des documents générés

---

**Tous les tests passent ? L'application est prête pour production ! 🎉**
