import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TurnstileLoader } from '../../core/services/turnstile-loader';

@Component({
  selector: 'app-turnstile',
  imports: [],
  templateUrl: './turnstile.html',
})
export class Turnstile implements AfterViewInit, OnDestroy {
  @Input() siteKey = environment.turnstileSiteKey;
  @Input() theme: 'light' | 'dark' | 'auto' = 'auto';
  // 'flexible' épouse la largeur du formulaire au lieu du bloc fixe 300px par défaut.
  @Input() size: 'normal' | 'compact' | 'flexible' = 'flexible';
  // 'interaction-only' : invisible tant que Cloudflare n'exige pas de vérification
  // visuelle (la grande majorité des visiteurs légitimes ne voient jamais le widget).
  @Input() appearance: 'always' | 'execute' | 'interaction-only' = 'interaction-only';

  @Output() tokenChange = new EventEmitter<string>();
  @Output() expired = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();

  @ViewChild('container', { static: true }) private containerRef!: ElementRef<HTMLDivElement>;

  private readonly loader = inject(TurnstileLoader);
  private widgetId: string | null = null;

  async ngAfterViewInit(): Promise<void> {
    const turnstile = await this.loader.load().catch(() => null);
    if (!turnstile) {
      this.error.emit();
      return;
    }

    this.widgetId = turnstile.render(this.containerRef.nativeElement, {
      sitekey: this.siteKey,
      theme: this.theme,
      size: this.size,
      appearance: this.appearance,
      callback: (token) => this.tokenChange.emit(token),
      'expired-callback': () => this.expired.emit(),
      'error-callback': () => this.error.emit(),
    });
  }

  reset(): void {
    if (this.widgetId) {
      window.turnstile?.reset(this.widgetId);
    }
  }

  ngOnDestroy(): void {
    if (this.widgetId) {
      window.turnstile?.remove(this.widgetId);
    }
  }
}
