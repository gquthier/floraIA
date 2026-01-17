// AI Assistant avec OpenAI pour améliorer les descriptions et suggestions

class AIAssistant {
    constructor() {
        this.apiKey = CONFIG.openai.apiKey;
        this.model = CONFIG.openai.model;
        this.isAvailable = !!this.apiKey;
    }

    // Vérifier si l'API est configurée
    checkAvailability() {
        if (!this.apiKey) {
            console.warn('⚠️ OpenAI API non configurée. Fonctionnalités AI désactivées.');
            return false;
        }
        return true;
    }

    // Appel à l'API OpenAI
    async callOpenAI(messages, options = {}) {
        if (!this.checkAvailability()) {
            throw new Error('OpenAI API non configurée');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: messages,
                max_tokens: options.maxTokens || CONFIG.openai.maxTokens,
                temperature: options.temperature || CONFIG.openai.temperature
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Améliorer la description d'une activité
    async enhanceActivityDescription(activity) {
        if (!this.checkAvailability()) return activity.description;

        try {
            const prompt = `Améliore cette description d'activité touristique à Bali en français. Rends-la plus engageante et professionnelle (maximum 150 mots) :

Activité : ${activity.name}
Lieu : ${activity.location}
Description actuelle : ${activity.description}

Description améliorée :`;

            const enhanced = await this.callOpenAI([
                { role: 'system', content: 'Tu es un expert en rédaction de contenus touristiques pour Bali.' },
                { role: 'user', content: prompt }
            ]);

            return enhanced.trim();
        } catch (error) {
            console.error('Erreur amélioration description:', error);
            return activity.description;
        }
    }

    // Suggérer des activités complémentaires
    async suggestComplementaryActivities(selectedActivities, allActivities) {
        if (!this.checkAvailability()) return [];

        try {
            const selectedNames = selectedActivities.map(a => a.name).join(', ');
            const prompt = `Un client a sélectionné ces activités à Bali : ${selectedNames}

Suggère 3 activités complémentaires parmi cette liste qui créeraient un bon équilibre dans leur voyage :
${allActivities.slice(0, 30).map(a => `- ${a.name} (${a.category}, ${a.location})`).join('\n')}

Réponds uniquement avec les noms des activités, un par ligne.`;

            const suggestions = await this.callOpenAI([
                { role: 'system', content: 'Tu es un expert en planification de voyages à Bali.' },
                { role: 'user', content: prompt }
            ]);

            // Parser les suggestions
            const suggestedNames = suggestions.trim().split('\n').map(s => s.replace(/^-\s*/, '').trim());
            
            return allActivities.filter(a => 
                suggestedNames.some(name => a.name.toLowerCase().includes(name.toLowerCase()))
            ).slice(0, 3);
        } catch (error) {
            console.error('Erreur suggestions:', error);
            return [];
        }
    }

    // Générer un résumé personnalisé de l'itinéraire
    async generateItinerarySummary(clientInfo, activities) {
        if (!this.checkAvailability()) return null;

        try {
            const activitiesList = Object.entries(activities)
                .map(([day, acts]) => `Jour ${day}: ${acts.map(a => a.name).join(', ')}`)
                .join('\n');

            const prompt = `Génère un résumé engageant (3-4 phrases) de cet itinéraire à Bali pour ${clientInfo.name} :

Durée : ${clientInfo.startDate} au ${clientInfo.endDate}
Participants : ${clientInfo.nbPersons} personne(s)
Notes : ${clientInfo.notes || 'Aucune'}

Activités :
${activitiesList}

Résumé :`;

            const summary = await this.callOpenAI([
                { role: 'system', content: 'Tu es un expert en création d\'itinéraires de voyage à Bali.' },
                { role: 'user', content: prompt }
            ]);

            return summary.trim();
        } catch (error) {
            console.error('Erreur génération résumé:', error);
            return null;
        }
    }

    // Recherche sémantique avec embeddings (avancé)
    async semanticSearch(query, activities) {
        if (!this.checkAvailability()) return activities;

        try {
            // Obtenir l'embedding de la requête
            const queryEmbedding = await this.getEmbedding(query);
            
            // Calculer la similarité avec chaque activité (si embeddings précalculés)
            // Pour l'instant, on retourne les activités telles quelles
            // Implémentation complète nécessiterait de stocker les embeddings
            
            return activities;
        } catch (error) {
            console.error('Erreur recherche sémantique:', error);
            return activities;
        }
    }

    // Obtenir l'embedding d'un texte
    async getEmbedding(text) {
        if (!this.checkAvailability()) return null;

        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'text-embedding-3-small',
                input: text
            })
        });

        if (!response.ok) {
            throw new Error('Erreur création embedding');
        }

        const data = await response.json();
        return data.data[0].embedding;
    }
}

// Instance globale
let aiAssistant = null;

// Initialiser l'assistant AI
function initializeAI() {
    aiAssistant = new AIAssistant();
    if (aiAssistant.isAvailable) {
        console.log('✅ AI Assistant activé');
    } else {
        console.log('ℹ️ AI Assistant désactivé (aucune clé API)');
    }
}

// Initialiser au chargement
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeAI();
    });
}
