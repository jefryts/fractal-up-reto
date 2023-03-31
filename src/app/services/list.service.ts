import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NAME_OBJECT_STORAGE, STATE_LIST_RECENT_SONGS } from '../constants/all';
import { CurrentSong, Song } from '../models/Song';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private listRecentSongs: Song[] = this.storageService.get(NAME_OBJECT_STORAGE);

  private listRecentChange: BehaviorSubject<Song[]> = new BehaviorSubject(this.listRecentSongs);

  private listSongs: Song[] = [...this.listRecentSongs];

  private listChange: BehaviorSubject<Song[]> = new BehaviorSubject(this.listSongs);

  private currentSong!: CurrentSong;

  private currentSongChange: BehaviorSubject<CurrentSong> = new BehaviorSubject(this.currentSong);

  private titleList: string = STATE_LIST_RECENT_SONGS;

  private TitleListChange: BehaviorSubject<string> = new BehaviorSubject(this.titleList);

  constructor(private storageService: LocalStorageService) {}

  getList(): Observable<Song[]> {
    return this.listChange.asObservable();
  }

  getTitleList(): Observable<string> {
    return this.TitleListChange.asObservable();
  }

  getCurrentSong(): Observable<CurrentSong> {
    return this.currentSongChange.asObservable();
  }

  changeList(songs: Song[]) {
    this.listSongs = [...songs];
    this.listChange.next(this.listSongs);
  }

  changeCurrentSong(song: Song, index: number) {
    const currentSong = { ...song, index };
    this.currentSong = currentSong;
    this.currentSongChange.next(currentSong);
    this.saveToRecents(song);
  }

  changeTitleList(title: string) {
    this.titleList = title;
    this.TitleListChange.next(this.titleList);
  }

  saveToRecents(song: Song) {
    const index = this.listRecentSongs.findIndex((recSong) => song.id === recSong.id);

    if (index > -1) this.listRecentSongs.splice(index, 1);

    this.listRecentSongs.unshift(song);
    this.changeListRecentSongs(this.listRecentSongs);
  }

  copyRecentSongsList() {
    this.changeList(this.listRecentSongs);
    this.changeTitleList(STATE_LIST_RECENT_SONGS);
  }

  private changeListRecentSongs(list: Song[]) {
    this.listRecentChange.next(list);
    this.storageService.set(NAME_OBJECT_STORAGE, list);
  }
}
