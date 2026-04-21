import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Channel {
  icon: string;
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  imports: [MatIconModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly email = 'schusterphillip63@gmail.com';

  protected readonly channels: Channel[] = [
    { icon: 'link', label: 'LinkedIn', value: '/in/phillip-schuster', href: 'https://linkedin.com/' },
    { icon: 'code', label: 'GitHub', value: '@phillip', href: 'https://github.com/' },
  ];
}
