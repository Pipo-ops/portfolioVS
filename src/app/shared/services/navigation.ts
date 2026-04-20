import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly activeId = signal<string>('readme');

  setActive(id: string): void {
    if (id !== this.activeId()) {
      this.activeId.set(id);
    }
  }

  scrollTo(id: string): void {
    this.setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
