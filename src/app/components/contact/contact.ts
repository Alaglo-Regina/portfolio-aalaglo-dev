import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

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

}
