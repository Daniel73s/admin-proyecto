import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'colegios',
    loadChildren: () => import('../colegios/colegios.module').then(m => m.ColegiosPageModule)
  },

  {
    path: 'inicio',
    loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('../productos/productos.module').then(m => m.ProductosPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('../proveedores/proveedores.module').then(m => m.ProveedoresPageModule)
  },
  {
    path:'pedidos',
    loadChildren:()=> import('../pedidos/pedidos.module').then(m=>m.PedidosModule)
  },
  {
    path:'categorias',
    loadChildren:()=> import('../categorias/categorias.module').then(m=>m.CategoriasModule)
  },
  {
    path:'reportes',
    loadChildren:()=> import('../reportes/reportes.module').then(m=>m.ReportesModule)
  },
  {
    path:'administradores',
    loadChildren:()=> import('../adms/adms.module').then(m=>m.AdmsModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
