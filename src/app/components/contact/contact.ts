import { HttpClient } from '@angular/common/http';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../../shared/services/i18n';
import { LegalService } from '../../shared/services/legal';

interface Channel {
  icon: string;
  label: string;
  value: string;
  href: string;
}

type FormState = 'idle' | 'sending' | 'success' | 'error';

const ENDPOINT = '/api/mail.php';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly legal = inject(LegalService);
  private readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly t = computed(() => this.i18n.t().contact);

  protected readonly email = 'office@schuster-phillip.at';

  protected readonly channels: Channel[] = [
    { icon: 'link', label: 'LinkedIn', value: '/in/phillip-schuster', href: 'https://www.linkedin.com/in/phillip-schuster-11a3b0365/' },
    { icon: 'code', label: 'GitHub', value: '@Pipo-ops', href: 'https://github.com/Pipo-ops' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    consent: [false, Validators.requiredTrue],
    website: [''], // honeypot
  });

  protected readonly state = signal<FormState>('idle');

  protected onSubmit(): void {
    if (this.form.invalid || this.state() === 'sending') {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('sending');

    const payload = this.form.getRawValue();

    this.http
      .post<{ ok: boolean; error?: string }>(ENDPOINT, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.ok) {
            this.state.set('success');
            this.form.reset();
          } else {
            this.state.set('error');
          }
        },
        error: () => {
          this.state.set('error');
        },
      });
  }

  protected resetForm(): void {
    this.form.reset();
    this.state.set('idle');
  }

  protected hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!control && control.touched && control.hasError(error);
  }

  protected openDatenschutz(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.legal.open('datenschutz');
  }
}
