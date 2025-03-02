import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servidor } from '../models/servidor.model'; 

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  public apiUrl = 'http://localhost:8081/servidores';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Servidor[]> {
    return this.http.get<Servidor[]>(`${this.apiUrl}/list`);
  }

  obtenerPorId(id: number): Observable<Servidor> {
    return this.http.get<Servidor>(`${this.apiUrl}/list/${id}`);
  }

  crearServidor(servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(`${this.apiUrl}/save`, servidor);
  }

  actualizarServidor(id: number, servidor: Servidor): Observable<Servidor> {
    return this.http.post<Servidor>(`${this.apiUrl}/update/${id}`, servidor);
  }

  eliminarServidor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
