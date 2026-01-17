# 📤 Instructions de Déploiement sur GitHub

## 🚀 Méthode 1 : Push Manuel (Recommandé)

### **Étape 1 : Vérifier que le repository existe**

1. Allez sur https://github.com/gquthier/floraIA
2. Si le repository n'existe pas, créez-le :
   - Cliquez sur le "+" en haut à droite → "New repository"
   - Nom : `floraIA`
   - Description : "ItinérairoPro - Système d'automatisation d'itinéraires Bali avec RAG et IA"
   - Visibilité : Privé (recommandé pour protéger vos données)
   - Ne pas initialiser avec README (on a déjà un commit local)

### **Étape 2 : Configurer l'authentification**

#### **Option A : HTTPS avec Token (Plus Simple)**

1. **Créer un Personal Access Token :**
   - Allez sur https://github.com/settings/tokens
   - Cliquez "Generate new token" → "Generate new token (classic)"
   - Nom : "floraIA-deploy"
   - Scopes : Cochez `repo` (accès complet aux repositories)
   - Cliquez "Generate token"
   - **⚠️ COPIEZ LE TOKEN IMMÉDIATEMENT** (il ne sera plus visible)

2. **Pousser vers GitHub :**
```bash
cd /Users/gquthier/Desktop/floraautom
git push -u origin main
```

3. Quand demandé :
   - **Username :** gquthier
   - **Password :** [Collez votre token, PAS votre mot de passe GitHub]

#### **Option B : SSH (Plus Sécurisé à Long Terme)**

1. **Générer une clé SSH :**
```bash
ssh-keygen -t ed25519 -C "votre.email@example.com"
# Appuyez sur Enter pour l'emplacement par défaut
# Appuyez sur Enter pour un passphrase vide (ou entrez un)
```

2. **Copier la clé publique :**
```bash
cat ~/.ssh/id_ed25519.pub
# Copiez tout le contenu
```

3. **Ajouter à GitHub :**
   - Allez sur https://github.com/settings/keys
   - Cliquez "New SSH key"
   - Title : "MacBook floraautom"
   - Key : Collez la clé publique
   - Cliquez "Add SSH key"

4. **Changer l'URL du remote :**
```bash
git remote set-url origin git@github.com:gquthier/floraIA.git
git push -u origin main
```

---

## 📋 État Actuel

### **✅ Ce qui est fait :**
- ✅ Git initialisé
- ✅ 26 fichiers ajoutés
- ✅ Commit créé avec message détaillé
- ✅ Branche renommée en `main`
- ✅ Remote configuré (https://github.com/gquthier/floraIA.git)

### **⏳ Ce qui reste à faire :**
- ⏳ Authentification GitHub
- ⏳ Push vers le repository distant

---

## 🔧 Commandes à Exécuter

### **Vérifier l'état actuel :**
```bash
cd /Users/gquthier/Desktop/floraautom
git status
git log --oneline
git remote -v
```

### **Pousser vers GitHub (avec token HTTPS) :**
```bash
git push -u origin main
# Quand demandé :
# Username: gquthier
# Password: [VOTRE_TOKEN]
```

### **Ou avec SSH (après configuration) :**
```bash
git remote set-url origin git@github.com:gquthier/floraIA.git
git push -u origin main
```

---

## 📦 Contenu du Commit

**26 fichiers seront poussés :**

### **📁 Fichiers Principaux**
- `index.html` - Interface principale
- `styles.css` - Design moderne
- `app.js` - Logique application
- `database.js` - Base de données exemple
- `csv-parser.js` - Système RAG
- `ai-assistant.js` - Intégration OpenAI
- `export-engine.js` - Génération documents
- `config.js` - Configuration sécurisée

### **📊 Données**
- `comma-separated values.csv` - 62 activités Bali

### **🔒 Sécurité**
- `.gitignore` - Protection des secrets
- `.env.example` - Template configuration

### **📚 Documentation** (7 fichiers)
- `README.md` - Vue d'ensemble technique
- `GUIDE_UTILISATION.md` - Guide utilisateur
- `RAG_DOCUMENTATION.md` - Documentation RAG
- `AI_FEATURES.md` - Fonctionnalités IA
- `SECURITY_GUIDE.md` - Guide sécurité
- `TEST_SCENARIO.md` - Scénarios de test
- `TEST_REPORT.md` - Rapport de tests
- `FINAL_SUMMARY.md` - Résumé complet

### **🧪 Tests**
- `run-tests.sh` - Script de tests automatisés
- `test-automation.js` - Tests JavaScript
- `test-console.html` - Tests console
- `manual-test-checklist.html` - Checklist interactive

### **🎨 Autres**
- `demo-screenshot.html` - Page de démo
- `settings-modal.html` - Modal paramètres
- `automjson.json` - Configuration

---

## ⚠️ Points d'Attention

### **Avant de Pousser**

1. **Vérifier qu'aucune clé API n'est présente :**
```bash
grep -r "sk-proj-" . --exclude-dir=.git
grep -r "sk-" . --exclude-dir=.git | grep -i "api"
```

Si vous trouvez des clés, supprimez-les AVANT de push !

2. **Vérifier le .gitignore :**
```bash
cat .gitignore
```

Doit contenir :
```
.env
.env.local
*.key
*.pem
secrets/
```

3. **Taille du repository :**
```bash
du -sh .git
```

Si > 100MB, vérifiez qu'il n'y a pas de fichiers lourds.

---

## 🔍 Dépannage

### **Erreur : "Permission denied (publickey)"**
→ Utilisez HTTPS avec token au lieu de SSH

### **Erreur : "Authentication failed"**
→ Votre token est incorrect. Régénérez-en un nouveau.

### **Erreur : "Repository not found"**
→ Le repository n'existe pas. Créez-le sur GitHub d'abord.

### **Erreur : "Large files detected"**
→ Utilisez Git LFS pour les gros fichiers :
```bash
git lfs install
git lfs track "*.csv"
git add .gitattributes
git commit -m "Add Git LFS"
```

---

## 📝 Après le Push

### **1. Vérifier sur GitHub**
- Allez sur https://github.com/gquthier/floraIA
- Vérifiez que les 26 fichiers sont présents
- Vérifiez que le README.md s'affiche correctement

### **2. Configurer le Repository**

**Ajouter une description :**
- Settings → General → Description
- "Système d'automatisation d'itinéraires Bali avec RAG et IA"

**Ajouter des topics :**
- Settings → General → Topics
- Ajoutez : `bali`, `travel`, `itinerary`, `rag`, `openai`, `automation`

**Protéger la branche main :**
- Settings → Branches → Add rule
- Branch name pattern : `main`
- Cochez "Require pull request reviews before merging"

### **3. Ajouter un .github/README.md personnalisé**

Créez un README plus visuel pour GitHub :
```bash
echo "# 🗺️ ItinérairoPro - Bali

Système intelligent d'automatisation d'itinéraires pour Bali.

## ✨ Fonctionnalités

- 🤖 **RAG System** avec 62 activités
- 🔍 **Recherche intelligente** multi-critères
- 🎨 **Interface moderne** responsive
- 📤 **Exports multiples** (PDF, Word, CSV)
- 🤖 **IA optionnelle** (OpenAI)

## 🚀 Démarrage Rapide

\`\`\`bash
python3 -m http.server 8000
# Ouvrir http://localhost:8000
\`\`\`

## 📚 Documentation

- [Guide Utilisateur](GUIDE_UTILISATION.md)
- [Documentation RAG](RAG_DOCUMENTATION.md)
- [Fonctionnalités IA](AI_FEATURES.md)
- [Guide Sécurité](SECURITY_GUIDE.md)

## 📊 Tests

\`\`\`bash
./run-tests.sh
\`\`\`

---

**⚠️ Repository privé** - Contient des données sensibles" > README.md

git add README.md
git commit -m "Add enhanced README for GitHub"
git push
```

---

## 🎯 Résumé

**Pour pousser maintenant :**

1. Créez le repository sur GitHub : https://github.com/new
2. Créez un token : https://github.com/settings/tokens
3. Exécutez :
```bash
cd /Users/gquthier/Desktop/floraautom
git push -u origin main
# Username: gquthier
# Password: [VOTRE_TOKEN]
```

**C'est tout ! 🎉**

---

## 📞 Besoin d'Aide ?

**Documentation GitHub :**
- Authentification : https://docs.github.com/en/authentication
- Tokens : https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- SSH : https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**Erreurs courantes :**
- https://docs.github.com/en/get-started/using-git/troubleshooting-git-errors

---

*Instructions créées le 17 janvier 2026*
