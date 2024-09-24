import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterPedidosPipe } from './filter-pedidos.pipe';

@NgModule({
  declarations: [FilterPipe, FilterPedidosPipe],
  imports: [
    CommonModule
  ],
  exports:[FilterPipe,FilterPedidosPipe]
})
export class PipesModule { }
