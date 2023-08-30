import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';
import { ModificarProductoPageComponent } from './pages/modificar-producto-page/modificar-producto-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  },
  {
    path:'modificar-producto/:id',
    component:ModificarProductoPageComponent
  },
  {
    path:'detalle-producto/:id',
    component:DetalleProductoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
