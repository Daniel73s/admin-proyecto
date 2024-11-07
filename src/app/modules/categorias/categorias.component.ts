import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModificarCategoriaComponent } from './pages/modificar-categoria/modificar-categoria.component';
import { CategoriaService } from './services/categoria.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent{

  public texto:string="";

  public categorias!:any[];
  constructor(private modalCtrl: ModalController, 
    public _CategoriasService: CategoriaService,
    public alertCtrl:AlertController
  ) { }

  ionViewWillEnter() {
    this.getCategorias();
  }

  private getCategorias() {
    this._CategoriasService.getCategorias().then((resp:any)=>{
        this.categorias=resp;
    });
  }

  public async modificar(id:number) {
    this._CategoriasService.getCategoriaById(id).then(async(resp:any)=>{
      const modal = await this.modalCtrl.create({
        component: ModificarCategoriaComponent,
        componentProps:{
          categoria:resp,
          id
        }
      })
      await modal.present();
      await modal.onDidDismiss().then(()=>{
        this.getCategorias();
      });
    });
  }

  async alertConfirm(id:number,estado:boolean) {
    let message=(estado)?'¿Esta seguro de Habilitar la categoria?':'¿Esta seguro de Deshabilitar la categoria?';
    let header=(estado)?"habilitar":"deshabilitar";
    const alert = await this.alertCtrl.create({
      header:header.toUpperCase(),
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
       
          }
        }, {
          text: 'Aceptar',
          handler: () => {
              this._CategoriasService.updateEstadoCategoria(id,estado).then(()=>{
                this.getCategorias();
              });
          }
        }
      ]
    });
  
    await alert.present();
  }

  public buscar(e:any){
    this.texto=e.detail.value;
  }
}
