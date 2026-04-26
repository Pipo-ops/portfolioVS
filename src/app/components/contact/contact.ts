import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Channel {
  icon: string;
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);

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
  });

  protected readonly submitted = signal(false);

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, company, subject, message } = this.form.getRawValue();

    const lines = [
      `Von: ${name} <${email}>`,
      company ? `Firma / Rolle: ${company}` : null,
      '',
      message,
    ].filter(Boolean);

    const mailtoSubject = subject?.trim() || `Portfolio-Kontakt von ${name}`;
    const body = lines.join('\r\n');
    const mailto =
      `mailto:${this.email}` +
      `?subject=${encodeURIComponent(mailtoSubject)}` +
      `&body=${encodeURIComponent(body)}`;

    const link = document.createElement('a');
    link.href = mailto;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    this.submitted.set(true);
  }

  protected resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }

  protected hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!control && control.touched && control.hasError(error);
  }
}
