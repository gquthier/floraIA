// CSV Parser & RAG System for Activities Database

class ActivityRAG {
    constructor() {
        this.activities = [];
        this.locations = new Set();
        this.categories = new Set();
    }

    // Parse le CSV et construit la base de données
    async loadFromCSV(csvContent) {
        const lines = csvContent.split('\n');
        const headers = this.parseCSVLine(lines[0]);
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = this.parseCSVLine(lines[i]);
            if (values.length < headers.length) continue;
            
            const activity = this.createActivityObject(headers, values, i);
            
            // Ne garder que les activités READY ou ONGOING
            if (activity.status === 'READY' || activity.status === 'ONGOING') {
                this.activities.push(activity);
                this.locations.add(activity.location);
                if (activity.category) this.categories.add(activity.category);
            }
        }
        
        console.log(`✅ ${this.activities.length} activités chargées depuis CSV`);
        console.log(`📍 Localisations: ${Array.from(this.locations).join(', ')}`);
    }

    // Parser CSV avec gestion des guillemets et virgules
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        
        return result;
    }

    // Créer un objet activité structuré
    createActivityObject(headers, values, id) {
        const obj = { id };
        
        headers.forEach((header, index) => {
            const key = header.trim().toLowerCase().replace(/\s+/g, '_');
            obj[key] = values[index] ? values[index].trim() : '';
        });
        
        // Extraire et nettoyer les prix
        const priceWithMargin = this.extractPrice(obj.price_idr_per_pax_with_margin);
        const priceWithoutMargin = this.extractPrice(obj.price_idr_per_pax);
        
        // Détecter la catégorie depuis le nom ou description
        const category = this.detectCategory(obj.activity_name, obj.description);
        
        return {
            id: obj.id,
            name: obj.activity_name || 'Activité sans nom',
            location: obj.location || 'Bali',
            status: obj.status || 'READY',
            description: this.cleanDescription(obj.description) || 'Description non disponible',
            mealsIncluded: obj.meals_included || '',
            price: priceWithMargin || priceWithoutMargin || 0,
            priceOriginal: priceWithoutMargin,
            priceIDR: priceWithMargin || priceWithoutMargin || 0,
            googleMaps: obj.google_map_starting_point || '',
            contact: obj.contact_details || '',
            category: category,
            duration: this.estimateDuration(obj.activity_name, obj.description),
            capacity: 'Variable'
        };
    }

    // Nettoyer la description
    cleanDescription(desc) {
        if (!desc) return '';
        // Remplacer les retours à la ligne par des espaces
        return desc.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // Extraire le prix (convertir IDR en EUR approximatif)
    extractPrice(priceStr) {
        if (!priceStr) return 0;
        
        // Enlever les espaces, virgules, "Rp"
        const cleaned = priceStr.replace(/[Rp\s,]/g, '');
        const priceIDR = parseInt(cleaned);
        
        if (isNaN(priceIDR)) return 0;
        
        // Conversion approximative IDR -> EUR (1 EUR ≈ 17,000 IDR)
        const priceEUR = Math.round(priceIDR / 17000);
        
        return priceEUR;
    }

    // Détecter la catégorie de l'activité
    detectCategory(name, description) {
        const text = (name + ' ' + description).toLowerCase();
        
        if (text.match(/diving|dive|snorkel|underwater|manta|reef|coral/i)) {
            return 'Plongée & Snorkeling';
        }
        if (text.match(/surf|wave|beach/i)) {
            return 'Surf';
        }
        if (text.match(/temple|culture|dance|ceremony|healer|purification|melukat/i)) {
            return 'Culture & Spiritualité';
        }
        if (text.match(/trek|hike|waterfall|jungle|mount|batur|canyon/i)) {
            return 'Trekking & Nature';
        }
        if (text.match(/bike|e-bike|cycling/i)) {
            return 'Vélo';
        }
        if (text.match(/rafting|kayak|canoe/i)) {
            return 'Sports aquatiques';
        }
        if (text.match(/food|lunch|brunch|cooking|culinary/i)) {
            return 'Gastronomie';
        }
        if (text.match(/atv|jeep|paragliding|horse/i)) {
            return 'Aventure';
        }
        if (text.match(/free day|relax|spa|massage|pool/i)) {
            return 'Détente';
        }
        
        return 'Autre';
    }

    // Estimer la durée
    estimateDuration(name, description) {
        const text = (name + ' ' + description).toLowerCase();
        
        // Chercher des patterns de durée
        const hourMatch = text.match(/(\d+)\s*(?:hour|h\b)/i);
        if (hourMatch) {
            return `${hourMatch[1]}h`;
        }
        
        const halfDayMatch = text.match(/half[\s-]day/i);
        if (halfDayMatch) return 'Demi-journée';
        
        const fullDayMatch = text.match(/full[\s-]day|all[\s-]day/i);
        if (fullDayMatch) return 'Journée complète';
        
        // Estimation par type d'activité
        if (text.match(/diving|snorkel/i)) return '3-4h';
        if (text.match(/trek|hike/i)) return '2-3h';
        if (text.match(/free day/i)) return 'Journée';
        if (text.match(/surf|lesson/i)) return '2h';
        
        return 'Variable';
    }

    // Recherche RAG par texte
    search(query, options = {}) {
        const {
            location = null,
            category = null,
            maxResults = 20,
            minScore = 0.1
        } = options;
        
        let results = this.activities;
        
        // Filtrer par localisation
        if (location) {
            results = results.filter(a => 
                a.location.toLowerCase().includes(location.toLowerCase())
            );
        }
        
        // Filtrer par catégorie
        if (category) {
            results = results.filter(a => a.category === category);
        }
        
        // Recherche textuelle si query fourni
        if (query && query.trim()) {
            const queryLower = query.toLowerCase();
            
            results = results.map(activity => {
                let score = 0;
                
                // Score sur le nom (poids élevé)
                if (activity.name.toLowerCase().includes(queryLower)) {
                    score += 5;
                }
                
                // Score sur la localisation
                if (activity.location.toLowerCase().includes(queryLower)) {
                    score += 3;
                }
                
                // Score sur la description
                if (activity.description.toLowerCase().includes(queryLower)) {
                    score += 2;
                }
                
                // Score sur la catégorie
                if (activity.category.toLowerCase().includes(queryLower)) {
                    score += 4;
                }
                
                // Mots-clés pertinents
                const keywords = queryLower.split(' ');
                keywords.forEach(keyword => {
                    if (keyword.length > 3) {
                        const text = (activity.name + ' ' + activity.description + ' ' + activity.category).toLowerCase();
                        if (text.includes(keyword)) {
                            score += 1;
                        }
                    }
                });
                
                return { ...activity, searchScore: score };
            })
            .filter(a => a.searchScore >= minScore)
            .sort((a, b) => b.searchScore - a.searchScore);
        }
        
        return results.slice(0, maxResults);
    }

    // Obtenir toutes les activités d'une localisation
    getByLocation(location) {
        return this.activities.filter(a => 
            a.location.toLowerCase() === location.toLowerCase()
        );
    }

    // Obtenir toutes les activités d'une catégorie
    getByCategory(category) {
        return this.activities.filter(a => a.category === category);
    }

    // Obtenir les localisations uniques
    getLocations() {
        return Array.from(this.locations).sort();
    }

    // Obtenir les catégories uniques
    getCategories() {
        return Array.from(this.categories).sort();
    }

    // Obtenir toutes les activités
    getAll() {
        return this.activities;
    }

    // Obtenir une activité par ID
    getById(id) {
        return this.activities.find(a => a.id === id);
    }

    // Statistiques
    getStats() {
        return {
            totalActivities: this.activities.length,
            locations: this.getLocations().length,
            categories: this.getCategories().length,
            readyActivities: this.activities.filter(a => a.status === 'READY').length,
            ongoingActivities: this.activities.filter(a => a.status === 'ONGOING').length,
            avgPrice: Math.round(
                this.activities.reduce((sum, a) => sum + a.price, 0) / this.activities.length
            )
        };
    }
}

// Instance globale
let activityRAG = null;

// Charger le CSV au démarrage
async function initializeRAG() {
    try {
        const response = await fetch('comma-separated values.csv');
        const csvContent = await response.text();
        
        activityRAG = new ActivityRAG();
        await activityRAG.loadFromCSV(csvContent);
        
        console.log('📊 Statistiques:', activityRAG.getStats());
        
        // Mettre à jour l'interface
        updateActivityDatabase();
        
        return activityRAG;
    } catch (error) {
        console.error('❌ Erreur chargement CSV:', error);
        alert('Erreur lors du chargement de la base de données d\'activités');
    }
}

// Mettre à jour la base de données globale
function updateActivityDatabase() {
    if (!activityRAG) return;
    
    // Remplacer activitiesDatabase par les vraies données
    window.activitiesDatabase = activityRAG.getAll();
    
    console.log(`✅ Base de données mise à jour: ${window.activitiesDatabase.length} activités`);
}

// Initialiser au chargement de la page
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeRAG();
    });
}
