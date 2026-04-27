import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../shared/services/i18n';

interface Skill {
  name: string;
  image: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly i18n = inject(I18nService);

  protected readonly t = computed(() => this.i18n.t().skills);

  protected readonly photo = 'assets/img/profil-img/profil-img-two.jpg';

  protected readonly skills: Skill[] = [
    { name: 'HTML', image: 'assets/img/skills/HTML.png' },
    { name: 'CSS', image: 'assets/img/skills/CSS.png' },
    { name: 'JavaScript', image: 'assets/img/skills/Js.png' },
    { name: 'TypeScript', image: 'assets/img/skills/Ts.png' },
    { name: 'Angular', image: 'assets/img/skills/Angular.png' },
    { name: 'Vue.js', image: 'assets/img/skills/Vue.Js%20(1).png' },
    { name: 'Material Design', image: 'assets/img/skills/Material-Designe.png' },
    { name: 'Firebase', image: 'assets/img/skills/Firebase.png' },
    { name: 'REST API', image: 'assets/img/skills/Api.png' },
    { name: 'Python', image: 'assets/img/skills/python.png' },
    { name: 'Git', image: 'assets/img/skills/Git.png' },
    { name: 'Scrum', image: 'assets/img/skills/Scrum.png' },
  ];
}
