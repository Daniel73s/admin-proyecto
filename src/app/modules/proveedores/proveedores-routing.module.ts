import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresPage } from './proveedores.page';
import { CrearProveedorPageComponent } from './pages/crear-proveedor-page/crear-proveedor-page.component';
import { ModificarProveedorPageComponent } from './pages/modificar-proveedor-page/modificar-proveedor-page.component';
import { DetalleProveedorPageComponent } from './pages/detalle-proveedor-page/detalle-proveedor-page.component';

const routes: Routes = [
  {
    path: 'listar-proveedores',
    component: ProveedoresPage
  },
  {
    path: 'crear-proveedor',
    component: CrearProveedorPageComponent
  },
  {
    path: 'modificar-proveedor/:id',
    component: ModificarProveedorPageComponent
  },
  {
    path: 'detalle-proveedor/:id',
    component: DetalleProveedorPageComponent
  },
  {
    path:"**",
    redirectTo:"listar-proveedores",
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresPageRoutingModule {}
