import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';

const routes: Routes = [
  {
    path:'listar_categorias',
    component:CategoriasComponent
  },
  {
    path:'crear_categoria',
    component:CrearCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
