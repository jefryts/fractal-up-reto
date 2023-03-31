import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { ListService } from './list.service';
import { STATE_LIST_FOUND_SONGS } from '../constants/all';

@Injectable({
  providedIn: 'root',
})
export class DeezerService {
  private BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/';

  constructor(private httpClient: HttpClient, private listService: ListService) {}

  search(text: string): Observable<any> {
    const url = `${this.BASE_URL}search?q=${text}`;
    return this.httpClient.get<any>(url);
  }

  getAlbum(id: number): Observable<any> {
    const url = `${this.BASE_URL}album/${id}`;
    return this.httpClient.get<Album>(url);
  }

  getArtist(id: number): Observable<any> {
    const url = `${this.BASE_URL}artist/${id}`;
    return this.httpClient.get<Artist>(url);
  }

  async goSearch(text: string) {
    if (!text) {
      this.listService.copyRecentSongsList();

      return;
    }

    if (text.length < 3) {
      return;
    }

    this.listService.changeList([]);

    const { data } = await lastValueFrom(this.search(text));

    this.listService.changeTitleList(STATE_LIST_FOUND_SONGS);
    this.listService.changeList(data);
  }
}
