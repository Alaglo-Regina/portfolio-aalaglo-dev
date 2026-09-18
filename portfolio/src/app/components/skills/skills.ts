import { Component } from '@angular/core';

interface SkillCard {
  title: string;
  chips: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly skillCards: SkillCard[] = [
    { title: 'Langages & front-end', chips: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'Mobile & back-end', chips: ['PHP', 'Flutter', 'Node.js'] },
    { title: 'Frameworks', chips: ['Angular', 'Laravel', 'React.js', 'Nest.js'] },
    { title: 'UI', chips: ['Bootstrap', 'Tailwind CSS'] },
    { title: 'Bases de données', chips: ['MariaDB', 'MongoDB', 'PostgreSQL'] },
    {
      title: 'Auth & architecture',
      chips: ['Keycloak', 'OAuth', 'Feature-based', 'Onion', 'MVC'],
    },
  ];
}
