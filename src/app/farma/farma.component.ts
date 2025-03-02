import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../services/servidor.service';
import { Servidor } from '../models/servidor.model'; // Importa el modelo
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servidor-list',
  imports: [CommonModule],
  templateUrl: './farma.component.html',
  styleUrls: ['./farma.component.css']
})
export class FarmaComponent implements OnInit {
  servidores: Servidor[] = []; // Usa el modelo para tipar la variable

  constructor(private servidorService: ServidorService) { }

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(): void {
    this.servidorService.obtenerTodos().subscribe(data => {
      this.servidores = data;
    });
  }

  eliminarServidor(id: number): void {
    this.servidorService.eliminarServidor(id).subscribe(() => {
      this.cargarServidores(); // Recargar la lista después de eliminar
    });
  }
}