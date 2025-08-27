import { 
  Component, 
  AfterViewInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CodigoService } from '../services/codigo.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
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

  // Variables para el acceso secreto
  showPinForm = false;
  codigoInput = ''; // Cambiado de pinInput a codigoInput
  private keySequence = '';
  private readonly secretCombo = 'scmx'; // Combinación secreta: escribe "scmx"
  verificandoCodigo = false; // Para controlar estado de carga

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router,
    private codigoService: CodigoService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Sistema de combinación de teclas
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (!this.isBrowser) return;
    
    this.keySequence += event.key.toLowerCase();
    
    if (this.keySequence.includes(this.secretCombo)) {
      this.showPinForm = true;
      this.keySequence = '';
    }
    
    setTimeout(() => this.keySequence = '', 3000);
  }

  // Verificación del CÓDIGO (no PIN)
  checkCodigo() {
    if (this.codigoInput.length === 0) {
      alert('Por favor ingrese un código');
      return;
    }

    if (this.verificandoCodigo) return;

    this.verificandoCodigo = true;

    this.codigoService.verificarCodigo(this.codigoInput).subscribe({
      next: (esValido: boolean) => {
        this.verificandoCodigo = false;
        if (esValido) {
          this.router.navigate(['/login']); // Redirige al login
        } else {
          alert('Código incorrecto');
          this.codigoInput = '';
          this.showPinForm = false;
        }
      },
      error: (error) => {
        this.verificandoCodigo = false;
        console.error('Error al verificar el código:', error);
        
        if (error.status === 401) {
          alert('Código incorrecto');
        } else {
          alert('Error del servidor. Intente nuevamente.');
        }
        
        this.codigoInput = '';
        this.showPinForm = false;
      }
    });
  }

  // Métodos existentes (se mantienen igual)
  ngAfterViewInit() {
    if (this.isBrowser) {
      this.animationTimeouts.push(setTimeout(() => {
        this.iniciarLoop();
      }, 50));
    }
  }

  ngOnDestroy() {
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  crearLetras() {
    if (!this.isBrowser || !this.logoText?.nativeElement) return;

    this.logoText.nativeElement.innerHTML = '';

    for (let i = 0; i < this.texto.length; i++) {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'letter');
      this.renderer.setProperty(span, 'textContent', this.texto[i]);
      this.renderer.setStyle(span, '--delay', `${i * this.delayStep}s`);
      
      if (i === this.texto.length - 1) {
        this.renderer.addClass(span, 'last-letter');
      }
      
      this.renderer.appendChild(this.logoText.nativeElement, span);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.logoText.nativeElement.style.opacity = '1';
    });
  }

  mostrarElementos() {
    if (!this.isBrowser) return;

    this.crearLetras();
    this.renderer.setStyle(this.subtitle.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.subtitle.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.button.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.button.nativeElement, 'opacity', '0');

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