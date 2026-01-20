// Bali Activities Database
const activitiesDatabase = [
    {
        id: 1,
        name: "Diving Liberty Wreck - Certified Diver",
        description: "You start your morning with the ocean just a few steps away. After a relaxed briefing, you gear up and walk straight into the sea. The first dive takes you to coral gardens and quiet underwater walls and the second one to the wreck covered in marine life. The visibility is clear, the current is gentle, and the world below moves slowly.",
        duration: "Half day",
        location: "Amed",
        priceIDR: 855000,
        priceWithMargin: 1600000,
        category: "Diving",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/v6y9C8whsxd83b49A",
        contact: "Fab : +6281239393738"
    },
    {
        id: 2,
        name: "Diving Liberty Wreck - Introductory Dive",
        description: "You begin with a calm introduction by the beach. Breathing, balance, and safety are gently explained. Then, with your instructor by your side for the first dive take you to coral gardens and quiet underwater walls and the second one to the wreck covered in marine life. The visibility is clear, the current is gentle.",
        duration: "Half day",
        location: "Amed",
        priceIDR: 1260000,
        priceWithMargin: 1900000,
        category: "Diving",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/v6y9C8whsxd83b49A",
        contact: "Fab : +6281239393738"
    },
    {
        id: 3,
        name: "Free Day in Amed",
        description: "Today is yours to enjoy at your own pace. Your driver is available to take you around Amed and beyond, depending on your mood. You might start with a slow morning walk along the volcanic beaches, watching fishermen return with their catch. Later, your driver can take you to a quiet cafe, explore the peaceful gardens of Taman Ujung Palace, or bring you to Virgin Beach.",
        duration: "Full day",
        location: "Amed",
        priceIDR: 1500000,
        priceWithMargin: 2100000,
        category: "Free Day",
        status: "READY",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 4,
        name: "Coral Reef Conservation Snorkeling",
        description: "Today is dedicated to the ocean. While one of you takes part in a guided coral reef conservation experience, the other explores deeper with a custom dive session. Led by eco-conscious guides, you learn about reef restoration, encounter vibrant marine life, and float in crystal-clear waters.",
        duration: "Full day",
        location: "Candidasa",
        priceIDR: 600000,
        priceWithMargin: 1200000,
        category: "Snorkeling",
        status: "READY",
        meals: "Lunch",
        googleMaps: "https://maps.app.goo.gl/T8nYmnxy4RAdepL76",
        contact: "Living Seas : +62 821-4745-0770"
    },
    {
        id: 5,
        name: "Free Day in East Bali",
        description: "This morning, your driver is available to take you wherever you feel like exploring. You can start with Taman Ujung Palace, a peaceful mix of Balinese and European architecture surrounded by mountains and ocean. From there, wander through the pools and sacred fountains of Tirta Gangga.",
        duration: "Full day",
        location: "Candidasa",
        priceIDR: 1500000,
        priceWithMargin: 2100000,
        category: "Free Day",
        status: "READY",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 6,
        name: "Free Day in Canggu",
        description: "A free day dedicated to relaxation at your villa by the pool. You may also choose to explore Canggu or try out one of the local spots in town. In the afternoon, you can also enjoy the benefits of a Balinese massage. Meals are at your leisure.",
        duration: "Full day",
        location: "Canggu",
        priceIDR: 950000,
        priceWithMargin: 1500000,
        category: "Free Day",
        status: "READY",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 7,
        name: "Surf in Canggu",
        description: "This morning, you meet Adhy and his team, a local surfer from Canggu. He takes you to a quiet spot on the beach where the waves are gentle. It's just the two of you: no big groups, no rush. He helps you catch your waves and shows you how to move with the ocean.",
        duration: "2-3 hours",
        location: "Canggu",
        priceIDR: 350000,
        priceWithMargin: 800000,
        category: "Sport",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/TRzr4r6eKfBvpwmv8",
        contact: "Adhy : +62 822-3463-7391"
    },
    {
        id: 8,
        name: "E-Bike Trip in Jatiluwih Ricefields",
        description: "This morning, you head out for a 2-hour electric bike adventure through the terraced rice fields of Jatiluwih, a UNESCO-listed landscape. After this immersive ride through nature, you visit a waterfall where you can take a swim.",
        duration: "Half day",
        location: "Jatiluwih",
        priceIDR: 665000,
        priceWithMargin: 1300000,
        category: "Adventure",
        status: "READY",
        meals: "Breakfast + Lunch",
        googleMaps: "https://maps.app.goo.gl/6VdNmMtptFXdvPCk6",
        contact: "Bali by Pedals : +6285253757355"
    },
    {
        id: 9,
        name: "Culture E-bike trip in Kintamani",
        description: "Your guide takes you early in the morning for a friendly electric bike ride, all downhill. Over 3 relaxed hours, you cycle through the enchanting pine forest, pass by coffee and orange plantations, and pause for a quiet moment at the beautiful Kehen Temple.",
        duration: "Full day",
        location: "Kintamani",
        priceIDR: 750000,
        priceWithMargin: 1600000,
        category: "Adventure",
        status: "READY",
        meals: "Lunch",
        googleMaps: "https://maps.app.goo.gl/YorpH2KZyCbVmYSN6",
        contact: "Eco Bike Coffe : +62 812-3674-8323"
    },
    {
        id: 10,
        name: "Batur Sunrise by Jeep",
        description: "You hop in a 4x4 at 4am before dawn and drive across black lava fields as the sun rises over Mount Batur. Then, you unwind at a day club with views of the Batur volcano and visit the floating Ulun Danu Temple in the afternoon.",
        duration: "Full day",
        location: "Kintamani",
        priceIDR: 600000,
        priceWithMargin: 1500000,
        category: "Adventure",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/pauqTQhh9nsdtkdT9",
        contact: "Okta : +6281291198388"
    },
    {
        id: 11,
        name: "Sunrise Batur Off the Crowds",
        description: "Before the sun rises, starting around 4am, your guide takes you to a quiet trail on the hidden side of Mount Batur. The walk is gentle, about an hour and a half. At the top, you pause to watch the first light spill over the valley. Your guide prepares a simple Balinese breakfast.",
        duration: "Half day",
        location: "Kintamani",
        priceIDR: 525000,
        priceWithMargin: 1300000,
        category: "Trekking",
        status: "READY",
        meals: "Breakfast",
        googleMaps: "https://maps.app.goo.gl/QvKbdv3Jsd2YvCzV6",
        contact: "Okta : +6281291198388"
    },
    {
        id: 12,
        name: "Dolphin Snorkeling Tour",
        description: "You start the day early, heading out by boat to snorkel with dolphins in the open sea: an unforgettable encounter with these graceful beings in their natural rhythm. Afterward, enjoy lunch by the coast before continuing to the nearby hot springs for a soothing soak.",
        duration: "Full day",
        location: "Lovina",
        priceIDR: 500000,
        priceWithMargin: 800000,
        category: "Snorkeling",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/cxvsSf8Vff3MUJpL8",
        contact: "Kadek : +62 878-6322-9639"
    },
    {
        id: 13,
        name: "Jungle Trekking Experience in Munduk with Canoe & Waterfall Tour",
        description: "This morning you meet with your local guide, you follow secret forest trails through ferns and ancient trees, reaching a peaceful lake where wooden canoes glide you across the misty water. Later, you will visit a waterfall.",
        duration: "Full day",
        location: "Munduk",
        priceIDR: 450000,
        priceWithMargin: 1700000,
        category: "Trekking",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/RFEGtLZya6BV1B6CA",
        contact: "Beski : +6281805417953"
    },
    {
        id: 14,
        name: "Waterfall tour in Munduk (easy)",
        description: "This morning, you'll meet your local guide and head into the highland forests of Munduk. You'll follow peaceful trails lined with ferns, cinnamon trees, and coffee plants. The path gently winds through lush jungle to unveil a series of serene waterfalls.",
        duration: "Half day",
        location: "Munduk",
        priceIDR: 125000,
        priceWithMargin: 650000,
        category: "Trekking",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/RFEGtLZya6BV1B6CA",
        contact: "Beski : +6281805417953"
    },
    {
        id: 15,
        name: "Day trip on Land East Side Nusa Penida",
        description: "In the morning, you'll board a fast boat from Bali to Nusa Penida. Your journey begins with a spiritual visit to the sacred Goa Giri Putri temple, hidden inside a dramatic limestone cave. Afterward, enjoy lunch at a local warung. In the afternoon, head to breathtaking Diamond Beach.",
        duration: "Full day",
        location: "Nusa Penida",
        priceIDR: 860000,
        priceWithMargin: 1800000,
        category: "Excursion",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/VPuVPU87paoYruvDA",
        contact: "Boat El Rey VIP: Arim +62 896-9519-2411, Driver Gex: +62 822-3744-6378"
    },
    {
        id: 16,
        name: "Day trip on Land West Side Nusa Penida",
        description: "You take the boat to Nusa Penida in the morning. After a 35-minute boat ride, visit the iconic Kelingking Beach viewpoint with its dramatic cliffside views. Later, head to Crystal Bay to swim, relax, or rent snorkel gear on-site.",
        duration: "Full day",
        location: "Nusa Penida",
        priceIDR: 860000,
        priceWithMargin: 1800000,
        category: "Excursion",
        status: "READY",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/VPuVPU87paoYruvDA",
        contact: "Boat El Rey VIP: Arim +62 896-9519-2411, Driver Gex: +62 822-3744-6378"
    },
    {
        id: 17,
        name: "Diving Manta Rays - Certified Diver",
        description: "Start your morning with a meet-up at 8:00 AM before heading out for guided boat dives at some of Nusa Penida's most spectacular underwater sites. This half-day experience is crafted for certified divers looking to explore rich marine biodiversity and possibly encounter majestic manta rays.",
        duration: "Half day",
        location: "Nusa Penida",
        priceIDR: 1400000,
        priceWithMargin: 2100000,
        category: "Diving",
        status: "READY",
        meals: "Snack",
        googleMaps: "https://maps.app.goo.gl/wqEqCAKSdHc99Mbv5",
        contact: "Karma Diving - Ivan : +33 6 75 11 84 07"
    },
    {
        id: 18,
        name: "Diving Manta Rays - Introductory Dive",
        description: "Begin your morning with a safety and skills briefing at 7:30 AM before heading out for two introductory dives often at Manta Point and Crystal Bay. Designed for beginners, this experience allows you to explore Bali's rich underwater world with certified instructors.",
        duration: "Half day",
        location: "Nusa Penida",
        priceIDR: 1600000,
        priceWithMargin: 2500000,
        category: "Diving",
        status: "READY",
        meals: "Snack",
        googleMaps: "https://maps.app.goo.gl/wqEqCAKSdHc99Mbv5",
        contact: "Karma Diving - Ivan : +33 6 75 11 84 07"
    },
    {
        id: 19,
        name: "Mix Boat Snorkeling + Land Tour from Bali to Nusa Penida",
        description: "In the early morning, you'll meet your guide and board a private boat in Sanur to cross to Nusa Penida. Begin your day exploring the island's vibrant marine world with snorkeling from Mangrove Point to Wall Bay where you may encounter turtles and manta rays.",
        duration: "Full day",
        location: "Nusa Penida",
        priceIDR: 2600000,
        priceWithMargin: 3640000,
        category: "Snorkeling",
        status: "READY",
        meals: "Lunch",
        googleMaps: "https://maps.app.goo.gl/2WWj6YBnnZBhyEZRA",
        contact: "Indo Compass : +62 822-6632-2998"
    },
    {
        id: 20,
        name: "Nusa Penida Snorkeling Tour with Manta Rays",
        description: "Start your day with a warm welcome at 8:00 AM at the diving center where you'll enjoy coffee or tea. At 8:30 AM, set off by boat to explore two of Nusa Penida's most stunning snorkeling spots typically Crystal Bay and Manta Point.",
        duration: "Half day",
        location: "Nusa Penida",
        priceIDR: 350000,
        priceWithMargin: 750000,
        category: "Snorkeling",
        status: "READY",
        meals: "Snack",
        googleMaps: "https://maps.app.goo.gl/wqEqCAKSdHc99Mbv5",
        contact: "Karma Diving - Ivan : +33 6 75 11 84 07"
    },
    {
        id: 21,
        name: "Rafting in Sidemen",
        description: "Enjoy a refreshing and scenic rafting adventure in the lush surroundings of Sidemen. After a safety briefing, you'll embark on a 2.5-hour rafting journey down a serene river, with a stop at a hidden waterfall for a peaceful pause.",
        duration: "Half day",
        location: "Sidemen",
        priceIDR: 500000,
        priceWithMargin: 1300000,
        category: "Adventure",
        status: "READY",
        meals: "Lunch",
        googleMaps: "https://maps.app.goo.gl/7Y1shfMLECFKYb7k9",
        contact: "Green Adventure Rafting : +62 812-3982-698"
    },
    {
        id: 22,
        name: "Palm Reading & Energy Cleansing with a Balinese Healer",
        description: "Today, you head into the jungle for a private healing session with Toekik, a Balinese healer. He reads your palm, clears your energy, and guides you through a simple, powerful ritual. Afterwards, you visit a quiet water temple and a hidden waterfall.",
        duration: "Half day",
        location: "Tabanan",
        priceIDR: 1100000,
        priceWithMargin: 2200000,
        category: "Wellness",
        status: "ONGOING",
        meals: "",
        googleMaps: "https://g.co/kgs/GuKjYtH",
        contact: "Toekik : +62-813-3768-3313"
    },
    {
        id: 23,
        name: "ATV Ride Adventure in Ubud",
        description: "You begin your day on an ATV through the jungle - bumpy, fun, and full of tropical views. Then, you cool down and enjoy lunch at a jungle club with time to relax before heading back.",
        duration: "Half day",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Adventure",
        status: "ONGOING",
        meals: "Lunch",
        googleMaps: "",
        contact: ""
    },
    {
        id: 24,
        name: "Balinese Day with a local family + Sangeh Monkey Forest",
        description: "This morning, you spend time with Tiwi and her family in a quiet village near Ubud. You walk through their rice fields, learn how to make traditional offerings and coconut oil, then cook and share a homemade Balinese lunch together.",
        duration: "Full day",
        location: "Ubud",
        priceIDR: 150000,
        priceWithMargin: 1000000,
        category: "Culture",
        status: "ONGOING",
        meals: "Lunch",
        googleMaps: "https://maps.app.goo.gl/vU1XrX1GH88nafbb6",
        contact: "Tiwi +62 815-2937-9167"
    },
    {
        id: 25,
        name: "Balinese Purification Melukat in Secret Water Temple",
        description: "You'll hear the water before you see it - flowing from sacred fountains in the heart of the jungle. A local priest lights incense. You step into the pool. Time slows down. You breathe. A real Melukat ceremony far from the crowds.",
        duration: "2-3 hours",
        location: "Ubud",
        priceIDR: 200000,
        priceWithMargin: 1300000,
        category: "Wellness",
        status: "ONGOING",
        meals: "",
        googleMaps: "https://maps.app.goo.gl/WfWixTweV8jk6QzD",
        contact: "Wawan: +62 878-5559-7596, Tiwi: +62 815-2937-9167"
    },
    {
        id: 26,
        name: "Free Day trip in Ubud",
        description: "A free day to explore Ubud at your own pace. Wander through the famous Ubud Market, visit the Sacred Monkey Forest, or simply relax at a cafe overlooking the rice terraces. Your driver is available throughout the day.",
        duration: "Full day",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Free Day",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 27,
        name: "Hidden Canyon Trekking",
        description: "Explore the stunning Hidden Canyon Beji Guwang, a spectacular natural gorge near Ubud. Trek through the narrow canyon with your guide, climbing over rocks and wading through crystal-clear water surrounded by towering canyon walls.",
        duration: "Half day",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Trekking",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 28,
        name: "Rafting on Ayung River near Ubud + Sangeh Monkey Forest",
        description: "You're going on rafting adventure in one of Bali's lush jungle rivers. It's fun, not too intense, and the views are unreal. Think cliffs, waterfalls, and tropical vibes all around you. After, your driver takes you to Sangeh Monkey Forest.",
        duration: "Full day",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Adventure",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 29,
        name: "Ubud Food Tour",
        description: "You taste your way through Ubud, learning the story behind each dish from your local guide - from sweet to savory, every bite has a meaning.",
        duration: "3-4 hours",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Food",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 30,
        name: "Ubud Market + Balinese Dance Show Dinner",
        description: "Explore the colorful Ubud Art Market in the afternoon, then enjoy an evening of traditional Balinese dance performances accompanied by a delicious dinner.",
        duration: "Evening",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Culture",
        status: "ONGOING",
        meals: "Dinner",
        googleMaps: "",
        contact: ""
    },
    {
        id: 31,
        name: "Paragliding in Uluwatu",
        description: "Paragliding over the cliffs of Uluwatu in the morning gives you epic views. Afterwards, your driver takes you to lunch and then on to your next stop.",
        duration: "2-3 hours",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Adventure",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 32,
        name: "Day at the Beach Club",
        description: "Spend a relaxing day at one of Uluwatu's famous beach clubs. Lounge by the infinity pool, enjoy gourmet food and cocktails, and watch the sunset over the Indian Ocean.",
        duration: "Full day",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Relaxation",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 33,
        name: "Free Day trip in Uluwatu",
        description: "Spend your day soaking in the Uluwatu vibe at your own pace whether that means lounging by the beach, or simply enjoying the serene views from a cliffside cafe. Let the rhythm of the day guide you.",
        duration: "Full day",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Free Day",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 34,
        name: "Sunday Brunch at Kempinski",
        description: "Start your day with an indulgent brunch at Kempinski - think endless gourmet stations, fresh seafood, pastries that melt in your mouth, and free-flow bubbles if you're feeling fancy. Stay and lounge by the infinity pool.",
        duration: "Half day",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Food",
        status: "ONGOING",
        meals: "Brunch",
        googleMaps: "",
        contact: ""
    },
    {
        id: 35,
        name: "Sunset Boat Ride + BBQ",
        description: "Set sail on a traditional boat as the sun begins to set over the ocean. Enjoy a delicious BBQ dinner on board while watching the sky turn golden and pink.",
        duration: "Evening",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Excursion",
        status: "ONGOING",
        meals: "Dinner",
        googleMaps: "",
        contact: ""
    },
    {
        id: 36,
        name: "Uluwatu Temple + Kecak Fire Dance",
        description: "In the afternoon, you'll head to Uluwatu just in time for sunset. Visit the iconic Uluwatu Temple, perched on dramatic cliffs with sweeping ocean views. As the sun sets, you'll experience the captivating Kecak fire dance in the temple's open-air arena.",
        duration: "Evening",
        location: "Uluwatu",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Culture",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 37,
        name: "Waterbom Water Park",
        description: "Celebrate with a splash of joy at Waterbom Park - a tropical eco-oasis in the heart of Kuta. Let the day unfold as you drift down lazy rivers, race down slides, or lounge under the palms.",
        duration: "Full day",
        location: "Kuta",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Family",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 38,
        name: "Horse Walk on the Beach",
        description: "Spend a peaceful morning soaking in the stillness. Later, meet the gentle horses for a mindful beach walk. Guided by a skilled trainer, the lead horse sets the pace while the others amble alongside. Enjoy the unique experience of wading into the sea with them.",
        duration: "2-3 hours",
        location: "Gili Asahan",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Adventure",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 39,
        name: "Bali Bird Park or Bali Zoo",
        description: "A perfect family-friendly day exploring either the Bali Bird Park with its incredible collection of exotic birds, or the Bali Zoo with its diverse wildlife. Great for nature lovers of all ages.",
        duration: "Half day",
        location: "Ubud",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Family",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 40,
        name: "Sunset Cruise with local boat",
        description: "Enjoy the day at the eco-resort whether it's a quiet swim, reading in a hammock, or simply listening to the rhythm of the waves. As the afternoon softens, set out on a sunset cruise aboard a local wooden boat.",
        duration: "Evening",
        location: "Gili Asahan",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Excursion",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 41,
        name: "Free day in Lombok",
        description: "Today, enjoy a free day to soak in the gentle charm of Lombok at your own pace. Your driver is at your disposal to take you to the beaches of your choice - whether it's wide stretches of golden sand, more secluded coves, or perfect spots for a refreshing swim.",
        duration: "Full day",
        location: "Lombok",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Free Day",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 42,
        name: "Paragliding in Lombok",
        description: "Experience the thrill of paragliding over Lombok's stunning landscapes. Soar above beaches, hills, and tropical forests for an unforgettable aerial adventure.",
        duration: "2-3 hours",
        location: "Lombok",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Adventure",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 43,
        name: "Secret Gili Islands Snorkeling Tour",
        description: "Today, set off for a day of marine exploration to the Secret Gilis - peaceful little islands off Lombok's southern coast, only accessible by traditional boat. The day's agenda includes snorkeling, swimming, beach time, and a barefoot lunch in the sand.",
        duration: "Full day",
        location: "Lombok",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Snorkeling",
        status: "ONGOING",
        meals: "Lunch",
        googleMaps: "",
        contact: ""
    },
    {
        id: 44,
        name: "Waterfall tour in Lombok",
        description: "Discover Lombok's hidden waterfalls on this adventurous tour. Trek through lush jungle to reach stunning cascades where you can swim in crystal-clear pools surrounded by tropical nature.",
        duration: "Full day",
        location: "Lombok",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Trekking",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 45,
        name: "Boat Snorkeling on the Gili Islands",
        description: "Hop on a boat and explore the famous Gili Islands' underwater world. Snorkel in crystal-clear waters, spot sea turtles, colorful fish, and vibrant coral reefs.",
        duration: "Full day",
        location: "Gili Trawangan",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Snorkeling",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 46,
        name: "Free day in Gili Trawangan",
        description: "A free day to explore Gili Trawangan at your own pace. Rent a bicycle, relax on the beach, snorkel off the shore, or enjoy the island's laid-back cafe and bar scene.",
        duration: "Full day",
        location: "Gili Trawangan",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Free Day",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 47,
        name: "Silver Making Class",
        description: "Start your day with a hands-on silver jewelry workshop - learn from local artisans and create your own piece to take home. After that, the rest of the day is yours. Wander through the rice fields, read by the pool, or just soak in the calm of Sidemen.",
        duration: "Half day",
        location: "Sidemen",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Workshop",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 48,
        name: "Coral Reef Conservation Diving - Introductory Dive",
        description: "Join a coral reef conservation diving experience designed for beginners. Learn about reef restoration while exploring Bali's underwater world with certified eco-conscious instructors.",
        duration: "Half day",
        location: "Candidasa",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Diving",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 49,
        name: "Coral Reef Conservation Diving - Certified Diver",
        description: "For certified divers, participate in meaningful coral reef conservation work while enjoying spectacular diving in Candidasa's waters. A hands-on experience that makes a difference.",
        duration: "Half day",
        location: "Candidasa",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Diving",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 50,
        name: "Diving Menjangan - Introductory Dive",
        description: "Experience your first dive at Menjangan Island, known for its pristine coral walls and calm, clear waters. Perfect for beginners with patient, experienced instructors.",
        duration: "Full day",
        location: "Pemuteran",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Diving",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 51,
        name: "Diving Menjangan - Open Water Dive",
        description: "Explore Menjangan Island's famous dive sites with its spectacular coral walls, diverse marine life, and crystal-clear visibility. A must-do for Open Water certified divers.",
        duration: "Full day",
        location: "Pemuteran",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Diving",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    },
    {
        id: 52,
        name: "Diving Menjangan - Advanced Dive",
        description: "For advanced divers, discover deeper sites and more challenging dives around Menjangan Island's pristine marine park.",
        duration: "Full day",
        location: "Pemuteran",
        priceIDR: 0,
        priceWithMargin: 0,
        category: "Diving",
        status: "ONGOING",
        meals: "",
        googleMaps: "",
        contact: ""
    }
];

// Bali Zones with coordinates
const BALI_ZONES = [
    { name: 'Ubud', lat: -8.5069, lng: 115.2624, description: 'Cultural heart of Bali' },
    { name: 'Uluwatu', lat: -8.8291, lng: 115.0849, description: 'Dramatic clifftop temples' },
    { name: 'Seminyak', lat: -8.6913, lng: 115.1683, description: 'Beach clubs and nightlife' },
    { name: 'Canggu', lat: -8.6478, lng: 115.1385, description: 'Surf and digital nomad hub' },
    { name: 'Nusa Penida', lat: -8.7275, lng: 115.5444, description: 'Island paradise' },
    { name: 'Sanur', lat: -8.7088, lng: 115.2625, description: 'Relaxed beachfront' },
    { name: 'Jimbaran', lat: -8.7908, lng: 115.1619, description: 'Seafood and sunsets' },
    { name: 'Munduk', lat: -8.2689, lng: 115.0819, description: 'Mountain waterfalls' },
    { name: 'Sidemen', lat: -8.4686, lng: 115.4397, description: 'Rice terraces and tranquility' },
    { name: 'Amed', lat: -8.3461, lng: 115.6456, description: 'Diving and snorkeling' },
    { name: 'Lovina', lat: -8.1526, lng: 115.0253, description: 'North coast dolphins' },
    { name: 'Candidasa', lat: -8.5093, lng: 115.5669, description: 'East coast charm' },
    { name: 'Kintamani', lat: -8.2461, lng: 115.3586, description: 'Volcano views' }
];

// Partners Database
const partnersDatabase = [
    {
        id: 1,
        name: "Fab Diving Amed",
        type: "diving",
        contact: {
            phone: "+6281239393738",
            email: "",
            address: "Amed, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/v6y9C8whsxd83b49A"
    },
    {
        id: 2,
        name: "Living Seas Candidasa",
        type: "snorkeling",
        contact: {
            phone: "+62 821-4745-0770",
            email: "",
            address: "Candidasa, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/T8nYmnxy4RAdepL76"
    },
    {
        id: 3,
        name: "Adhy Surf Canggu",
        type: "surf",
        contact: {
            phone: "+62 822-3463-7391",
            email: "",
            address: "Canggu, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/TRzr4r6eKfBvpwmv8"
    },
    {
        id: 4,
        name: "Bali by Pedals",
        type: "cycling",
        contact: {
            phone: "+6285253757355",
            email: "",
            address: "Jatiluwih, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/6VdNmMtptFXdvPCk6"
    },
    {
        id: 5,
        name: "Eco Bike Coffee Kintamani",
        type: "cycling",
        contact: {
            phone: "+62 812-3674-8323",
            email: "",
            address: "Kintamani, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/YorpH2KZyCbVmYSN6"
    },
    {
        id: 6,
        name: "Okta - Mount Batur Guide",
        type: "trekking",
        contact: {
            phone: "+6281291198388",
            email: "",
            address: "Kintamani, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/QvKbdv3Jsd2YvCzV6"
    },
    {
        id: 7,
        name: "Kadek - Lovina Dolphin Tours",
        type: "snorkeling",
        contact: {
            phone: "+62 878-6322-9639",
            email: "",
            address: "Lovina, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/cxvsSf8Vff3MUJpL8"
    },
    {
        id: 8,
        name: "Beski - Munduk Trekking",
        type: "trekking",
        contact: {
            phone: "+6281805417953",
            email: "",
            address: "Munduk, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/RFEGtLZya6BV1B6CA"
    },
    {
        id: 9,
        name: "El Rey VIP Boats - Arim",
        type: "boat",
        contact: {
            phone: "+62 896-9519-2411",
            email: "",
            address: "Sanur, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/VPuVPU87paoYruvDA"
    },
    {
        id: 10,
        name: "Gex - Nusa Penida Driver",
        type: "driver",
        contact: {
            phone: "+62 822-3744-6378",
            email: "",
            address: "Nusa Penida, Bali"
        },
        googleMaps: ""
    },
    {
        id: 11,
        name: "Karma Diving - Ivan",
        type: "diving",
        contact: {
            phone: "+33 6 75 11 84 07",
            email: "",
            address: "Nusa Penida, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/wqEqCAKSdHc99Mbv5"
    },
    {
        id: 12,
        name: "Indo Compass - Snorkeling Tours",
        type: "snorkeling",
        contact: {
            phone: "+62 822-6632-2998",
            email: "",
            address: "Sanur, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/2WWj6YBnnZBhyEZRA"
    },
    {
        id: 13,
        name: "Green Adventure Rafting",
        type: "rafting",
        contact: {
            phone: "+62 812-3982-698",
            email: "",
            address: "Sidemen, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/7Y1shfMLECFKYb7k9"
    },
    {
        id: 14,
        name: "Toekik - Balinese Healer",
        type: "wellness",
        contact: {
            phone: "+62-813-3768-3313",
            email: "",
            address: "Tabanan, Bali"
        },
        googleMaps: "https://g.co/kgs/GuKjYtH"
    },
    {
        id: 15,
        name: "Tiwi - Local Family Experience",
        type: "culture",
        contact: {
            phone: "+62 815-2937-9167",
            email: "",
            address: "Ubud, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/vU1XrX1GH88nafbb6"
    },
    {
        id: 16,
        name: "Wawan - Melukat Guide",
        type: "wellness",
        contact: {
            phone: "+62 878-5559-7596",
            email: "",
            address: "Ubud, Bali"
        },
        googleMaps: "https://maps.app.goo.gl/WfWixTweV8jk6QzD"
    }
];

// Company Info Template (Editable in Settings)
const companyInfoTemplate = {
    floraBio: "Your personal travel designer with years of experience crafting unforgettable Bali journeys. I believe in authentic, meaningful travel experiences that connect you with the heart of Bali.",
    companyDescription: "Baliwithflow creates bespoke travel experiences that go beyond the ordinary. We connect travelers with local partners, hidden gems, and authentic cultural encounters that transform vacations into life-changing journeys.",
    floraPhoto: "assets/flora-photo.jpg"
};

// Terms & Conditions Template
const termsAndConditionsTemplate = `
1. BOOKING & PAYMENT
   • 30% deposit required to confirm booking
   • Balance due 30 days before departure
   • Payments accepted via bank transfer or credit card

2. CANCELLATION POLICY
   • 60+ days before departure: Full refund minus administrative fees
   • 30-59 days before departure: 50% refund
   • 15-29 days before departure: 25% refund
   • Less than 15 days: No refund

3. CHANGES & MODIFICATIONS
   • Changes subject to availability
   • Price adjustments may apply for modifications
   • We reserve the right to modify itineraries due to weather or safety

4. TRAVEL INSURANCE
   • Travel insurance is highly recommended
   • Not included in package price
   • Travelers are responsible for obtaining adequate coverage

5. LIABILITY
   • Standard tour operator liability applies
   • Force majeure clause for unforeseen circumstances
   • Not responsible for loss of personal belongings

6. HEALTH & SAFETY
   • Travelers are responsible for their own fitness level
   • Vaccinations as recommended by health authorities
   • Inform us of any medical conditions before departure
`;

// Categories for filtering
const activityCategories = [
    "All",
    "Adventure",
    "Culture",
    "Diving",
    "Snorkeling",
    "Trekking",
    "Wellness",
    "Food",
    "Free Day",
    "Excursion",
    "Sport",
    "Family",
    "Workshop",
    "Relaxation"
];

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        activitiesDatabase,
        partnersDatabase,
        BALI_ZONES,
        companyInfoTemplate,
        termsAndConditionsTemplate,
        activityCategories
    };
}

// Expose to global window object (Browser)
if (typeof window !== 'undefined') {
    window.activitiesDatabase = activitiesDatabase;
    window.partnersDatabase = partnersDatabase;
    window.BALI_ZONES = BALI_ZONES;
    window.companyInfoTemplate = companyInfoTemplate;
    window.termsAndConditionsTemplate = termsAndConditionsTemplate;
    window.activityCategories = activityCategories;
}
