
import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

const server = 'assets/imagenes/Productos/Servidor.JPG';
const fuente = 'assets/imagenes/Productos/Fuente.JPG';
const mother = 'assets/imagenes/Productos/Placa.JPG';
const lap = 'assets/imagenes/Productos/Laptop.JPG';
const monitor = 'assets/imagenes/Productos/Monitor.JPG';
const gabinete = 'assets/imagenes/Productos/Gabinete.JPG';
const disco = 'assets/imagenes/Productos/DiscoDuro.JPG';
const ram = 'assets/imagenes/Productos/Ram.JPG';
const venti = 'assets/imagenes/Productos/Ventilador.jpg';


@Component({
  selector: 'app-servidores',
  imports: [CommonModule],
  templateUrl: './servidores.component.html',
  styleUrl: './servidores.component.css'
})
export class ServidoresComponent implements OnInit {
  categoria: string | null = null;
  datosFiltrados: any[] = [];
  datos: any = {
    Servidores: [
      {
        nombre: 'Dell PowerEdge R740',
        n_parte: ' R740421439PS',
        marca: 'Dell',
        total: 5,
        imagen: server,
        socket: 'LGA 1155',
        ram: '128 GB',
        modelo: 'PowerEdge R740',
        TDisco: '2 TB',
        MarcaProce: 'Intel',
        ModelProce: 'XEON Silver 4108',
        LinProce: 'XEON Servidor'
     },
     { 
       nombre: 'HP ProLiant DL380 Gen10',
       n_parte: 'P20248-B21',
       marca: 'Hp',
       total: 5,
       imagen: server,
       socket: 'LGA 1155',
       ram: '128 GB',
       modelo: 'DL380 Gen10',
       TDisco: '1 TB',
       MarcaProce: 'Intel',
       ModelProce: 'XEON Silver 4108',
       LinProce: 'XEON Servidor'
     },
     { 
       nombre: 'Lenovo ThinkSystem SR650',
       n_parte: '7X06A0H9LA',
       marca: 'Lenovo',
       total: 5,
       imagen: server,
       socket: 'LGA 1155',
       ram: '128 GB',
       modelo: 'ThinkSystem SR650',
       TDisco: '4 TB',
       MarcaProce: 'Intel',
       ModelProce: 'XEON Silver 4108',
       LinProce: 'XEON Servidor'
     },
     {
        nombre: 'Cisco UCS C240 M5',
        n_parte: 'KCS-UC432LQ',
        marca: 'Cisco',total: 5,
        imagen: server,
        socket: 'LGA 1150',
        ram: '128 GB',
        modelo: 'C240 M5',
        TDisco: '1 TB',
        MarcaProce: 'Intel',
        ModelProce: 'XEON Silver 4108',
        LinProce: 'XEON Servidor'
       },
    ],
    Fuentes: [
      {
        nombre: 'Corsair RM850x',
        n_parte: 'CP-9020188-NA',
        marca: 'Corsair',
        total: 10,
        imagen: fuente,
        socket: 'ATX',
        modelo: 'RM850x',
      },
      {
        nombre: 'EVGA 600 W1',
        n_parte: '100-W1-0600-K1',
        marca: 'EVGA',
        total: 7,
        imagen: fuente,
        socket: 'ATX',
        modelo: '600 W1',
      },
    ],
    Laptops: [
      {
        nombre: 'Dell XPS 13',
        n_parte: 'XPS9370',
        marca: 'Dell',
        total: 15,
        imagen: lap,
        ram: '16 GB',
        modelo: 'XPS 13',
        TDisco: '512 GB SSD',
        MarcaProce: 'Intel',
        ModelProce: 'Core i7',
        LinProce: 'Portátil',
      },
      {
        nombre: 'MacBook Air M1',
        n_parte: 'A2337',
        marca: 'Apple',
        total: 12,
        imagen: lap,
        ram: '8 GB',
        modelo: 'MacBook Air',
        TDisco: '256 GB SSD',
        MarcaProce: 'Apple',
        ModelProce: 'M1',
        LinProce: 'Portátil',
      },
    ],
    Gabinetes: [
      {
        nombre: 'NZXT H510',
        n_parte: 'CA-H510B-B1',
        marca: 'NZXT',
        total: 8,
        imagen: gabinete,
        socket: 'ATX',
        modelo: 'H510',
      },
      {
        nombre: 'Corsair iCUE 4000X RGB',
        n_parte: 'CC-9011204-WW',
        marca: 'Corsair',
        total: 6,
        imagen: gabinete,
        socket: 'ATX',
        modelo: '4000X RGB',
      },
    ],
    Ventiladores: [
      {
        nombre: 'Noctua NH-D15',
        n_parte: 'NH-D15',
        marca: 'Noctua',
        total: 20,
        imagen: venti,
        socket: 'AM4',
        modelo: 'NH-D15',
      },
      {
        nombre: 'Cooler Master Hyper 212',
        n_parte: 'RR-212S-20PC-R1',
        marca: 'Cooler Master',
        total: 15,
        imagen: venti,
        socket: 'AM4',
        modelo: 'Hyper 212',
      },
    ],
    Motherboard: [
      {
        nombre: 'ASUS ROG STRIX B550-F',
        n_parte: 'B550-F',
        marca: 'ASUS',
        total: 12,
        imagen: mother,
        socket: 'AM4',
        ram: '64 GB',
        modelo: 'ROG STRIX B550-F',
        MarcaProce: 'AMD',
        ModelProce: 'Ryzen',
        LinProce: 'Gaming',
      },
      {
        nombre: 'MSI MAG B660M',
        n_parte: 'B660M',
        marca: 'MSI',
        total: 10,
        imagen: mother,
        socket: 'LGA 1700',
        ram: '128 GB',
        modelo: 'MAG B660M',
        TDisco: 'N/A',
        MarcaProce: 'Intel',
        ModelProce: 'Core i9',
        LinProce: 'Gaming',
      },
    ],
    Ram: [
      {
        nombre: 'Corsair Vengeance LPX',
        n_parte: 'CMK16GX4M2B3200C16',
        marca: 'Corsair',
        total: 30,
        imagen: ram,
        ram: '16 GB',
        modelo: 'Vengeance LPX',
      },
      {
        nombre: 'G.Skill Trident Z RGB',
        n_parte: 'F4-3200C16D-16GTZR',
        marca: 'G.Skill',
        total: 25,
        imagen: ram,
        ram: '16 GB',
        modelo: 'Trident Z RGB',
      },
    ],
    Discos: [
      {
        nombre: 'Seagate Barracuda',
        n_parte: 'ST1000DM010',
        marca: 'Seagate',
        total: 50,
        imagen: disco,
        modelo: 'Barracuda',
      },
      {
        nombre: 'Western Digital Blue',
        n_parte: 'WD10EZEX',
        marca: 'Western Digital',
        total: 45,
        imagen: disco,
        modelo: 'Blue',
        TDisco: '1 TB',
      },
    ],
    Monitores: [
      {
        nombre: 'LG UltraGear 27GL850-B',
        n_parte: '27GL850-B',
        marca: 'LG',
        total: 18,
        imagen: monitor,
        modelo: 'UltraGear 27GL850-B',
      },
      {
        nombre: 'Dell UltraSharp U2723QE',
        n_parte: 'U2723QE',
        marca: 'Dell',
        total: 10,
        imagen: monitor,
        modelo: 'UltraSharp U2723QE',
      },
    ],
  

  };


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoria = params.get('categoria');
      this.datosFiltrados = this.datos[this.categoria || ''] || [];
    });
  }

  modalAbierto = false; 
  datoSeleccionado: any = null;

  abrirModal(dato: any) {
    this.datoSeleccionado = dato; 
    this.modalAbierto = true; 
  }

  cerrarModal() {
    this.modalAbierto = false; 
    this.datoSeleccionado = null; 
  }

}
