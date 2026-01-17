#!/bin/bash

# Script de test automatisé pour ItinérairoPro
# Ce script vérifie que tous les fichiers sont présents et le serveur fonctionne

echo "🧪 DÉMARRAGE DES TESTS AUTOMATISÉS - ItinérairoPro"
echo "=================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Fonction de test
run_test() {
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Test $TOTAL_TESTS: $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "📋 PHASE 1: Vérification des Fichiers"
echo "--------------------------------------"

run_test "index.html existe" "test -f index.html"
run_test "styles.css existe" "test -f styles.css"
run_test "app.js existe" "test -f app.js"
run_test "database.js existe" "test -f database.js"
run_test "csv-parser.js existe" "test -f csv-parser.js"
run_test "ai-assistant.js existe" "test -f ai-assistant.js"
run_test "export-engine.js existe" "test -f export-engine.js"
run_test "config.js existe" "test -f config.js"
run_test "CSV existe" "test -f 'comma-separated values.csv'"
run_test ".gitignore existe" "test -f .gitignore"

echo ""
echo "🌐 PHASE 2: Vérification du Serveur"
echo "------------------------------------"

run_test "Serveur répond sur port 8000" "curl -s http://localhost:8000 > /dev/null"
run_test "Page principale accessible" "curl -s http://localhost:8000/index.html | grep -q 'ItinérairoPro'"
run_test "Fichier CSS accessible" "curl -s http://localhost:8000/styles.css | grep -q 'primary-color'"
run_test "Fichier JS accessible" "curl -s http://localhost:8000/app.js | grep -q 'appState'"
run_test "CSV accessible" "curl -s 'http://localhost:8000/comma-separated%20values.csv' | grep -q 'Activity Name'"

echo ""
echo "📊 PHASE 3: Vérification du Contenu CSV"
echo "----------------------------------------"

CSV_FILE="comma-separated values.csv"
if [ -f "$CSV_FILE" ]; then
    LINE_COUNT=$(wc -l < "$CSV_FILE")
    run_test "CSV contient des données (>10 lignes)" "test $LINE_COUNT -gt 10"
    run_test "CSV contient 'Amed'" "grep -q 'Amed' '$CSV_FILE'"
    run_test "CSV contient 'Nusa Penida'" "grep -q 'Nusa Penida' '$CSV_FILE'"
    run_test "CSV contient 'Ubud'" "grep -q 'Ubud' '$CSV_FILE'"
    run_test "CSV contient 'diving'" "grep -qi 'diving' '$CSV_FILE'"
else
    echo -e "${RED}✗ CSV file not found${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 5))
    TOTAL_TESTS=$((TOTAL_TESTS + 5))
fi

echo ""
echo "📚 PHASE 4: Vérification de la Documentation"
echo "---------------------------------------------"

run_test "README.md existe" "test -f README.md"
run_test "GUIDE_UTILISATION.md existe" "test -f GUIDE_UTILISATION.md"
run_test "RAG_DOCUMENTATION.md existe" "test -f RAG_DOCUMENTATION.md"
run_test "AI_FEATURES.md existe" "test -f AI_FEATURES.md"
run_test "SECURITY_GUIDE.md existe" "test -f SECURITY_GUIDE.md"
run_test "TEST_SCENARIO.md existe" "test -f TEST_SCENARIO.md"

echo ""
echo "🔒 PHASE 5: Vérification de la Sécurité"
echo "----------------------------------------"

run_test ".env dans .gitignore" "grep -q '.env' .gitignore"
run_test "*.key dans .gitignore" "grep -q '*.key' .gitignore"
run_test ".env.example existe" "test -f .env.example"
run_test "Pas de clé API en dur (index.html)" "! grep -q 'sk-proj-' index.html"
run_test "Pas de clé API en dur (app.js)" "! grep -q 'sk-proj-' app.js"

echo ""
echo "🧪 PHASE 6: Tests Fonctionnels"
echo "-------------------------------"

# Test que le HTML contient les bons éléments
run_test "Page contient formulaire client" "grep -q 'clientName' index.html"
run_test "Page contient les 5 étapes" "grep -q 'step-number' index.html"
run_test "Page contient zone drag-drop" "grep -q 'dragDropZone' index.html"
run_test "Page contient boutons export" "grep -q 'exportClientPDF' index.html"

# Test que les JS contiennent les bonnes fonctions
run_test "csv-parser contient ActivityRAG" "grep -q 'class ActivityRAG' csv-parser.js"
run_test "app.js contient appState" "grep -q 'let appState' app.js"
run_test "ai-assistant contient AIAssistant" "grep -q 'class AIAssistant' ai-assistant.js"

echo ""
echo "=================================================="
echo "📊 RÉSUMÉ DES TESTS"
echo "=================================================="
echo ""
echo -e "Tests exécutés: ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Tests réussis:  ${GREEN}$PASSED_TESTS${NC}"
echo -e "Tests échoués:  ${RED}$FAILED_TESTS${NC}"
echo ""

# Calculer le pourcentage
PERCENTAGE=$((PASSED_TESTS * 100 / TOTAL_TESTS))

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✅ TOUS LES TESTS SONT PASSÉS! (100%)${NC}"
    echo ""
    echo "🎉 L'application est prête à être utilisée!"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "   1. Ouvrez http://localhost:8000"
    echo "   2. Créez votre premier itinéraire"
    echo "   3. Testez manuellement via: http://localhost:8000/manual-test-checklist.html"
    EXIT_CODE=0
else
    echo -e "${YELLOW}⚠️  TESTS PARTIELLEMENT RÉUSSIS ($PERCENTAGE%)${NC}"
    echo ""
    echo "Certains tests ont échoué. Vérifiez les erreurs ci-dessus."
    EXIT_CODE=1
fi

echo ""
echo "📋 Tests Manuels Disponibles:"
echo "   - Checklist complète: http://localhost:8000/manual-test-checklist.html"
echo "   - Tests console: http://localhost:8000/test-console.html"
echo "   - Application: http://localhost:8000"
echo ""

exit $EXIT_CODE
