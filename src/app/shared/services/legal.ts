import { Injectable, signal } from '@angular/core';

export type LegalDoc = 'impressum' | 'datenschutz' | null;

@Injectable({ providedIn: 'root' })
export class LegalService {
  readonly current = signal<LegalDoc>(null);

  open(doc: Exclude<LegalDoc, null>): void {
    this.current.set(doc);
  }

  close(): void {
    this.current.set(null);
  }
}
