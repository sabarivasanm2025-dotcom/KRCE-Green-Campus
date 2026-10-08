import type { Initiative } from '../types';

export const initiativesData: Initiative[] = [
  {
    id: 'waste-management',
    number: '01',
    title: 'Waste Management',
    tagline: 'From waste to resource.',
    category: 'Circular Ecology',
    iconName: 'Trash2',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    summary: 'A 5-stream segregation model transforming campus cafeteria organics into compost and achieving near-zero single-use plastics.',
    problem: 'College campuses produce significant mixed solid waste daily, including food leftovers, disposable plastic packaging, and discarded stationery, most of which unnecessarily ends up in local municipal landfills.',
    proposedSolution: 'Introduce multi-color color-coded smart sorting stations across all academic blocks, hostels, and cafeterias. Establish an on-campus anaerobic composting unit and partner with certified e-waste recyclers.',
    benefits: [
      'Elimination of single-use disposable plastics in campus food courts',
      'Organic compost generated on-site for college lawns and botanical gardens',
      'Systematic safe collection and tracking of departmental electronic waste (E-waste)',
      'Educational behavioral reinforcement among over 4,000+ students and faculty'
    ],
    implementationSteps: [
      'Phase 1: Deploy segregated bin hubs (Wet, Dry, Paper, Metal/Plastic, E-Waste)',
      'Phase 2: Install mechanized aerated compost pits near hostel dining facilities',
      'Phase 3: Implement campus-wide single-use plastic restrictions with water refill kiosks',
      'Phase 4: Bi-annual E-waste recycling drives partnered with authorized recyclers'
    ],
    metrics: {
      label: 'Proposed Waste Recycling Target',
      target: '2,000 kg / Month'
    }
  },
  {
    id: 'water-conservation',
    number: '02',
    title: 'Water Conservation',
    tagline: 'Every drop matters.',
    category: 'Hydrological Systems',
    iconName: 'Droplets',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Comprehensive rooftop rainwater harvesting, greywater reclamation for grounds, and smart ultrasonic leak monitoring.',
    problem: 'Trichy experiences hot semi-arid climate periods where ground aquifer water levels fluctuate significantly. Runoff rainwater from massive building rooftops is often lost without adequate percolation.',
    proposedSolution: 'Harness KRCE’s extensive roof catchment surfaces with gutter filtration networks leading to dual percolation recharge wells and a central sediment collection cistern. Utilize reclaimed greywater for landscaping.',
    benefits: [
      'Replenishment of regional groundwater table through percolation pits',
      'Over 40% reduction in fresh borewell extraction for landscape irrigation',
      'Real-time automated alert sensors preventing overhead tank overflows and plumbing leaks',
      'Resilient campus water supply during peak summer months'
    ],
    implementationSteps: [
      'Phase 1: Survey rooftop catchments and install leaf guards with first-flush diverters',
      'Phase 2: Construct recharge borewells with graded gravel-sand filtering beds',
      'Phase 3: Retrofit low-flow aerators on hostel and department washroom faucets',
      'Phase 4: Connect greywater filtration to drip irrigation systems for lawns'
    ],
    metrics: {
      label: 'Proposed Water Saving Target',
      target: '50,000 L / Day'
    }
  },
  {
    id: 'clean-energy',
    number: '03',
    title: 'Clean Energy',
    tagline: 'Powering tomorrow responsibly.',
    category: 'Renewable Infrastructure',
    iconName: 'SunMedium',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    summary: 'Rooftop photovoltaic arrays, smart LED campus lighting, and micro-grid monitoring for academic energy efficiency.',
    problem: 'Academic laboratories, workshops, and computer centers require substantial electrical power. Reliance on conventional grid electricity contributes to indirect greenhouse gas emissions.',
    proposedSolution: 'Harness the abundant solar irradiance of the Trichy region by installing rooftop solar PV arrays atop main engineering blocks and mechanical workshops, paired with intelligent dusk-to-dawn LED luminaires.',
    benefits: [
      'Substantial generation of clean solar electricity during peak daytime hours',
      'Reduced thermal load on top floor classrooms via roof solar panel shading',
      'Interactive energy dashboard for engineering students to study real-time generation physics',
      'Campus pathway solar lighting ensuring reliable night safety without grid draw'
    ],
    implementationSteps: [
      'Phase 1: Solar irradiance & structural shadow analysis across engineering buildings',
      'Phase 2: Grid-tied rooftop solar panel installation with inverter synchronization',
      'Phase 3: 100% conversion of indoor lighting to energy-star rated LED fixtures',
      'Phase 4: IoT energy monitors installed per department block for student visibility'
    ],
    metrics: {
      label: 'Proposed Clean Energy Target',
      target: '10,000 kWh / Month'
    }
  },
  {
    id: 'biodiversity',
    number: '04',
    title: 'Biodiversity',
    tagline: 'Let nature thrive.',
    category: 'Ecosystem Regeneration',
    iconName: 'Flower2',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Native flora cultivation, pollinator butterfly corridors, micro-forest clusters, and bird-friendly sanctuary zones.',
    problem: 'Modern paved infrastructure often fragments natural habitats, reducing urban bird populations and pollinating insects while exacerbating local heat island effects.',
    proposedSolution: 'Develop a dedicated Miyawaki-style indigenous micro-forest patch using drought-tolerant native Tamil Nadu trees (Neem, Pongamia, Gulmohar, Peepal), nectar-rich flowering shrubs for butterflies, and bird baths.',
    benefits: [
      'Microclimate temperature cooling of 2-3°C around pedestrian walkways',
      'Habitat restoration for local bird species, honeybees, and butterflies',
      'Living botany and environmental science laboratory for students and visitors',
      'Enriched soil microbiology and enhanced air filtration across campus'
    ],
    implementationSteps: [
      'Phase 1: Soil rejuvenation using organic compost and bio-enzymes',
      'Phase 2: Mass plantation of 500+ indigenous saplings with student adoption badges',
      'Phase 3: Construction of pollinator garden and stone bird water fountains',
      'Phase 4: QR-code botanical tagging for campus tree identification and education'
    ],
    metrics: {
      label: 'Proposed Tree Plantation Target',
      target: '500+ Native Trees'
    }
  },
  {
    id: 'green-mobility',
    number: '05',
    title: 'Green Mobility',
    tagline: 'Move smarter.',
    category: 'Sustainable Transport',
    iconName: 'Bike',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Pedestrian-priority shaded walkways, dedicated campus bicycle docks, and optimized carpooling/EV charging incentives.',
    problem: 'Congestion and carbon emissions from single-occupant motor vehicles entering campus during morning and evening rush hours, causing local exhaust buildup and safety hazards.',
    proposedSolution: 'Demarcate a motor-vehicle-restricted inner academic core, provide campus-shared bicycles for student transit between hostels, sports complex, and labs, and introduce EV two-wheeler charging hubs.',
    benefits: [
      'Calmer, noise-free, and safe pedestrian avenues across campus',
      'Promotes daily physical wellness and active habits among engineering students',
      'Direct reduction in vehicular tailpipe emissions within campus boundaries',
      'Incentivizes adoption of electric two-wheelers with dedicated solar charging bays'
    ],
    implementationSteps: [
      'Phase 1: Pave tree-shaded pedestrian boulevards connecting main gates to academic blocks',
      'Phase 2: Install 4 bicycle sharing stands with repair pumps across campus nodes',
      'Phase 3: Establish carpool matching network for commuting staff and day scholars',
      'Phase 4: Designate preferential parking spaces with solar EV charging ports'
    ],
    metrics: {
      label: 'Proposed Green Commute Target',
      target: '300+ Commuters / Day'
    }
  },
  {
    id: 'green-infrastructure',
    number: '06',
    title: 'Green Infrastructure',
    tagline: 'Build with nature.',
    category: 'Biophilic Architecture',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    summary: 'Vertical living walls, cool-roof reflective coatings, porous permeable pavements, and bioclimatic open study pergolas.',
    problem: 'Extensive concrete surfaces absorb solar heat during day hours, elevating ambient temperatures and drastically increasing air conditioning power demands.',
    proposedSolution: 'Integrate biophilic green elements into building facades, coat existing rooftops with high solar-reflectance coatings, replace impermeable bitumen with interlocking grass-paver tiles, and build open-air green study courtyards.',
    benefits: [
      'Substantial passive cooling reducing mechanical cooling load by 15-20%',
      'Rainwater infiltrates directly into soil through porous grass-grid pavers',
      'Aesthetically restorative study spots improving student focus and mental tranquility',
      'Architectural alignment with global green building standards'
    ],
    implementationSteps: [
      'Phase 1: Pilot vertical green trellis walls on library and canteen exterior walls',
      'Phase 2: Apply high SRI (Solar Reflective Index) reflective white paint on key roofs',
      'Phase 3: Install pergola seating under pergolas draped in creeping bougainvillea',
      'Phase 4: Transition open parking lots to permeable interlocking grass pavers'
    ],
    metrics: {
      label: 'Proposed Biophilic Area Target',
      target: '3,500 sq.m Green Canopy'
    }
  }
];
