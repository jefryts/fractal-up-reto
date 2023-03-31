import { Album } from './Album';
import { Artist } from './Artist';

export interface Song {
  id: number;
  duration: number;
  explicit_content_cover?: number;
  explicit_content_lyrics?: number;
  explicit_lyrics?: boolean;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short?: string;
  type: string;
  artist?: Artist;
  album?: Album;
}

export interface CurrentSong extends Song {
  index: number;
}
