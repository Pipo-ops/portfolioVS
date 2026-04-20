import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface EditorTab {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  dirty?: boolean;
}

@Component({
  selector: 'app-tab-bar',
  imports: [MatIconModule],
  templateUrl: './tab-bar.html',
  styleUrl: './tab-bar.scss',
})
export class TabBar {
  protected readonly tabs = signal<EditorTab[]>([
    { id: 'readme', name: 'README.md', icon: 'description', iconColor: '#519aba' },
    { id: 'about', name: 'about.ts', icon: 'code', iconColor: '#519aba' },
  ]);

  protected readonly activeId = signal<string>('readme');

  protected readonly breadcrumbs = signal<string[]>(['schuster-phillip', 'README.md']);

  protected select(id: string): void {
    this.activeId.set(id);
  }

  protected close(event: MouseEvent, id: string): void {
    event.stopPropagation();
    const next = this.tabs().filter((tab) => tab.id !== id);
    this.tabs.set(next);
    if (this.activeId() === id && next.length) {
      this.activeId.set(next[0].id);
    }
  }
}
