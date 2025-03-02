import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-embarque',
  imports: [CommonModule, FormsModule],
  templateUrl: './embarque.component.html',
  styleUrl: './embarque.component.css'
})
export class EmbarqueComponent {
  mostrarTabla = false;
  mostrarModal = false;
  tipoBusqueda = 'producto';
  valorBusqueda = '';
  embarques: any[] = [];
  embarquesFiltrados: any[] = [];
  nuevoEmbarque = {
    id: 0,
    producto: '',
    marca: '',
    numeroParte: '',
    estado: 'Bueno',
    cantidad: 0,
    fecha: ''
  };

  constructor() {
    this.embarquesFiltrados = this.embarques;
  }

  regresar() {
    window.location.href = '/almacen'; 
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoEmbarque = {
      id: 0,
      producto: '',
      marca: '',
      numeroParte: '',
      estado: 'Bueno',
      cantidad: 0,
      fecha: ''
    };
  }

  registrarEmbarque() {
    this.nuevoEmbarque.id = this.embarques.length + 1;
    this.nuevoEmbarque.fecha = new Date().toLocaleDateString();
    this.embarques.push({ ...this.nuevoEmbarque });
    this.embarquesFiltrados = this.embarques;
    this.cerrarModal();
  }

  buscar() {
    this.embarquesFiltrados = this.embarques.filter(embarque => {
      if (this.tipoBusqueda === 'producto') {
        return embarque.producto.toLowerCase().includes(this.valorBusqueda.toLowerCase());
      } else {
        return embarque.fecha.includes(this.valorBusqueda);
      }
    });
  }

  exportarPDF() {
    const doc = new jsPDF('p', 'mm', 'a4'); // Documento en formato A4
    const titulo = "Registro de Embarques";
    const elementoTabla = document.getElementById('tablaEmbarques'); // Tabla
    
    // Cargar la imagen
    const logo = new Image();
    logo.src = '../../assets/imagenes/Fondos/ServerLogo.jfif';
    logo.onload = () => {
      // Dibujar la imagen en el PDF
      doc.addImage(logo, 'JPEG', 10, 10, 30, 30); 

      // Agregar el título
      doc.setFontSize(18);
      doc.text(titulo, 50, 25);

      if (elementoTabla) {
        html2canvas(elementoTabla).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190; // Ancho de la imagen en el PDF
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Agregar la tabla al PDF
          doc.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
          
          // Guardar el PDF
          doc.save('Registro_Embarques.pdf');
        });
      } else {
        alert('No hay datos para exportar.');
      }
    };
  }
  
}
