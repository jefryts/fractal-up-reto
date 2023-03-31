import { Component } from '@angular/core';
import { CurrentSong, Song } from 'src/app/models/Song';
import {
  faStepBackward,
  faStepForward,
  faVolumeOff,
  faVolumeUp,
  faPlay,
  faPause,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/models/stream-state';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  playIcon: IconDefinition = faPlay;

  pauseIcon: IconDefinition = faPause;

  backwardIcon: IconDefinition = faStepBackward;

  fordwardIcon: IconDefinition = faStepForward;

  volumeOffIcon: IconDefinition = faVolumeOff;

  volumeOnIcon: IconDefinition = faVolumeUp;

  statePlayer!: StreamState;

  currentSong!: CurrentSong;

  resultSongs!: Song[];

  muted: boolean = false;

  constructor(private audioService: AudioService, private listService: ListService) {
    this.audioService.getState().subscribe((state) => {
      this.statePlayer = state;
    });

    this.listService.getList().subscribe((list) => {
      this.resultSongs = list;
    });

    this.listService.getCurrentSong().subscribe((current) => {
      this.currentSong = current;
    });
  }

  getCoverAlbum(item: Song): string {
    return item.album?.cover_medium || item.album?.cover || '';
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  next() {
    const index = this.currentSong.index + 1;
    const file = this.resultSongs[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentSong.index - 1;
    const file = this.resultSongs[index];
    this.openFile(file, index);
  }

  disallowPrevious(): boolean {
    return this.currentSong.index === 0;
  }

  disallowNext(): boolean {
    return this.currentSong.index === this.resultSongs.length - 1;
  }

  private openFile(song: Song, index: number) {
    this.audioService.openFile(song, index);
  }

  changeMuted() {
    this.muted = !this.muted;
    this.audioService.volume(this.muted ? 0 : 100);
  }
}
