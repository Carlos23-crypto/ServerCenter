import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this.usuarioService.estaAutenticado()) {
      return true; // Permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // Bloquea el acceso a la ruta
    }
  }
}