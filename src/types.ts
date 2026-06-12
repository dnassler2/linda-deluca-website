export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  price: string;
  category: 'linocuts' | 'animals' | 'circles' | 'city' | 'paris' | 'portraits' | 'resin-lino' | 'vegas';
  imageUrl: string;
  description: string;
  wallPosition?: {
    top: string; // Percentage from top of wall
    left: string; // Percentage from left of wall
    width: string; // Percentage width
    height: string; // Percentage height
  };
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  dates: string;
  type: 'solo' | 'group';
}

export interface ArtistProfile {
  name: string;
  bio: string;
  statement: string;
  email: string;
  instagram: string;
  studioLocation: string;
}
