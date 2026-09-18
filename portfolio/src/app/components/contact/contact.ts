import { Component } from '@angular/core';

interface Reference {
  name: string;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly references: Reference[] = [
    {
      name: 'M. Lazare Togba',
      role: 'Architecte de Logiciel',
      contact: 'lazaretogba26@gmail.com · +228 70 15 95 21',
    },
    {
      name: 'M. Abdou Akim Gbadamassi',
      role: 'Ingénieur logiciel',
      contact: 'gbadamassia@gmail.com · +228 92 87 71 53',
    },
  ];
}
