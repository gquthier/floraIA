# 🔒 Guide de Sécurité - Clés API

## ⚠️ URGENT : Votre clé API est compromise !

Vous avez partagé votre clé OpenAI publiquement. **Cette clé doit être révoquée immédiatement.**

---

## 🚨 Actions Immédiates

### 1. **Révoquer la clé compromise** (À FAIRE MAINTENANT)

1. Allez sur https://platform.openai.com/api-keys
2. Connectez-vous à votre compte
3. Trouvez la clé commençant par `sk-proj-XHWk8rnzwCm8F66DLhgS...`
4. Cliquez sur "Delete" ou l'icône poubelle
5. Confirmez la suppression

### 2. **Créer une nouvelle clé**

1. Sur la même page, cliquez "Create new secret key"
2. Donnez-lui un nom (ex: "ItinérairePro - Production")
3. **Copiez-la immédiatement** (elle ne sera plus visible après)
4. **NE LA PARTAGEZ NULLE PART**

### 3. **Configurer la nouvelle clé sécuritairement**

Dans l'application :
1. Ouvrez http://localhost:8000
2. Cliquez sur "Paramètres" dans le header (à ajouter)
3. Collez votre nouvelle clé dans le champ prévu
4. Cliquez "Sauvegarder"

✅ La clé sera stockée **localement dans votre navigateur** uniquement

---

## 🔐 Pourquoi c'est dangereux ?

Quand une clé API est publique, n'importe qui peut :

❌ **Utiliser votre compte OpenAI**  
❌ **Générer des coûts sur votre facture**  
❌ **Dépasser vos limites d'utilisation**  
❌ **Accéder à vos conversations (dans certains cas)**  
❌ **Faire des actions malveillantes en votre nom**  

**Coût potentiel :** Quelqu'un pourrait dépenser des centaines/milliers d'euros avec votre clé.

---

## ✅ Bonnes Pratiques de Sécurité

### **Ce qu'il FAUT faire :**

✅ Stocker les clés dans des variables d'environnement (`.env`)  
✅ Ajouter `.env` au `.gitignore`  
✅ Utiliser `localStorage` pour le frontend (acceptable pour usage personnel)  
✅ Limiter les permissions de la clé (lecture seule si possible)  
✅ Surveiller l'utilisation sur OpenAI Dashboard  
✅ Régénérer les clés régulièrement  
✅ Utiliser des clés différentes pour dev/prod  

### **Ce qu'il NE FAUT JAMAIS faire :**

❌ **Partager une clé dans un chat/email**  
❌ **Commiter une clé dans Git/GitHub**  
❌ **Mettre une clé en dur dans le code source**  
❌ **Poster une clé sur un forum/Stack Overflow**  
❌ **Partager une clé dans une capture d'écran**  
❌ **Envoyer une clé via Slack/Discord/Teams**  

---

## 🛡️ Architecture Sécurisée Implémentée

### **Frontend (Ce que j'ai créé) :**

```
┌─────────────────────┐
│   localStorage      │  ← Clé stockée localement
│   (navigateur)      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   config.js         │  ← Gestion sécurisée
│   ai-assistant.js   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   OpenAI API        │  ← Appels directs
│   (HTTPS)           │
└─────────────────────┘
```

**Sécurité :**
- ✅ Clé jamais dans le code source
- ✅ Stockage local uniquement
- ✅ HTTPS pour les appels API
- ⚠️ Clé visible dans le navigateur (acceptable pour usage personnel)

### **Backend (Production - Recommandé) :**

```
┌─────────────────────┐
│   Frontend          │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   Votre Backend     │  ← Clé stockée ici
│   (Node/Python)     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   OpenAI API        │
└─────────────────────┘
```

**Sécurité maximale :**
- ✅ Clé sur le serveur uniquement
- ✅ Frontend n'a jamais accès direct
- ✅ Rate limiting possible
- ✅ Monitoring centralisé

---

## 📁 Fichiers Créés pour la Sécurité

### **1. `.env.example`**
Template pour les variables d'environnement (à copier en `.env`)

### **2. `.gitignore`**
Empêche de commiter les secrets dans Git

### **3. `config.js`**
Gestion centralisée des configurations

### **4. `ai-assistant.js`**
Intégration OpenAI sécurisée

### **5. `settings-modal.html`**
Interface pour configurer la clé API

---

## 🔧 Configuration Étape par Étape

### **Option 1 : localStorage (Usage personnel)**

**Avantages :**
- ✅ Simple à mettre en place
- ✅ Pas de backend nécessaire
- ✅ Fonctionne immédiatement

**Inconvénients :**
- ⚠️ Clé visible dans le navigateur
- ⚠️ Pas de rate limiting
- ⚠️ Usage personnel uniquement

**Setup :**
1. Ouvrez l'application
2. Allez dans Paramètres
3. Collez votre clé
4. Sauvegardez

### **Option 2 : Backend Node.js (Production)**

**Avantages :**
- ✅ Sécurité maximale
- ✅ Rate limiting
- ✅ Multi-utilisateurs
- ✅ Monitoring

**Setup :**

```bash
# Créer le backend
npm init -y
npm install express openai dotenv cors

# Créer .env
echo "OPENAI_API_KEY=votre_vraie_cle" > .env

# Créer server.js (voir ci-dessous)
node server.js
```

**server.js :**
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/ai/enhance', async (req, res) => {
    try {
        const { activity } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Expert en descriptions touristiques Bali' },
                { role: 'user', content: `Améliore: ${activity.description}` }
            ]
        });
        
        res.json({ enhanced: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Backend sécurisé sur port 3000'));
```

---

## 📊 Monitoring de l'Utilisation

### **Vérifier l'usage OpenAI :**

1. Allez sur https://platform.openai.com/usage
2. Consultez vos dépenses quotidiennes
3. Configurez des alertes de budget
4. Surveillez les pics anormaux

### **Limites recommandées :**

Pour éviter les surprises :
- Soft limit : 50$/mois
- Hard limit : 100$/mois
- Alertes email à 25$ et 75$

---

## 🚀 Fonctionnalités AI Implémentées

Une fois la clé configurée, vous aurez accès à :

### **1. Amélioration des Descriptions**
```javascript
aiAssistant.enhanceActivityDescription(activity)
```
Rend les descriptions plus engageantes et professionnelles.

### **2. Suggestions d'Activités**
```javascript
aiAssistant.suggestComplementaryActivities(selected, all)
```
Suggère des activités qui complètent bien l'itinéraire.

### **3. Résumé Personnalisé**
```javascript
aiAssistant.generateItinerarySummary(client, activities)
```
Génère un résumé engageant de l'itinéraire complet.

### **4. Recherche Sémantique (Avancé)**
```javascript
aiAssistant.semanticSearch(query, activities)
```
Recherche basée sur le sens plutôt que les mots-clés.

---

## 🔍 Détection de Fuites

### **Scanner votre projet :**

```bash
# Chercher des clés API dans le code
grep -r "sk-" . --exclude-dir=node_modules

# Vérifier le .gitignore
cat .gitignore | grep .env

# Historique Git (si déjà commité)
git log -p | grep "sk-"
```

### **Si vous avez commité une clé par erreur :**

1. **Révoquez la clé immédiatement**
2. **Supprimez-la de l'historique Git :**
```bash
# Attention : cela réécrit l'historique
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

3. **Force push (si repository distant) :**
```bash
git push origin --force --all
```

---

## ✅ Checklist de Sécurité

Avant de déployer :

- [ ] Clé API révoquée si exposée
- [ ] Nouvelle clé créée
- [ ] `.env` dans `.gitignore`
- [ ] Clé jamais en dur dans le code
- [ ] HTTPS activé en production
- [ ] Rate limiting configuré (si backend)
- [ ] Monitoring actif
- [ ] Alertes de budget configurées
- [ ] Permissions de clé minimales
- [ ] Documentation à jour

---

## 🆘 En Cas de Problème

### **Clé compromise détectée :**
1. Révoquez immédiatement
2. Créez une nouvelle clé
3. Changez tous les mots de passe associés
4. Surveillez les usages suspects

### **Coûts inattendus :**
1. Vérifiez l'historique d'utilisation
2. Identifiez les pics
3. Limitez les permissions
4. Ajoutez des rate limits

### **Clé ne fonctionne pas :**
1. Vérifiez le format (commence par `sk-`)
2. Vérifiez les permissions
3. Vérifiez le quota restant
4. Testez sur https://platform.openai.com/playground

---

## 📞 Support

- **OpenAI Support :** https://help.openai.com
- **Security Issues :** security@openai.com
- **Billing :** https://platform.openai.com/account/billing

---

## 🎓 Ressources Additionnelles

- [OpenAI Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [API Security Guide](https://owasp.org/www-project-api-security/)
- [Environment Variables Guide](https://12factor.net/config)

---

**⚠️ N'oubliez pas : RÉVOQUE LA CLÉ MAINTENANT !**

La sécurité commence par vous. Ne partagez JAMAIS vos clés API.

---

*Guide créé pour ItinérairePro - Système de gestion d'itinéraires Bali*
