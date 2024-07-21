import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmsRoutingModule } from './adms-routing.module';
import { IonicModule } from '@ionic/angular';
import { AdmsComponent } from './adms.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearAdministradorComponent } from './pages/crear-administrador/crear-administrador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUsuarioComponent } from './modals/create-usuario/create-usuario.component';
import { PerfilAdmsComponent } from './pages/perfil-adms/perfil-adms.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePasswordComponent } from './modals/update-password/update-password.component';


@NgModule({
  declarations: [AdmsComponent,
    CrearAdministradorComponent,
    CreateUsuarioComponent,
    PerfilAdmsComponent,
  UpdatePasswordComponent],
  imports: [
    CommonModule,
    AdmsRoutingModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdmsModule { }
