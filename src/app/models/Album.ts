import { Artist } from './Artist';

export interface Album {
  id: number;
  cover?: string;
  cover_big?: string;
  cover_medium?: string;
  cover_small?: string;
  cover_xl?: string;
  md5_image: string;
  title: string;
  tracklist?: string;
  label?: string;
  fans?: number;
  type: string;
  artist?: Artist;
}
