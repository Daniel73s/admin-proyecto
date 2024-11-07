import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AdministradoresService } from '../../services/administradores.service';
import { UploadsService } from 'src/app/services/uploads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-administrador',
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.scss'],
})
export class CrearAdministradorComponent implements OnInit {
  public formAdmin!: FormGroup;
  public selectedFile!: File;
  public url: string = "";
  constructor(private fb: FormBuilder,
    private toastCtrl: ToastController,
    private _Administradores: AdministradoresService,
    private _uploads: UploadsService,
    private router: Router) { }

  ngOnInit() {
    // iniciando el formulario
    this.formInit();
  }


  private formInit() {
    this.formAdmin = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      ap: ["", [Validators.maxLength(30)]],
      am: ["", [Validators.maxLength(30)]],
      ci: ["", [Validators.required, Validators.maxLength(10)]],
      complemento: ["", Validators.maxLength(5)],
      zona: ["", [Validators.required, Validators.maxLength(50)]],
      calle: ["", [Validators.maxLength(50)]],
      referencia: ["", [Validators.required, Validators.maxLength(150)]],
      email: ["", [Validators.email, Validators.maxLength(50)]],
      celular: ["", [Validators.required, Validators.maxLength(8)]]
    });
  }

  public create() {
    const { nombre, ap, am, ci, complemento, zona, calle, referencia, email, celular } = this.formAdmin.getRawValue();
    if (this.selectedFile) {
      this._Administradores.postUbicacionAdministrador({ zona, calle, referencia }).then((ubicacion: any) => {
        this._uploads.uploadImageCloudinary(this.selectedFile).then((imagen: any) => {
          this._Administradores.postAdministrador({
            nombre, ap, am, ci, complemento, email, celular, imagen: imagen.url_image, id_ubicacion: ubicacion.id_ubicacion
          }).then((resp: any) => {
            this.mensaje(resp.mensaje, 2000, 'top', 'checkmark-outline','dark');
            this.formAdmin.reset();
            this.router.navigate(['/dashboard/administradores/listar_administradores']);
          }).catch(e => {
            console.log('ERROR AL CREAR AL ADMINISTRADOR', e.message);
            this.mensaje('Ocurrio un error inesperado', 2000, 'top', 'warning-outline','danger');
          });
        }).catch(e => {
          console.log('ERROR AL SUBIR UNA IMAGEN', e.message);
          this.mensaje('Ocurrio un error inesperado', 2000, 'top', 'warning-outline','danger');
        });
      }).catch((e: any) => {
        console.log('ERROR AL CREAR LA UBICACION', e.message);
        this.mensaje('Ocurrio un error inesperado', 2000, 'top', 'warning-outline','danger');
      })
    } else {
      this.mensaje('Asegurese de cargar una imagen', 2000, 'top', 'warning-outline','danger');
    }
  }


  public handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.url = URL.createObjectURL(this.selectedFile);
  }


  async mensaje(message: string, duration: number, position: 'top' | 'bottom', icon: string,color:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      icon,
      color
    });
    toast.present();
  }
}

