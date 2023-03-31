import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() colorSlider: string = '#FF7676';

  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() step: number = 1;

  value!: number;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.value = (this.max + this.min) / 2;
  }

  onSliderChange(event: any) {
    this.value = event.target.value;

    this.audioService.volume(this.value);
  }

  fixLeft(value: number) {
    let val = (value / (this.max - this.min)) * 100;

    if (this.min !== 0) val = ((value - this.min) / (this.max - this.min)) * 100;

    if (val <= 32) return val + 2.9;
    if (val >= 70) return val - 2.9;
    return val;
  }

  withProgressBar(value: number) {
    if (this.min !== 0) return ((value - this.min) / (this.max - this.min)) * 100;
    return (value / (this.max - this.min)) * 100;
  }
}
