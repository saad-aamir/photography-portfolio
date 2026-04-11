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
    src: "/images/photograph-1.jpg",
    alt: "Couple at sunset by the cliffs",
    category: "Portraits",
    title: "Shoreline Glow",
    aspect: "tall",
  },
  {
    id: 2,
    src: "/images/photograph-2.jpg",
    alt: "Couple embracing at sunset by the sea",
    category: "Portraits",
    title: "Golden Embrace",
    aspect: "wide",
  },
  {
    id: 3,
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
    description: "Intimate moments captured along the shoreline at golden hour",
    count: 3,
    coverImage: "/images/photograph-1.jpg",
    images: [
      "/images/photograph-1.jpg",
      "/images/photograph-2.jpg",
      "/images/photograph-3.jpg",
    ],
  },
];
