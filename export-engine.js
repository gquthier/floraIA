// Export Engine - Document Generation
// This file contains functions to generate different types of documents

// Static content templates
const COMPANY_INTRO = {
    floraBio: "Your personal travel designer with over 5 years of experience crafting unforgettable Bali journeys. Every itinerary is thoughtfully curated to match your unique preferences and dreams.",
    companyDescription: "Baliwithflow creates bespoke travel experiences that go beyond the ordinary. We connect you with the authentic heart of Bali through carefully selected activities, hidden gems, and local expertise."
};

const TERMS_CONDITIONS = `
<h2>Terms & Conditions</h2>

<h3>1. BOOKING & PAYMENT</h3>
<ul>
    <li>A 30% deposit is required to confirm your booking</li>
    <li>Balance is due 30 days before departure</li>
    <li>Payments accepted via bank transfer or credit card</li>
</ul>

<h3>2. CANCELLATION POLICY</h3>
<ul>
    <li>60+ days before departure: Full refund minus admin fees</li>
    <li>30-59 days: 50% refund</li>
    <li>15-29 days: 25% refund</li>
    <li>Less than 15 days: No refund</li>
</ul>

<h3>3. CHANGES & MODIFICATIONS</h3>
<ul>
    <li>Changes are subject to availability</li>
    <li>Price adjustments may apply for modifications</li>
    <li>Please notify us as soon as possible for any changes</li>
</ul>

<h3>4. TRAVEL INSURANCE</h3>
<ul>
    <li>Travel insurance is highly recommended</li>
    <li>Insurance is not included in the package price</li>
    <li>We recommend coverage for medical, cancellation, and luggage</li>
</ul>

<h3>5. LIABILITY</h3>
<ul>
    <li>Baliwithflow acts as an agent for third-party suppliers</li>
    <li>We are not liable for service failures beyond our control</li>
    <li>Force majeure events may affect itinerary delivery</li>
</ul>

<h3>6. HEALTH & SAFETY</h3>
<ul>
    <li>Travelers are responsible for their own fitness level</li>
    <li>Please inform us of any medical conditions</li>
    <li>Vaccinations should be updated as recommended</li>
</ul>
`;

// Zone descriptions for map
const ZONE_DESCRIPTIONS = {
    'Ubud': 'Cultural heart of Bali - rice terraces, art galleries, temples',
    'Uluwatu': 'Dramatic clifftop temples and world-class surfing',
    'Seminyak': 'Trendy beach area with upscale dining and boutiques',
    'Canggu': 'Laid-back surf town with hip cafes and rice paddies',
    'Nusa Penida': 'Pristine island with dramatic cliffs and crystal waters',
    'Sanur': 'Relaxed coastal town with calm waters',
    'Jimbaran': 'Famous for seafood and sunset beach dinners',
    'Munduk': 'Mountain village with waterfalls and coffee plantations',
    'Sidemen': 'Peaceful valley with stunning Mount Agung views',
    'Amed': 'Quiet fishing village, excellent diving and snorkeling',
    'Lovina': 'Black sand beaches and dolphin watching',
    'Kintamani': 'Volcanic highland with Mount Batur views',
    'Candidasa': 'Tranquil coastal town, gateway to east Bali'
};

class ExportEngine {
    constructor(appState) {
        this.state = appState;
    }

    // Get exchange rate from settings
    getExchangeRate() {
        return parseFloat(localStorage.getItem('exchange_rate_usd_idr')) || 15800;
    }

    // Format date in English
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateShort(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Calculate zones from activities or use client zones
    getZonesFromActivities() {
        // First check if client has defined zones
        if (this.state.clientInfo?.zones && this.state.clientInfo.zones.length > 0) {
            const zones = {};
            this.state.clientInfo.zones.forEach(z => {
                if (z.name) {
                    zones[z.name] = { nights: z.nights || 0, days: [] };
                }
            });
            return zones;
        }

        // Fallback: calculate from activities
        const zones = {};
        Object.keys(this.state.activities).forEach(day => {
            this.state.activities[day].forEach(activity => {
                if (!zones[activity.location]) {
                    zones[activity.location] = { days: [], nights: 0 };
                }
                if (!zones[activity.location].days.includes(parseInt(day))) {
                    zones[activity.location].days.push(parseInt(day));
                }
            });
        });
        // Calculate nights per zone
        Object.keys(zones).forEach(zone => {
            zones[zone].nights = zones[zone].days.length;
        });
        return zones;
    }

    // Generate Google Maps URL for trip
    generateGoogleMapsUrl() {
        const zones = this.state.clientInfo?.zones?.filter(z => z.name) || [];
        if (zones.length === 0) {
            const activityZones = Object.keys(this.getZonesFromActivities());
            if (activityZones.length === 0) return null;
            const waypoints = activityZones.map(z => encodeURIComponent(z + ', Bali, Indonesia'));
            return `https://www.google.com/maps/dir/${waypoints.join('/')}`;
        }

        const waypoints = zones.map(z => encodeURIComponent(z.name + ', Bali, Indonesia'));
        if (waypoints.length === 1) {
            return `https://www.google.com/maps/search/${waypoints[0]}`;
        }
        return `https://www.google.com/maps/dir/${waypoints.join('/')}`;
    }

    // Generate Static Map URL (requires API key)
    generateStaticMapUrl() {
        const apiKey = localStorage.getItem('google_maps_api_key');
        if (!apiKey) return null;

        const zones = this.state.clientInfo?.zones?.filter(z => z.name) || [];
        if (zones.length === 0) return null;

        const markers = zones.map((z, i) => {
            const zoneData = ZONE_DESCRIPTIONS[z.name] ? z : null;
            // Use approximate coordinates
            const coords = this.getZoneCoordinates(z.name);
            if (coords) {
                return `markers=color:red%7Clabel:${i + 1}%7C${coords.lat},${coords.lng}`;
            }
            return '';
        }).filter(m => m).join('&');

        return `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&${markers}&key=${apiKey}`;
    }

    // Approximate coordinates for Bali zones
    getZoneCoordinates(zoneName) {
        const coords = {
            'Ubud': { lat: -8.5069, lng: 115.2624 },
            'Uluwatu': { lat: -8.8291, lng: 115.0849 },
            'Seminyak': { lat: -8.6897, lng: 115.1687 },
            'Canggu': { lat: -8.6478, lng: 115.1385 },
            'Nusa Penida': { lat: -8.7275, lng: 115.5444 },
            'Sanur': { lat: -8.6783, lng: 115.2639 },
            'Jimbaran': { lat: -8.7903, lng: 115.1601 },
            'Munduk': { lat: -8.2695, lng: 115.0838 },
            'Sidemen': { lat: -8.4658, lng: 115.4147 },
            'Amed': { lat: -8.3479, lng: 115.6458 },
            'Lovina': { lat: -8.1518, lng: 115.0254 },
            'Kintamani': { lat: -8.2500, lng: 115.3500 },
            'Candidasa': { lat: -8.5111, lng: 115.5674 }
        };
        return coords[zoneName] || null;
    }

    // ===== CLIENT ITINERARY PDF (Multi-page) =====
    generateClientItineraryHTML() {
        const { clientInfo, activities, transfers, photos } = this.state;
        const zones = this.getZonesFromActivities();

        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bali Itinerary - ${clientInfo.name}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #2D3436;
            background: white;
        }

        .page {
            page-break-after: always;
            min-height: 100vh;
            padding: 40px;
            position: relative;
        }

        .page:last-child { page-break-after: auto; }

        /* Cover Page */
        .cover-page {
            background: linear-gradient(135deg, #2D3436 0%, #636E72 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .cover-logo {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            letter-spacing: 0.1em;
            margin-bottom: 3rem;
        }

        .cover-title {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .cover-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 3rem;
        }

        .cover-info {
            background: rgba(255,255,255,0.1);
            padding: 2rem 3rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }

        .cover-info p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
        }

        .cover-zones {
            margin-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.3);
            padding-top: 2rem;
        }

        .cover-zones h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            margin-bottom: 1rem;
        }

        .zone-item {
            display: inline-block;
            margin: 0.5rem 1rem;
            font-size: 0.95rem;
        }

        /* Standard Page Header */
        .page-header {
            border-bottom: 2px solid #2D3436;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .page-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: #2D3436;
        }

        .page-logo {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            color: #636E72;
        }

        /* Introduction Page */
        .intro-section {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .intro-photo {
            width: 200px;
            height: 200px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #636E72;
        }

        .intro-text {
            flex: 1;
        }

        .intro-text h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .intro-text p {
            color: #636E72;
            margin-bottom: 1rem;
        }

        /* Table of Contents */
        .toc-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px dotted #ddd;
        }

        .toc-item:hover { background: #f8f8f8; }

        .toc-title { font-weight: 500; }
        .toc-page { color: #636E72; }

        /* Day Section */
        .day-header {
            background: #2D3436;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }

        .day-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
        }

        .day-location {
            font-size: 0.9rem;
            opacity: 0.9;
            margin-top: 0.25rem;
        }

        .activity-card {
            background: #f8f9fa;
            border-left: 4px solid #2D3436;
            padding: 1rem 1.5rem;
            margin-bottom: 1rem;
            border-radius: 0 8px 8px 0;
        }

        .activity-name {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .activity-description {
            color: #636E72;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .activity-details {
            display: flex;
            gap: 1.5rem;
            font-size: 0.85rem;
            color: #636E72;
        }

        .activity-details span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        /* Journey Overview Table */
        .journey-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }

        .journey-table th {
            background: #2D3436;
            color: white;
            padding: 0.75rem;
            text-align: left;
        }

        .journey-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #eee;
        }

        .journey-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        /* Pricing Page */
        .pricing-box {
            background: linear-gradient(135deg, #2D3436 0%, #636E72 100%);
            color: white;
            padding: 3rem;
            border-radius: 12px;
            text-align: center;
            margin: 2rem 0;
        }

        .pricing-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .pricing-amount {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin: 1rem 0;
        }

        .pricing-includes {
            margin-top: 2rem;
            text-align: left;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }

        .pricing-includes h4 {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        .pricing-includes li {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }

        .pricing-includes li:before {
            content: "\\2713";
            position: absolute;
            left: 0;
            color: #00b894;
        }

        /* Terms & Conditions */
        .terms h2 { margin-bottom: 1.5rem; }
        .terms h3 {
            font-size: 1rem;
            margin: 1.5rem 0 0.75rem;
            color: #2D3436;
        }
        .terms ul {
            padding-left: 1.5rem;
            color: #636E72;
        }
        .terms li { margin: 0.5rem 0; }

        /* Footer */
        .page-footer {
            position: absolute;
            bottom: 20px;
            left: 40px;
            right: 40px;
            text-align: center;
            font-size: 0.8rem;
            color: #636E72;
            border-top: 1px solid #eee;
            padding-top: 1rem;
        }

        @media print {
            .page { padding: 20px; }
            .page-footer { position: fixed; bottom: 10px; }
        }
    </style>
</head>
<body>

<!-- PAGE 1: Cover Page -->
<div class="page cover-page">
    <div class="cover-logo">BALIWITHFLOW</div>
    <div class="cover-title">BALI TRAVEL ITINERARY</div>
    <div class="cover-subtitle">A Bespoke Journey Crafted For You</div>

    <div class="cover-info">
        <p><strong>${clientInfo.name}</strong></p>
        <p>${clientInfo.nbPersons} Guest${clientInfo.nbPersons > 1 ? 's' : ''}</p>
        <p>${this.formatDateShort(clientInfo.startDate)} - ${this.formatDateShort(clientInfo.endDate)}</p>
        <p>${clientInfo.days} Days / ${clientInfo.nights} Nights</p>
    </div>

    <div class="cover-zones">
        <h3>YOUR JOURNEY</h3>
        ${Object.entries(zones).map(([zone, data]) =>
            `<span class="zone-item">${zone} (${data.nights} night${data.nights > 1 ? 's' : ''})</span>`
        ).join('')}
    </div>
</div>

<!-- PAGE 2: Introduction -->
<div class="page">
    <div class="page-header">
        <h1>About Baliwithflow</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <div class="intro-section">
        <div class="intro-photo">
            <span>Photo</span>
        </div>
        <div class="intro-text">
            <h2>Meet Your Travel Designer</h2>
            <p>${COMPANY_INTRO.floraBio}</p>
        </div>
    </div>

    <div class="intro-text">
        <h2>About Our Company</h2>
        <p>${COMPANY_INTRO.companyDescription}</p>
    </div>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

<!-- PAGE 3: Table of Contents -->
<div class="page">
    <div class="page-header">
        <h1>Table of Contents</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <div class="toc-item">
        <span class="toc-title">1. Your Bali Journey (Map)</span>
        <span class="toc-page">4</span>
    </div>
    ${Object.entries(zones).map(([zone, data], index) => `
    <div class="toc-item">
        <span class="toc-title">${index + 2}. ${zone} (${data.nights} night${data.nights > 1 ? 's' : ''})</span>
        <span class="toc-page">${5 + index}</span>
    </div>
    `).join('')}
    <div class="toc-item">
        <span class="toc-title">Journey Overview</span>
        <span class="toc-page">${5 + Object.keys(zones).length}</span>
    </div>
    <div class="toc-item">
        <span class="toc-title">Pricing</span>
        <span class="toc-page">${6 + Object.keys(zones).length}</span>
    </div>
    <div class="toc-item">
        <span class="toc-title">Terms & Conditions</span>
        <span class="toc-page">${7 + Object.keys(zones).length}</span>
    </div>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

<!-- PAGE 4: Map / Journey Overview -->
<div class="page">
    <div class="page-header">
        <h1>Your Bali Journey</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; text-align: center;">
        <p style="color: #636E72; margin-bottom: 1rem;">Interactive Trip Map</p>
        <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #e8f4f8 0%, #d4e8e4 100%); border-radius: 8px; flex-direction: column; gap: 1rem;">
            <i style="font-size: 3rem; color: #2D3436;">Map</i>
            <a href="${this.generateGoogleMapsUrl() || '#'}"
               target="_blank"
               style="background: #2D3436; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
                Open Interactive Map in Google Maps
            </a>
        </div>
        <p style="margin-top: 1rem; font-size: 0.85rem; color: #636E72;">
            Click the button above to view your complete journey route on Google Maps
        </p>
    </div>

    <table class="journey-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Zone</th>
                <th>Nights</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(zones).map(([zone, data], index) => `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${zone}</strong></td>
                <td>${data.nights}</td>
                <td>${ZONE_DESCRIPTIONS[zone] || 'Beautiful destination in Bali'}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

<!-- DAY BY DAY PAGES -->
${Object.keys(activities).sort((a, b) => parseInt(a) - parseInt(b)).map(day => {
    const dayActivities = activities[day];
    const dayDate = new Date(clientInfo.startDate);
    dayDate.setDate(dayDate.getDate() + parseInt(day) - 1);
    const mainLocation = dayActivities[0]?.location || 'Bali';

    return `
<div class="page">
    <div class="page-header">
        <h1>Day ${day}</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <div class="day-header">
        <div class="day-title">Day ${day} - ${this.formatDate(dayDate.toISOString())}</div>
        <div class="day-location">${mainLocation}</div>
    </div>

    ${dayActivities.map(activity => {
        const desc = activity.customDescription || activity.description;
        return `
    <div class="activity-card">
        <div class="activity-name">${activity.name}</div>
        <div class="activity-description">${desc}</div>
        <div class="activity-details">
            <span>${activity.duration}</span>
            <span>${activity.location}</span>
            ${activity.mealsIncluded ? `<span>Meals: ${activity.mealsIncluded}</span>` : ''}
        </div>
    </div>
        `;
    }).join('')}

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>
    `;
}).join('')}

<!-- JOURNEY OVERVIEW PAGE -->
<div class="page">
    <div class="page-header">
        <h1>Journey Overview</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <table class="journey-table">
        <thead>
            <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Location</th>
                <th>Activities</th>
                <th>Meals</th>
                <th>Driver</th>
            </tr>
        </thead>
        <tbody>
            ${Object.keys(activities).sort((a, b) => parseInt(a) - parseInt(b)).map(day => {
                const dayActivities = activities[day];
                const dayDate = new Date(clientInfo.startDate);
                dayDate.setDate(dayDate.getDate() + parseInt(day) - 1);
                const location = dayActivities[0]?.location || '-';
                const activityNames = dayActivities.map(a => a.name).join(', ');
                const meals = dayActivities.map(a => a.mealsIncluded).filter(m => m).join(', ') || '-';
                const hasTransfer = transfers.some(t => t.day == day);

                return `
            <tr>
                <td>${day}</td>
                <td>${this.formatDateShort(dayDate.toISOString())}</td>
                <td>${location}</td>
                <td>${activityNames.substring(0, 50)}${activityNames.length > 50 ? '...' : ''}</td>
                <td>${meals}</td>
                <td>${hasTransfer ? 'Yes' : 'No'}</td>
            </tr>
                `;
            }).join('')}
        </tbody>
    </table>

    <p style="margin-top: 1rem; font-size: 0.85rem; color: #636E72;">
        <strong>Meals Legend:</strong> B = Breakfast, L = Lunch, D = Dinner
    </p>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

<!-- PRICING PAGE -->
<div class="page">
    <div class="page-header">
        <h1>Pricing Summary</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <p style="color: #636E72; margin-bottom: 2rem;">
        This itinerary has been carefully crafted to provide you with an unforgettable Bali experience.
    </p>

    <div class="pricing-box">
        <div class="pricing-title">TOTAL PACKAGE PRICE</div>
        <div class="pricing-amount">$ ${this.calculateTotalUSD().toLocaleString()} USD</div>
        <p>For ${clientInfo.nbPersons} guest${clientInfo.nbPersons > 1 ? 's' : ''}</p>

        <div class="pricing-includes">
            <h4>Price Includes:</h4>
            <ul style="list-style: none;">
                <li>All activities as per itinerary</li>
                <li>Private transfers throughout</li>
                <li>English-speaking driver/guide</li>
                <li>Entrance fees to attractions</li>
                <li>Meals as specified</li>
            </ul>
        </div>
    </div>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

<!-- TERMS & CONDITIONS PAGE -->
<div class="page">
    <div class="page-header">
        <h1>Terms & Conditions</h1>
        <span class="page-logo">BALIWITHFLOW</span>
    </div>

    <div class="terms">
        ${TERMS_CONDITIONS}
    </div>

    <div class="page-footer">
        Baliwithflow - Bespoke Bali Experiences
    </div>
</div>

</body>
</html>`;

        return html;
    }

    // Calculate total in USD
    calculateTotalUSD() {
        const { activities, transfers, clientInfo, accommodations } = this.state;
        const exchangeRate = this.getExchangeRate();
        let totalIDR = 0;

        // Sum activities (using priceIDR if available, else convert from EUR)
        Object.values(activities).forEach(dayActivities => {
            dayActivities.forEach(activity => {
                const priceIDR = activity.priceIDR || (activity.price * 17000);
                totalIDR += priceIDR * clientInfo.nbPersons;
            });
        });

        // Add estimated transfer costs (500,000 IDR per transfer)
        totalIDR += transfers.length * 500000;

        // Add accommodations
        if (accommodations && accommodations.length > 0) {
            accommodations.forEach(acc => {
                totalIDR += (acc.pricePerNight || 0) * (acc.nights || 0);
            });
        }

        return Math.round(totalIDR / exchangeRate);
    }

    // Calculate accommodations total in IDR
    calculateAccommodationsTotal() {
        const { accommodations } = this.state;
        if (!accommodations || accommodations.length === 0) return 0;

        return accommodations.reduce((total, acc) => {
            return total + ((acc.pricePerNight || 0) * (acc.nights || 0));
        }, 0);
    }

    // ===== DRIVER BRIEFING =====
    generateDriverRecapHTML() {
        const { clientInfo, activities, transfers } = this.state;

        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Driver Briefing - ${clientInfo.name}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
            color: #333;
        }
        h1 { color: #2D3436; border-bottom: 3px solid #2D3436; padding-bottom: 10px; }
        h2 { color: #2D3436; margin-top: 2rem; }

        .client-header {
            background: #2D3436;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 2rem;
        }

        .client-header h1 {
            color: white;
            border: none;
            margin: 0;
        }

        .client-info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }

        .day-section {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            page-break-inside: avoid;
        }

        .day-title {
            background: #2D3436;
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            margin-bottom: 1rem;
            font-weight: bold;
        }

        .task-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid #eee;
        }

        .task-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #2D3436;
            border-radius: 4px;
            flex-shrink: 0;
        }

        .task-time {
            width: 80px;
            border: 1px solid #ddd;
            padding: 5px;
            border-radius: 4px;
            font-family: monospace;
            text-align: center;
        }

        .task-details {
            flex: 1;
        }

        .task-name {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .task-info {
            font-size: 0.9rem;
            color: #636E72;
        }

        .task-info a {
            color: #0066cc;
            text-decoration: none;
        }

        .hotel-badge {
            background: #00b894;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-left: 0.5rem;
        }

        .contact-section {
            background: #fff3cd;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }

        @media print {
            body { padding: 10px; }
            .day-section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>

<div class="client-header">
    <h1>DRIVER BRIEFING</h1>
    <div class="client-info-grid">
        <div>
            <strong>Client:</strong> ${clientInfo.name}<br>
            <strong>WhatsApp:</strong> ${clientInfo.whatsapp || 'N/A'}
        </div>
        <div>
            <strong>Dates:</strong> ${this.formatDateShort(clientInfo.startDate)} - ${this.formatDateShort(clientInfo.endDate)}<br>
            <strong>Guests:</strong> ${clientInfo.nbPersons} person${clientInfo.nbPersons > 1 ? 's' : ''}
        </div>
    </div>
</div>

${Object.keys(activities).sort((a, b) => parseInt(a) - parseInt(b)).map(day => {
    const dayActivities = activities[day];
    const dayDate = new Date(clientInfo.startDate);
    dayDate.setDate(dayDate.getDate() + parseInt(day) - 1);
    const dayTransfers = transfers.filter(t => t.day == day);

    return `
<div class="day-section">
    <div class="day-title">DAY ${day} - ${this.formatDate(dayDate.toISOString())}</div>

    ${dayTransfers.length > 0 ? dayTransfers.map(transfer => `
    <div class="task-item">
        <div class="task-checkbox"></div>
        <input type="text" class="task-time" placeholder="__:__">
        <div class="task-details">
            <div class="task-name">Transfer: ${transfer.from} → ${transfer.to}</div>
            <div class="task-info">
                Vehicle: ${transfer.vehicle}<br>
                <a href="https://www.google.com/maps/dir/${encodeURIComponent(transfer.from)}/${encodeURIComponent(transfer.to)}" target="_blank">Open in Google Maps</a>
            </div>
        </div>
    </div>
    `).join('') : ''}

    ${dayActivities.map(activity => `
    <div class="task-item">
        <div class="task-checkbox"></div>
        <input type="text" class="task-time" placeholder="__:__">
        <div class="task-details">
            <div class="task-name">
                ${activity.name}
                ${activity.location ? `<span class="hotel-badge">${activity.location}</span>` : ''}
            </div>
            <div class="task-info">
                Duration: ${activity.duration}<br>
                ${activity.contact ? `Contact: ${activity.contact}<br>` : ''}
                ${activity.googleMaps ? `<a href="${activity.googleMaps}" target="_blank">Open in Google Maps</a>` : ''}
            </div>
        </div>
    </div>
    `).join('')}
</div>
    `;
}).join('')}

<div class="contact-section">
    <h3>Emergency Contacts</h3>
    <p>Baliwithflow Office: [Your phone number]</p>
    <p>Client WhatsApp: ${clientInfo.whatsapp || 'N/A'}</p>
</div>

<div style="margin-top: 2rem; text-align: center; color: #636E72;">
    <p>Generated on ${new Date().toLocaleDateString('en-US')}</p>
    <p>Baliwithflow - Driver Briefing</p>
</div>

</body>
</html>`;

        return html;
    }

    // ===== CLIENT SCHEDULE (Simplified) =====
    generateClientScheduleHTML() {
        const { clientInfo, activities, transfers } = this.state;

        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Travel Schedule - ${clientInfo.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #2D3436;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2rem;
            color: #2D3436;
            margin-bottom: 10px;
        }

        .header p {
            color: #636E72;
        }

        .day-section {
            margin-bottom: 2rem;
            page-break-inside: avoid;
        }

        .day-header {
            background: #2D3436;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .schedule-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 0.75rem;
        }

        .time-slot {
            width: 80px;
            border: 1px dashed #ccc;
            padding: 8px;
            border-radius: 4px;
            text-align: center;
            font-family: monospace;
            background: white;
        }

        .item-details {
            flex: 1;
        }

        .item-name {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .item-info {
            font-size: 0.9rem;
            color: #636E72;
        }

        .footer {
            margin-top: 3rem;
            text-align: center;
            color: #636E72;
            font-size: 0.9rem;
        }

        @media print {
            body { padding: 20px; }
        }
    </style>
</head>
<body>

<div class="header">
    <h1>YOUR TRAVEL SCHEDULE</h1>
    <p>${clientInfo.name} | ${this.formatDateShort(clientInfo.startDate)} - ${this.formatDateShort(clientInfo.endDate)}</p>
    <p>${clientInfo.days} Days, ${clientInfo.nights} Nights | ${clientInfo.nbPersons} Guest${clientInfo.nbPersons > 1 ? 's' : ''}</p>
</div>

${Object.keys(activities).sort((a, b) => parseInt(a) - parseInt(b)).map(day => {
    const dayActivities = activities[day];
    const dayDate = new Date(clientInfo.startDate);
    dayDate.setDate(dayDate.getDate() + parseInt(day) - 1);
    const mainLocation = dayActivities[0]?.location || 'Bali';
    const dayTransfers = transfers.filter(t => t.day == day);

    return `
<div class="day-section">
    <div class="day-header">
        <strong>Day ${day}</strong> - ${this.formatDate(dayDate.toISOString())} | ${mainLocation}
    </div>

    ${dayTransfers.length > 0 ? dayTransfers.map(transfer => `
    <div class="schedule-item">
        <div class="time-slot">__:__</div>
        <div class="item-details">
            <div class="item-name">Transfer: ${transfer.from} → ${transfer.to}</div>
            <div class="item-info">Vehicle: ${transfer.vehicle}</div>
        </div>
    </div>
    `).join('') : ''}

    ${dayActivities.map(activity => {
        const desc = activity.customDescription || activity.description;
        return `
    <div class="schedule-item">
        <div class="time-slot">__:__</div>
        <div class="item-details">
            <div class="item-name">${activity.name}</div>
            <div class="item-info">
                ${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}<br>
                <em>${activity.duration} | ${activity.location}</em>
                ${activity.mealsIncluded ? `<br>Meals: ${activity.mealsIncluded}` : ''}
            </div>
        </div>
    </div>
        `;
    }).join('')}
</div>
    `;
}).join('')}

<div class="footer">
    <p>Fill in the time slots as your schedule is confirmed.</p>
    <p>For any questions, contact us via WhatsApp.</p>
    <p><strong>Baliwithflow</strong> - Your Bali Travel Partner</p>
</div>

</body>
</html>`;

        return html;
    }

    // ===== QUOTATION (IDR with USD conversion) =====
    generateQuotationData() {
        const { clientInfo, activities, transfers, accommodations } = this.state;
        const exchangeRate = this.getExchangeRate();

        let data = {
            client: clientInfo.name,
            dates: `${this.formatDateShort(clientInfo.startDate)} - ${this.formatDateShort(clientInfo.endDate)}`,
            guests: clientInfo.nbPersons,
            activities: [],
            accommodations: accommodations || [],
            transfers: [],
            totals: {
                activitiesIDR: 0,
                accommodationsIDR: 0,
                transfersIDR: 0,
                grandTotalIDR: 0,
                grandTotalUSD: 0
            },
            exchangeRate: exchangeRate
        };

        // Calculate activities
        Object.keys(activities).forEach(day => {
            activities[day].forEach(activity => {
                const priceIDR = activity.priceIDR || (activity.price * 17000);
                const totalIDR = priceIDR * clientInfo.nbPersons;
                data.activities.push({
                    day: day,
                    name: activity.name,
                    pricePerPaxIDR: priceIDR,
                    guests: clientInfo.nbPersons,
                    totalIDR: totalIDR
                });
                data.totals.activitiesIDR += totalIDR;
            });
        });

        // Calculate transfers (estimated 500,000 IDR per transfer)
        transfers.forEach(transfer => {
            const priceIDR = 500000;
            data.transfers.push({
                day: transfer.day,
                route: `${transfer.from} → ${transfer.to}`,
                vehicle: transfer.vehicle,
                priceIDR: priceIDR
            });
            data.totals.transfersIDR += priceIDR;
        });

        // Calculate accommodations
        if (data.accommodations && data.accommodations.length > 0) {
            data.accommodations.forEach(acc => {
                const total = (acc.pricePerNight || 0) * (acc.nights || 0);
                acc.totalIDR = total;
                data.totals.accommodationsIDR += total;
            });
        }

        // Grand totals
        data.totals.grandTotalIDR = data.totals.activitiesIDR + data.totals.accommodationsIDR + data.totals.transfersIDR;
        data.totals.grandTotalUSD = Math.round(data.totals.grandTotalIDR / exchangeRate);

        return data;
    }

    generateQuotationCSV() {
        const data = this.generateQuotationData();

        let csv = `INTERNAL QUOTATION - ${data.client}\n`;
        csv += `Dates: ${data.dates}\n`;
        csv += `Guests: ${data.guests}\n`;
        csv += `Exchange Rate: 1 USD = ${data.exchangeRate.toLocaleString()} IDR\n\n`;

        csv += `ACTIVITIES (IDR)\n`;
        csv += `Day,Activity,Price/Pax (IDR),Guests,Total (IDR)\n`;

        data.activities.forEach(act => {
            csv += `${act.day},"${act.name}","${act.pricePerPaxIDR.toLocaleString()}",${act.guests},"${act.totalIDR.toLocaleString()}"\n`;
        });

        csv += `\nSUBTOTAL ACTIVITIES,,,,"${data.totals.activitiesIDR.toLocaleString()} IDR"\n\n`;

        if (data.accommodations.length > 0) {
            csv += `ACCOMMODATIONS (IDR)\n`;
            csv += `Zone,Property,Nights,Price/Night (IDR),Total (IDR)\n`;

            data.accommodations.forEach(acc => {
                const total = (acc.pricePerNight || 0) * (acc.nights || 0);
                csv += `"${acc.zone}","${acc.propertyName}",${acc.nights},"${(acc.pricePerNight || 0).toLocaleString()}","${total.toLocaleString()}"\n`;
            });

            csv += `\nSUBTOTAL ACCOMMODATIONS,,,,"${data.totals.accommodationsIDR.toLocaleString()} IDR"\n\n`;
        }

        csv += `TRANSFERS (IDR)\n`;
        csv += `Day,Route,Vehicle,Price (IDR)\n`;

        data.transfers.forEach(transfer => {
            csv += `${transfer.day},"${transfer.route}",${transfer.vehicle},"${transfer.priceIDR.toLocaleString()}"\n`;
        });

        csv += `\nSUBTOTAL TRANSFERS,,,"${data.totals.transfersIDR.toLocaleString()} IDR"\n`;

        csv += `\n========================================\n`;
        csv += `GRAND TOTAL (IDR),,,"${data.totals.grandTotalIDR.toLocaleString()} IDR"\n`;
        csv += `Exchange Rate: 1 USD = ${data.exchangeRate.toLocaleString()} IDR\n`;
        csv += `GRAND TOTAL (USD),,,"$ ${data.totals.grandTotalUSD.toLocaleString()} USD"\n`;
        csv += `========================================\n`;

        return csv;
    }

    // ===== EXPORT FUNCTIONS =====
    exportToPDF(type = 'client') {
        let html;
        switch(type) {
            case 'client':
                html = this.generateClientItineraryHTML();
                break;
            case 'driver':
                html = this.generateDriverRecapHTML();
                break;
            case 'clientSchedule':
                html = this.generateClientScheduleHTML();
                break;
            default:
                html = this.generateClientItineraryHTML();
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();

        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    exportToWord(type = 'client') {
        let html;
        switch(type) {
            case 'client':
                html = this.generateClientItineraryHTML();
                break;
            case 'driver':
                html = this.generateDriverRecapHTML();
                break;
            case 'clientSchedule':
                html = this.generateClientScheduleHTML();
                break;
            default:
                html = this.generateClientItineraryHTML();
        }

        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_itinerary_${this.state.clientInfo.name}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToCSV() {
        const csv = this.generateQuotationCSV();
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quotation_${this.state.clientInfo.name}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Global export function
function exportDocument(type) {
    const exporter = new ExportEngine(appState);

    switch(type) {
        case 'pdf':
            exporter.exportToPDF('client');
            showNotification('Opening PDF in new window...', 'success');
            break;
        case 'clientSchedule':
            exporter.exportToPDF('clientSchedule');
            showNotification('Opening Client Schedule...', 'success');
            break;
        case 'driver':
            exporter.exportToPDF('driver');
            showNotification('Opening Driver Briefing...', 'success');
            break;
        case 'quotation':
            exporter.exportToCSV();
            showNotification('Downloading quotation CSV...', 'success');
            break;
        default:
            showNotification('Unknown export type', 'error');
    }
}

// Notification system
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
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
