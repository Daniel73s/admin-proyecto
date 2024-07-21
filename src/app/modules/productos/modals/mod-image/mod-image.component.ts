import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-mod-image',
  templateUrl: './mod-image.component.html',
  styleUrls: ['./mod-image.component.scss'],
})
export class ModImageComponent implements OnInit {
  @Input()
  id_imagen!: string;
  url!: string;
  id_producto!: string;
  selectedFile!: File;
  loading:any;
  constructor(private _productos: ProductosService, 
    private modalCtrl: ModalController,
  private loadingCtrl:LoadingController,
private _uploadService:UploadsService) { }

  ngOnInit() {
  }

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.url = URL.createObjectURL(this.selectedFile);
  }

  onUpload() {
    this.presentLoading('Cargando Imagen');
    if (this.selectedFile) {
      this._uploadService.updateImageCloudinary(this.id_imagen, this.selectedFile).then((resp: any) => {
        this._productos.updateImage(this.id_producto, resp.url_image).then((response: any) => {
        }).catch(e => console.log).finally(()=>{
          this.loading.dismiss(); 
          const data = 'cambio';
          this.modalCtrl.dismiss(data);
        })
      }).catch(e => console.log)
    } else {
      console.warn('Por favor seleccione una imagen primero');
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentLoading(message:string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 2000,
      spinner:'crescent'
    });
    await this.loading.present();
  }
}
