import { 
  Component, 
  AfterViewInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logoText') logoText!: ElementRef;
  @ViewChild('subtitle') subtitle!: ElementRef;
  @ViewChild('button') button!: ElementRef;

  texto = 'Servercenter.mx';
  delayStep = 0.1;
  private animationTimeouts: any[] = [];
  private isBrowser: boolean;
  private animationFrameId: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Pequeño delay para asegurar que el viewport está estable
      this.animationTimeouts.push(setTimeout(() => {
        this.iniciarLoop();
      }, 50));
    }
  }

  ngOnDestroy() {
    // Limpieza de recursos
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  crearLetras() {
    if (!this.isBrowser || !this.logoText?.nativeElement) return;

    this.logoText.nativeElement.innerHTML = '';

    // Crear letras con estilos optimizados
    for (let i = 0; i < this.texto.length; i++) {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'letter');
      this.renderer.setProperty(span, 'textContent', this.texto[i]);
      this.renderer.setStyle(span, '--delay', `${i * this.delayStep}s`);
      
      // Estilos específicos para el punto
      if (i === this.texto.length - 1) {
        this.renderer.addClass(span, 'last-letter');
      }
      
      this.renderer.appendChild(this.logoText.nativeElement, span);
    }

    // Forzar reflow para activar animaciones
    this.animationFrameId = requestAnimationFrame(() => {
      this.logoText.nativeElement.style.opacity = '1';
    });
  }

  mostrarElementos() {
    if (!this.isBrowser) return;

    this.crearLetras();

    // Configuración inicial para elementos
    this.renderer.setStyle(this.subtitle.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.subtitle.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.button.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.button.nativeElement, 'opacity', '0');

    // Animación escalonada
    const totalLettersDelay = this.texto.length * this.delayStep * 1000;
    
    this.animationTimeouts.push(setTimeout(() => {
      this.renderer.setStyle(this.subtitle.nativeElement, 'transition', 'opacity 0.5s ease');
      this.renderer.setStyle(this.subtitle.nativeElement, 'opacity', '1');
    }, totalLettersDelay + 300));

    this.animationTimeouts.push(setTimeout(() => {
      this.renderer.setStyle(this.button.nativeElement, 'transition', 'opacity 0.5s ease, transform 0.3s ease');
      this.renderer.setStyle(this.button.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.button.nativeElement, 'transform', 'translateY(0)');
    }, totalLettersDelay + 600));
  }

  ocultarElementos() {
    if (!this.isBrowser) return;

    const letras = this.logoText.nativeElement.querySelectorAll(".letter");
    
    letras.forEach((letra: HTMLElement, i: number) => {
      this.animationTimeouts.push(setTimeout(() => {
        this.renderer.setStyle(letra, 'transition', 'all 0.5s ease');
        this.renderer.setStyle(letra, 'opacity', '0');
        this.renderer.setStyle(letra, 'transform', 'translateY(-80px)');
      }, i * 100));
    });

    this.animationTimeouts.push(setTimeout(() => {
      this.renderer.setStyle(this.subtitle.nativeElement, 'opacity', '0');
    }, letras.length * 100 + 200));
  }

  iniciarLoop() {
    if (!this.isBrowser) return;

    this.mostrarElementos();

    this.animationTimeouts.push(setTimeout(() => {
      this.ocultarElementos();

      this.animationTimeouts.push(setTimeout(() => {
        this.iniciarLoop();
      }, 2000));
    }, 10000));
  }

  ir() {
    if (this.isBrowser) {
      window.location.href = '/contacto';
    }
  }
}