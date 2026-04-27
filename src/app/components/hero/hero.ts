import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../shared/services/i18n';
import { NavigationService } from '../../shared/services/navigation';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly nav = inject(NavigationService);
  private readonly i18n = inject(I18nService);

  protected readonly t = computed(() => this.i18n.t().hero);

  protected readonly name = 'Phillip Schuster';
  protected readonly photo = 'assets/img/profil-img/profil-img.jpg';
  protected readonly fallback = 'assets/img/profil-img/profil-img.jpg';

  protected readonly socials = [
    { label: 'GitHub', icon: 'code', href: 'https://github.com/Pipo-ops' },
    { label: 'LinkedIn', icon: 'link', href: 'https://www.linkedin.com/in/phillip-schuster-11a3b0365/' },
    { label: 'E-Mail', icon: 'mail', href: 'mailto:office@schuster-phillip.at' },
  ];

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.nav.scrollTo(id);
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.photo)) {
      img.src = this.fallback;
    }
  }
}
