import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-crear-proveedor-page',
  templateUrl: './crear-proveedor-page.component.html',
  styleUrls: ['./crear-proveedor-page.component.scss'],
})
export class CrearProveedorPageComponent implements OnInit {
  public formProveedor: FormGroup = new FormGroup('');
  public image: string = './assets/img/default.jpg';
  private selectedFile!: File;
  private loading:any;
  readonly telefono: MaskitoOptions = {
    mask: ['(', '4', ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  readonly celular: MaskitoOptions = {
    mask: ['+', '(', '5', '9', '1', ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  private numberRegex = /^[0-9]+$/;
  constructor(private fb: FormBuilder,
    private _proveedoresService: ProveedoresService,
    private toastCtrl: ToastController,
    private router: Router,
    private _uploads: UploadsService,
  private loadingCtrl:LoadingController) { }
  public readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.formProveedor = this.fb.group({
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.pattern(this.numberRegex)]],
      limite_entregas: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      certificado_sanitario: ['', [Validators.required]],
      celular: [''],
      zona: ['', [Validators.required]],
      calle: [''],
      referencia: ['']
    });
  }

  public save() {
    if (this.selectedFile) {
      if (this.formProveedor.valid) {
        this.presentLoading();
        this._uploads.uploadImageCloudinary(this.selectedFile).then((resp: any) => {
          const { nit, razon_social, limite_entregas, certificado_sanitario, celular, zona, calle, referencia } = this.formProveedor.getRawValue();
          this._proveedoresService.addProveedor({
            nit, razon_social, limite_entregas, certificado_sanitario, celular,imagen:resp.url_image
          }).then((resp: any) => {
            const id_proveedor = resp.id_proveedor
            this._proveedoresService.addUbicacionProveedor({id_proveedor, zona, calle, referencia}).then((resp: any) => {
              this.mensaje(resp.mensaje, 2000, "checkmark-outline");
              this.formProveedor.reset();
              this.router.navigate(['/dashboard/proveedores/listar-proveedores']);
            }).catch(e => {
              console.log(e.message)
            }).finally(()=>{
              this.loading.dismiss();
            })
          }).catch(e=>{
            console.log(e.message);
            this.mensaje('osurrio un error al guardar el proveedor',2000,'warning-outline');
          }).finally(()=>{
            this.loading.dismiss();
          })
        }).catch(e=>{
          console.log(e.message);
          this.mensaje('No se pudo subir la imagen',2000,'warning-outline');
        }).finally(()=>{
          this.loading.dismiss();
        })
      } else {
        this.mensaje('El formulario no es valido',2000,'warning-outline');
      }
    } else {
      this.mensaje('Asegurese de proporcionar una imagen', 2000, 'warning-outline');
    }

    

  }

  get razonSocial_Error() {
    if (this.formProveedor.get('razonsocial')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get nit_Error() {
    if (this.formProveedor.get('nit')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    return
  }

  get limite_Error() {
    if (this.formProveedor.get('limite')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    if (this.formProveedor.get('limite')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get zona_Error() {
    if (this.formProveedor.get('zona')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get celular_Error() {
    if (this.formProveedor.get('celular')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  async mensaje(message: string, duration: number, icon: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      icon,
      position: "top"
    });
    toast.present();
  }
  public handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.image = URL.createObjectURL(this.selectedFile);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Creando Proveedor',
      spinner: 'crescent'
    });
    await this.loading.present();
  }
}
