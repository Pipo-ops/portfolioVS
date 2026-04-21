import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  id: string;
  file: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  image: string;
  accent: string;
  demoUrl?: string;
  repoUrl?: string;
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
      id: 'project-join',
      file: 'join.ts',
      name: 'Join',
      tagline: 'Kanban-Taskmanager f\u00fcr Teams',
      description:
        'Eine Task-Management-App im Trello-Stil mit Drag-and-Drop-Board, Kontakten und ' +
        'Aufgaben-Priorit\u00e4ten. Fokus auf sauberen UI-States, Formular-Validierung und ' +
        'persistente Daten.',
      stack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      image: 'assets/img/projects/join.png',
      accent: '#4ec9b0',
      demoUrl: '#',
      repoUrl: '#',
    },
    {
      id: 'project-pollo',
      file: 'el-pollo-loco.ts',
      name: 'El Pollo Loco',
      tagline: '2D Jump-and-Run Game',
      description:
        'Ein objektorientiertes Browser-Spiel mit Canvas, Collision-Detection, Sound und ' +
        'Game-Loop. Charakter, Gegner und Items als eigene Klassen \u2014 sauber getrennt, ' +
        'leicht erweiterbar.',
      stack: ['JavaScript', 'OOP', 'HTML Canvas', 'CSS'],
      image: 'assets/img/projects/el-pollo-loco.png',
      accent: '#f5b342',
      demoUrl: '#',
      repoUrl: '#',
    },
  ];

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
