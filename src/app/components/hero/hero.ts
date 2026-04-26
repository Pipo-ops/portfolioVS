import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../shared/services/navigation';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly nav = inject(NavigationService);

  protected readonly name = 'Phillip Schuster';
  protected readonly role = 'Frontend-Entwickler';
  protected readonly location = 'Österreich';
  protected readonly photo = 'assets/img/profil-img/profil-img.jpg';
  protected readonly fallback = 'assets/img/profil-img/profil-img.jpg';

  protected readonly primaryCta = { label: 'Jetzt kontaktieren', icon: 'arrow_forward', targetId: 'contact' };
  protected readonly secondaryCta = { label: 'Projekte ansehen', icon: 'folder_open', targetId: 'projects' };

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
