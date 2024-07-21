import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';


@NgModule({
  declarations: [PedidosComponent,DetallePedidoComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ComponentsModule,
    IonicModule
  ]
})
export class PedidosModule { }
