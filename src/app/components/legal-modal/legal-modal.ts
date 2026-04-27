import { Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LegalService } from '../../shared/services/legal';

@Component({
  selector: 'app-legal-modal',
  imports: [MatIconModule],
  templateUrl: './legal-modal.html',
  styleUrl: './legal-modal.scss',
})
export class LegalModal {
  private readonly legal = inject(LegalService);

  protected readonly current = this.legal.current;

  protected close(): void {
    this.legal.close();
  }

  protected onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.current()) {
      this.close();
    }
  }
}
