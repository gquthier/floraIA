# 🤖 Fonctionnalités Intelligence Artificielle

## 📋 Vue d'ensemble

L'intégration OpenAI ajoute des capacités d'IA à ItinérairePro pour améliorer l'expérience utilisateur et la qualité des itinéraires.

---

## ⚙️ Configuration

### **1. Obtenir une clé API OpenAI**

1. Allez sur https://platform.openai.com/signup
2. Créez un compte (gratuit)
3. Ajoutez un moyen de paiement
4. Allez dans "API Keys" : https://platform.openai.com/api-keys
5. Cliquez "Create new secret key"
6. **Copiez immédiatement la clé** (elle ne sera plus visible)

### **2. Configurer dans l'application**

**Via l'interface :**
1. Ouvrez http://localhost:8000
2. Cliquez sur "Paramètres" dans le header
3. Collez votre clé dans le champ prévu
4. Cliquez "Sauvegarder"

**Via le code (développement) :**
```javascript
// Dans la console du navigateur
setOpenAIKey('sk-proj-VOTRE_CLE_ICI');
```

**Vérifier l'activation :**
```javascript
// Dans la console
console.log(aiAssistant.isAvailable); // Doit être true
```

---

## ✨ Fonctionnalités Disponibles

### **1. Amélioration des Descriptions** 📝

**Quand l'utiliser :**
- Les descriptions CSV sont trop courtes ou techniques
- Vous voulez rendre les activités plus engageantes
- Besoin de descriptions dans un style spécifique

**Comment ça marche :**
```javascript
const activity = {
    name: "Diving Liberty Wreck",
    location: "Amed",
    description: "Dive to a wreck covered in coral..."
};

const enhanced = await aiAssistant.enhanceActivityDescription(activity);
// Retourne une description améliorée, plus engageante
```

**Exemple de transformation :**

**Avant :**
> "Dive to a wreck covered in coral and fish."

**Après :**
> "Plongez dans l'histoire en explorant l'épave du Liberty, un cargo américain de la Seconde Guerre mondiale devenu un récif artificiel vibrant. Couvert de coraux mous multicolores et peuplé de bancs de poissons tropicaux, ce site de plongée mythique d'Amed offre une expérience inoubliable dans des eaux cristallines, accessible dès le niveau Open Water."

**Coût estimé :** ~$0.001 par description

---

### **2. Suggestions d'Activités Complémentaires** 🎯

**Quand l'utiliser :**
- Le client a sélectionné quelques activités
- Vous voulez suggérer un itinéraire équilibré
- Besoin d'idées pour compléter le voyage

**Comment ça marche :**
```javascript
const selected = [
    { name: "Diving Manta Rays", category: "Plongée" },
    { name: "Batur Sunrise", category: "Aventure" }
];

const suggestions = await aiAssistant.suggestComplementaryActivities(
    selected, 
    allActivities
);
// Retourne 3 activités qui complètent bien l'itinéraire
```

**Exemple de suggestions :**

**Activités sélectionnées :**
- Diving Manta Rays (Plongée)
- Batur Sunrise (Aventure)

**Suggestions IA :**
1. Balinese Purification Melukat (Culture - pour l'équilibre spirituel)
2. Free Day in Ubud (Détente - pour récupérer)
3. E-Bike Rice Fields (Nature - expérience douce)

**Logique :** L'IA détecte que l'itinéraire est orienté aventure/sport et suggère culture + détente pour équilibrer.

**Coût estimé :** ~$0.002 par suggestion

---

### **3. Résumé Personnalisé de l'Itinéraire** 📄

**Quand l'utiliser :**
- Avant d'envoyer l'itinéraire au client
- Pour l'intro du document PDF
- Pour les emails de confirmation

**Comment ça marche :**
```javascript
const clientInfo = {
    name: "Thomas & Marie",
    startDate: "2024-06-01",
    endDate: "2024-06-07",
    nbPersons: 2,
    notes: "Passionnés de plongée"
};

const activities = {
    1: [{ name: "Diving Manta Rays" }],
    2: [{ name: "Liberty Wreck" }],
    // ...
};

const summary = await aiAssistant.generateItinerarySummary(clientInfo, activities);
```

**Exemple de résumé généré :**

> "Embarquez pour une aventure sous-marine exceptionnelle à Bali du 1er au 7 juin. Votre séjour de 7 jours vous mènera des majestueux raies manta de Nusa Penida à l'épave mythique du Liberty à Amed, en passant par des moments de découverte culturelle à Ubud. Un itinéraire parfaitement équilibré entre plongées mémorables, exploration terrestre et immersion dans la spiritualité balinaise."

**Coût estimé :** ~$0.003 par résumé

---

### **4. Recherche Sémantique** 🔍 (Avancé)

**Quand l'utiliser :**
- Recherche par intention plutôt que par mots-clés
- Queries complexes ou floues
- Meilleure compréhension du contexte

**Comment ça marche :**
```javascript
// Au lieu de chercher "diving"
const results = await aiAssistant.semanticSearch(
    "underwater experience with big marine animals",
    activities
);
// Retourne: Diving Manta Rays, Dolphin Snorkeling, etc.
```

**Exemples de recherches :**

| Query Utilisateur | Résultats Sémantiques |
|-------------------|----------------------|
| "spiritual healing experience" | Melukat, Healer, Temple |
| "adrenaline rush adventure" | ATV, Paragliding, Rafting |
| "romantic sunset activity" | Sunset Cruise, Beach Club |
| "family friendly nature" | E-Bike, Waterfall easy, Bird Park |

**Note :** Nécessite de créer et stocker les embeddings des activités (implémentation complète à venir).

**Coût estimé :** ~$0.0001 par recherche

---

## 💰 Coûts et Budget

### **Modèle Utilisé**
- **gpt-4o-mini** : Excellent rapport qualité/prix
- **Coût :** ~$0.15 / 1M tokens input, ~$0.60 / 1M tokens output

### **Estimation par Itinéraire**

| Action | Tokens | Coût |
|--------|--------|------|
| Améliorer 5 descriptions | ~2,000 | $0.005 |
| 1 suggestion d'activités | ~1,500 | $0.003 |
| 1 résumé d'itinéraire | ~1,000 | $0.002 |
| **Total par itinéraire** | ~4,500 | **$0.01** |

### **Budget Mensuel Estimé**

| Usage | Itinéraires/mois | Coût |
|-------|------------------|------|
| Léger | 10 | $0.10 |
| Moyen | 50 | $0.50 |
| Intensif | 200 | $2.00 |
| Agence | 1000 | $10.00 |

**Conclusion :** Très abordable même pour une utilisation intensive.

---

## 🎨 Intégration dans l'Interface

### **Boutons "Améliorer avec IA"**

Dans le modal d'activité, ajouter :

```html
<button onclick="enhanceWithAI(activity)" class="btn-ai">
    <i class="fas fa-magic"></i> Améliorer la description
</button>
```

### **Suggestions Automatiques**

Après avoir ajouté 2-3 activités :

```javascript
// Déclencher automatiquement
if (Object.keys(appState.activities).length >= 2) {
    showAISuggestions();
}
```

### **Résumé dans le PDF**

Ajouter en introduction du document client :

```javascript
const summary = await aiAssistant.generateItinerarySummary(...);
// Insérer en haut du PDF
```

---

## 🔧 Personnalisation

### **Modifier le Style de Description**

Dans `ai-assistant.js`, ligne ~30 :

```javascript
const prompt = `Améliore cette description en style [VOTRE_STYLE]:
- Romantique et poétique
- Professionnel et factuel
- Aventureux et énergique
- Zen et spirituel

Activité : ${activity.name}
...`;
```

### **Ajuster la Longueur**

```javascript
const prompt = `... (maximum 100 mots)`;  // ou 50, 200, etc.
```

### **Changer la Langue**

```javascript
const prompt = `Améliore en [anglais/espagnol/allemand]...`;
```

---

## 🐛 Dépannage

### **"OpenAI API non configurée"**

**Cause :** Aucune clé API sauvegardée

**Solution :**
1. Allez dans Paramètres
2. Collez votre clé
3. Sauvegardez
4. Rechargez la page

### **"Error 401: Unauthorized"**

**Cause :** Clé API invalide ou révoquée

**Solution :**
1. Vérifiez sur https://platform.openai.com/api-keys
2. Régénérez une nouvelle clé
3. Mettez à jour dans l'application

### **"Error 429: Rate Limit"**

**Cause :** Trop de requêtes trop rapidement

**Solution :**
- Attendez quelques secondes
- Réduisez la fréquence des appels
- Passez à un tier payant supérieur

### **"Error 500: Server Error"**

**Cause :** Problème côté OpenAI (rare)

**Solution :**
- Vérifiez https://status.openai.com
- Réessayez dans quelques minutes

---

## 📊 Monitoring

### **Suivre l'Usage**

Dans la console :

```javascript
// Statistiques d'utilisation
console.log('Appels IA ce mois:', aiCallsCount);
console.log('Tokens utilisés:', totalTokens);
console.log('Coût estimé:', totalCost);
```

### **Dashboard OpenAI**

https://platform.openai.com/usage
- Usage quotidien/mensuel
- Coûts par endpoint
- Graphiques de tendance

---

## 🚀 Roadmap Fonctionnalités IA

### **Phase 1 : Actuel** ✅
- Amélioration descriptions
- Suggestions d'activités
- Résumés d'itinéraires

### **Phase 2 : Court Terme** 🔜
- Recherche sémantique complète
- Traduction multi-langues
- Génération d'images (DALL-E)

### **Phase 3 : Moyen Terme**
- Chatbot assistant
- Recommandations basées sur historique
- Optimisation automatique d'itinéraire
- Détection de préférences client

### **Phase 4 : Long Terme**
- Voice assistant (Whisper)
- Analyse de sentiment clients
- Prédiction de satisfaction
- A/B testing automatique descriptions

---

## 🎯 Bonnes Pratiques

### **1. Cache les Résultats**

```javascript
const cache = {};

async function enhanceWithCache(activity) {
    const key = activity.id;
    if (cache[key]) return cache[key];
    
    const enhanced = await aiAssistant.enhance(activity);
    cache[key] = enhanced;
    return enhanced;
}
```

### **2. Batch les Requêtes**

Au lieu de 5 appels séparés, faire 1 appel groupé :

```javascript
const prompt = `Améliore ces 5 descriptions:\n
1. ${activity1.description}\n
2. ${activity2.description}\n
...`;
```

### **3. Fallback Gracieux**

```javascript
try {
    const enhanced = await aiAssistant.enhance(activity);
    return enhanced;
} catch (error) {
    console.warn('IA non disponible, utilisation description originale');
    return activity.description;
}
```

### **4. Loading States**

```javascript
button.textContent = '⏳ Amélioration en cours...';
button.disabled = true;

const result = await aiAssistant.enhance(activity);

button.textContent = '✨ Améliorer avec IA';
button.disabled = false;
```

---

## ✅ Checklist d'Activation

- [ ] Clé API OpenAI créée
- [ ] Clé configurée dans l'app
- [ ] Test d'amélioration de description
- [ ] Test de suggestions
- [ ] Test de résumé
- [ ] Budget monitoring configuré
- [ ] Alertes de coût activées
- [ ] Cache implémenté (optionnel)
- [ ] Fallbacks en place

---

**Prêt à utiliser l'IA ! 🎉**

L'intelligence artificielle est maintenant intégrée à votre système d'itinéraires.
