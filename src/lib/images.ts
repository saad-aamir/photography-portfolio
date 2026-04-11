export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  aspect: "tall" | "wide" | "square";
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=70",
    alt: "Portrait photography",
    category: "Portraits",
    title: "Silent Echoes",
    aspect: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=70",
    alt: "Fashion photography",
    category: "Fashion",
    title: "Velvet Dreams",
    aspect: "tall",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=70",
    alt: "Street photography",
    category: "Street",
    title: "Urban Pulse",
    aspect: "wide",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=70",
    alt: "Travel photography",
    category: "Travel",
    title: "Wanderlust",
    aspect: "wide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=70",
    alt: "Portrait photography",
    category: "Portraits",
    title: "Golden Hour",
    aspect: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=70",
    alt: "Fashion photography",
    category: "Fashion",
    title: "Monochrome",
    aspect: "square",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=70",
    alt: "Street photography",
    category: "Street",
    title: "City Lights",
    aspect: "wide",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70",
    alt: "Travel photography",
    category: "Travel",
    title: "Horizon",
    aspect: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=70",
    alt: "Portrait photography",
    category: "Portraits",
    title: "Ethereal",
    aspect: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=70",
    alt: "Fashion photography",
    category: "Fashion",
    title: "Runway",
    aspect: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=70",
    alt: "Street photography",
    category: "Street",
    title: "Metropolis",
    aspect: "square",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=70",
    alt: "Travel photography",
    category: "Travel",
    title: "Cascades",
    aspect: "tall",
  },
  {
    id: 13,
    src: "/images/photograph-1.jpg",
    alt: "Couple at sunset by the cliffs",
    category: "Portraits",
    title: "Shoreline Glow",
    aspect: "tall",
  },
  {
    id: 14,
    src: "/images/photograph-2.jpg",
    alt: "Couple embracing at sunset by the sea",
    category: "Portraits",
    title: "Golden Embrace",
    aspect: "wide",
  },
  {
    id: 15,
    src: "/images/photograph-3.jpg",
    alt: "Couple portrait in black and white by the cliffs",
    category: "Portraits",
    title: "Timeless",
    aspect: "tall",
  },
];

export interface ProjectCollection {
  id: number;
  title: string;
  description: string;
  count: number;
  coverImage: string;
  images: string[];
}

export const projects: ProjectCollection[] = [
  {
    id: 1,
    title: "Portraits",
    description: "Intimate character studies revealing the soul behind the gaze",
    count: 12,
    coverImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=70",
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=70",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=70",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=70",
    ],
  },
  {
    id: 2,
    title: "Travel",
    description: "Journeys through landscapes that whisper stories of distant lands",
    count: 18,
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=70",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=70",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=70",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=70",
    ],
  },
  {
    id: 3,
    title: "Street",
    description: "Raw urban narratives captured in fleeting decisive moments",
    count: 15,
    coverImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=70",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=70",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=70",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=70",
    ],
  },
  {
    id: 4,
    title: "Fashion",
    description: "Where haute couture meets cinematic visual poetry",
    count: 10,
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=70",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=70",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=70",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=70",
    ],
  },
];
