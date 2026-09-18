import { Component, AfterViewInit, NgZone } from '@angular/core';
import Lenis from 'lenis';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Skills, Projects, Experience, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    // Handle splash screen
    const splash = document.getElementById('splash-screen');
    if (splash) {
      setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => splash.remove(), 800); // Remove after transition
      }, 2500); // 2.5s loading time
    }

    // Need a tiny timeout to ensure child components are rendered
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
    });

    this.ngZone.runOutsideAngular(() => {
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    });
  }
}
