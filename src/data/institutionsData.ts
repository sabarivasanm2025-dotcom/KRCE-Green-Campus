import type { InstitutionCard } from '../types';

export const institutionsData: InstitutionCard[] = [
  {
    id: 'krce',
    name: 'KRCE',
    shortName: 'KRCE',
    fullName: 'K. Ramakrishnan College of Engineering',
    location: 'Samayapuram, Trichy – 621 112, Tamil Nadu',
    affiliation: 'Anna University Affiliated • NAAC Accredited',
    tagline: 'Where Engineering Meets Environmental Stewardship',
    description:
      'Home campus of this EVS Green Campus project. KRCE is an autonomous engineering institution committed to academic excellence, ethical practice, and emerging campus sustainability initiatives driven by its student and faculty community.',
    greenFocus: 'Solar Energy • Rainwater Harvesting • Green Labs • Student Eco-Clubs',
    greenHighlights: [
      'Proposed rooftop solar microgrids across departments',
      'Student-led waste segregation programme',
      'Rainwater recharge pits on campus grounds',
      'EVS-driven green awareness campaigns',
      'Paperless digital administrative pilot',
    ],
    metrics: [
      { label: 'Proposed Solar Target', value: '500 kW' },
      { label: 'Eco-Club Members (Goal)', value: '600+' },
      { label: 'Green Labs (Planned)', value: '12' },
    ],
    image: '/images/krce-campus-building.jpg',
    websiteUrl: 'https://www.krce.ac.in',
  },
  {
    id: 'krct',
    name: 'KRCT',
    shortName: 'KRCT',
    fullName: 'K. Ramakrishnan College of Technology',
    location: 'Samayapuram, Trichy – 621 112, Tamil Nadu',
    affiliation: 'Anna University Affiliated • NBA Accredited Programs',
    tagline: 'Technology Driven, Nature Inspired',
    description:
      'KRCT is a sister institution within the KR Group, fostering technical talent through applied research, innovation, and a strong culture of environmental responsibility aligned with the group\'s shared green campus vision.',
    greenFocus: 'Green Infrastructure • Tech Innovation • Renewable Systems • Campus Biodiversity',
    greenHighlights: [
      'Shared commitment to group-wide green campus roadmap',
      'Technology incubation for sustainable engineering solutions',
      'Campus tree plantation and green cover initiatives',
      'Department-level energy audit programmes',
      'Industry partnerships for clean technology projects',
    ],
    metrics: [
      { label: 'Proposed Wind+Solar (Target)', value: '300 kW' },
      { label: 'Trees Planted (Goal)', value: '1,000+' },
      { label: 'Green Research Papers', value: '20+ / yr' },
    ],
    image: 'https://krct.ac.in/assets/krct/campus-building.jpg',
    websiteUrl: 'https://www.krct.ac.in',
  },
  {
    id: 'mkce',
    name: 'MKCE',
    shortName: 'MKCE',
    fullName: 'M. Kumarasamy College of Engineering',
    location: 'Karur – 639 113, Tamil Nadu',
    affiliation: 'Anna University Affiliated • NAAC Accredited',
    tagline: 'Building Futures. Protecting Nature.',
    description:
      'MKCE, the third pillar of the KR Group of Institutions, is situated in Karur and shares the group\'s ethos of responsible education. Its sprawling campus provides a model for integrating green infrastructure with rigorous technical curriculum.',
    greenFocus: 'Sustainable Campus • Water Management • Eco-Research • Clean Energy',
    greenHighlights: [
      'Campus-wide water conservation and reuse systems',
      'Nature trail and ecological study zones',
      'Green building design integrated into campus expansion',
      'Environmental awareness through NSS and NCC wings',
      'Collaborative EVS research with KRCE and KRCT',
    ],
    metrics: [
      { label: 'Campus Area (Green Zone)', value: '50+ Acres' },
      { label: 'Water Recycled (Target)', value: '70%' },
      { label: 'Eco-Research Projects', value: '15+' },
    ],
    image: '/images/mkce-aerial-campus.jpg',
    websiteUrl: 'https://www.mkce.ac.in',
  },
];
