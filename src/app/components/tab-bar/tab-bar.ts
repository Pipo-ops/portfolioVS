import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../shared/services/navigation';

export interface EditorTab {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  dirty?: boolean;
}

const ROOT = 'schuster-phillip';

const BREADCRUMB_MAP: Record<string, string[]> = {
  readme: [ROOT, 'README.md'],
  about: [ROOT, 'src', 'about.ts'],
  skills: [ROOT, 'src', 'skills.json'],
  'project-petru': [ROOT, 'src', 'projects', 'petru.ts'],
  'project-join': [ROOT, 'src', 'projects', 'join.ts'],
  'project-pollo': [ROOT, 'src', 'projects', 'el-pollo-loco.ts'],
  'project-mietbar': [ROOT, 'src', 'projects', 'mietbar.ts'],
  contact: [ROOT, 'src', 'contact.ts'],
  legal: [ROOT, 'LEGAL.md'],
  imprint: [ROOT, 'IMPRINT.md'],
};

@Component({
  selector: 'app-tab-bar',
  imports: [MatIconModule],
  templateUrl: './tab-bar.html',
  styleUrl: './tab-bar.scss',
})
export class TabBar {
  private readonly nav = inject(NavigationService);

  protected readonly tabs = signal<EditorTab[]>([
    { id: 'readme', name: 'README.md', icon: 'description', iconColor: '#519aba' },
    { id: 'about', name: 'about.ts', icon: 'code', iconColor: '#519aba' },
  ]);

  protected readonly activeId = this.nav.activeId;

  protected readonly breadcrumbs = computed<string[]>(
    () => BREADCRUMB_MAP[this.activeId()] ?? [ROOT, 'README.md'],
  );

  protected select(id: string): void {
    this.nav.scrollTo(id);
  }

  protected close(event: Event, id: string): void {
    event.stopPropagation();
    const next = this.tabs().filter((tab) => tab.id !== id);
    this.tabs.set(next);
  }
}
