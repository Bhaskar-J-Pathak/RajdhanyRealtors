import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash,
    },
  });
  console.log("Admin user created:", admin.username);

  // Create sample properties — all Guwahati, Assam
  const properties = [
    {
      title: "The Residences at GS Road — Penthouse",
      slug: "residences-gs-road-penthouse",
      description:
        "Occupying the entire uppermost floor of one of GS Road's most architecturally distinguished towers, this penthouse sets a new standard for ultra-premium living in Guwahati. Panoramic views of the Brahmaputra river and the Kamakhya hills frame every room.\n\nThe interior — conceived by a Mumbai-based atelier — features imported Italian marble, wide-plank European oak flooring, and a bespoke kitchen with Gaggenau appliances. The wrap-around terrace is private, landscaped, and offers the finest vantage point in the city.\n\nBuilding amenities include a climate-controlled lobby, concierge services, a rooftop wellness lounge, and a private wine cellar.",
      price: 52000000,
      location: "GS Road, Guwahati",
      bedrooms: 4,
      bathrooms: 5,
      area: 4200,
      propertyType: "penthouse",
      features: JSON.stringify([
        "Panoramic Brahmaputra Views",
        "Landscaped Private Terrace",
        "Italian Marble Flooring",
        "Gaggenau Kitchen",
        "Concierge Services",
        "Rooftop Wellness Lounge",
        "Private Wine Cellar",
        "3 Covered Parking Bays",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      ]),
      featured: true,
      status: "available",
    },
    {
      title: "Kamakhya Estate — Private Villa",
      slug: "kamakhya-estate-private-villa",
      description:
        "Nestled at the base of the sacred Kamakhya Hills, this private villa is unlike anything Guwahati has offered before. Set within two bighas of landscaped grounds, the residence is a considered study in contemporary Indian architecture — rooted in place, uncompromising in quality.\n\nThe four-bedroom main house connects to a separate guest pavilion via a stone-paved courtyard. A 40-foot lap pool runs alongside the south garden. The interiors draw from a palette of local stone, reclaimed teak, and hand-loomed Assamese textiles.\n\nDiscretion is absolute — a private gated entrance with biometric access, 24/7 security, and staff quarters ensure complete privacy.",
      price: 85000000,
      location: "Kamakhya Hills, Guwahati",
      bedrooms: 5,
      bathrooms: 6,
      area: 6800,
      propertyType: "villa",
      features: JSON.stringify([
        "Private Gated Estate — 2 Bighas",
        "40-ft Lap Pool",
        "Guest Pavilion",
        "Biometric Security",
        "Staff Quarters",
        "Reclaimed Teak Interiors",
        "Courtyard Garden",
        "Solar Power Backup",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      ]),
      featured: true,
      status: "available",
    },
    {
      title: "Brahmaputra View — Dispur Enclave",
      slug: "brahmaputra-view-dispur-enclave",
      description:
        "A rare 3-bedroom apartment in the heart of Dispur, facing north toward the Brahmaputra with unobstructed water views from every principal room. The building — one of only eight residences — was conceived as a boutique private community for those who value quiet, quality, and proximity to the state capital.\n\nEach apartment occupies a full floor plate. The open-plan living and dining area flows onto a generous balcony. Interiors feature engineered stone counters, floor-to-ceiling glazing, and smart home integration throughout.\n\nA curated amenity suite includes a residents' library, screening room, and a rooftop observatory terrace.",
      price: 28500000,
      location: "Dispur, Guwahati",
      bedrooms: 3,
      bathrooms: 3,
      area: 2400,
      propertyType: "apartment",
      features: JSON.stringify([
        "Full-Floor Plate",
        "Brahmaputra Views",
        "Smart Home Integration",
        "Residents' Library",
        "Rooftop Observatory",
        "Screening Room",
        "EV Charging",
        "24/7 Concierge",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2064&auto=format&fit=crop",
      ]),
      featured: true,
      status: "available",
    },
    {
      title: "Uzan Bazar Riverfront — Collector's Apartment",
      slug: "uzan-bazar-riverfront-apartment",
      description:
        "Uzan Bazar — Guwahati's oldest and most storied neighbourhood — is home to this extraordinary 2-bedroom collector's apartment. Occupying the restored upper floors of a colonial-era building, the interiors have been reimagined by an award-winning preservation architect.\n\nOriginal timber ceilings, cast iron columns, and herringbone teak floors have been retained and celebrated. New additions — a bespoke kitchen, marble bathrooms, and a climate control system — sit in deliberate contrast to the building's heritage character.\n\nThe apartment comes with a private rooftop terrace overlooking the river ghats.",
      price: 18500000,
      location: "Uzan Bazar, Guwahati",
      bedrooms: 2,
      bathrooms: 2,
      area: 1750,
      propertyType: "apartment",
      features: JSON.stringify([
        "Heritage Building — Restored",
        "Original Teak Herringbone Floors",
        "Private Rooftop Terrace",
        "River Ghat Views",
        "Award-winning Architecture",
        "Bespoke Kitchen",
        "Climate Control",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2070&auto=format&fit=crop",
      ]),
      featured: false,
      status: "available",
    },
    {
      title: "Beltola Meridian — Corner Duplex",
      slug: "beltola-meridian-corner-duplex",
      description:
        "A corner duplex in the prestigious Beltola enclave, occupying levels 11 and 12 of a newly completed residential tower. The double-volume entry hall is the apartment's first statement — a 7-metre ceiling punctuated by an architectural staircase in blackened steel and hand-finished plaster.\n\nThe lower level houses an expansive open-plan living and dining area, chef's kitchen, and a guest suite. The upper level is dedicated entirely to the master suite, a private study, and a family room opening onto the sky terrace.\n\nA concierge team, dedicated parking for three vehicles, and a private storage vault complete this offering.",
      price: 38000000,
      location: "Beltola, Guwahati",
      bedrooms: 4,
      bathrooms: 4,
      area: 3600,
      propertyType: "apartment",
      features: JSON.stringify([
        "Double-Volume Entry Hall — 7m",
        "Blackened Steel Staircase",
        "Sky Terrace",
        "Chef's Kitchen",
        "Private Study",
        "3 Covered Parking",
        "Private Storage Vault",
        "Dedicated Concierge",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
      ]),
      featured: false,
      status: "available",
    },
    {
      title: "Khanapara Atelier — Luxury 3BHK",
      slug: "khanapara-atelier-luxury-3bhk",
      description:
        "Positioned at the quieter southern end of Guwahati's expanding luxury corridor, the Khanapara Atelier offers a considered alternative to the city's more prominent addresses. Three large bedrooms, each with an en-suite bathroom and custom joinery, open onto private balconies facing the Meghalaya plateau.\n\nThe building — just 12 units — was conceived as a low-density community. Shared spaces include a pool, a gym with Technogym equipment, and a landscaped residents' garden. An on-call building manager handles maintenance, deliveries, and services.\n\nIdeal for families seeking excellent schools proximity, connectivity to the airport, and the quiet of a residential neighbourhood.",
      price: 22000000,
      location: "Khanapara, Guwahati",
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      propertyType: "apartment",
      features: JSON.stringify([
        "12-Unit Boutique Building",
        "Plateau-Facing Balconies",
        "Technogym Equipped Gym",
        "Residents' Pool",
        "Building Manager on Call",
        "Near Top Schools",
        "Airport Proximity",
        "2 Covered Parking",
      ]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop",
      ]),
      featured: false,
      status: "available",
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property,
    });
  }
  console.log(`Created ${properties.length} properties`);

  // Create sample blog posts — Guwahati/Assam focused
  const blogPosts = [
    {
      title: "Guwahati: The Quiet Rise of Northeast India's Most Desirable Address",
      slug: "guwahati-rise-northeast-india-luxury-real-estate",
      excerpt:
        "Once overlooked by pan-India real estate conversations, Guwahati has emerged as the region's foremost address for discerning buyers. Here is what is driving the transformation.",
      content:
        "For decades, the conversation around luxury real estate in India centred on a familiar axis — Mumbai's sea-facing towers, Delhi's Lutyens bungalows, Bengaluru's Koramangala penthouses. Guwahati barely featured.\n\nThat is now changing, and changing quickly.\n\nThe Gateway City, Reinvented\nGuwahati occupies a singular geographic position: the commercial, cultural, and infrastructural gateway to all of Northeast India. With a population crossing 1.3 million and the broader metropolitan region growing at nearly twice the national average, the city has attracted a new class of resident — the returning diaspora, the senior corporate executive, the entrepreneur whose business spans the northeastern states.\n\nThese buyers are not looking for a starter apartment. They are looking for an address that reflects where they have arrived.\n\nInfrastructure as a Catalyst\nThe Lokpriya Gopinath Bordoloi International Airport has seen passenger traffic triple in a decade. The upcoming ring road project will delink premium neighbourhoods from city-centre congestion. New hospital campuses, international schools, and luxury hospitality brands have chosen Guwahati as their Northeast India anchor.\n\nEach of these decisions sends a signal to the market: Guwahati is a city of consequence.\n\nThe Neighbourhoods That Matter\nGS Road remains the city's premier address — its mix of retail, hospitality, and residential towers makes it the closest equivalent to a central business district with lifestyle amenities. Dispur, as the state capital, carries political weight and proximity to institutions. Beltola offers a quieter, more residential character. And increasingly, areas like Khanapara and the Kamakhya foothills are drawing buyers who seek privacy and natural beauty over urban intensity.\n\nWhat Rajdhany Sees\nAt Rajdhany Realtors, we work exclusively in this market. We have watched the transformation of Guwahati's luxury segment from the inside — from the first handful of buyers who demanded something exceptional, to the growing community of residents who now call this city's finest addresses home.\n\nThe demand is real. The inventory of genuinely exceptional properties remains limited. And that, for the discerning buyer, is precisely where the opportunity lies.",
      coverImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      author: "Rajdhany Realtors",
      category: "Market Insights",
      tags: JSON.stringify(["Guwahati", "Northeast India", "Luxury Market", "Investment"]),
      published: true,
      publishedAt: new Date("2024-03-10"),
    },
    {
      title: "On Living Well in Guwahati: A Guide to the City's Most Considered Neighbourhoods",
      slug: "guide-guwahati-neighbourhoods-luxury-living",
      excerpt:
        "Each neighbourhood carries a distinct character. Understanding those differences is the first step toward finding an address that is truly yours.",
      content:
        "A city's neighbourhoods are not simply locations on a map — they are communities, each with their own rhythm, character, and claim on the imagination. Guwahati's luxury residential landscape is more varied than outsiders might expect.\n\nGS Road: The Address of Consequence\nIf Guwahati has a prime meridian, it runs along GS Road. The spine of the city's commercial ambitions, it houses the finest hotels, the most ambitious restaurants, and the towers where Guwahati's most prominent residents have chosen to live. An apartment on GS Road announces something about its occupant. It says: I am here, at the centre of things.\n\nDispur: Proximity to Power\nGuwahati's administrative heart carries a quiet authority. Dispur's streets are wide, its pace considered. Proximity to the Assam Secretariat and the city's institutional life makes it the preferred choice for senior government officials, diplomats, and those whose work brings them into daily contact with the state's decision-making apparatus.\n\nBeltola: The Residential Enclave\nThose who have lived in Guwahati's more frenetic precincts often find themselves drawn, eventually, to Beltola. Its tree-lined avenues, larger plot sizes, and relative quiet offer something increasingly rare in Indian cities: space to breathe. Families with children cite the school proximity and the neighbourhood's ease as primary draws.\n\nUzan Bazar: History as a Luxury\nThe oldest neighbourhood in the city has, paradoxically, become one of its most sought-after for buyers who value heritage and character. Colonial-era buildings are being sensitively restored. The river ghats are a morning ritual. The market is extraordinary. Uzan Bazar reminds its residents that luxury is not only about the new.\n\nKhanapara and the Southern Corridor\nGuwahati's southern edge — where the city meets the Meghalaya plateau — is where the next generation of ultra-premium addresses is taking shape. Lower density, larger landholdings, and views that stretch into the hills make this corridor the choice of buyers who prioritise privacy, nature, and a sense of remove from urban intensity.\n\nFinding Your Address\nThe question of neighbourhood is deeply personal. At Rajdhany, we begin every client relationship with a conversation about how you intend to live — not just where. The right address is the one that fits the life you are building.",
      coverImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1773&auto=format&fit=crop",
      author: "Rajdhany Realtors",
      category: "Living Well",
      tags: JSON.stringify(["Guwahati Neighbourhoods", "GS Road", "Dispur", "Lifestyle"]),
      published: true,
      publishedAt: new Date("2024-02-18"),
    },
    {
      title: "The Art of Buying Right: What Discerning Buyers Know That Others Don't",
      slug: "art-of-buying-right-luxury-real-estate-guide",
      excerpt:
        "The difference between a good property acquisition and a great one is rarely about the money. It is about the questions asked before the offer is made.",
      content:
        "There is a quality of attention that distinguishes the finest property acquisitions from the merely good ones. It is not about spending more. It is about knowing precisely what to look for — and what to ask.\n\nThe Question of Orientation\nIn Guwahati, the orientation of a property shapes everything: the quality of morning light, the view across the river or toward the hills, the experience of the monsoon from a covered terrace. North-facing units catch the Brahmaputra. South-facing units look toward Meghalaya's plateau. East-facing rooms receive the morning sun through the city's cleaner air. These are not small considerations.\n\nThe Building Behind the Apartment\nThe apartment is inseparable from the building that contains it. The quality of the lobby, the competence of the building management, the profile of other residents, the financial health of the residents' association — each of these shapes the day-to-day experience of living there. We spend as much time understanding a building as we do understanding an individual unit.\n\nLegal Clarity Before Everything\nAssam's land registration system has historical complexities that require careful navigation. Title searches, encumbrance certificates, and the verification of building completion certificates are non-negotiable steps, not optional additions. We do not present a property to our clients until these have been confirmed.\n\nThe Liquidity Question\nEven if a buyer intends to hold a property for decades, understanding its liquidity profile matters. What would this property realise in three years? In ten? The answer depends on location, building quality, and the trajectory of the surrounding neighbourhood — all factors that inform how we curate our portfolio.\n\nPatience as Strategy\nThe finest properties in Guwahati do not stay available for long, but they rarely reward haste. The buyers who acquire the most exceptional addresses are those who have taken the time to understand the market, clarify their requirements, and build a relationship with an advisor they trust.\n\nAt Rajdhany, we consider ourselves partners in that process — not merely facilitators of a transaction.",
      coverImage:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
      author: "Rajdhany Realtors",
      category: "Buying Guide",
      tags: JSON.stringify(["Buying Guide", "Luxury Property", "Due Diligence", "Assam"]),
      published: true,
      publishedAt: new Date("2024-01-29"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`Created ${blogPosts.length} blog posts`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
