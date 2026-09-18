import { Component } from '@angular/core';

interface CalendarCell {
  day: number | null;
  available?: boolean;
}

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
})
export class Contact {
  // TODO: remplacer par le vrai lien Calendly une fois le compte créé.
  readonly calendarLink = '#';
  // TODO: remplacer par les vrais liens GitHub / LinkedIn
  readonly githubLink = 'https://github.com/Alaglo-Regina';
  readonly linkedinLink = 'https://linkedin.com/in/r%C3%A9gina-alaglo';

  // Aperçu visuel uniquement — sera remplacé par l'intégration Calendly.
  readonly calendarMonthLabel = 'Septembre 2026';
  readonly calendarWeekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  readonly calendarDays: CalendarCell[] = [
    { day: null }, { day: null }, { day: 1 }, { day: 2, available: true }, { day: 3, available: true }, { day: 4 }, { day: 5 },
    { day: 6 }, { day: 7, available: true }, { day: 8, available: true }, { day: 9 }, { day: 10, available: true }, { day: 11 }, { day: 12 },
    { day: 13 }, { day: 14, available: true }, { day: 15 }, { day: 16, available: true }, { day: 17, available: true }, { day: 18 }, { day: 19 },
    { day: 20 }, { day: 21, available: true }, { day: 22 }, { day: 23, available: true }, { day: 24 }, { day: 25 }, { day: 26 },
    { day: 27, available: true }, { day: 28 }, { day: 29, available: true }, { day: 30 }, { day: null }, { day: null }, { day: null },
  ];
}
