import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';


@NgModule({
  declarations: [PedidosComponent,DetallePedidoComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ComponentsModule,
    IonicModule,
    PipesModule
  ]
})
export class PedidosModule { }
