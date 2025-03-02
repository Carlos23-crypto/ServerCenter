import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

const icon1 = 'assets/imagenes/Iconos/IconServer.jpg';
const icon2 = 'assets/imagenes/Iconos/IconFuente.jpg';
const icon3 = 'assets/imagenes/Iconos/IconPlaca.jpg';
const icon4 = 'assets/imagenes/Iconos/IconLaptop.jpg';
const icon5 = 'assets/imagenes/Iconos/IconMonitor.jpg';
const icon6 = 'assets/imagenes/Iconos/IconGabinete.jpg';
const icon7 = 'assets/imagenes/Iconos/IconRam.JPG';
const icon8 = 'assets/imagenes/Iconos/IconDisco.JPG';
const icon9 = 'assets/imagenes/Iconos/IconVentilador.jpg';

@Component({
  selector: 'app-almacen',
  imports: [CommonModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})
export class AlmacenComponent {
  constructor(private router: Router) {}
    datos: any[] = [
      {
         nombre: 'Servidores',
         imagen: icon1,
      },
      {
        nombre: 'Fuentes',
        imagen: icon2,
      },
     {
        nombre: 'Motherboard',
        imagen: icon3,
     },
     {
        nombre: 'Laptops',
        imagen: icon4,
      },
      {
        nombre: 'Monitores',
        imagen: icon5,
      },
      {
        nombre: 'Gabinetes',
        imagen: icon6,
      },
      {
        nombre: 'Ram',
        imagen: icon7,
      },
      {
        nombre: 'Discos',
        imagen: icon8,
      },
      {
        nombre: 'Ventiladores',
        imagen: icon9,
      },
    ];
    
    redirect(categoria: string): void {
      this.router.navigate([`/catalogo-almacen`, categoria]);
    }
}
