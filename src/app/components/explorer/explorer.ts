import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../shared/services/navigation';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  iconColor?: string;
  children?: FileNode[];
  expanded?: boolean;
  targetId?: string;
}

@Component({
  selector: 'app-explorer',
  imports: [MatIconModule, NgTemplateOutlet],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
})
export class Explorer {
  private readonly nav = inject(NavigationService);

  protected readonly workspaceOpen = signal(true);
  protected readonly outlineOpen = signal(false);
  protected readonly timelineOpen = signal(false);

  protected readonly activeId = this.nav.activeId;

  protected readonly tree = signal<FileNode[]>([
    {
      name: 'src',
      type: 'folder',
      expanded: true,
      children: [
        { name: 'about.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'about' },
        { name: 'skills.json', type: 'file', icon: 'data_object', iconColor: '#cbcb41', targetId: 'skills' },
        {
          name: 'projects',
          type: 'folder',
          expanded: true,
          children: [
            { name: 'petru.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-petru' },
            { name: 'join.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-join' },
            { name: 'el-pollo-loco.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-pollo' },
            { name: 'mietbar.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-mietbar' },
          ],
        },
      ],
    },
    { name: 'README.md', type: 'file', icon: 'description', iconColor: '#519aba', targetId: 'readme' },
    { name: 'LEGAL.md', type: 'file', icon: 'description', iconColor: '#858585', targetId: 'legal' },
    { name: 'IMPRINT.md', type: 'file', icon: 'description', iconColor: '#858585', targetId: 'imprint' },
  ]);

  protected onNodeClick(node: FileNode): void {
    if (node.type === 'folder') {
      node.expanded = !node.expanded;
      this.tree.set([...this.tree()]);
      return;
    }

    if (node.targetId) {
      this.nav.scrollTo(node.targetId);
    }
  }
}
