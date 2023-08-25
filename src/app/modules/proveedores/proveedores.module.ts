import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearProveedorPageComponent } from './pages/crear-proveedor-page/crear-proveedor-page.component';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    ComponentsModule,
    MaskitoModule
  ],
  declarations: [ProveedoresPage,CrearProveedorPageComponent]
})
export class ProveedoresPageModule {}
