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
      description: "Portail public du ministère de la Santé (IA-Challenge) : rendu de pages côté serveur avec Nest.js et le moteur de templates EJS.",
      tags: ['Nest.js', 'EJS'],
      image: 'assets/images/proj-1.jpg',
      imageAlt: 'Aperçu du site Tech Santé',
      link: 'https://challenge-sante.gouv.tg/',
    },
    {
      title: "Middleware d'orchestration",
      description: "Interface front-end du portail national des services publics du Togo, connectée à un middleware qui orchestre les démarches administratives.",
      tags: ['Angular'],
      image: 'assets/images/proj-2.jpg',
      imageAlt: 'Aperçu du guichet national des démarches administratives',
      link: 'https://service-public.gouv.tg/',
    },
    {
      title: 'Urbex',
      description: "Thème WordPress sur-mesure pour une plateforme immobilière : présentation des biens, recherche et fiches détaillées.",
      tags: ['WordPress'],
      image: 'assets/images/proj-3.jpg',
      imageAlt: 'Aperçu du site Urbex',
      link: 'https://urbex.coworkersgroup.com/',
    },
    {
      title: 'CDA',
      description: "Thème WordPress développé entièrement from scratch pour le site vitrine de la CDA, avec une maquette et une structure personnalisées.",
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-4.jpg',
      imageAlt: 'Aperçu du site CDA',
      link: 'https://www.cda.tg/',
    },
    {
      title: 'CERT',
      description: "Thème WordPress sur-mesure pour le site du CERT togolais, dédié à la réponse aux incidents de sécurité informatique.",
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-5.jpg',
      imageAlt: 'Aperçu du site CERT',
      link: 'https://mfin-cert.gouv.tg/',
    },
    {
      title: 'LAC3',
      description: "Thème WordPress créé from scratch pour le site de la mairie, présentant les services municipaux et les actualités locales.",
      tags: ['WordPress', 'Thème custom'],
      image: 'assets/images/proj-6.jpg',
      imageAlt: 'Aperçu du site LAC3',
      link: 'https://lacs3.mairie.tg/',
    },
    {
      title: 'Friend of Figma',
      description: "Site vitrine WordPress conçu pour la communauté Figma locale, présentant les événements et les ressources du groupe.",
      tags: ['WordPress'],
      placeholderText: 'Capture à venir',
      link: 'https://fof.tg/',
    },
    {
      title: 'Gestion de biens immobiliers',
      description: "Application mobile Flutter pour la gestion interne des biens immobiliers : suivi des locations, des contrats et des paiements.",
      tags: ['Flutter'],
      placeholderText: 'Application interne',
      statusBadge: 'Projet interne',
    },
  ];
}
