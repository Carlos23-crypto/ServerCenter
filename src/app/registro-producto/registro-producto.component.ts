import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServidorService } from '../services/servidor.service';
import { Servidor } from '../models/servidor.model';

@Component({
  selector: 'app-registro-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-producto.component.html',
  styleUrl: './registro-producto.component.css'
})
export class RegistroProductoComponent {
  mostrarCampos: any = {};
  tipoProducto: string = ''; // Almacena el tipo de producto seleccionado

  // Objeto para almacenar los valores del formulario
  producto: Servidor = {
    id: 0,
    nombre: '',
    numParte: '',
    marca: '',
    socket: 'N/A',
    ram: 'N/A',
    modelo: '',
    tDisco: 'N/A',
    marcaProce: 'N/A',
    modelProce: 'N/A',
    linProce: 'N/A',
    categoria: '',
    total: 0
  };

  constructor(private servidorService: ServidorService) { }

  // Actualizar campos visibles según el tipo de producto seleccionado
  actualizarCampos(event: any) {
    this.tipoProducto = event.target.value;

    // Resetear todos los campos a "N/A"
    this.producto = {
      id: 0,
      nombre: '',
      numParte: '',
      marca: '',
      socket: 'N/A',
      ram: 'N/A',
      modelo: '',
      tDisco: 'N/A',
      marcaProce: 'N/A',
      modelProce: 'N/A',
      linProce: 'N/A',
      categoria: this.tipoProducto === 'ram' ? 'Ram' : this.tipoProducto,
      total: 0
    };

    // Mostrar u ocultar campos según el tipo de producto
    switch (this.tipoProducto) {
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

  // Registrar el producto
  registrarProducto() {
    // Asignar la categoría correcta
    this.producto.categoria = this.tipoProducto === 'ram' ? 'Ram' : this.tipoProducto;

    // Enviar el producto al backend
    this.servidorService.crearServidor(this.producto).subscribe(
      response => {
        console.log('Producto registrado:', response);
        alert('Producto registrado exitosamente');
        this.regresar(); // Redirigir después del registro
      },
      error => {
        console.error('Error al registrar el producto:', error);
        alert('Error al registrar el producto');
      }
    );
  }

  // Redirigir a la página de almacén
  regresar() {
    window.location.href = '/almacen'; 
  }
}