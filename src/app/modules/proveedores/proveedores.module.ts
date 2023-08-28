import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearProveedorPageComponent } from './pages/crear-proveedor-page/crear-proveedor-page.component';
import { MaskitoModule } from '@maskito/angular';
import { ModificarProveedorPageComponent } from './pages/modificar-proveedor-page/modificar-proveedor-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    ComponentsModule,
    MaskitoModule,
    ReactiveFormsModule
  ],
  declarations: [ProveedoresPage,CrearProveedorPageComponent,ModificarProveedorPageComponent]
})
export class ProveedoresPageModule {}
