import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ColegiosPageRoutingModule } from './colegios-routing.module';
import { MaskitoModule } from '@maskito/angular';
import { ComponentsModule } from 'src/app/components/components.module';
//components
import { ColegiosPage } from './colegios.page';
import { CrearColegioComponent } from './pages/crear-colegio/crear-colegio.component';
import { MapaModalComponent } from './modals/mapa-modal/mapa-modal.component';
import { ModificarColegioPageComponent } from './pages/modificar-colegio-page/modificar-colegio-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColegiosPageRoutingModule,
    ComponentsModule,
    MaskitoModule,
    ReactiveFormsModule
  ],
  declarations: [ColegiosPage,CrearColegioComponent,MapaModalComponent,ModificarColegioPageComponent]
})
export class ColegiosPageModule {}
