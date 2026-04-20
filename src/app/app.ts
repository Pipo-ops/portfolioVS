import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { About } from './components/about/about';
import { ActivityBar } from './components/activity-bar/activity-bar';
import { Explorer } from './components/explorer/explorer';
import { Hero } from './components/hero/hero';
import { Skills } from './components/skills/skills';
import { TabBar } from './components/tab-bar/tab-bar';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { NavigationService } from './shared/services/navigation';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ActivityBar, Explorer, TabBar, Hero, About, Skills],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolioVs');

  private readonly nav = inject(NavigationService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollRoot = viewChild<ElementRef<HTMLElement>>('scrollRoot');

  constructor() {
    afterNextRender(() => this.observeSections());
  }

  private observeSections(): void {
    const root = this.scrollRoot()?.nativeElement;
    if (!root) return;

    const sections = root.querySelectorAll<HTMLElement>('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          this.nav.setActive(visible[0].target.id);
        }
      },
      {
        root,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
