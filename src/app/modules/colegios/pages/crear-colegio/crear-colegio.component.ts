import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MapaModalComponent } from '../../modals/mapa-modal/mapa-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColegiosService } from '../../services/colegios.service';
import { Colegio } from 'src/app/helpers/interfaces/colegio.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-colegio',
  templateUrl: './crear-colegio.component.html',
  styleUrls: ['./crear-colegio.component.scss'],
})
export class CrearColegioComponent implements OnInit {
  readonly telefono: MaskitoOptions = {
    mask: ['(', '4', ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  readonly celular: MaskitoOptions = {
    mask: ['+', '(', '5', '9', '1', ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  //exprecion regular que solo acepta numeros

  private numberRegex = /^[0-9]+$/;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private _colegio: ColegiosService,private toastCtrl:ToastController,private router:Router) { }
  public readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  //inicializando una variable de tipo formGroup
  public formAdd: FormGroup = new FormGroup('');
  private Rue_MaxLength = 10;
  private Rue_MinLength = 8;
  private Nombre_MaxLength = 50;
  private Nombre_MinLength = 5;
  ngOnInit() {
    this.formAdd = this.fb.group({
      rue: ['', [Validators.required, Validators.pattern(this.numberRegex), Validators.maxLength(this.Rue_MaxLength), Validators.minLength(this.Rue_MinLength)]],
      nombre: ['', [Validators.required, Validators.maxLength(this.Nombre_MaxLength), Validators.minLength(this.Nombre_MinLength)]],
      estudiantes: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      dependencia: ['', Validators.required],
      niveles: ['', Validators.required],

      ubicacion: this.fb.group({
        calle: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(5)]],
        numero: ['', Validators.maxLength(10)],
        ciudad: ['', Validators.required],
        zona: ['', Validators.maxLength(30)],
        ageografica: ['', Validators.required],
        coordenadas: ['', Validators.required]
      }),

      contacto: this.fb.group({
        telefono: ['', [Validators.minLength(12)]],
        celular: ['', [Validators.minLength(15)]],
        email: ['', [Validators.email, Validators.maxLength(50)]]
      })
    });
  }

  public volver(){
    this.router.navigate(['/dashboard/colegios/listar-colegios']);
  }

  async abrirMapa() {
    const coordenadas = this.formAdd.get('ubicacion.coordenadas')?.value;
    let partes;
    if (coordenadas == '') {
      partes = ['-64.731242', '-21.529409']
    } else {
      partes = coordenadas.split(',');
    }
    // console.log(partes,'partes separadas');
    const modal = await this.modalCtrl.create({
      component: MapaModalComponent,
      componentProps: {
        lng: partes[0],
        lat: partes[1]
      },
      cssClass: 'custom-modal'
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'ok') {
      this.formAdd.get('ubicacion.coordenadas')?.patchValue(`${data.lng},${data.lat}`);
    }
  }


  public guardar() {
    console.log(this.formAdd.getRawValue());
    const {rue,nombre,estudiantes,dependencia,niveles,ubicacion,contacto}=this.formAdd.getRawValue();
    const coords=ubicacion.coordenadas.split(',');
    this._colegio.crearColegio(
      {rue,nombre,estudiantes,dependencia,niveles}).then((resp: any) => {
        const id_colegio=resp.id;
         this._colegio.ubicacionColegio({id_colegio,longitud:coords[0],latitud:coords[1],...ubicacion}).then(()=>{
           this._colegio.contactoColegio({id_colegio,...contacto}).then((resp:any)=>{
             this.router.navigate(['/dashboard/colegios']);
             this.mensaje(resp.msg,'checkmark-outline');
           }).catch((error:any)=>{
            console.log(error);
           });
         });
    }).catch(error=>{
      this.mensaje(`Ocurrio un error inesperado al momento de la creacion ${error}`,'alert-outline');
    });
  }

  async mensaje(message:string,icon:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position:'top',
      icon
    });
    toast.present();
  }
  //Mensajes de error para el campo Rue
  get rue_Error() {
    if (this.formAdd.get('rue')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    if (this.formAdd.get('rue')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    if (this.formAdd.get('rue')?.hasError('maxlength')) {
      return `Solo se aceptan ${this.Rue_MaxLength} numeros`;
    }
    if (this.formAdd.get('rue')?.hasError('minlength')) {
      return `El RUE debe tener al menos ${this.Rue_MinLength} numeros`;
    }
    return
  }

  //mensajes de error para el campo de estudiantes
  get estudiantes_Error() {
    if (this.formAdd.get('estudiantes')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    if (this.formAdd.get('estudiantes')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    return
  }

  //Mensajes de error para el campo Nombre
  get nombre_Error() {
    if (this.formAdd.get('nombre')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    if (this.formAdd.get('nombre')?.hasError('maxlength')) {
      return `Solo se aceptan 50 caracteres`;
    }
    if (this.formAdd.get('nombre')?.hasError('minlength')) {
      return `El NOMBRE debe tener al menos 3 caracteres`;
    }
    return
  }

  //Mensajes de error para el campo Calle
  get calle_Error() {
    if (this.formAdd.get('ubicacion.calle')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    if (this.formAdd.get('ubicacion.calle')?.hasError('maxlength')) {
      return `El campo solo acepta 150 caracteres`;
    }
    if (this.formAdd.get('ubicacion.calle')?.hasError('minlength')) {
      return `El campo debe tener al menos 5 caracteres`;
    }
    return
  }

  //Mensajes de error para el campo Numero
  get numero_Error() {
    if (this.formAdd.get('ubicacion.numero')?.hasError('maxlength')) {
      return 'El campo solo acepta 10 caracteres';
    }

    return
  }

  //Mensajes de error para el campo Zona
  get zona_Error() {
    if (this.formAdd.get('ubicacion.zona')?.hasError('maxlength')) {
      return 'El campo solo acepta 30 caracteres';
    }

    return
  }

  //Mensajes de error para el campo Coordenadas
  get coordenadas_Error() {
    if (this.formAdd.get('ubicacion.coordenadas')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }

    return
  }

  //Mensajes de error para el campo Telefono
  get telefono_Error() {
    if (this.formAdd.get('contacto.telefono')?.hasError('minlength')) {
      return `El campo no cumple como numero de telefono fijo`;
    }

    return
  }

  //Mensajes de error para el campo Celular
  get celular_Error() {
    if (this.formAdd.get('contacto.celular')?.hasError('minlength')) {
      return `El campo no cumple como numero de celular`;
    }
    return
  }

  //Mensajes de error para el campo Celular
  get email_Error() {
    if (this.formAdd.get('contacto.email')?.hasError('email')) {
      return `Email invalido`;
    }

    if (this.formAdd.get('contacto.email')?.hasError('maxlength')) {
      return `Email demaciado largo solo se aceptan 50 caracteres`;
    }
    return
  }
}
