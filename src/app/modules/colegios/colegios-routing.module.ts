import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColegiosPage } from './colegios.page';
import { CrearColegioComponent } from './pages/crear-colegio/crear-colegio.component';

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
    path:'listar-colegios',
    component:ColegiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColegiosPageRoutingModule {}
