import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';

// Definimos un tipo para las variantes del header
export type HeaderVariant = 'default' | 'transparent' | 'dark';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  // Configuración específica para el header en la página de contacto
  headerConfig = {
    variant: 'default' as HeaderVariant, // Forzamos el tipo
    showLogin: true,
    showOnMobile: true
  };

  constructor() {
    // Opcional: Cambiar la variante según necesidades
    this.headerConfig.variant = 'default'; // Asignación segura
  }

  sendMessage() {
    alert('Mensaje enviado a Carlos Gómez!');
  }
}