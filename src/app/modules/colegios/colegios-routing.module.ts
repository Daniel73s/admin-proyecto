import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColegiosPage } from './colegios.page';
import { CrearColegioComponent } from './pages/crear-colegio/crear-colegio.component';
import { ModificarColegioPageComponent } from './pages/modificar-colegio-page/modificar-colegio-page.component';
import { DetalleColegioPageComponent } from './pages/detalle-colegio-page/detalle-colegio-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'listar-colegios',
    pathMatch:'full'
  },
  {
    path:'crear-colegio',
    component:CrearColegioComponent
  },
  
  {
    path:'modificar-colegio/:id',
    component:ModificarColegioPageComponent
  },
  {
    path:'informacion-colegio/:id',
    component:DetalleColegioPageComponent
  },
  {
    path:'listar-colegios',
    component:ColegiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColegiosPageRoutingModule {}
