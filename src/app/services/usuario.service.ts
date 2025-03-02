import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    [x: string]: any;
  public apiUrl = 'http://localhost:8081/usuarios'; // Ruta base para usuarios

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/list`);
  }

  // Método para obtener un usuario por su ID
  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/list/${id}`);
  }

  // Método para crear un nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/save`, usuario);
  }

  // Método para actualizar un usuario existente
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/update/${id}`, usuario);
  }

  // Método para eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

   // Método para validar el login
   login(nombreUsuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombreUsuario, contrasena });
  }

  estaAutenticado(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      return !!token; // Devuelve true si el token existe
    }
    return false; // Si sessionStorage no está disponible, asume que no está autenticado
  }
}