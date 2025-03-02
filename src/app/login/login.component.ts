import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir
import { CommonModule } from '@angular/common'; // Para directivas comunes
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, FormsModule], // Importa los módulos necesarios
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  limpiarCampos() {
    this.nombreUsuario = '';
    this.contrasena = '';
  }

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log('Credenciales enviadas:', this.nombreUsuario, this.contrasena);
  
    this.usuarioService.login(this.nombreUsuario, this.contrasena).subscribe(
      (response: any) => { // Cambia el tipo de 'area' a 'any' o a una interfaz específica
        console.log('Respuesta recibida:', response);
        const area = response.area; // Extrae el valor del área desde la respuesta JSON

        // Almacena el token en localStorage
        sessionStorage.setItem('token', response.token); // Asegúrate de que el backend devuelva un token
  
        switch (area) {
          case 'Almacen':
            this.router.navigate(['/almacen']);
            break;
          case 'Sistemas':
            this.router.navigate(['/sistemas']);
            break;
          case 'Administracion':
            this.router.navigate(['/administrador']);
            break;
          default:
            this.errorMessage = 'Área no válida';
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }
}
