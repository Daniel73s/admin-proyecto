import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { ModificarCategoriaComponent } from './pages/modificar-categoria/modificar-categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';


@NgModule({
  declarations: [CategoriasComponent,CrearCategoriaComponent,ModificarCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    IonicModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class CategoriasModule { }
