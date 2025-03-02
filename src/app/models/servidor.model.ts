export interface Servidor {
    id: number;               // ID del servidor
    nombre: string;           // Nombre del servidor
    numParte: string;         // Número de parte
    marca: string;            // Marca del servidor
    socket: string;           // Tipo de socket
    ram: string;              // Memoria RAM
    modelo: string;           // Modelo del servidor
    tDisco: string;           // Tipo de disco
    marcaProce: string;       // Marca del procesador
    modelProce: string;       // Modelo del procesador
    linProce: string;         // Línea del procesador
    categoria: string;        // Categoria del Producto
    total: number;            // Total (puede ser un campo numérico)
  }