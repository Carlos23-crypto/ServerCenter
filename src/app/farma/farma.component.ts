import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../services/servidor.service';
import { Servidor } from '../models/servidor.model'; // Importa el modelo
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el formulario

@Component({
  selector: 'app-servidor-list',
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './farma.component.html',
  styleUrls: ['./farma.component.css']
})
export class FarmaComponent implements OnInit {
  servidores: Servidor[] = []; // Lista de servidores
  nuevoServidor: Servidor = new Servidor(); // Objeto para el nuevo servidor

  constructor(private servidorService: ServidorService) { }

  ngOnInit(): void {
    this.cargarServidores();
  }

  // Cargar la lista de servidores
  cargarServidores(): void {
    this.servidorService.obtenerTodos().subscribe(data => {
      this.servidores = data;
    });
  }

  // Guardar un nuevo servidor
  guardarServidor(): void {
    this.servidorService.crearServidor(this.nuevoServidor).subscribe(
      (response) => {
        console.log('Servidor guardado:', response);
        this.cargarServidores(); // Recargar la lista después de guardar
        this.nuevoServidor = new Servidor(); // Limpiar el formulario
      },
      (error) => {
        console.error('Error al guardar el servidor:', error);
      }
    );
  }

  // Eliminar un servidor
  eliminarServidor(id: number): void {
    this.servidorService.eliminarServidor(id).subscribe(() => {
      this.cargarServidores(); // Recargar la lista después de eliminar
    });
  }
}