

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // ⬅️ NOVO IMPORT

@Component({
  selector: 'app-hero-header',
  standalone: true,
  imports: [RouterLink], // ⬅️ ADICIONADO AQUI
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent {}
