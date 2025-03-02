import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public apiUrl = 'http://localhost:8081/usuarios'; // Ruta base para usuarios

  constructor(private http: HttpClient) { }

  private obtenerToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Método para obtener todos los usuarios
  obtenerTodos(): Observable<Usuario[]> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(`${this.apiUrl}/list`, { headers });
  }

  // Método para obtener un usuario por su ID
  obtenerPorId(id: number): Observable<Usuario> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.apiUrl}/list/${id}`, { headers });
  }

  // Método para crear un nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Usuario>(`${this.apiUrl}/save`, usuario, { headers });
  }

  // Método para actualizar un usuario existente
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Usuario>(`${this.apiUrl}/update/${id}`, usuario, { headers });
  }

  // Método para eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }

  // Método para validar el login
  login(nombreUsuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombreUsuario, contrasena });
  }

  estaAutenticado(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }
}
