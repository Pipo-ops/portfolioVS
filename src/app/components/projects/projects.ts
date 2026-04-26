import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  id: string;
  file: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  images: string[];
  accent: string;
  demoUrl?: string;
}

@Component({
  selector: 'app-projects',
  imports: [MatIconModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects: Project[] = [
    {
      id: 'project-petru',
      file: 'petru.ts',
      name: 'Petru GmbH',
      tagline: 'Web-Entwicklung f\u00fcr einen echten Kunden',
      description:
        'Umsetzung der Web-Pr\u00e4senz f\u00fcr Petru \u2014 vom Konzept bis zum Deployment. ' +
        'Fokus auf klare Typografie, schnelle Ladezeit und einfache Wartbarkeit.',
      stack: ['Angular', 'SCSS', 'TypeScript'],
      images: ['/assets/img/projects/petru-1.png', '/assets/img/projects/petru-2.png'],
      accent: '#0098ff',
      demoUrl: '#',
    },
    {
      id: 'project-join',
      file: 'join.ts',
      name: 'Join',
      tagline: 'Kanban-Taskmanager mit Echtzeit-Backend',
      description:
        'Team-Taskmanager im Trello-Stil mit Drag-and-Drop, Kontakten und Priorit\u00e4ten. ' +
        'Firebase als Backend f\u00fcr Auth und Echtzeit-Daten \u2014 sauberes UI und ' +
        'verl\u00e4ssliche Persistenz.',
      stack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      images: ['/assets/img/projects/join-1.png', '/assets/img/projects/join-2.png'],
      accent: '#4ec9b0',
      demoUrl: '#',
    },
    {
      id: 'project-pollo',
      file: 'el-pollo-loco.ts',
      name: 'El Pollo Loco',
      tagline: '2D Jump-and-Run Game',
      description:
        'Objektorientiertes Browser-Spiel mit Canvas, Collision-Detection, Sound und ' +
        'Game-Loop. Charakter, Gegner und Items als eigene Klassen \u2014 sauber getrennt, ' +
        'leicht erweiterbar.',
      stack: ['JavaScript','HTML Canvas', 'CSS'],
      images: [
        '/assets/img/projects/el-pollo-loco-1.png',
        '/assets/img/projects/el-pollo-loco-2.png',
      ],
      accent: '#f5b342',
      demoUrl: '#',
    },
    {
      id: 'project-mietbar',
      file: 'mietbar.ts',
      name: 'Die Mietbar',
      tagline: 'Logistik-Tool f\u00fcr LKW- und Routenplanung',
      description:
        'Ma\u00dfgeschneiderte Software zur LKW- und Routenplanung f\u00fcr Mietbar. ' +
        'Entwickelt auf die konkreten Abl\u00e4ufe des Unternehmens \u2014 vereinfacht den ' +
        'Tagesbetrieb im Logistik-Team.',
      stack: ['Angular', 'TypeScript','SCSS', 'Firebase'],
      images: ['/assets/img/projects/mietbar-1.jpg'],
      accent: '#c586c0',
      demoUrl: '',
    },
  ];

  private readonly indices = signal<Record<string, number>>(
    Object.fromEntries(this.projects.map((p) => [p.id, 0])),
  );

  constructor() {
    const intervalId = window.setInterval(() => {
      this.indices.update((current) => {
        const next: Record<string, number> = { ...current };
        for (const p of this.projects) {
          if (p.images.length > 1) {
            next[p.id] = (current[p.id] + 1) % p.images.length;
          }
        }
        return next;
      });
    }, 4500);

    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }

  protected currentIndex(project: Project): number {
    return this.indices()[project.id] ?? 0;
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  protected setActive(project: Project, index: number): void {
    this.indices.update((curr) => ({ ...curr, [project.id]: index }));
  }
}
