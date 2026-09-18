import { Component } from '@angular/core';

interface TechLogo {
  name: string;
  icon: string;
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  readonly githubLink = 'https://github.com/Alaglo-Regina';
  readonly linkedinLink = 'https://linkedin.com/in/r%C3%A9gina-alaglo';

  readonly techStack: TechLogo[] = [
    { name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original.svg` },
    { name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original.svg` },
    { name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
    { name: 'PHP', icon: `${DEVICON_BASE}/php/php-original.svg` },
    { name: 'Angular', icon: `${DEVICON_BASE}/angular/angular-original.svg` },
    { name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg` },
    { name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
    { name: 'Flutter', icon: `${DEVICON_BASE}/flutter/flutter-original.svg` },
    { name: 'Laravel', icon: `${DEVICON_BASE}/laravel/laravel-original.svg` },
    { name: 'WordPress', icon: `${DEVICON_BASE}/wordpress/wordpress-plain.svg` },
    { name: 'MongoDB', icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
    { name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
  ];
}
