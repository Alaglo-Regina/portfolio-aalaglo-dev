import { Component } from '@angular/core';

interface TimelineItem {
  date: string;
  current?: boolean;
  role: string;
  org: string;
  bullets?: string[];
  logos?: string[];
}

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  readonly jobs: TimelineItem[] = [
    {
      date: 'Juin 2025 — En cours',
      current: true,
      role: 'Développeuse Web & Mobile',
      org: 'Agence Togo Digital (ATD)',
      logos: ['assets/images/logo atd.png'],
      bullets: [
        'Conception et développement full-stack du portail gouvernemental IA-Challenge (challenge-sante.gouv.tg).',
        'Architecture et intégration sécurisée des API pour le portail central des services publics.',
        'Travail collaboratif en environnement Agile (Scrum) avec les équipes design et DevOps.',
      ],
    },
    {
      date: 'Nov 2024 — Mai 2025',
      role: 'Développeuse Full-Stack',
      org: 'Coworkersgroup',
      logos: ['assets/coworker logo.jpg'],
      bullets: [
        'Développement de A à Z d\'une application mobile de gestion immobilière (Flutter & Dart).',
        'Intégration d\'interfaces pixel-perfect à partir de maquettes Figma avec animations fluides.',
        'Réalisation technique de multiples plateformes : Coworkers, Urbex, Omerta, Friend of Figma.',
      ],
    },
  ];

  readonly education: TimelineItem[] = [
    {
      date: '2024',
      role: 'Développement Web et Mobile',
      org: 'Académie Digital Numérique / Simplon.co ',
      logos: ['assets/ADN logo.png', 'assets/Logo_simplon.co.svg.webp'],
    },
    {
      date: '2019–23',
      role: 'Licence en Mathématiques',
      org: 'Université de Lomé (Lomé, Togo)',
      logos: ['assets/Université de lomé logo.png'],
    },
    /*     {
          date: '2018–19',
          role: 'BAC C4',
          org: 'Lycée de Gbenyedzi (Lomé, Togo)',
        }, */
  ];
}
