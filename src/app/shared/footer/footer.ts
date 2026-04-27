import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly i18n = inject(I18nService);

  protected readonly t = this.i18n.t;

  protected toggleLang(): void {
    this.i18n.toggle();
  }
}
