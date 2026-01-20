// Application State
let appState = {
    currentStep: 1,
    clientInfo: {},
    activities: {},
    transfers: [],
    photos: [],
    selectedActivities: [],
    zones: [],
    accommodations: []
};

// Bali Zones with coordinates for Google Maps
const BALI_ZONES = [
    { name: 'Ubud', lat: -8.5069, lng: 115.2624, description: 'Cultural heart of Bali - rice terraces, art galleries, temples' },
    { name: 'Uluwatu', lat: -8.8291, lng: 115.0849, description: 'Dramatic clifftop temples and world-class surfing' },
    { name: 'Seminyak', lat: -8.6897, lng: 115.1687, description: 'Trendy beach area with upscale dining and boutiques' },
    { name: 'Canggu', lat: -8.6478, lng: 115.1385, description: 'Laid-back surf town with hip cafes and rice paddies' },
    { name: 'Nusa Penida', lat: -8.7275, lng: 115.5444, description: 'Pristine island with dramatic cliffs and crystal waters' },
    { name: 'Sanur', lat: -8.6783, lng: 115.2639, description: 'Relaxed coastal town with calm waters' },
    { name: 'Jimbaran', lat: -8.7903, lng: 115.1601, description: 'Famous for seafood and sunset beach dinners' },
    { name: 'Munduk', lat: -8.2695, lng: 115.0838, description: 'Mountain village with waterfalls and coffee plantations' },
    { name: 'Sidemen', lat: -8.4658, lng: 115.4147, description: 'Peaceful valley with stunning Mount Agung views' },
    { name: 'Amed', lat: -8.3479, lng: 115.6458, description: 'Quiet fishing village, excellent diving and snorkeling' },
    { name: 'Lovina', lat: -8.1518, lng: 115.0254, description: 'Black sand beaches and dolphin watching' },
    { name: 'Kintamani', lat: -8.2500, lng: 115.3500, description: 'Volcanic highland with Mount Batur views' },
    { name: 'Candidasa', lat: -8.5111, lng: 115.5674, description: 'Tranquil coastal town, gateway to east Bali' }
];

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
    document.getElementById('exportClientSchedule').addEventListener('click', () => exportDocument('clientSchedule'));
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
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.innerHTML = appState.currentStep === 5
        ? 'Finish'
        : 'Next <i class="fas fa-arrow-right"></i>';
}

// Validation
function validateCurrentStep() {
    if (appState.currentStep === 1) {
        const name = document.getElementById('clientName').value;
        const whatsapp = document.getElementById('clientWhatsapp').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        if (!name || !startDate || !endDate) {
            alert('Please fill in all required fields');
            return false;
        }

        if (!whatsapp) {
            alert('WhatsApp number is required for driver coordination');
            return false;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            alert('End date must be after start date');
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
        const nights = days - 1;

        if (days > 0) {
            document.getElementById('tripDuration').textContent = `${days} day${days > 1 ? 's' : ''}, ${nights} night${nights !== 1 ? 's' : ''}`;
        }
    }
}

// Save Client Info
function saveClientInfo() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    appState.clientInfo = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        whatsapp: document.getElementById('clientWhatsapp').value,
        nbPersons: parseInt(document.getElementById('nbPersons').value) || 2,
        startDate: startDate,
        endDate: endDate,
        days: days,
        nights: days - 1,
        notes: document.getElementById('clientNotes').value,
        zones: appState.zones.filter(z => z.name) // Only include zones with a name selected
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
                Day ${dayNum} - ${formatDateEN(date)}
            </div>
        </div>
        <div class="activity-list" id="activities-day-${dayNum}">
            <!-- Activities will be added here -->
        </div>
        <button class="add-activity-btn" onclick="openActivityModal(${dayNum})">
            <i class="fas fa-plus"></i>
            Add Activity
        </button>
    `;
    return card;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function formatDateEN(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDateShort(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ===== ZONES MANAGEMENT =====
function addZone() {
    const zoneId = Date.now();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const zone = {
        id: zoneId,
        name: '',
        startDate: startDate,
        endDate: endDate,
        nights: 0
    };

    appState.zones.push(zone);
    renderZones();
}

function removeZone(zoneId) {
    appState.zones = appState.zones.filter(z => z.id !== zoneId);
    renderZones();
}

function updateZone(zoneId, field, value) {
    const zone = appState.zones.find(z => z.id === zoneId);
    if (zone) {
        zone[field] = value;

        // Recalculate nights if dates changed
        if (field === 'startDate' || field === 'endDate') {
            if (zone.startDate && zone.endDate) {
                const start = new Date(zone.startDate);
                const end = new Date(zone.endDate);
                const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                zone.nights = Math.max(0, days);
            }
        }

        renderZones();
    }
}

function renderZones() {
    const container = document.getElementById('zonesContainer');
    if (!container) return;

    if (appState.zones.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 8px; color: #64748b;">
                <i class="fas fa-map-marker-alt" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                <p>No zones added yet. Click "Add Zone" to define your trip regions.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appState.zones.map((zone, index) => `
        <div class="zone-card">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; min-width: 30px;">
                #${index + 1}
            </div>
            <div class="form-group" style="min-width: 150px;">
                <label>Zone</label>
                <select class="form-select" onchange="updateZone(${zone.id}, 'name', this.value)">
                    <option value="">Select zone...</option>
                    ${BALI_ZONES.map(z => `
                        <option value="${z.name}" ${zone.name === z.name ? 'selected' : ''}>${z.name}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group" style="min-width: 140px;">
                <label>From</label>
                <input type="date" class="form-input" value="${zone.startDate || ''}"
                    onchange="updateZone(${zone.id}, 'startDate', this.value)">
            </div>
            <div class="form-group" style="min-width: 140px;">
                <label>To</label>
                <input type="date" class="form-input" value="${zone.endDate || ''}"
                    onchange="updateZone(${zone.id}, 'endDate', this.value)">
            </div>
            <div class="form-group" style="min-width: 80px;">
                <label>Nights</label>
                <input type="text" class="form-input" value="${zone.nights || 0}" readonly
                    style="background: #e2e8f0; text-align: center; font-weight: 600;">
            </div>
            <button type="button" class="zone-remove" onclick="removeZone(${zone.id})" title="Remove zone">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// ===== ACCOMMODATIONS MANAGEMENT =====
function addAccommodation() {
    const accId = Date.now();

    const accommodation = {
        id: accId,
        zone: '',
        propertyName: '',
        nights: 1,
        pricePerNight: 0,
        checkIn: '',
        checkOut: '',
        customDescription: '',
        roomType: ''
    };

    appState.accommodations.push(accommodation);
    renderAccommodations();
}

function removeAccommodation(accId) {
    appState.accommodations = appState.accommodations.filter(a => a.id !== accId);
    renderAccommodations();
}

function updateAccommodation(accId, field, value) {
    const acc = appState.accommodations.find(a => a.id === accId);
    if (acc) {
        acc[field] = value;

        // Recalculate nights if dates changed
        if (field === 'checkIn' || field === 'checkOut') {
            if (acc.checkIn && acc.checkOut) {
                const start = new Date(acc.checkIn);
                const end = new Date(acc.checkOut);
                const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                acc.nights = Math.max(0, days);
            }
        }

        // Calculate total for display
        if (field === 'pricePerNight' || field === 'nights') {
            acc.totalPrice = (acc.pricePerNight || 0) * (acc.nights || 0);
        }

        renderAccommodations();
    }
}

function renderAccommodations() {
    const container = document.getElementById('accommodationsContainer');
    if (!container) return;

    if (appState.accommodations.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 8px; color: #64748b;">
                <i class="fas fa-bed" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                <p>No accommodations added yet. Click "Add Accommodation" to include hotels/villas.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appState.accommodations.map((acc, index) => {
        const total = (acc.pricePerNight || 0) * (acc.nights || 0);
        return `
        <div class="zone-card" style="flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; min-width: 30px;">
                #${index + 1}
            </div>
            <div class="form-group" style="min-width: 150px;">
                <label>Zone</label>
                <select class="form-select" onchange="updateAccommodation(${acc.id}, 'zone', this.value)">
                    <option value="">Select zone...</option>
                    ${BALI_ZONES.map(z => `
                        <option value="${z.name}" ${acc.zone === z.name ? 'selected' : ''}>${z.name}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group" style="min-width: 200px; flex: 1;">
                <label>Property Name (Internal)</label>
                <input type="text" class="form-input" value="${acc.propertyName || ''}"
                    placeholder="e.g. Villa Maya Ubud"
                    onchange="updateAccommodation(${acc.id}, 'propertyName', this.value)">
            </div>
            <div class="form-group" style="min-width: 120px;">
                <label>Check-in</label>
                <input type="date" class="form-input" value="${acc.checkIn || ''}"
                    onchange="updateAccommodation(${acc.id}, 'checkIn', this.value)">
            </div>
            <div class="form-group" style="min-width: 120px;">
                <label>Check-out</label>
                <input type="date" class="form-input" value="${acc.checkOut || ''}"
                    onchange="updateAccommodation(${acc.id}, 'checkOut', this.value)">
            </div>
            <div class="form-group" style="min-width: 80px;">
                <label>Nights</label>
                <input type="number" class="form-input" value="${acc.nights || 0}" min="1"
                    style="text-align: center; font-weight: 600;"
                    onchange="updateAccommodation(${acc.id}, 'nights', parseInt(this.value))">
            </div>
            <div class="form-group" style="min-width: 140px;">
                <label>Price/Night (IDR)</label>
                <input type="number" class="form-input" value="${acc.pricePerNight || ''}"
                    placeholder="2500000"
                    onchange="updateAccommodation(${acc.id}, 'pricePerNight', parseInt(this.value))">
            </div>
            <div class="form-group" style="min-width: 140px;">
                <label>Total (IDR)</label>
                <input type="text" class="form-input" value="${total.toLocaleString()}" readonly
                    style="background: #d1fae5; text-align: right; font-weight: 600; color: #065f46;">
            </div>
            <button type="button" class="zone-remove" onclick="removeAccommodation(${acc.id})" title="Remove">
                <i class="fas fa-times"></i>
            </button>
            <div class="form-group" style="width: 100%; margin-top: 0.5rem;">
                <label>Room Type / Description (for client)</label>
                <input type="text" class="form-input" value="${acc.customDescription || ''}"
                    placeholder="e.g. Deluxe Pool Villa with breakfast"
                    onchange="updateAccommodation(${acc.id}, 'customDescription', this.value)">
            </div>
        </div>
        `;
    }).join('');
}

// Activity Modal with RAG search
function openActivityModal(dayNum) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'activityModal';

    // Get locations and categories
    const locations = activityRAG ? activityRAG.getLocations() : [];
    const categories = activityRAG ? activityRAG.getCategories() : [];

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Select Activity - Day ${dayNum}</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Search and Filters -->
            <div class="search-filters">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="activitySearch" placeholder="Search activities..." class="form-input">
                </div>
                <div class="filter-row">
                    <select id="locationFilter" class="form-select">
                        <option value="">All Locations</option>
                        ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
                    </select>
                    <select id="categoryFilter" class="form-select">
                        <option value="">All Categories</option>
                        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div id="activityCount" class="activity-count"></div>
            <div class="activity-grid" id="activityGrid"></div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for search
    document.getElementById('activitySearch').addEventListener('input', (e) => {
        filterActivities(dayNum, e.target.value);
    });

    document.getElementById('locationFilter').addEventListener('change', (e) => {
        filterActivities(dayNum);
    });

    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterActivities(dayNum);
    });

    // Show all activities initially
    filterActivities(dayNum);
}

// Filter and display activities
function filterActivities(dayNum, searchQuery = null) {
    const locationFilter = document.getElementById('locationFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const searchText = searchQuery !== null ? searchQuery : document.getElementById('activitySearch')?.value || '';

    let activities = [];

    if (activityRAG) {
        // Use RAG system
        activities = activityRAG.search(searchText, {
            location: locationFilter || null,
            category: categoryFilter || null,
            maxResults: 50
        });
    } else {
        // Fallback to default database
        activities = activitiesDatabase || [];
    }

    // Display results
    const grid = document.getElementById('activityGrid');
    const countDiv = document.getElementById('activityCount');

    if (activities.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                <p style="color: #64748b;">No activities found</p>
            </div>
        `;
        countDiv.textContent = '';
    } else {
        countDiv.textContent = `${activities.length} activit${activities.length > 1 ? 'ies' : 'y'} found`;

        // Note: Price NOT shown in selection modal (only internal)
        grid.innerHTML = activities.map(activity => `
            <div class="activity-option" onclick="addActivity(${dayNum}, ${activity.id})">
                <div class="activity-header">
                    <div class="activity-name">${activity.name}</div>
                    <div class="activity-category">${activity.category || 'Other'}</div>
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
                    ${activity.status === 'ONGOING' ? '<span class="status-badge ongoing">In Progress</span>' : '<span class="status-badge ready">Available</span>'}
                </div>
            </div>
        `).join('');
    }
}

function addActivity(dayNum, activityId) {
    let activity;

    // Search in RAG first
    if (activityRAG) {
        activity = activityRAG.getById(activityId);
    } else {
        activity = activitiesDatabase.find(a => a.id === activityId);
    }

    if (!activity) return;

    if (!appState.activities[dayNum]) {
        appState.activities[dayNum] = [];
    }

    // Clone activity to allow custom descriptions
    const activityCopy = { ...activity, customDescription: '' };
    appState.activities[dayNum].push(activityCopy);
    renderDayActivities(dayNum);

    // Success notification
    showNotification(`${activity.name} added to Day ${dayNum}`, 'success');

    document.querySelector('.modal').remove();
}

function renderDayActivities(dayNum) {
    const container = document.getElementById(`activities-day-${dayNum}`);
    const activities = appState.activities[dayNum] || [];

    // Note: Price NOT shown in activity list (per requirement)
    container.innerHTML = activities.map((activity, index) => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-name">${activity.name}</div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${activity.location}</span>
                    ${activity.mealsIncluded ? `<span><i class="fas fa-utensils"></i> ${activity.mealsIncluded}</span>` : ''}
                </div>
            </div>
            <div class="activity-actions">
                <button class="btn-edit" onclick="editActivityDescription(${dayNum}, ${index})" title="Edit description">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-remove" onclick="removeActivity(${dayNum}, ${index})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Edit activity description modal
function editActivityDescription(dayNum, index) {
    const activity = appState.activities[dayNum][index];
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'editDescriptionModal';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>Edit Description - ${activity.name}</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 1rem 0;">
                <div class="form-group">
                    <label>Original Description:</label>
                    <p style="color: #64748b; font-size: 0.9rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
                        ${activity.description}
                    </p>
                </div>
                <div class="form-group">
                    <label>Custom Description (optional):</label>
                    <textarea id="customDescriptionInput" class="form-input" rows="4" placeholder="Enter your custom description for this activity...">${activity.customDescription || ''}</textarea>
                    <small style="color: #64748b;">Leave empty to use the original description in exports.</small>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button onclick="saveCustomDescription(${dayNum}, ${index})" class="btn-primary">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button onclick="this.closest('.modal').remove()" class="btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveCustomDescription(dayNum, index) {
    const customDesc = document.getElementById('customDescriptionInput').value.trim();
    appState.activities[dayNum][index].customDescription = customDesc;
    document.querySelector('#editDescriptionModal').remove();
    showNotification('Description updated', 'success');
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
    const days = Object.keys(appState.activities).sort((a, b) => parseInt(a) - parseInt(b));
    days.forEach(day => {
        const activities = appState.activities[day];
        if (activities && activities.length > 0) {
            const transfer = {
                day: parseInt(day),
                from: parseInt(day) === 1 ? 'Airport' : 'Hotel',
                to: activities[0].location,
                vehicle: 'Private Car'
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
                    <label>Day</label>
                    <input type="text" class="form-input" value="Day ${transfer.day}" readonly>
                </div>
                <div class="form-group">
                    <label>Vehicle</label>
                    <select class="form-select" onchange="updateTransferVehicle(${index}, this.value)">
                        <option ${transfer.vehicle === 'Private Car' ? 'selected' : ''}>Private Car</option>
                        <option ${transfer.vehicle === 'Minivan' ? 'selected' : ''}>Minivan</option>
                        <option ${transfer.vehicle === 'Bus' ? 'selected' : ''}>Bus</option>
                        <option ${transfer.vehicle === 'Speedboat' ? 'selected' : ''}>Speedboat</option>
                    </select>
                </div>
            </div>
        </div>
    `).join('');
}

function updateTransferVehicle(index, vehicle) {
    appState.transfers[index].vehicle = vehicle;
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
    // Render accommodations section
    renderAccommodations();

    // Auto-save itinerary when preview is generated
    autoSaveItinerary();

    const preview = document.getElementById('itineraryPreview');
    let html = `
        <h2>${appState.clientInfo.name}</h2>
        <p><strong>Dates:</strong> ${formatDateShort(new Date(appState.clientInfo.startDate))} - ${formatDateShort(new Date(appState.clientInfo.endDate))}</p>
        <p><strong>Duration:</strong> ${appState.clientInfo.days} days, ${appState.clientInfo.nights} nights</p>
        <p><strong>Guests:</strong> ${appState.clientInfo.nbPersons} guest(s)</p>
        <hr style="margin: 1rem 0;">
    `;

    // Google Maps Trip Link
    const zones = appState.zones.filter(z => z.name);
    if (zones.length > 0) {
        const mapsUrl = generateGoogleMapsUrl(zones);
        html += `
            <div style="background: #e8f4fd; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem;">
                <strong><i class="fas fa-map"></i> Trip Map:</strong>
                <a href="${mapsUrl}" target="_blank" style="color: #0066cc; margin-left: 0.5rem;">Open in Google Maps</a>
            </div>
        `;
    }

    Object.keys(appState.activities).sort((a, b) => parseInt(a) - parseInt(b)).forEach(day => {
        html += `<h3>Day ${day}</h3>`;
        appState.activities[day].forEach(activity => {
            const desc = activity.customDescription || activity.description;
            html += `
                <div style="margin-bottom: 1rem;">
                    <strong>${activity.name}</strong><br>
                    <small>${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}</small><br>
                    <small><i class="fas fa-map-marker-alt"></i> ${activity.location} | ${activity.duration}</small>
                </div>
            `;
        });
    });

    preview.innerHTML = html;
    generateFinalSummary();
}

// Generate Google Maps URL for trip
function generateGoogleMapsUrl(zones) {
    // Create a directions URL with all zones as waypoints
    const waypoints = zones.map(z => encodeURIComponent(z.name + ', Bali, Indonesia'));
    if (waypoints.length === 1) {
        return `https://www.google.com/maps/search/${waypoints[0]}`;
    }
    return `https://www.google.com/maps/dir/${waypoints.join('/')}`;
}

// Generate Static Map URL for PDF embedding
function generateStaticMapUrl(zones, apiKey = '') {
    // If no API key, return placeholder
    if (!apiKey) {
        return null;
    }

    const markers = zones.map((z, i) => {
        const zone = BALI_ZONES.find(bz => bz.name === z.name);
        if (zone) {
            return `markers=color:red%7Clabel:${i + 1}%7C${zone.lat},${zone.lng}`;
        }
        return '';
    }).filter(m => m).join('&');

    const path = zones.map(z => {
        const zone = BALI_ZONES.find(bz => bz.name === z.name);
        return zone ? `${zone.lat},${zone.lng}` : '';
    }).filter(p => p).join('|');

    return `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&${markers}&path=color:0x0000ff|weight:3|${path}&key=${apiKey}`;
}

// Save itinerary to localStorage
function saveItinerary() {
    const ITINERARIES_KEY = 'baliwithflow_itineraries';
    const saved = JSON.parse(localStorage.getItem(ITINERARIES_KEY) || '[]');

    const itinerary = {
        id: Date.now(),
        clientInfo: appState.clientInfo,
        activities: appState.activities,
        transfers: appState.transfers,
        zones: appState.zones,
        accommodations: appState.accommodations,
        photos: appState.photos,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Check if editing existing
    const editIndex = appState.editIndex;
    if (editIndex !== undefined && editIndex >= 0) {
        saved[editIndex] = { ...saved[editIndex], ...itinerary, updatedAt: new Date().toISOString() };
    } else {
        saved.push(itinerary);
    }

    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(saved));
    showNotification('Itinerary saved!', 'success');
}

// Auto-save itinerary (called automatically when preview is generated)
function autoSaveItinerary() {
    const ITINERARIES_KEY = 'baliwithflow_itineraries';
    const saved = JSON.parse(localStorage.getItem(ITINERARIES_KEY) || '[]');

    const itinerary = {
        id: appState.itineraryId || Date.now(),
        clientInfo: appState.clientInfo,
        activities: appState.activities,
        transfers: appState.transfers,
        zones: appState.zones,
        accommodations: appState.accommodations,
        photos: appState.photos,
        status: 'draft',
        createdAt: appState.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Check if editing existing itinerary (via URL param or editIndex)
    const editIndex = appState.editIndex;
    if (editIndex !== undefined && editIndex >= 0 && saved[editIndex]) {
        // Update existing
        saved[editIndex] = { ...saved[editIndex], ...itinerary, updatedAt: new Date().toISOString() };
    } else {
        // Check if itinerary with same ID already exists
        const existingIndex = saved.findIndex(s => s.id === itinerary.id);
        if (existingIndex >= 0) {
            saved[existingIndex] = { ...saved[existingIndex], ...itinerary, updatedAt: new Date().toISOString() };
        } else {
            // New itinerary - store the ID for future updates
            appState.itineraryId = itinerary.id;
            appState.createdAt = itinerary.createdAt;
            saved.push(itinerary);
        }
    }

    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(saved));
    console.log('Itinerary auto-saved:', itinerary.clientInfo.name);
}

function generateFinalSummary() {
    const summary = document.getElementById('finalSummary');
    let totalActivities = 0;

    Object.values(appState.activities).forEach(dayActivities => {
        totalActivities += dayActivities.length;
    });

    // Note: Price NOT shown in summary (only in internal quotation)
    summary.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Client</span>
            <span class="summary-value">${appState.clientInfo.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">WhatsApp</span>
            <span class="summary-value">${appState.clientInfo.whatsapp}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Trip Duration</span>
            <span class="summary-value">${appState.clientInfo.days} days, ${appState.clientInfo.nights} nights</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Number of Guests</span>
            <span class="summary-value">${appState.clientInfo.nbPersons}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Activities</span>
            <span class="summary-value">${totalActivities}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Transfers</span>
            <span class="summary-value">${appState.transfers.length}</span>
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

// Export Functions - These are overwritten by export-engine.js
// Fallback if export-engine is not loaded
if (typeof exportDocument === 'undefined') {
    function exportDocument(type) {
        console.log('Exporting:', type);
        console.log('Data:', appState);
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#d63031' : '#2D3436'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load existing itinerary if editing
function loadExistingItinerary() {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');

    if (editIndex !== null) {
        const ITINERARIES_KEY = 'baliwithflow_itineraries';
        const saved = JSON.parse(localStorage.getItem(ITINERARIES_KEY) || '[]');
        const itinerary = saved[parseInt(editIndex)];

        if (itinerary) {
            appState.editIndex = parseInt(editIndex);
            appState.itineraryId = itinerary.id;
            appState.createdAt = itinerary.createdAt;
            appState.clientInfo = itinerary.clientInfo || {};
            appState.activities = itinerary.activities || {};
            appState.transfers = itinerary.transfers || [];
            appState.zones = itinerary.zones || [];
            appState.accommodations = itinerary.accommodations || [];
            appState.photos = itinerary.photos || [];

            // Populate form fields
            populateFormFromState();
        }
    }
}

// Populate form fields from loaded state
function populateFormFromState() {
    if (appState.clientInfo.name) {
        document.getElementById('clientName').value = appState.clientInfo.name;
    }
    if (appState.clientInfo.email) {
        document.getElementById('clientEmail').value = appState.clientInfo.email;
    }
    if (appState.clientInfo.whatsapp) {
        document.getElementById('clientWhatsapp').value = appState.clientInfo.whatsapp;
    }
    if (appState.clientInfo.nbPersons) {
        document.getElementById('nbPersons').value = appState.clientInfo.nbPersons;
    }
    if (appState.clientInfo.startDate) {
        document.getElementById('startDate').value = appState.clientInfo.startDate;
    }
    if (appState.clientInfo.endDate) {
        document.getElementById('endDate').value = appState.clientInfo.endDate;
    }
    if (appState.clientInfo.notes) {
        document.getElementById('clientNotes').value = appState.clientInfo.notes;
    }

    // Render zones if any
    renderZones();

    // Update duration display
    updateDurationInfo();
}

// Call on page load
document.addEventListener('DOMContentLoaded', function() {
    loadExistingItinerary();
});
