import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Value {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-about',
  imports: [MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly values: Value[] = [
    {
      icon: 'lightbulb',
      title: 'Kreativit\u00e4t',
      text: 'Ich denke in L\u00f6sungen und hole das Beste aus jeder Idee heraus.',
    },
    {
      icon: 'explore',
      title: 'Neugier',
      text: 'Aktuell bin ich in einer Backend-Ausbildung \u2014 um auch jenseits des Frontends sicher zu Hause zu sein.',
    },
    {
      icon: 'bolt',
      title: 'Disziplin',
      text: 'Klarer Code, klare Commits, klarer Fokus \u2014 Tag f\u00fcr Tag.',
    },
  ];
}
