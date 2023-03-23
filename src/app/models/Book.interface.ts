import { ImageLinks } from './ImageLinks.interface';

export interface Book {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  previewLink?: string;
  thumbnail?: ImageLinks;
}
