import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  link?: string;
  placeholderText?: string;
  statusBadge?: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly projects: Project[] = [
    {
      title: 'Tech Santé',
      description: 'Portail de services publics (moteur de templates).',
      tags: ['Nest.js', 'EJS'],
      image: 'assets/images/proj-1.jpg',
      imageAlt: 'Aperçu du site Tech Santé',
      link: 'https://challenge-sante.gouv.tg/',
    },
    {
      title: "Middleware d'orchestration",
      description: 'Front-end du portail des services publics.',
      tags: ['Angular'],
      image: 'assets/images/proj-2.jpg',
      imageAlt: 'Aperçu du guichet national des démarches administratives',
      link: 'https://service-public.gouv.tg/',
    },
    {
      title: 'Urbex',
      description: 'Plateforme immobilière (thème WordPress).',
      tags: ['WordPress'],
      image: 'assets/images/proj-3.jpg',
      imageAlt: 'Aperçu du site Urbex',
      link: 'https://urbex.coworkersgroup.com/',
    },
    {
      title: 'CDA',
      description: 'Thème WordPress créé from scratch.',
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-4.jpg',
      imageAlt: 'Aperçu du site CDA',
      link: 'https://www.cda.tg/',
    },
    {
      title: 'CERT',
      description: 'Thème WordPress créé from scratch.',
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-5.jpg',
      imageAlt: 'Aperçu du site CERT',
      link: 'https://mfin-cert.gouv.tg/',
    },
    {
      title: 'LAC3',
      description: 'Thème WordPress créé from scratch.',
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-6.jpg',
      imageAlt: 'Aperçu du site LAC3',
      link: 'https://lacs3.mairie.tg/',
    },
    {
      title: 'Friend of Figma',
      description: 'Site WordPress livré pour la communauté Figma locale.',
      tags: ['WordPress'],
      placeholderText: 'Capture à venir',
      link: 'https://fof.tg/',
    },
    {
      title: 'Gestion de biens immobiliers',
      description: 'Application mobile Flutter de gestion de biens immobiliers.',
      tags: ['Flutter'],
      placeholderText: 'Application interne',
      statusBadge: 'Projet interne',
    },
  ];
}
