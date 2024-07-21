import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmsComponent } from './adms.component';
import { CrearAdministradorComponent } from './pages/crear-administrador/crear-administrador.component';
import { PerfilAdmsComponent } from './pages/perfil-adms/perfil-adms.component';

const routes: Routes = [
  {
    path:'listar_administradores',
    component:AdmsComponent
  },
  {
    path:'nuevo_administrador',
    component:CrearAdministradorComponent
  },
  {
    path:'perfil_administrador/:id',
    component:PerfilAdmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmsRoutingModule { }
