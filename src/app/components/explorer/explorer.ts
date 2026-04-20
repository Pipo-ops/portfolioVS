import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  iconColor?: string;
  children?: FileNode[];
  expanded?: boolean;
  active?: boolean;
  targetId?: string;
}

@Component({
  selector: 'app-explorer',
  imports: [MatIconModule, NgTemplateOutlet],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
})
export class Explorer {
  protected readonly workspaceOpen = signal(true);
  protected readonly outlineOpen = signal(false);
  protected readonly timelineOpen = signal(false);

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
            { name: 'join.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-join' },
            { name: 'el-pollo-loco.ts', type: 'file', icon: 'code', iconColor: '#519aba', targetId: 'project-pollo' },
          ],
        },
      ],
    },
    { name: 'README.md', type: 'file', icon: 'description', iconColor: '#519aba', active: true, targetId: 'readme' },
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
      this.setActive(node);
      document
        .getElementById(node.targetId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private setActive(target: FileNode): void {
    const clear = (nodes: FileNode[]): void => {
      for (const n of nodes) {
        n.active = false;
        if (n.children) clear(n.children);
      }
    };
    const current = this.tree();
    clear(current);
    target.active = true;
    this.tree.set([...current]);
  }
}
