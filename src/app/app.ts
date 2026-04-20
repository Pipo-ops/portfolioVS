import { Component, signal } from '@angular/core';
import { ActivityBar } from './components/activity-bar/activity-bar';
import { Explorer } from './components/explorer/explorer';
import { Hero } from './components/hero/hero';
import { TabBar } from './components/tab-bar/tab-bar';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ActivityBar, Explorer, TabBar, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolioVs');
}
