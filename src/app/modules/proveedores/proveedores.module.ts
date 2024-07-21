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
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';
import { DetalleProveedorPageComponent } from './pages/detalle-proveedor-page/detalle-proveedor-page.component';
import { CreateUsuarioComponent } from './modals/create-usuario/create-usuario.component';
import { UpdatePassComponent } from './modals/update-pass/update-pass.component';
import { UpdateImgComponent } from './modals/update-img/update-img.component';
import { UploadImgComponent } from './modals/upload-img/upload-img.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    ComponentsModule,
    MaskitoModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [ProveedoresPage,
    CrearProveedorPageComponent,
    ModificarProveedorPageComponent,
    DetalleProveedorPageComponent,
    CreateUsuarioComponent,
    UpdatePassComponent,
    UpdateImgComponent,
  UploadImgComponent]
})
export class ProveedoresPageModule { }
