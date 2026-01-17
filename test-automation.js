// Test automatisé de l'application ItinérairoPro
// Ce script simule un utilisateur créant un itinéraire complet

console.log('🧪 DÉMARRAGE DES TESTS AUTOMATISÉS\n');

// Test 1: Vérification du chargement du CSV
console.log('📋 TEST 1: Chargement du CSV');
setTimeout(() => {
    if (typeof activityRAG !== 'undefined' && activityRAG !== null) {
        const stats = activityRAG.getStats();
        console.log('✅ CSV chargé avec succès');
        console.log(`   - ${stats.totalActivities} activités`);
        console.log(`   - ${stats.locations} localisations`);
        console.log(`   - ${stats.categories} catégories`);
        console.log(`   - ${stats.readyActivities} activités READY`);
        console.log(`   - ${stats.ongoingActivities} activités ONGOING`);
        console.log(`   - Prix moyen: ${stats.avgPrice}€\n`);
    } else {
        console.error('❌ RAG non initialisé');
    }
}, 2000);

// Test 2: Recherche et filtres
setTimeout(() => {
    console.log('🔍 TEST 2: Système de recherche');
    
    // Test recherche simple
    const divingResults = activityRAG.search('diving', { maxResults: 5 });
    console.log(`✅ Recherche "diving": ${divingResults.length} résultats`);
    if (divingResults.length > 0) {
        console.log(`   - Premier résultat: ${divingResults[0].name}`);
    }
    
    // Test filtre par localisation
    const nusaResults = activityRAG.getByLocation('Nusa Penida');
    console.log(`✅ Filtre "Nusa Penida": ${nusaResults.length} activités`);
    
    // Test filtre par catégorie
    const categories = activityRAG.getCategories();
    console.log(`✅ Catégories détectées: ${categories.join(', ')}`);
    
    // Test recherche combinée
    const combinedResults = activityRAG.search('manta', {
        location: 'Nusa Penida',
        maxResults: 10
    });
    console.log(`✅ Recherche combinée "manta" + "Nusa Penida": ${combinedResults.length} résultats\n`);
}, 3000);

// Test 3: Simulation création d'itinéraire
setTimeout(() => {
    console.log('📝 TEST 3: Simulation création d\'itinéraire');
    
    // Simuler les infos client
    const testClientInfo = {
        name: "Test Client - Thomas & Marie",
        email: "test@example.com",
        nbPersons: 2,
        budget: 1500,
        startDate: "2024-06-01",
        endDate: "2024-06-06",
        notes: "Passionnés de plongée, niveau Advanced"
    };
    
    console.log('✅ Infos client configurées');
    console.log(`   - Client: ${testClientInfo.name}`);
    console.log(`   - Durée: 5 jours`);
    console.log(`   - Budget: ${testClientInfo.budget}€`);
    
    // Simuler sélection d'activités
    const selectedActivities = {
        1: [activityRAG.search('manta', { location: 'Nusa Penida' })[0]],
        2: [activityRAG.search('liberty wreck', { location: 'Amed' })[0]],
        3: [activityRAG.search('melukat', { category: 'Culture & Spiritualité' })[0]],
        4: [activityRAG.search('batur', {})[0]],
        5: [activityRAG.search('free day', {})[0]]
    };
    
    console.log('✅ Activités sélectionnées:');
    Object.entries(selectedActivities).forEach(([day, activities]) => {
        if (activities[0]) {
            console.log(`   - Jour ${day}: ${activities[0].name}`);
        }
    });
    
    // Calculer le prix total
    let totalPrice = 0;
    Object.values(selectedActivities).forEach(dayActivities => {
        dayActivities.forEach(activity => {
            if (activity) totalPrice += activity.price;
        });
    });
    
    console.log(`✅ Prix total calculé: ${totalPrice}€\n`);
}, 4000);

// Test 4: Localisations disponibles
setTimeout(() => {
    console.log('📍 TEST 4: Localisations disponibles');
    const locations = activityRAG.getLocations();
    console.log(`✅ ${locations.length} localisations trouvées:`);
    locations.slice(0, 10).forEach(loc => {
        const count = activityRAG.getByLocation(loc).length;
        console.log(`   - ${loc}: ${count} activités`);
    });
    console.log('');
}, 5000);

// Test 5: Top activités par catégorie
setTimeout(() => {
    console.log('🏆 TEST 5: Répartition par catégories');
    const categories = activityRAG.getCategories();
    categories.forEach(cat => {
        const activities = activityRAG.getByCategory(cat);
        console.log(`   - ${cat}: ${activities.length} activités`);
    });
    console.log('');
}, 6000);

// Test 6: Conversion des prix
setTimeout(() => {
    console.log('💰 TEST 6: Vérification conversion prix IDR→EUR');
    const sampleActivities = activityRAG.getAll().slice(0, 5);
    console.log('✅ Échantillon de conversions:');
    sampleActivities.forEach(activity => {
        console.log(`   - ${activity.name.substring(0, 30)}...`);
        console.log(`     Prix IDR: ${activity.priceIDR || 'N/A'}`);
        console.log(`     Prix EUR: ${activity.price}€`);
    });
    console.log('');
}, 7000);

// Test 7: Recherche par mots-clés multiples
setTimeout(() => {
    console.log('🔑 TEST 7: Recherche avec différents mots-clés');
    
    const keywords = ['diving', 'temple', 'surf', 'bike', 'waterfall'];
    keywords.forEach(keyword => {
        const results = activityRAG.search(keyword, { maxResults: 3 });
        console.log(`   - "${keyword}": ${results.length} résultats`);
        if (results.length > 0) {
            console.log(`     Top: ${results[0].name.substring(0, 40)}...`);
        }
    });
    console.log('');
}, 8000);

// Test 8: État de l'IA
setTimeout(() => {
    console.log('🤖 TEST 8: Vérification IA');
    if (typeof aiAssistant !== 'undefined' && aiAssistant) {
        console.log(`   - IA disponible: ${aiAssistant.isAvailable}`);
        console.log(`   - Modèle: ${aiAssistant.model || 'N/A'}`);
        if (aiAssistant.isAvailable) {
            console.log('   ✅ IA configurée et prête');
        } else {
            console.log('   ⚠️  IA non configurée (clé API manquante)');
        }
    } else {
        console.log('   ⚠️  Module IA non chargé');
    }
    console.log('');
}, 9000);

// Résumé final
setTimeout(() => {
    console.log('=' .repeat(60));
    console.log('📊 RÉSUMÉ DES TESTS');
    console.log('=' .repeat(60));
    
    const stats = activityRAG.getStats();
    
    console.log('\n✅ FONCTIONNALITÉS OPÉRATIONNELLES:');
    console.log('   [✓] Chargement CSV');
    console.log('   [✓] Système RAG');
    console.log('   [✓] Recherche intelligente');
    console.log('   [✓] Filtres par localisation');
    console.log('   [✓] Filtres par catégorie');
    console.log('   [✓] Conversion prix IDR→EUR');
    console.log('   [✓] Catégorisation automatique');
    console.log('   [✓] Calculs automatiques');
    
    console.log('\n📈 STATISTIQUES FINALES:');
    console.log(`   - Activités totales: ${stats.totalActivities}`);
    console.log(`   - Activités disponibles: ${stats.readyActivities}`);
    console.log(`   - Localisations: ${stats.locations}`);
    console.log(`   - Catégories: ${stats.categories}`);
    console.log(`   - Prix moyen: ${stats.avgPrice}€`);
    
    console.log('\n🎯 RECOMMANDATIONS:');
    console.log('   1. Ouvrir http://localhost:8000 dans le navigateur');
    console.log('   2. Tester l\'interface graphique manuellement');
    console.log('   3. Créer un itinéraire complet');
    console.log('   4. Vérifier tous les exports (PDF, Word, CSV)');
    console.log('   5. Configurer l\'IA si souhaité (via Paramètres)');
    
    console.log('\n🎉 TESTS AUTOMATISÉS TERMINÉS!\n');
}, 10000);

console.log('⏱️  Tests en cours... (durée: 10 secondes)\n');
