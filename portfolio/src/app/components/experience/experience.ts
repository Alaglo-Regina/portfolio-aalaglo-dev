import { Component } from '@angular/core';

interface TimelineItem {
  date: string;
  role: string;
  org: string;
  bullets?: string[];
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
      date: '2025',
      role: 'Développeuse Web & Mobile',
      org: 'Agence Togo Digital (ATD) (Juin 2025 → Aujourd\'hui)',
      bullets: [
        'Développement du site web IA-Challenge (challenge-sante.gouv.tg)',
        'Contribution au développement du portail des services publics',
      ],
    },
    {
      date: '2024',
      role: 'Développeuse',
      org: 'Coworkersgroup (Novembre 2024 → Mai 2025)',
      bullets: [
        'Création d\'une application de gestion de biens immobiliers en Flutter',
        'Sites livrés : Coworkers, Urbex, Omerta, Friend of Figma',
      ],
    },
  ];

  readonly education: TimelineItem[] = [
    {
      date: '2024',
      role: 'Développement Web et Mobile',
      org: 'Académie Digital Numérique / Simplon.co (Lomé, Togo, Jan–Nov 2024)',
    },
    {
      date: '2019–23',
      role: 'Licence en Mathématiques',
      org: 'Université de Lomé (Lomé, Togo)',
    },
    {
      date: '2018–19',
      role: 'BAC C4',
      org: 'Lycée de Gbenyedzi (Lomé, Togo)',
    },
  ];
}
