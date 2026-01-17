// Export Engine - Génération de documents
// Ce fichier contient les fonctions pour générer les différents types de documents

class ExportEngine {
    constructor(appState) {
        this.state = appState;
    }

    // Génération HTML pour PDF
    generateClientItineraryHTML() {
        const { clientInfo, activities, transfers, photos } = this.state;
        
        let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Itinéraire - ${clientInfo.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            border-bottom: 4px solid #2563eb;
            padding-bottom: 30px;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #2563eb;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .client-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
        }
        .day-section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        .day-title {
            background: #2563eb;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }
        .activity {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .activity h3 {
            color: #2563eb;
            margin-bottom: 10px;
        }
        .activity-details {
            color: #64748b;
            font-size: 0.9rem;
        }
        .photo-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .photo-gallery img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #64748b;
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
        }
        @media print {
            body { padding: 20px; }
            .day-section { page-break-after: always; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🗺️ Votre Itinéraire Personnalisé</h1>
        <p style="font-size: 1.2rem; color: #64748b;">Voyage sur mesure</p>
    </div>

    <div class="client-info">
        <h2>📋 Informations de votre séjour</h2>
        <p><strong>Client:</strong> ${clientInfo.name}</p>
        <p><strong>Dates:</strong> Du ${this.formatDate(clientInfo.startDate)} au ${this.formatDate(clientInfo.endDate)}</p>
        <p><strong>Participants:</strong> ${clientInfo.nbPersons} personne(s)</p>
        ${clientInfo.notes ? `<p><strong>Notes:</strong> ${clientInfo.notes}</p>` : ''}
    </div>
`;

        // Ajouter les jours et activités
        Object.keys(activities).sort((a, b) => a - b).forEach(day => {
            const dayActivities = activities[day];
            html += `
    <div class="day-section">
        <div class="day-title">📅 Jour ${day}</div>
`;
            dayActivities.forEach(activity => {
                html += `
        <div class="activity">
            <h3>${activity.name}</h3>
            <p>${activity.description}</p>
            <div class="activity-details">
                <span>⏱️ ${activity.duration}</span> | 
                <span>📍 ${activity.location}</span> | 
                <span>👥 ${activity.capacity}</span> | 
                <span>💰 ${activity.price}€</span>
            </div>
        </div>
`;
            });
            html += `    </div>\n`;
        });

        // Ajouter les photos si disponibles
        if (photos && photos.length > 0) {
            html += `
    <div class="day-section">
        <div class="day-title">📸 Photos</div>
        <div class="photo-gallery">
`;
            photos.forEach(photo => {
                html += `            <img src="${photo}" alt="Photo du voyage">\n`;
            });
            html += `        </div>
    </div>
`;
        }

        html += `
    <div class="footer">
        <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
        <p>ItinérairePro - Votre partenaire voyage</p>
    </div>
</body>
</html>`;

        return html;
    }

    // Génération du récapitulatif chauffeurs
    generateDriverRecapHTML() {
        const { clientInfo, activities, transfers } = this.state;
        
        let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Récapitulatif Chauffeurs - ${clientInfo.name}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
        }
        h1 { color: #2563eb; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background: #2563eb;
            color: white;
        }
        .contact-section {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        .map-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🚗 Récapitulatif Chauffeurs</h1>
    
    <div class="contact-section">
        <h2>Client: ${clientInfo.name}</h2>
        <p><strong>Dates:</strong> ${this.formatDate(clientInfo.startDate)} au ${this.formatDate(clientInfo.endDate)}</p>
        <p><strong>Participants:</strong> ${clientInfo.nbPersons} personne(s)</p>
        ${clientInfo.email ? `<p><strong>Email:</strong> ${clientInfo.email}</p>` : ''}
    </div>

    <h2>📍 Programme des transferts</h2>
    <table>
        <thead>
            <tr>
                <th>Jour</th>
                <th>Départ</th>
                <th>Destination</th>
                <th>Véhicule</th>
                <th>Lien Maps</th>
            </tr>
        </thead>
        <tbody>
`;

        transfers.forEach(transfer => {
            html += `
            <tr>
                <td>Jour ${transfer.day}</td>
                <td>${transfer.from}</td>
                <td>${transfer.to}</td>
                <td>${transfer.vehicle}</td>
                <td><a href="https://www.google.com/maps/dir/${encodeURIComponent(transfer.from)}/${encodeURIComponent(transfer.to)}" class="map-link" target="_blank">🗺️ Voir itinéraire</a></td>
            </tr>
`;
        });

        html += `
        </tbody>
    </table>

    <h2>📞 Contacts Partenaires</h2>
`;

        partnersDatabase.forEach(partner => {
            html += `
    <div class="contact-section">
        <h3>${partner.name} (${partner.type})</h3>
        <p><strong>Téléphone:</strong> ${partner.contact.phone}</p>
        <p><strong>Email:</strong> ${partner.contact.email}</p>
        <p><strong>Adresse:</strong> ${partner.contact.address}</p>
        ${partner.googleMaps ? `<p><a href="${partner.googleMaps}" class="map-link" target="_blank">🗺️ Google Maps</a></p>` : ''}
    </div>
`;
        });

        html += `
    <div style="margin-top: 40px; text-align: center; color: #64748b;">
        <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>
</body>
</html>`;

        return html;
    }

    // Génération de la quotation (CSV/Excel format)
    generateQuotationData() {
        const { clientInfo, activities, transfers } = this.state;
        
        let data = {
            client: clientInfo.name,
            dates: `${clientInfo.startDate} au ${clientInfo.endDate}`,
            activities: [],
            transfers: [],
            totals: {
                activitiesTotal: 0,
                transfersTotal: 0,
                grandTotal: 0
            }
        };

        // Calculer les activités
        Object.keys(activities).forEach(day => {
            activities[day].forEach(activity => {
                data.activities.push({
                    jour: day,
                    nom: activity.name,
                    prix: activity.price,
                    quantite: 1,
                    total: activity.price
                });
                data.totals.activitiesTotal += activity.price;
            });
        });

        // Estimer les transferts (prix exemple)
        transfers.forEach(transfer => {
            const prix = 50; // Prix par défaut
            data.transfers.push({
                jour: transfer.day,
                trajet: `${transfer.from} → ${transfer.to}`,
                vehicule: transfer.vehicle,
                prix: prix
            });
            data.totals.transfersTotal += prix;
        });

        data.totals.grandTotal = data.totals.activitiesTotal + data.totals.transfersTotal;

        return data;
    }

    // Génération CSV pour Excel
    generateQuotationCSV() {
        const data = this.generateQuotationData();
        
        let csv = 'QUOTATION - ' + data.client + '\n';
        csv += 'Dates: ' + data.dates + '\n\n';
        
        csv += 'ACTIVITÉS\n';
        csv += 'Jour,Activité,Prix Unitaire,Quantité,Total\n';
        
        data.activities.forEach(act => {
            csv += `${act.jour},"${act.nom}",${act.prix},${act.quantite},${act.total}\n`;
        });
        
        csv += `\nTOTAL ACTIVITÉS,,,,"${data.totals.activitiesTotal}€"\n\n`;
        
        csv += 'TRANSFERTS\n';
        csv += 'Jour,Trajet,Véhicule,Prix\n';
        
        data.transfers.forEach(transfer => {
            csv += `${transfer.jour},"${transfer.trajet}",${transfer.vehicule},${transfer.prix}\n`;
        });
        
        csv += `\nTOTAL TRANSFERTS,,,"${data.totals.transfersTotal}€"\n`;
        csv += `\nGRAND TOTAL,,,"${data.totals.grandTotal}€"\n`;
        
        return csv;
    }

    // Utilitaire: formater les dates
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Export PDF (ouvre dans nouvelle fenêtre pour impression)
    exportToPDF(type = 'client') {
        const html = type === 'client' 
            ? this.generateClientItineraryHTML() 
            : this.generateDriverRecapHTML();
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        
        // Attendre le chargement puis imprimer
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    // Export Word (télécharge HTML qui peut être ouvert dans Word)
    exportToWord(type = 'client') {
        const html = type === 'client' 
            ? this.generateClientItineraryHTML() 
            : this.generateDriverRecapHTML();
        
        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `itineraire_${this.state.clientInfo.name}_${type}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Export CSV
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

// Fonction globale pour l'export
function exportDocument(type) {
    const exporter = new ExportEngine(appState);
    
    switch(type) {
        case 'pdf':
            exporter.exportToPDF('client');
            showNotification('Ouverture du PDF dans une nouvelle fenêtre...', 'success');
            break;
        case 'word':
            exporter.exportToWord('client');
            showNotification('Téléchargement du document Word...', 'success');
            break;
        case 'driver':
            exporter.exportToPDF('driver');
            showNotification('Ouverture du récapitulatif chauffeurs...', 'success');
            break;
        case 'quotation':
            exporter.exportToCSV();
            showNotification('Téléchargement de la quotation Excel...', 'success');
            break;
        default:
            showNotification('Type d\'export non reconnu', 'error');
    }
}

// Notification système
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
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

// Ajouter les animations CSS
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
