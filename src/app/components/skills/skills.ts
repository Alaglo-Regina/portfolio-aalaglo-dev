import { Component } from '@angular/core';

interface SkillCard {
  title: string;
  chips: string[];
  icon: string;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly skillCards: SkillCard[] = [
    { 
      title: 'Langages & front-end', 
      chips: ['HTML', 'CSS', 'JavaScript'],
      icon: 'code'
    },
    { 
      title: 'Mobile & back-end', 
      chips: ['PHP', 'Flutter', 'Node.js'],
      icon: 'mobile'
    },
    { 
      title: 'Frameworks', 
      chips: ['Angular', 'Laravel', 'React.js', 'Nest.js'],
      icon: 'frameworks'
    },
    { 
      title: 'UI', 
      chips: ['Bootstrap', 'Tailwind CSS'],
      icon: 'ui'
    },
    { 
      title: 'Bases de données', 
      chips: ['MariaDB', 'MongoDB', 'PostgreSQL'],
      icon: 'db'
    },
    {
      title: 'Auth & architecture',
      chips: ['Keycloak', 'OAuth', 'Feature-based', 'Onion', 'MVC'],
      icon: 'auth'
    },
  ];
}
