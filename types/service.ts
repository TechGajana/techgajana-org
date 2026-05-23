export interface Service {
  id: string;

  title: string;
  slug: string;

  short_description: string;
  full_description: string;

  image_url: string;

  featured: boolean;

  seo_title: string;
  seo_description: string;

  created_at: string;
}