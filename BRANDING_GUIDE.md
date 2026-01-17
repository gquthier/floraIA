# 🌿 Bali with Floor - Guide de Branding

## 🎨 Identité Visuelle

### **Nom de la Marque**
**Bali with Floor**  
*Your Personalized Bali Journey*

### **Concept**
Une agence d'itinéraires personnalisés pour Bali qui évoque :
- 🌿 La nature luxuriante de Bali
- 🌾 Les rizières en terrasses
- 🏝️ L'authenticité tropicale
- ✨ Un service personnalisé et chaleureux

---

## 🎨 Palette de Couleurs

### **Couleurs Principales**

**Forest Green (Vert Forêt)**
- Hex: `#2d5016`
- RGB: `45, 80, 22`
- Usage: Boutons principaux, titres, accents
- Signification: Nature, croissance, authenticité

**Light Beige (Beige Clair)**
- Hex: `#e8dfc8`
- RGB: `232, 223, 200`
- Usage: Arrière-plans, cartes, sections
- Signification: Sable, chaleur, accueil

### **Couleurs Secondaires**

**Sage Green (Vert Sauge)**
- Hex: `#9ca986`
- RGB: `156, 169, 134`
- Usage: Accents doux, bordures

**Warm Brown (Brun Chaud)**
- Hex: `#8b7355`
- RGB: `139, 115, 85`
- Usage: Textes secondaires, détails

**Sandy Beige (Beige Sable)**
- Hex: `#d4a574`
- RGB: `212, 165, 116`
- Usage: Warnings, highlights

### **Couleurs Fonctionnelles**

**Success Green**
- Hex: `#4a7c2c`
- Usage: Confirmations, statuts positifs

**Terracotta Red**
- Hex: `#c1502e`
- Usage: Alertes, suppressions

---

## 🎭 Éléments Visuels

### **Logo**
- 🍃 Icône : Feuille (`fa-leaf`)
- Animation : Flottement doux (3s)
- Background : Dégradé beige → vert
- Bordures arrondies : 12px

### **Typographie**

**Titres & Logo**
- Font: System fonts (-apple-system, Segoe UI, Roboto)
- Weight: 700 (Bold)
- Color: Forest Green

**Texte Principal**
- Color: `#2d3319` (Dark Olive)
- Weight: 400 (Regular)

**Texte Secondaire**
- Color: `#6b6b47` (Muted Olive)
- Weight: 400

**Signatures & Citations**
- Font: Georgia (Serif)
- Style: Italic
- Opacity: 0.7

---

## 🎨 Dégradés

### **Dégradé Principal (Boutons)**
```css
linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)
```

### **Dégradé Doux (Cartes)**
```css
linear-gradient(135deg, #ffffff 0%, rgba(245, 241, 235, 0.5) 100%)
```

### **Dégradé Header**
```css
linear-gradient(180deg, #ffffff 0%, #e8dfc8 100%)
```

### **Dégradé Accent**
```css
linear-gradient(135deg, #e8dfc8 0%, #b8c9a8 100%)
```

---

## ✨ Animations

### **Feuille Flottante (Logo)**
```css
@keyframes leafFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(5deg); }
}
```
Durée: 3s, ease-in-out, infinite

### **Brillance au Survol (Boutons)**
```css
linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)
```
Transition: 0.5s de gauche à droite

### **Élévation au Survol**
```css
transform: translateY(-2px);
box-shadow: 0 8px 16px rgba(45, 80, 22, 0.3);
```

---

## 🎯 Utilisation des Couleurs par Contexte

### **Navigation & Header**
- Background: Dégradé blanc → beige clair
- Border: Forest Green (3px)
- Logo: Dégradé beige → sage green

### **Boutons Principaux**
- Background: Dégradé forest green → light green
- Hover: Dégradé inversé + élévation
- Shadow: rgba(45, 80, 22, 0.3)

### **Cartes & Conteneurs**
- Background: Blanc → beige très clair
- Border: Beige border (#d4cbb8)
- Accent top: Dégradé forest → sage → sandy

### **Étapes de Progression**
- Active: Dégradé green avec shadow
- Completed: Success green
- Pending: Beige border

### **Activités**
- Background: Dégradé blanc → beige léger
- Border-left: Sage green (4px)
- Hover: Forest green + élévation

### **Catégories**
- Background: Dégradé forest → light green
- Shadow: rgba(45, 80, 22, 0.2)
- Text: Blanc

---

## 🌺 Éléments Décoratifs

### **Emojis Thématiques**
- 🌿 Feuille (général)
- 🍃 Petite feuille (accents)
- 🌴 Palmier (destinations)
- 🌺 Fleur (hospitalité)
- 🌾 Riz (culture)
- 🏝️ Île (voyage)

### **Patterns Subtils**
- Circles radiaux avec opacité 3%
- Lignes diagonales répétées (45deg)
- Opacity très faible pour texture

---

## 📐 Espacements & Bordures

### **Border Radius**
- Cards: 16px
- Buttons: 8px
- Logo: 12px
- Small elements: 6px

### **Shadows**
- Light: `0 2px 4px rgba(45, 80, 22, 0.08)`
- Medium: `0 4px 12px rgba(45, 80, 22, 0.12)`
- Large: `0 10px 20px rgba(45, 80, 22, 0.12)`
- Hover: `0 8px 16px rgba(45, 80, 22, 0.3)`

### **Padding**
- Cards: 2rem
- Buttons: 0.75rem 1.5rem
- Logo: 0.5rem 1rem
- Forms: 0.75rem 1rem

---

## 🎨 Application du Branding

### **Page d'Accueil**
- Header avec logo animé
- Background beige subtil avec patterns
- CTA en forest green
- Sections alternées blanc/beige

### **Modal de Recherche**
- Header avec dégradé beige → sage
- Border primary color
- Cartes d'activités avec accent vert

### **Cartes d'Activités**
- Background dégradé subtil
- Border-left coloré par catégorie
- Hover avec élévation verte

### **Exports**
- Cards avec dégradé de fond
- Icons avec gradient
- Bottom accent bar animée

---

## 🌍 Inspirations Visuelles

**Bali**
- Rizières en terrasses (vert luxuriant)
- Temples en pierre (beige/brun)
- Forêts tropicales (vert profond)
- Plages de sable (beige clair)

**Nature**
- Feuillages tropicaux
- Bambou
- Fleurs d'hibiscus
- Bois naturel

**Ambiance**
- Authentique
- Chaleureux
- Naturel
- Premium mais accessible

---

## 📱 Responsive Design

Les couleurs s'adaptent automatiquement :
- Mobile: Espacement réduit, même palette
- Tablet: Layout optimisé, couleurs intactes
- Desktop: Expérience complète avec animations

---

## ✅ Checklist d'Application

- [x] Logo "Bali with Floor" avec feuille
- [x] Palette verte et beige appliquée
- [x] Dégradés sur tous les boutons
- [x] Animation de la feuille (logo)
- [x] Header avec dégradé
- [x] Cartes avec accents verts
- [x] Ombres cohérentes (green tint)
- [x] Borders beige/green
- [x] Hover effects élévation
- [x] Patterns subtils en arrière-plan
- [x] Emojis thématiques (🌿🌴🌺)
- [x] Typographie harmonieuse

---

## 🎨 Exemples de Code

### **Appliquer le branding à un nouveau composant**

```css
.mon-composant {
    background: linear-gradient(135deg, #ffffff 0%, var(--beige-light) 100%);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    box-shadow: var(--shadow);
    padding: 2rem;
}

.mon-composant:hover {
    border-color: var(--primary-color);
    box-shadow: 0 8px 16px rgba(45, 80, 22, 0.15);
    transform: translateY(-2px);
}
```

### **Bouton avec branding**

```css
.btn-branded {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    box-shadow: 0 2px 4px rgba(45, 80, 22, 0.2);
    transition: all 0.3s;
}

.btn-branded:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(45, 80, 22, 0.3);
}
```

---

## 📸 Photographie & Images

**Style recommandé :**
- Photos lumineuses et naturelles
- Dominantes vertes et beiges
- Scènes authentiques de Bali
- Éviter les filtres trop saturés
- Privilégier les ambiances chaleureuses

**Sujets :**
- Rizières en terrasses
- Temples balinais
- Plages et océan
- Cuisine locale
- Activités culturelles
- Paysages naturels

---

## 🎯 Do's & Don'ts

### **✅ À Faire**
- Utiliser les dégradés subtils
- Maintenir les ombres vertes
- Garder l'animation de la feuille
- Utiliser les emojis thématiques
- Respecter les espacements
- Utiliser les border-radius arrondis

### **❌ À Éviter**
- Couleurs criardes ou néon
- Bleus vifs (réservés à l'eau)
- Rouges agressifs
- Noir pur (utiliser dark olive)
- Ombres grises plates
- Angles droits stricts

---

## 🚀 Extensions Futures

**Idées pour étendre le branding :**
- Favicon avec feuille stylisée
- Illustrations custom de Bali
- Motifs balinais traditionnels
- Palette étendue pour sous-marques
- Animation de chargement avec feuille
- Son de notification (nature)

---

**Bali with Floor - Where Nature Meets Travel** 🌿✨

*Créé le 17 janvier 2026*  
*Inspiré par la beauté naturelle de Bali*
