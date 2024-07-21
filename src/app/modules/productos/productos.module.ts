import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModificarProductoPageComponent } from './pages/modificar-producto-page/modificar-producto-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';
import { CreateProductoPageComponent } from './pages/create-producto-page/create-producto-page.component';
import { ModImageComponent } from './modals/mod-image/mod-image.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [ProductosPage,
    ModificarProductoPageComponent,
    DetalleProductoPageComponent,
    CreateProductoPageComponent,
    ModImageComponent]
})
export class ProductosPageModule {}
