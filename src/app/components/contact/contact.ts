import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { Theme } from '../../core/services/theme';

// Fourni globalement par le script https://assets.calendly.com/assets/external/widget.js (chargé dans index.html).
declare const Calendly: { initPopupWidget(options: { url: string }): void } | undefined;

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly theme = inject(Theme);

  @ViewChild('contactForm') private contactFormRef!: ElementRef<HTMLFormElement>;
  @ViewChild('contactNgForm') private contactNgFormRef!: NgForm;

  // Identifiants EmailJS injectés depuis .env par scripts/set-env.js au moment du build/serve.
  private readonly emailjsServiceId = environment.emailjsServiceId;
  private readonly emailjsTemplateId = environment.emailjsTemplateId;
  private readonly emailjsPublicKey = environment.emailjsPublicKey;

  isSending = false;
  sendStatus: 'idle' | 'success' | 'error' = 'idle';
  private statusTimeoutId?: ReturnType<typeof setTimeout>;

  private static readonly MAX_LENGTHS = { name: 100, email: 180, subject: 150, message: 3000 };

  // Retire tout ce qui ressemble à du HTML/script et les caractères de contrôle,
  // pour qu'aucune valeur saisie ne puisse être interprétée comme du code par
  // EmailJS, un client mail en HTML, ou un futur affichage de ces données.
  private sanitize(value: string, maxLength: number): string {
    return value
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
      .trim()
      .slice(0, maxLength);
  }

  onSubmit(): void {
    if (this.isSending || this.contactNgFormRef.invalid) {
      return;
    }

    const form = this.contactFormRef.nativeElement;
    const formData = new FormData(form);

    // Piège à robots : un champ invisible pour un humain, souvent rempli par les bots.
    if (String(formData.get('company') ?? '').length > 0) {
      form.reset();
      return;
    }

    const name = this.sanitize(String(formData.get('name') ?? ''), Contact.MAX_LENGTHS.name);
    const email = this.sanitize(String(formData.get('email') ?? ''), Contact.MAX_LENGTHS.email);
    const subject = this.sanitize(String(formData.get('subject') ?? ''), Contact.MAX_LENGTHS.subject);
    const message = this.sanitize(String(formData.get('message') ?? ''), Contact.MAX_LENGTHS.message);

    clearTimeout(this.statusTimeoutId);
    this.isSending = true;
    this.sendStatus = 'idle';

    emailjs
      .send(this.emailjsServiceId, this.emailjsTemplateId, { name, email, subject, message }, {
        publicKey: this.emailjsPublicKey,
      })
      .then(() => {
        this.sendStatus = 'success';
        this.contactNgFormRef.resetForm();
      })
      .catch((error: any) => {
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

  openCalendlyPopup(): void {
    const isDark = this.theme.current() === 'dark';
    const url = isDark
      ? 'https://calendly.com/reginaalaglo/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=8b5cf6&background_color=18181b&text_color=ffffff'
      : 'https://calendly.com/reginaalaglo/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=8b5cf6&background_color=ffffff&text_color=18181b';

    if (typeof Calendly === 'undefined') {
      window.open(url, '_blank', 'noopener');
      return;
    }

    Calendly.initPopupWidget({ url });
  }

}
