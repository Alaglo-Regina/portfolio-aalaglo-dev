import { Component, inject, signal, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Theme } from '../../core/services/theme';

interface Indicator {
  left: number;
  percentage: number;
  visible: boolean;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected readonly theme = inject(Theme);
  private readonly el = inject(ElementRef);
  protected readonly menuOpen = signal(false);
  protected readonly indicator = signal<Indicator>({ left: 0, percentage: 0, visible: false });
  protected activeSectionId = signal<string>('accueil');
  protected readonly currentLang = signal<'fr' | 'en'>('fr');
  protected readonly scrollProgress = signal<number>(0);
  private observer: IntersectionObserver | null = null;

  readonly navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#apropos', label: 'À propos' },
    { href: '#competences', label: 'Compétences' },
    { href: '#projets', label: 'Projets' },
    { href: '#experience', label: 'Parcours' },
    { href: '#contact', label: 'Contact' },
  ];

  ngOnInit() {
    this.setupObserver();
    setTimeout(() => this.updateIndicatorToActive(), 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIndicatorToActive();
  }

  @HostListener('window:scroll')
  onScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    this.scrollProgress.set(scrolled);
  }

  private setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSectionId.set(entry.target.id);
          this.updateIndicatorToActive();
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    document.querySelectorAll('section').forEach(section => {
      this.observer!.observe(section);
    });
  }

  private updateIndicatorToActive() {
    const activeId = this.activeSectionId();
    const linkEl = this.el.nativeElement.querySelector(`nav.main-nav a[href="#${activeId}"]`) as HTMLElement;
    if (linkEl) {
      this.updateIndicator(linkEl);
    }
  }

  private updateIndicator(link: HTMLElement) {
    const nav = link.parentElement as HTMLElement;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = linkRect.left - navRect.left + linkRect.width / 2;
    const percentage = left / navRect.width;

    this.indicator.set({
      left,
      percentage,
      visible: true
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLanguage(): void {
    this.currentLang.update(lang => lang === 'fr' ? 'en' : 'fr');
  }

  onLinkHover(event: MouseEvent): void {
    const link = event.currentTarget as HTMLElement;
    this.updateIndicator(link);
  }

  onNavLeave(): void {
    this.updateIndicatorToActive();
  }
}
