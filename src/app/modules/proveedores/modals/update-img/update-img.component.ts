import { Component, Input, OnInit } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-update-img',
  templateUrl: './update-img.component.html',
  styleUrls: ['./update-img.component.scss'],
})
export class UpdateImgComponent implements OnInit {
  @Input()
  id_imagen!: string;
  url!: string;
  id_proveedor!: string;


  selectedFile!: File;
  loading: any;
  constructor(private _proveedores: ProveedoresService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private _uploadService: UploadsService) { }

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
        this._proveedores.asignarImagenProveedor(this.id_proveedor, resp.url_image).then((response: any) => {
        }).catch(e => console.log)
        .finally(() => {
          this.loading.dismiss();
          this.modalCtrl.dismiss('success');
        })
      }).catch(e => console.log)
    } else {
      console.warn('Por favor seleccione una imagen primero');
    }
  }

  public close() {
    this.modalCtrl.dismiss();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 2000,
      spinner: 'crescent'
    });
    await this.loading.present();
  }
}
