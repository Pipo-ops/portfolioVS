import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly name = 'Phillip Schuster';
  protected readonly role = 'Frontend-Entwickler';
  protected readonly location = 'Österreich';
  protected readonly photo = 'assets/img/profil-img/profil-img.jpg';
  protected readonly fallback = 'assets/img/profil-img/profil-img.jpg';

  protected readonly primaryCta = { label: 'Jetzt kontaktieren', icon: 'arrow_forward', href: 'mailto:schusterphillip63@gmail.com' };
  protected readonly secondaryCta = { label: 'Projekte ansehen', icon: 'folder_open', href: '#projects' };

  protected readonly socials = [
    { label: 'GitHub', icon: 'code', href: 'https://github.com/' },
    { label: 'LinkedIn', icon: 'link', href: 'https://linkedin.com/' },
    { label: 'E-Mail', icon: 'mail', href: 'mailto:schusterphillip63@gmail.com' },
  ];

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.photo)) {
      img.src = this.fallback;
    }
  }
}
