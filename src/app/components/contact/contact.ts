import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

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
  @ViewChild('contactForm') private contactFormRef!: ElementRef<HTMLFormElement>;

  // Identifiants EmailJS injectés depuis .env par scripts/set-env.js au moment du build/serve.
  private readonly emailjsServiceId = environment.emailjsServiceId;
  private readonly emailjsTemplateId = environment.emailjsTemplateId;
  private readonly emailjsPublicKey = environment.emailjsPublicKey;

  isSending = false;
  sendStatus: 'idle' | 'success' | 'error' = 'idle';
  private statusTimeoutId?: ReturnType<typeof setTimeout>;

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isSending) {
      return;
    }

    clearTimeout(this.statusTimeoutId);
    this.isSending = true;
    this.sendStatus = 'idle';

    emailjs
      .sendForm(this.emailjsServiceId, this.emailjsTemplateId, this.contactFormRef.nativeElement, {
        publicKey: this.emailjsPublicKey,
      })
      .then(() => {
        this.sendStatus = 'success';
        this.contactFormRef.nativeElement.reset();
      })
      .catch((error) => {
        console.error('Erreur envoi EmailJS:', error);
        this.sendStatus = 'error';
      })
      .finally(() => {
        this.isSending = false;
        this.statusTimeoutId = setTimeout(() => this.closeStatusPopup(), 6000);
      });
  }

  closeStatusPopup(): void {
    clearTimeout(this.statusTimeoutId);
    this.sendStatus = 'idle';
  }

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
