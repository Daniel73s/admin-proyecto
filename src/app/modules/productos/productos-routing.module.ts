import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';
import { ModificarProductoPageComponent } from './pages/modificar-producto-page/modificar-producto-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { CreateProductoPageComponent } from './pages/create-producto-page/create-producto-page.component';

const routes: Routes = [
  {
    path: 'listar-productos',
    component: ProductosPage
  },
  {
    path:'modificar-producto/:id',
    component:ModificarProductoPageComponent
  },
  {
    path:'detalle-producto/:id',
    component:DetalleProductoPageComponent
  },
  {
    path:'crear-producto',
    component:CreateProductoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
