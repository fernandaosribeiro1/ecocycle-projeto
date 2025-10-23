import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MenuFixoComponent } from '../menu-fixo/menu-fixo.component';
import { HeroComponent } from '../hero/hero.component';
import { ComoFuncionaComponent } from '../como-funciona/como-funciona.component';
import { ParceirosPremiumComponent } from '../parceiros-premium/parceiros-premium.component';
import { InterfaceIntuitivaComponent } from '../interface-intuitiva/interface-intuitiva.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuFixoComponent,
    HeroComponent,
    ComoFuncionaComponent,
    ParceirosPremiumComponent,
    InterfaceIntuitivaComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  showMainHeader = true;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // espera o DOM renderizar
    setTimeout(() => this.initObserver(), 0);
  }

  initObserver() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // se o hero está visível, escondemos o header principal
      this.showMainHeader = !entry.isIntersecting;
    }, { threshold: 0.1 });

    this.observer.observe(hero);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
