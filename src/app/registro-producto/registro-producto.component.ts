import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-producto.component.html',
  styleUrl: './registro-producto.component.css'
})
export class RegistroProductoComponent {
  mostrarCampos: any = {};

  actualizarCampos(event: any) {
    const tipoProducto = event.target.value;
    
    // Resetear todos los campos
    this.mostrarCampos = {
      nombre: false, num_parte: false, marca: false, total: false, modelo: false,
      categoria: false, lin_proce: false, marca_proce: false, model_proce: false,
      ram: false, socket: false, t_disco: false
    };

    switch (tipoProducto) {
      case 'servidor':
      case 'laptop':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true,
          categoria: true, lin_proce: true, marca_proce: true, model_proce: true, ram: true,
          socket: true, t_disco: true };
        break;
      case 'motherboard':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true,
          categoria: true, lin_proce: true, marca_proce: true, model_proce: true, socket: true };
        break;
      case 'ram':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true, ram: true };
        break;
      case 'ventilador':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true, socket: true };
        break;
      case 'monitor':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true };
        break;
      case 'gabinete':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true, socket: true };
        break;
      case 'disco-duro':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true, modelo: true };
        break;
      case 'fuente':
        this.mostrarCampos = { nombre: true, num_parte: true, marca: true, total: true };
        break;
    }
  }

  regresar() {
    window.location.href = '/almacen'; 
  }
}
