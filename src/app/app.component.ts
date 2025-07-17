import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router'; // Importa Router y NavigationEnd
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showHeader: boolean = true; // Variable para controlar la visibilidad del header

  constructor(private router: Router) {
    // Escucha los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el header en la ruta de Almacén
        this.showHeader = !event.url.includes('/almacen');
      }
    });
  }
}
