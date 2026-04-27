import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../shared/services/i18n';

@Component({
  selector: 'app-about',
  imports: [MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly i18n = inject(I18nService);

  protected readonly t = computed(() => this.i18n.t().about);
}
