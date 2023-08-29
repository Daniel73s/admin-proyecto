import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModificarProductoPageComponent } from './pages/modificar-producto-page/modificar-producto-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosPage,ModificarProductoPageComponent,DetalleProductoPageComponent]
})
export class ProductosPageModule {}
