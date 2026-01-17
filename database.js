// Activities Database
const activitiesDatabase = [
    {
        id: 1,
        name: "Visite du Louvre",
        description: "Découverte des collections du plus grand musée du monde",
        duration: "3h",
        location: "Paris, 1er arrondissement",
        price: 45,
        category: "Culture",
        capacity: "2-10 personnes"
    },
    {
        id: 2,
        name: "Tour Eiffel",
        description: "Montée au sommet de la Dame de Fer",
        duration: "2h",
        location: "Champ de Mars, Paris",
        price: 35,
        category: "Monument",
        capacity: "Illimité"
    },
    {
        id: 3,
        name: "Croisière sur la Seine",
        description: "Bateau-mouche avec commentaires",
        duration: "1h30",
        location: "Port de la Bourdonnais",
        price: 25,
        category: "Loisirs",
        capacity: "2-50 personnes"
    },
    {
        id: 4,
        name: "Château de Versailles",
        description: "Visite des appartements royaux et jardins",
        duration: "5h",
        location: "Versailles",
        price: 65,
        category: "Culture",
        capacity: "2-20 personnes"
    },
    {
        id: 5,
        name: "Montmartre et Sacré-Cœur",
        description: "Balade dans le quartier des artistes",
        duration: "3h",
        location: "Montmartre, Paris 18e",
        price: 30,
        category: "Visite guidée",
        capacity: "2-15 personnes"
    },
    {
        id: 6,
        name: "Dégustation de vins",
        description: "Œnologie et découverte des vins français",
        duration: "2h",
        location: "Cave à vin, Marais",
        price: 55,
        category: "Gastronomie",
        capacity: "4-12 personnes"
    },
    {
        id: 7,
        name: "Shopping aux Galeries Lafayette",
        description: "Shopping avec personal shopper",
        duration: "3h",
        location: "Boulevard Haussmann",
        price: 40,
        category: "Shopping",
        capacity: "2-6 personnes"
    },
    {
        id: 8,
        name: "Disneyland Paris",
        description: "Journée complète au parc d'attractions",
        duration: "8h",
        location: "Marne-la-Vallée",
        price: 85,
        category: "Loisirs",
        capacity: "Illimité"
    }
];

// Partners Database
const partnersDatabase = [
    {
        id: 1,
        name: "Hôtel Le Meurice",
        type: "hotel",
        contact: {
            phone: "+33 1 44 58 10 10",
            email: "reservations@lemeurice.com",
            address: "228 Rue de Rivoli, 75001 Paris"
        },
        googleMaps: "https://goo.gl/maps/example1"
    },
    {
        id: 2,
        name: "VIP Transfer Paris",
        type: "transport",
        contact: {
            phone: "+33 6 12 34 56 78",
            email: "contact@viptransfer.fr",
            address: "Bureau: 15 Avenue des Champs-Élysées"
        },
        googleMaps: "https://goo.gl/maps/example2"
    },
    {
        id: 3,
        name: "Guide Touristique Marie Dubois",
        type: "guide",
        contact: {
            phone: "+33 6 98 76 54 32",
            email: "marie.dubois@guide-paris.fr",
            address: "Paris"
        },
        googleMaps: ""
    },
    {
        id: 4,
        name: "Restaurant Le Jules Verne",
        type: "restaurant",
        contact: {
            phone: "+33 1 45 55 61 44",
            email: "reservations@lejulesverne-paris.com",
            address: "Tour Eiffel, Avenue Gustave Eiffel"
        },
        googleMaps: "https://goo.gl/maps/example4"
    }
];

// Templates
const itineraryTemplate = {
    header: {
        title: "Votre Itinéraire Personnalisé",
        subtitle: "Découvrez votre voyage sur mesure"
    },
    sections: {
        clientInfo: true,
        dayByDay: true,
        hotels: true,
        transfers: true,
        contacts: true,
        terms: true
    },
    styling: {
        primaryColor: "#2563eb",
        fontFamily: "Arial, sans-serif"
    }
};
