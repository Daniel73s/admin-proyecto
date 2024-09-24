import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  {
    path:'',
    component:PedidosComponent
  },
  {
    path:'detalle-pedido/:id_pedido',
    component:DetallePedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
