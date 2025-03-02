import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  imports: [FormsModule, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
    // Objeto para almacenar los datos del formulario
      venta = {
      producto: '',
      modelo: '',
      numeroParte: '',
      numeroSerie: '',
      cantidad: 0,
      cliente: '',
      metodoEnvio: 'estandar',
      fecha: ''
  };

  regresar() {
    window.location.href = '/almacen'; 
  }
  // Método que se ejecuta al enviar el formulario
  onSubmit() {
      console.log('Datos de la venta:', this.venta);
      // Aquí puedes agregar la lógica para enviar los datos a un servicio o API
  }
}
