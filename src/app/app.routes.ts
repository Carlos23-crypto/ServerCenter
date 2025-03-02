import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { EmbarqueComponent } from './embarque/embarque.component';
import { VentasComponent } from './ventas/ventas.component';
import { FarmaComponent } from './farma/farma.component';
import { SistemasComponent } from './sistemas/sistemas.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistroProductoComponent } from './registro-producto/registro-producto.component';
import { CatalogoAlmacenComponent } from './catalogo-almacen/catalogo-almacen.component';

export const routes: Routes = [
    {path: 'app', component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'acerca', component: AcercaComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'registro-producto', component: RegistroProductoComponent},
    {path: 'catalogo-almacen/:categoria', component: CatalogoAlmacenComponent},
    {path: 'servidores/:categoria', component: ServidoresComponent},
    {path: 'almacen', component: AlmacenComponent, canActivate: [AuthGuard] },
    {path: 'embarque', component: EmbarqueComponent},
    {path: 'ventas', component: VentasComponent },
    {path: 'farma', component: FarmaComponent},
    {path: 'sistemas', component: SistemasComponent, canActivate: [AuthGuard] },
    {path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'login', pathMatch: 'full' },
];
