import { Component } from '@angular/core';
import { HeroHeaderComponent } from './hero-header.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroHeaderComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

}
