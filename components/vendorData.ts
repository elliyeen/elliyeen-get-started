// Shared vendor data — no "use client" so it can be imported in server contexts
// (e.g. generateStaticParams)

export interface VendorData {
  id: string;
  name: string;
  category: string;
  founder: string;
  founderBio: string;
  activity: string;
  activityDetail: string;
  duration: string;
  skillLevel: string;
  availableSlots: number;
  totalSlots: number;
  instagram: string;
  emoji: string;
  relatedIds: string[];
}

export const SAMPLE_VENDOR: VendorData = {
  id: "studio-sage",
  name: "Studio Sage",
  category: "Painting",
  founder: "Lily Ramirez",
  founderBio:
    "Lily has been making ceramics in her Torrance studio for 8 years. She left a career in graphic design to work with her hands full time. She teaches bi-weekly workshops and believes that making something — anything — is the fastest way to feel like yourself again.",
  activity: "Paint a glazed ceramic bud vase",
  activityDetail:
    "You'll receive a bisque-fired ceramic bud vase, a set of food-safe underglazes in six colors, and 45 minutes with Lily to paint whatever speaks to you. No experience required. Lily provides all the guidance and fires your piece in her kiln — pick it up or have it shipped.",
  duration: "45 min",
  skillLevel: "No experience needed",
  availableSlots: 6,
  totalSlots: 12,
  instagram: "studiosagela",
  emoji: "🎨",
  relatedIds: ["ink-and-wash", "wild-thread-co", "clay-and-co"],
};

export const ALL_VENDORS: VendorData[] = [
  SAMPLE_VENDOR,
  {
    id: "wild-thread-co",
    name: "Wild Thread Co.",
    category: "Fiber Arts",
    founder: "Maya Chen",
    founderBio: "Maya weaves from her Long Beach studio using only natural fibers and plant-based dyes she prepares herself.",
    activity: "Weave a mini wall hanging",
    activityDetail: "Using raw cotton and natural dye, you'll create a 6\" wall hanging on a small wooden loom. Maya guides you through the warp and weft. No weaving experience necessary.",
    duration: "30–40 min",
    skillLevel: "Complete beginners welcome",
    availableSlots: 8,
    totalSlots: 12,
    instagram: "wildthreadco",
    emoji: "🧵",
    relatedIds: ["knot-and-bloom", "studio-sage", "ink-and-wash"],
  },
  {
    id: "knot-and-bloom",
    name: "Knot & Bloom",
    category: "Fiber Arts",
    founder: "Sara Okafor",
    founderBio: "Sara started knotting macramé during the pandemic and hasn't stopped. She sells through her online shop and teaches at local studios.",
    activity: "Knot a macramé plant hanger",
    activityDetail: "You'll leave with a finished cotton macramé plant hanger, sized for a 4\" pot. Sara shows you three core knots. Takes about 40 minutes and requires zero prior experience.",
    duration: "40 min",
    skillLevel: "No experience needed",
    availableSlots: 3,
    totalSlots: 10,
    instagram: "knotandbloom",
    emoji: "🌿",
    relatedIds: ["wild-thread-co", "clay-and-co", "kiln-collective"],
  },
  {
    id: "ink-and-wash",
    name: "Ink & Wash",
    category: "Painting",
    founder: "James Park",
    founderBio: "James is a botanical illustrator and forager. He presses wildflowers from the LA hills and teaches people to paint them.",
    activity: "Botanical watercolor print",
    activityDetail: "Using professional watercolors and pressed flowers that James has prepared, you'll create an A5 botanical print to take home. James demonstrates technique; you paint.",
    duration: "45 min",
    skillLevel: "Beginner-friendly",
    availableSlots: 10,
    totalSlots: 15,
    instagram: "inkandwashstudio",
    emoji: "🌸",
    relatedIds: ["studio-sage", "wild-thread-co", "kiln-collective"],
  },
  {
    id: "clay-and-co",
    name: "Clay & Co.",
    category: "Ceramics",
    founder: "Rosa Martinez",
    founderBio: "Rosa teaches ceramics at LA Community College and sells her hand-built pieces at markets across the South Bay.",
    activity: "Hand-build a pinch pot",
    activityDetail: "Air-dry clay, custom texture stamps, and Rosa's guidance. You'll hand-build a small bowl or pot and stamp it with a pattern. Ready to take home same day.",
    duration: "35 min",
    skillLevel: "No experience needed",
    availableSlots: 5,
    totalSlots: 10,
    instagram: "clayandco_la",
    emoji: "🏺",
    relatedIds: ["kiln-collective", "studio-sage", "knot-and-bloom"],
  },
  {
    id: "kiln-collective",
    name: "Kiln Collective",
    category: "Ceramics",
    founder: "Darius Webb",
    founderBio: "Darius runs a community kiln in Carson. He focuses on utilitarian ceramics and teaches slab-building to artists at all levels.",
    activity: "Carve a decorative slab tile",
    activityDetail: "You'll cut, texture, and carve a 4x4\" clay tile from a rolled slab. Darius fires them in his kiln and mails your finished piece within 3 weeks. The wait is worth it.",
    duration: "40 min",
    skillLevel: "Beginner-friendly",
    availableSlots: 2,
    totalSlots: 8,
    instagram: "kilncollective",
    emoji: "🔥",
    relatedIds: ["clay-and-co", "studio-sage", "knot-and-bloom"],
  },
];
