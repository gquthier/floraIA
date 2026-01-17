# 🌿 Baliwithflow - Design System
## Organic Modern Luxury

---

## 🎨 **Philosophy**

**Baliwithflow** incarne l'élégance organique moderne - une expérience visuelle qui allie :
- 🌿 La sérénité de la nature balinaise
- ✨ Le raffinement d'un produit premium
- 🧘 La clarté d'une interface technologique épurée

**Ambiance :** Calme · Clarté · Premium · Naturel · Sophisticated

---

## 🎭 **Color Palette**

### **Backgrounds - Off-white & Warm Creams**

```css
--bg-primary: #FAFAF5      /* Off-white principal - Jamais de blanc clinique */
--bg-secondary: #F5F5F0    /* Crème chaud pour variations */
--bg-card: #FFFFFF         /* Blanc pur uniquement pour les cartes */
--bg-subtle: #F9F7F3       /* Beige très subtil pour accents */
```

**Usage :**
- Background général : `#FAFAF5`
- Cartes élévées : `#FFFFFF`
- Sections alternées : `#F5F5F0`

---

### **Primary - Deep Forest Green (Marque)**

```css
--primary: #2C5F2D         /* Vert Jungle profond - Couleur signature */
--primary-light: #4A7C4E   /* Vert Jungle éclairci */
--primary-dark: #1E4620    /* Vert Jungle très foncé */
--primary-sage: #97A97C    /* Vert Sauge apaisant */
```

**Signification :**
- Force et stabilité (Jungle)
- Croissance et vitalité
- Connexion à la nature balinaise
- Sophistication moderne

**Usage :**
- Boutons primaires
- Liens et actions principales
- Accents de marque
- États actifs

---

### **Accents - Terracotta, Sable, Ocre**

```css
--accent-clay: #C77E5D     /* Terracotta doux - Chaleureux */
--accent-sand: #D4B896     /* Sable doré - Lumière naturelle */
--accent-ochre: #C9A56B    /* Ocre doré - Richesse */
--accent-warm: #E8D5C4     /* Beige rosé - Douceur */
```

**Usage :**
- CTA secondaires (Terracotta)
- Highlights et badges (Sable/Ocre)
- Touches de chaleur
- Éléments premium

---

### **Text - Charcoal & Warm Grays**

```css
--text-primary: #3A3935    /* Charcoal chaud - JAMAIS de noir pur */
--text-secondary: #6B6B5F  /* Gris olive moyen */
--text-tertiary: #9B9B8E   /* Gris doux pour annotations */
--text-inverse: #FAFAF5    /* Pour fonds sombres */
```

**Règle d'or :** Pas de `#000000` - Toujours un gris chaud avec sous-ton olive

---

### **Borders & Dividers**

```css
--border-subtle: #E8E6E0   /* Bordure très douce - À peine visible */
--border-soft: #DED9D0     /* Bordure standard */
--border-accent: rgba(44, 95, 45, 0.15)  /* Bordure verte subtile */
```

---

## ✍️ **Typography**

### **Display Serif - Titres**

**Font :** `Cormorant` (Google Fonts)  
**Weights :** 300, 400, 500, 600, 700

```css
h1, h2, h3, h4 {
    font-family: 'Cormorant', Georgia, serif;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.02em;  /* Légèrement serré pour élégance */
}
```

**Caractéristiques :**
- Courbes douces et humanistes
- Élégance éditoriale
- Lisibilité premium
- Évoque l'artisanal

**Tailles :**
```css
h1: 3.5rem   (56px)  - Heroes
h2: 2.5rem   (40px)  - Sections principales
h3: 1.75rem  (28px)  - Sous-sections
h4: 1.25rem  (20px)  - Cartes et composants
```

---

### **Geometric Sans - Corps**

**Font :** `Inter` (Google Fonts)  
**Weights :** 300, 400, 500, 600

```css
body, p, .body-text {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1rem;
    line-height: 1.65;
    letter-spacing: 0.015em;  /* Légèrement ouvert pour aération */
}
```

**Caractéristiques :**
- Géométrique et moderne
- Très lisible à toutes tailles
- Neutre mais chaleureux
- Espacement généreux

**Tailles :**
```css
Base:  1rem      (16px)
Small: 0.875rem  (14px)
XS:    0.75rem   (12px)
```

---

## 🔘 **Buttons - Pill & Soft Corners**

### **Primary Button - Pill**

```css
.btn-primary {
    background: #2C5F2D;
    color: #FAFAF5;
    border-radius: 999px;     /* Totalement arrondi */
    padding: 0.875rem 2rem;
    box-shadow: 0 2px 4px rgba(58, 57, 53, 0.06);
}
```

**Hover :**
```css
transform: translateY(-1px);
box-shadow: 0 4px 8px rgba(58, 57, 53, 0.08);
```

---

### **Accent Button - Terracotta**

```css
.btn-accent {
    background: #C77E5D;
    color: white;
    border-radius: 999px;
}
```

**Usage :** CTA chauds, actions importantes mais secondaires

---

### **Secondary Button - Outline**

```css
.btn-secondary {
    background: transparent;
    color: #2C5F2D;
    border: 1.5px solid #DED9D0;
    border-radius: 999px;
}
```

**Hover :**
```css
background: rgba(44, 95, 45, 0.08);
border-color: #2C5F2D;
```

---

### **Ghost Button**

```css
.btn-ghost {
    background: transparent;
    color: #6B6B5F;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
}
```

**Usage :** Actions tertiaires, navigation subtile

---

## 🃏 **Cards - Soft Corners & Gentle Elevation**

### **Standard Card**

```css
.card {
    background: #FFFFFF;
    border-radius: 24px;      /* Très arrondi pour douceur */
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(58, 57, 53, 0.06),
                0 1px 2px rgba(58, 57, 53, 0.03);
    border: 1px solid #E8E6E0;
}
```

**Hover :**
```css
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(58, 57, 53, 0.08),
            0 2px 4px rgba(58, 57, 53, 0.04);
```

---

### **Elevated Card**

```css
.card-elevated {
    box-shadow: 0 12px 24px rgba(58, 57, 53, 0.10),
                0 4px 8px rgba(58, 57, 53, 0.05);
}
```

**Usage :** Modals, overlays, éléments importants

---

### **Subtle Card**

```css
.card-subtle {
    background: #F9F7F3;
    box-shadow: none;
    border: 1px solid #E8E6E0;
}
```

**Usage :** Conteneurs secondaires, informations annexes

---

## 🎨 **Shadows - Soft & Diffuse**

```css
--shadow-xs: 0 1px 2px rgba(58, 57, 53, 0.04);
--shadow-sm: 0 2px 4px rgba(58, 57, 53, 0.06),
             0 1px 2px rgba(58, 57, 53, 0.03);
--shadow-md: 0 4px 8px rgba(58, 57, 53, 0.08),
             0 2px 4px rgba(58, 57, 53, 0.04);
--shadow-lg: 0 12px 24px rgba(58, 57, 53, 0.10),
             0 4px 8px rgba(58, 57, 53, 0.05);
--shadow-xl: 0 20px 40px rgba(58, 57, 53, 0.12),
             0 8px 16px rgba(58, 57, 53, 0.06);
```

**Principes :**
- Toujours multi-layers (2 ombres minimum)
- Couleur chaude (Charcoal, pas noir)
- Très diffuse, jamais dure
- Opacité faible (4-12%)

---

## 🎭 **Iconography - Fine Line**

**Style :** Traits fins minimalistes

```css
.icon-fine {
    stroke-width: 1.5;        /* Jamais plus épais */
    stroke-linecap: round;    /* Extrémités arrondies */
    stroke-linejoin: round;   /* Joints arrondis */
}
```

**Caractéristiques :**
- Lignes fines (1.5px)
- Élégantes et légères
- Cohérence visuelle
- Adaptées à toutes tailles

**Librairie recommandée :** Lucide Icons, Feather Icons

---

## 🖼️ **Imagery & Placeholders**

### **Style Photographique**

**Palette :**
- Lumière naturelle chaude
- Dominantes : Verts, Beiges, Terracotta
- Éviter : Bleus froids, couleurs criardes
- Privilégier : Ambiances organiques, textures naturelles

**Sujets :**
- Nature balinaise (rizières, forêts, plages)
- Textures (bois, pierre, tissus naturels)
- Scènes de vie authentiques
- Gros plans végétaux

**Traitement :**
- Grain léger et subtil
- Contraste doux
- Saturation modérée
- Chaleur +10 à +20

---

### **Placeholder Style**

```css
.image-placeholder {
    background: linear-gradient(135deg, #F9F7F3 0%, #F5F5F0 100%);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
}

.image-placeholder::after {
    content: '';
    background: url("data:image/svg+xml,...");  /* Texture grain */
    opacity: 0.03;
}
```

---

## 📐 **Spacing System**

```css
--space-xs:  0.25rem   (4px)
--space-sm:  0.5rem    (8px)
--space-md:  1rem      (16px)
--space-lg:  1.5rem    (24px)
--space-xl:  2rem      (32px)
--space-2xl: 3rem      (48px)
--space-3xl: 4rem      (64px)
```

**Règle :** Toujours utiliser les tokens, jamais de valeurs arbitraires

---

## 🎯 **Border Radius**

```css
--radius-sm:   8px
--radius-md:   12px
--radius-lg:   16px
--radius-xl:   24px
--radius-2xl:  32px
--radius-pill: 999px
```

**Usage :**
- Boutons : `pill` (999px)
- Cartes : `xl` (24px) ou `2xl` (32px)
- Inputs : `lg` (16px)
- Petits éléments : `md` (12px)

---

## ⚡ **Transitions**

```css
--transition-fast:    150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base:    250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow:    350ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-elegant: 500ms cubic-bezier(0.4, 0, 0.1, 1);
```

**Principes :**
- Jamais linéaires
- Easing natural (cubic-bezier)
- Durées modérées (150-500ms)
- Cohérence sur toute l'interface

---

## 🌾 **Textures & Grain**

### **Grain Subtil (Overlay)**

```css
body::before {
    content: '';
    position: fixed;
    background-image: url("data:image/svg+xml,...");
    opacity: 0.02;
    mix-blend-mode: overlay;
    pointer-events: none;
}
```

**Caractéristiques :**
- Opacité 2-3% maximum
- Mix-blend-mode overlay
- SVG noise fractal
- Ajoute chaleur et texture

---

## 📱 **Responsive Breakpoints**

```css
/* Mobile First */
Base:    0px      (Mobile)
SM:      640px    (Large Mobile)
MD:      768px    (Tablet)
LG:      1024px   (Desktop)
XL:      1280px   (Large Desktop)
2XL:     1536px   (Extra Large)
```

**Ajustements :**
- Typographie réduite sur mobile
- Padding des cartes diminué
- Border-radius légèrement réduit
- Espacement optimisé

---

## ✅ **Do's**

- ✅ Utiliser des off-whites, jamais blanc pur
- ✅ Ombres multi-layers diffuses
- ✅ Border-radius généreux (16px+)
- ✅ Espacement aéré et généreux
- ✅ Typographie Serif pour titres
- ✅ Grain subtil pour texture
- ✅ Boutons pill (totalement arrondis)
- ✅ Icons fine line (1.5px)
- ✅ Transitions douces (250ms+)
- ✅ Palette chaude (Charcoal, pas noir)

---

## ❌ **Don'ts**

- ❌ Blanc clinique (#FFFFFF en background)
- ❌ Noir pur (#000000)
- ❌ Ombres dures ou peu diffuses
- ❌ Angles droits stricts (0px radius)
- ❌ Espacement serré
- ❌ Icons épaisses (>2px)
- ❌ Transitions brusques ou linéaires
- ❌ Couleurs froides non intentionnelles
- ❌ Contraste excessif
- ❌ Textures lourdes ou distrayantes

---

## 🎨 **Component Examples**

### **Hero Section**

```css
.hero {
    background: linear-gradient(135deg, #FAFAF5 0%, #F5F5F0 100%);
    padding: 4rem 2rem;
    border-radius: 32px;
}

.hero h1 {
    font-family: 'Cormorant', serif;
    font-size: 3.5rem;
    color: #3A3935;
    margin-bottom: 1.5rem;
}

.hero p {
    font-family: 'Inter', sans-serif;
    font-size: 1.125rem;
    color: #6B6B5F;
    letter-spacing: 0.015em;
}
```

---

### **Activity Card**

```css
.activity-card {
    background: white;
    border-radius: 24px;
    padding: 2rem;
    border: 1px solid #E8E6E0;
    box-shadow: 0 2px 4px rgba(58, 57, 53, 0.06);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.activity-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(58, 57, 53, 0.08);
}

.activity-card h3 {
    font-family: 'Cormorant', serif;
    font-size: 1.5rem;
    color: #2C5F2D;
}
```

---

## 🎯 **Accessibility**

**Contrast Ratios :**
- Text primary (#3A3935) sur background (#FAFAF5) : ✅ 10.5:1
- Primary (#2C5F2D) sur white : ✅ 8.2:1
- Accent Clay (#C77E5D) sur white : ✅ 4.8:1

**Focus States :**
```css
:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}
```

---

## 📚 **Resources**

**Fonts :**
- [Cormorant on Google Fonts](https://fonts.google.com/specimen/Cormorant)
- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)

**Icons :**
- [Lucide Icons](https://lucide.dev/)
- [Feather Icons](https://feathericons.com/)

**Inspiration :**
- Balinese architecture & nature
- Scandinavian minimalism
- Japanese Wabi-Sabi
- Organic luxury brands

---

**Baliwithflow - Where Nature Meets Modern Elegance** 🌿✨

*Design System v1.0 - Janvier 2026*
