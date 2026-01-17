// Application State
let appState = {
    currentStep: 1,
    clientInfo: {},
    activities: {},
    transfers: [],
    photos: [],
    selectedActivities: []
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateDurationInfo();
});

// Event Listeners
function initializeEventListeners() {
    // Date inputs
    document.getElementById('startDate').addEventListener('change', updateDurationInfo);
    document.getElementById('endDate').addEventListener('change', updateDurationInfo);
    
    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);
    
    // Drag & drop
    const dragZone = document.getElementById('dragDropZone');
    dragZone.addEventListener('click', () => document.getElementById('photoUpload').click());
    dragZone.addEventListener('dragover', handleDragOver);
    dragZone.addEventListener('drop', handleDrop);
    
    document.getElementById('photoUpload').addEventListener('change', handleFileSelect);
    
    // Export buttons
    document.getElementById('exportClientPDF').addEventListener('click', () => exportDocument('pdf'));
    document.getElementById('exportClientWord').addEventListener('click', () => exportDocument('word'));
    document.getElementById('exportDriverDoc').addEventListener('click', () => exportDocument('driver'));
    document.getElementById('exportQuotation').addEventListener('click', () => exportDocument('quotation'));
}

// Step Navigation
function nextStep() {
    if (validateCurrentStep()) {
        if (appState.currentStep === 1) {
            saveClientInfo();
            generateDaysContainer();
        } else if (appState.currentStep === 2) {
            saveActivities();
            generateTransfersContainer();
        } else if (appState.currentStep === 3) {
            saveTransfers();
            generatePreview();
        }
        
        if (appState.currentStep < 5) {
            appState.currentStep++;
            updateStepDisplay();
        }
    }
}

function prevStep() {
    if (appState.currentStep > 1) {
        appState.currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        if (stepNum === appState.currentStep) {
            step.classList.add('active');
        } else if (stepNum < appState.currentStep) {
            step.classList.add('completed');
        }
    });
    
    // Update step content
    document.querySelectorAll('.step-content').forEach((content, index) => {
        content.classList.remove('active');
        if (index + 1 === appState.currentStep) {
            content.classList.add('active');
        }
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').style.display = appState.currentStep > 1 ? 'flex' : 'none';
    document.getElementById('nextBtn').textContent = appState.currentStep === 5 ? 'Terminer' : 'Suivant';
}

// Validation
function validateCurrentStep() {
    if (appState.currentStep === 1) {
        const name = document.getElementById('clientName').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (!name || !startDate || !endDate) {
            alert('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        
        if (new Date(startDate) >= new Date(endDate)) {
            alert('La date de fin doit être après la date de début');
            return false;
        }
    }
    return true;
}

// Duration Calculator
function updateDurationInfo() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (days > 0) {
            document.getElementById('tripDuration').textContent = `${days} jour${days > 1 ? 's' : ''}`;
        }
    }
}

// Save Client Info
function saveClientInfo() {
    appState.clientInfo = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        nbPersons: document.getElementById('nbPersons').value,
        budget: document.getElementById('budget').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        notes: document.getElementById('clientNotes').value
    };
}

// Generate Days Container
function generateDaysContainer() {
    const container = document.getElementById('daysContainer');
    container.innerHTML = '';
    
    const start = new Date(appState.clientInfo.startDate);
    const end = new Date(appState.clientInfo.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    for (let i = 1; i <= days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i - 1);
        
        const dayCard = createDayCard(i, currentDate);
        container.appendChild(dayCard);
    }
}

function createDayCard(dayNum, date) {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
        <div class="day-header">
            <div class="day-title">
                <i class="fas fa-calendar-day"></i>
                Jour ${dayNum} - ${formatDate(date)}
            </div>
        </div>
        <div class="activity-list" id="activities-day-${dayNum}">
            <!-- Activities will be added here -->
        </div>
        <button class="add-activity-btn" onclick="openActivityModal(${dayNum})">
            <i class="fas fa-plus"></i>
            Ajouter une activité
        </button>
    `;
    return card;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Activity Modal avec recherche RAG
function openActivityModal(dayNum) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'activityModal';
    
    // Obtenir les localisations et catégories
    const locations = activityRAG ? activityRAG.getLocations() : [];
    const categories = activityRAG ? activityRAG.getCategories() : [];
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Choisir une activité - Jour ${dayNum}</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <!-- Recherche et Filtres -->
            <div class="search-filters">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="activitySearch" placeholder="Rechercher une activité..." class="form-input">
                </div>
                <div class="filter-row">
                    <select id="locationFilter" class="form-select">
                        <option value="">Toutes les localisations</option>
                        ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
                    </select>
                    <select id="categoryFilter" class="form-select">
                        <option value="">Toutes les catégories</option>
                        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div id="activityCount" class="activity-count"></div>
            <div class="activity-grid" id="activityGrid"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners pour la recherche
    document.getElementById('activitySearch').addEventListener('input', (e) => {
        filterActivities(dayNum, e.target.value);
    });
    
    document.getElementById('locationFilter').addEventListener('change', (e) => {
        filterActivities(dayNum);
    });
    
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterActivities(dayNum);
    });
    
    // Afficher toutes les activités au départ
    filterActivities(dayNum);
}

// Filtrer et afficher les activités
function filterActivities(dayNum, searchQuery = null) {
    const locationFilter = document.getElementById('locationFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const searchText = searchQuery !== null ? searchQuery : document.getElementById('activitySearch')?.value || '';
    
    let activities = [];
    
    if (activityRAG) {
        // Utiliser le système RAG
        activities = activityRAG.search(searchText, {
            location: locationFilter || null,
            category: categoryFilter || null,
            maxResults: 50
        });
    } else {
        // Fallback sur la base de données par défaut
        activities = activitiesDatabase || [];
    }
    
    // Afficher les résultats
    const grid = document.getElementById('activityGrid');
    const countDiv = document.getElementById('activityCount');
    
    if (activities.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                <p style="color: #64748b;">Aucune activité trouvée</p>
            </div>
        `;
        countDiv.textContent = '';
    } else {
        countDiv.textContent = `${activities.length} activité${activities.length > 1 ? 's' : ''} trouvée${activities.length > 1 ? 's' : ''}`;
        
        grid.innerHTML = activities.map(activity => `
            <div class="activity-option" onclick="addActivity(${dayNum}, ${activity.id})">
                <div class="activity-header">
                    <div class="activity-name">${activity.name}</div>
                    <div class="activity-category">${activity.category || 'Autre'}</div>
                </div>
                <div class="activity-location">
                    <i class="fas fa-map-marker-alt"></i> ${activity.location}
                </div>
                <div class="activity-description">${activity.description.substring(0, 120)}${activity.description.length > 120 ? '...' : ''}</div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                    ${activity.mealsIncluded ? `<span><i class="fas fa-utensils"></i> ${activity.mealsIncluded}</span>` : ''}
                </div>
                <div class="activity-footer">
                    <div class="activity-price">${activity.price}€</div>
                    ${activity.status === 'ONGOING' ? '<span class="status-badge ongoing">En cours</span>' : '<span class="status-badge ready">Disponible</span>'}
                </div>
            </div>
        `).join('');
    }
}

function addActivity(dayNum, activityId) {
    let activity;
    
    // Chercher dans le RAG d'abord
    if (activityRAG) {
        activity = activityRAG.getById(activityId);
    } else {
        activity = activitiesDatabase.find(a => a.id === activityId);
    }
    
    if (!activity) return;
    
    if (!appState.activities[dayNum]) {
        appState.activities[dayNum] = [];
    }
    
    appState.activities[dayNum].push(activity);
    renderDayActivities(dayNum);
    
    // Notification de succès
    showNotification(`✅ ${activity.name} ajoutée au Jour ${dayNum}`, 'success');
    
    document.querySelector('.modal').remove();
}

function renderDayActivities(dayNum) {
    const container = document.getElementById(`activities-day-${dayNum}`);
    const activities = appState.activities[dayNum] || [];
    
    container.innerHTML = activities.map((activity, index) => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-name">${activity.name}</div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${activity.location}</span>
                </div>
            </div>
            <div class="activity-price">${activity.price}€</div>
            <button class="btn-remove" onclick="removeActivity(${dayNum}, ${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function removeActivity(dayNum, index) {
    appState.activities[dayNum].splice(index, 1);
    renderDayActivities(dayNum);
}

function saveActivities() {
    // Activities are already saved in appState
}

// Transfers
function generateTransfersContainer() {
    const container = document.getElementById('transfersContainer');
    container.innerHTML = '';
    
    // Auto-generate suggested transfers based on activities
    const days = Object.keys(appState.activities);
    days.forEach(day => {
        const activities = appState.activities[day];
        if (activities && activities.length > 0) {
            const transfer = {
                day: day,
                from: day > 1 ? 'Hôtel' : 'Aéroport',
                to: activities[0].location,
                vehicle: 'Voiture privée'
            };
            appState.transfers.push(transfer);
        }
    });
    
    renderTransfers();
}

function renderTransfers() {
    const container = document.getElementById('transfersContainer');
    container.innerHTML = appState.transfers.map((transfer, index) => `
        <div class="transfer-card">
            <div class="transfer-header">
                <div class="transfer-route">
                    <i class="fas fa-map-marker-alt"></i>
                    ${transfer.from} <i class="fas fa-arrow-right"></i> ${transfer.to}
                </div>
                <button class="btn-remove" onclick="removeTransfer(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Jour</label>
                    <input type="text" class="form-input" value="Jour ${transfer.day}" readonly>
                </div>
                <div class="form-group">
                    <label>Véhicule</label>
                    <select class="form-select">
                        <option>Voiture privée</option>
                        <option>Minivan</option>
                        <option>Bus</option>
                    </select>
                </div>
            </div>
        </div>
    `).join('');
}

function removeTransfer(index) {
    appState.transfers.splice(index, 1);
    renderTransfers();
}

function saveTransfers() {
    // Transfers are already saved
}

// Preview Generation
function generatePreview() {
    const preview = document.getElementById('itineraryPreview');
    let html = `
        <h2>${appState.clientInfo.name}</h2>
        <p><strong>Dates:</strong> ${appState.clientInfo.startDate} au ${appState.clientInfo.endDate}</p>
        <p><strong>Participants:</strong> ${appState.clientInfo.nbPersons} personne(s)</p>
        <hr style="margin: 1rem 0;">
    `;
    
    Object.keys(appState.activities).forEach(day => {
        html += `<h3>Jour ${day}</h3>`;
        appState.activities[day].forEach(activity => {
            html += `
                <div style="margin-bottom: 1rem;">
                    <strong>${activity.name}</strong><br>
                    <small>${activity.description}</small><br>
                    <small><i class="fas fa-map-marker-alt"></i> ${activity.location} | ${activity.duration}</small>
                </div>
            `;
        });
    });
    
    preview.innerHTML = html;
    generateFinalSummary();
}

function generateFinalSummary() {
    const summary = document.getElementById('finalSummary');
    let totalPrice = 0;
    let totalActivities = 0;
    
    Object.values(appState.activities).forEach(dayActivities => {
        dayActivities.forEach(activity => {
            totalPrice += parseFloat(activity.price);
            totalActivities++;
        });
    });
    
    summary.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Client</span>
            <span class="summary-value">${appState.clientInfo.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Durée du séjour</span>
            <span class="summary-value">${Object.keys(appState.activities).length} jours</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Nombre d'activités</span>
            <span class="summary-value">${totalActivities}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Nombre de transferts</span>
            <span class="summary-value">${appState.transfers.length}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Prix total estimé</span>
            <span class="summary-value">${totalPrice.toFixed(2)}€</span>
        </div>
    `;
}

// Photo Handling
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.photos.push(e.target.result);
                renderPhotos();
            };
            reader.readAsDataURL(file);
        }
    });
}

function renderPhotos() {
    const container = document.getElementById('uploadedPhotos');
    container.innerHTML = appState.photos.map((photo, index) => `
        <div class="photo-thumb">
            <img src="${photo}" alt="Photo ${index + 1}">
            <button class="remove-photo" onclick="removePhoto(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removePhoto(index) {
    appState.photos.splice(index, 1);
    renderPhotos();
}

// Export Functions
function exportDocument(type) {
    alert(`Export ${type} - Fonctionnalité à implémenter avec backend`);
    console.log('Exporting:', type);
    console.log('Data:', appState);
}
