import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../services/servidor.service';
import { Servidor } from '../models/servidor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servidor-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './farma.component.html',
  styleUrls: ['./farma.component.css']
})
export class FarmaComponent implements OnInit {
  servidores: Servidor[] = []; // Lista de servidores
  categorias: string[] = []; // Lista de categorías disponibles
  categoriaSeleccionada: string = ''; // Categoría seleccionada
  columnasMostradas: string[] = []; // Columnas que se mostrarán en la tabla

  constructor(private servidorService: ServidorService) { }

  ngOnInit(): void {
    this.cargarCategorias(); // Cargar las categorías disponibles
  }

  // Cargar las categorías disponibles
  cargarCategorias(): void {
    this.servidorService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  // Manejar la selección de categoría
  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.cargarServidoresPorCategoria(categoria);
  }

  // Cargar servidores por categoría
  cargarServidoresPorCategoria(categoria: string): void {
    this.servidorService.obtenerPorCategoria(categoria).subscribe(data => {
      this.servidores = data;
      this.definirColumnasMostradas(); // Define las columnas a mostrar
    });
  }

  // Definir las columnas que se mostrarán en la tabla
  definirColumnasMostradas(): void {
    if (this.servidores.length > 0) {
      // Obtener todas las claves (columnas) del primer servidor
      const todasLasColumnas = Object.keys(this.servidores[0]);

      // Filtrar las columnas que no tienen "N/A" en todos los servidores
      this.columnasMostradas = todasLasColumnas.filter(columna => 
        !this.servidores.every(servidor => (servidor as any)[columna] === 'N/A')
      );
    }
  }

  // Verificar si una columna debe mostrarse
  mostrarColumna(columna: string): boolean {
    return this.columnasMostradas.includes(columna);
  }
}