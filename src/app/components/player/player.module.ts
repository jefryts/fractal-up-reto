import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderModule } from '../slider/slider.module';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule, SliderModule],
  declarations: [PlayerComponent],
  exports: [PlayerComponent],
})
export class PlayerModule {}
