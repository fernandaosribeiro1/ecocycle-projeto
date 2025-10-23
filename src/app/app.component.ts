import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root' ,
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Ecocycle-Projeto';
  showMainHeader = true;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // Espera o DOM carregar
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
