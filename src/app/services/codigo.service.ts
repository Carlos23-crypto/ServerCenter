import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Codigo } from '../models/codigo.model';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
private apiUrl = 'http://localhost:8082/Usuario/codigo'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) { }

  // Verificar si un código es válido
  verificarCodigo(codigo: string): Observable<boolean> {
    const codigoEntrada: Codigo = { codigo: codigo };
    
    return this.http.post(`${this.apiUrl}/verificar`, codigoEntrada, { 
      observe: 'response', 
      responseType: 'text' 
    }).pipe(
      map(response => {
        // Si la respuesta tiene status 200, el código es válido
        return response.status === 200;
      })
    );
  }

  // Guardar un nuevo código
  guardarCodigo(codigo: Codigo): Observable<Codigo> {
    return this.http.post<Codigo>(`${this.apiUrl}/guardar`, codigo);
  }

  // Obtener todos los códigos
  obtenerTodosLosCodigos(): Observable<Codigo[]> {
    return this.http.get<Codigo[]>(`${this.apiUrl}/todos`);
  }
}
