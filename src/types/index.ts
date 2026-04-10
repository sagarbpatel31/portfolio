export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  highlights: string[];
  metrics?: string[];
  links?: { label: string; url: string }[];
  featured: boolean;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Award {
  title: string;
  event: string;
  year: string;
  description: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export interface Education {
  degree: string;
  university: string;
  period: string;
  location?: string;
  coursework: string[];
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Highlight {
  title: string;
  description: string;
  metric?: string;
  tags: string[];
}
