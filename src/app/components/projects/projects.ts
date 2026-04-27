import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../shared/services/i18n';

interface Project {
  id: string;
  file: string;
  name: string;
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
  private readonly i18n = inject(I18nService);

  protected readonly t = computed(() => this.i18n.t().projects);

  protected readonly projects: Project[] = [
    {
      id: 'project-petru',
      file: 'petru.ts',
      name: 'Petru GmbH',
      stack: ['Angular', 'SCSS', 'TypeScript'],
      images: ['/assets/img/projects/petru-1.png', '/assets/img/projects/petru-2.png'],
      accent: '#0098ff',
      demoUrl: 'http://petru2.schuster-phillip.at/',
    },
    {
      id: 'project-join',
      file: 'join.ts',
      name: 'Join',
      stack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      images: ['/assets/img/projects/join-1.png', '/assets/img/projects/join-2.png'],
      accent: '#4ec9b0',
      demoUrl: 'https://join.schuster-phillip.at/',
    },
    {
      id: 'project-pollo',
      file: 'el-pollo-loco.ts',
      name: 'El Pollo Loco',
      stack: ['JavaScript', 'HTML Canvas', 'CSS'],
      images: [
        '/assets/img/projects/el-pollo-loco-1.png',
        '/assets/img/projects/el-pollo-loco-2.png',
      ],
      accent: '#f5b342',
      demoUrl: 'https://elpolloloco.schuster-phillip.at/',
    },
    {
      id: 'project-mietbar',
      file: 'mietbar.ts',
      name: 'Die Mietbar',
      stack: ['Angular', 'TypeScript', 'SCSS', 'Firebase'],
      images: ['/assets/img/projects/mietbar-1.jpg'],
      accent: '#c586c0',
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

  protected projectText(id: string) {
    return this.t().items[id];
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  protected setActive(project: Project, index: number): void {
    this.indices.update((curr) => ({ ...curr, [project.id]: index }));
  }
}
