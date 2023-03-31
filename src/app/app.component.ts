import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { faSearch, faUser, faPlay } from '@fortawesome/free-solid-svg-icons';
import { DeezerService } from './services/deezer-service';
import { Song } from './models/Song';
import { AudioService } from './services/audio.service';
import { Album } from './models/Album';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchIcon = faSearch;

  userIcon = faUser;

  playIcon = faPlay;

  searchText: string = '';

  resultTitle: string = '';

  resultSongs!: Song[];

  firstAlbum?: Album;

  constructor(
    private deezerService: DeezerService,
    private audioService: AudioService,
    private listService: ListService
  ) {
    this.listService.getList().subscribe((list) => {
      this.resultSongs = list;

      if (this.resultSongs[0]) {
        this.getAlbum(this.resultSongs[0].album?.id!);
      }
    });

    this.listService.getTitleList().subscribe((title) => {
      this.resultTitle = title;
    });
  }

  async search() {
    await this.deezerService.goSearch(this.searchText);
  }

  getCoverAlbum(item: Song): string {
    return item.album?.cover_medium || item.album?.cover || '';
  }

  openFile(song: Song, index: number) {
    this.audioService.openFile(song, index);
  }

  async getAlbum(id: number) {
    this.firstAlbum = undefined;

    const album = await lastValueFrom(this.deezerService.getAlbum(id));

    if (album) {
      this.firstAlbum = album;

      const artist = await this.getArtist(album.artist?.id!);

      if (artist) {
        this.firstAlbum = {
          ...this.firstAlbum,
          artist: { ...artist },
        } as Album;
      }
    }
  }

  async getArtist(id: number) {
    return lastValueFrom(this.deezerService.getArtist(id));
  }

  numberWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
