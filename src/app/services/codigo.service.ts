import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Codigo } from '../models/codigo.model';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = 'http://localhost:8082/usuario/codigo';

  constructor(private http: HttpClient) { }

  // Verificar si un código es válido - CORREGIDO
  verificarCodigo(codigo: string): Observable<boolean> {
    const codigoEntrada: Codigo = { codigo: codigo };
    
    return this.http.post(`${this.apiUrl}/verificar`, codigoEntrada, { 
      responseType: 'text' 
    }).pipe(
      map((response: string) => {
        // Verificar si la respuesta contiene el mensaje de éxito
        return response.includes('Código válido');
      }),
      catchError(error => {
        // Si hay error, asumimos que el código es inválido
        console.error('Error verificando código:', error);
        return [false];
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