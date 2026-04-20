import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ActivityItem {
  id: string;
  icon: string;
  label: string;
  badge?: string;
}

@Component({
  selector: 'app-activity-bar',
  imports: [MatIconModule],
  templateUrl: './activity-bar.html',
  styleUrl: './activity-bar.scss',
})
export class ActivityBar {
  protected readonly active = signal('explorer');

  protected readonly topItems: ActivityItem[] = [
    { id: 'explorer', icon: 'folder_copy', label: 'Explorer' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'scm', icon: 'source', label: 'Source Control', badge: '2' },
    { id: 'run', icon: 'play_circle', label: 'Run and Debug' },
    { id: 'extensions', icon: 'extension', label: 'Extensions' },
  ];

  protected readonly bottomItems: ActivityItem[] = [
    { id: 'account', icon: 'account_circle', label: 'Accounts' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  protected select(id: string): void {
    this.active.set(id);
  }
}
