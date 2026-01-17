// Configuration sécurisée
// NE JAMAIS mettre de clés API directement dans ce fichier !

const CONFIG = {
    // OpenAI Configuration
    openai: {
        // La clé sera stockée dans le localStorage ou passée par l'utilisateur
        apiKey: null,
        model: 'gpt-4o-mini',
        maxTokens: 1000,
        temperature: 0.7
    },
    
    // API Endpoints
    api: {
        baseUrl: 'https://api.openai.com/v1',
        chatEndpoint: '/chat/completions',
        embeddingsEndpoint: '/embeddings'
    },
    
    // RAG Configuration
    rag: {
        maxResults: 20,
        minScore: 0.1,
        useSemanticSearch: false // Active la recherche sémantique avec embeddings
    },
    
    // Application Settings
    app: {
        currency: 'EUR',
        idrToEurRate: 17000,
        locale: 'fr-FR'
    }
};

// Fonction pour initialiser la clé API de manière sécurisée
function initializeOpenAI() {
    // Vérifier si la clé est dans localStorage
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
        CONFIG.openai.apiKey = storedKey;
        console.log('✅ Clé OpenAI chargée depuis localStorage');
        return true;
    }
    
    console.log('⚠️ Aucune clé OpenAI configurée');
    return false;
}

// Fonction pour sauvegarder la clé API
function setOpenAIKey(apiKey) {
    if (!apiKey || !apiKey.startsWith('sk-')) {
        console.error('❌ Clé API invalide');
        return false;
    }
    
    localStorage.setItem('openai_api_key', apiKey);
    CONFIG.openai.apiKey = apiKey;
    console.log('✅ Clé OpenAI sauvegardée');
    return true;
}

// Fonction pour supprimer la clé API
function clearOpenAIKey() {
    localStorage.removeItem('openai_api_key');
    CONFIG.openai.apiKey = null;
    console.log('🗑️ Clé OpenAI supprimée');
}

// Initialiser au chargement
if (typeof window !== 'undefined') {
    initializeOpenAI();
}
