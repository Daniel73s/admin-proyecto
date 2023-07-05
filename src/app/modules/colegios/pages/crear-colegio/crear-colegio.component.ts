import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MapaModalComponent } from '../../modals/mapa-modal/mapa-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }
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
      dependencia: ['', Validators.required],
      niveles: ['', Validators.required],
      calle: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      numero: ['', Validators.maxLength(10)],
      ciudad: ['', Validators.required],
      zona: ['', Validators.maxLength(30)],
      ageografica: ['', Validators.required],
      coordenadas: ['', Validators.required],
      telefono: ['', [Validators.minLength(12)]],
      celular: ['',[Validators.minLength(15)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
    });
  }

  async abrirMapa() {
    const modal = await this.modalCtrl.create({
      component: MapaModalComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }


  guardar() {
    console.log(this.formAdd.getRawValue());

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
    if (this.formAdd.get('calle')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    if (this.formAdd.get('calle')?.hasError('maxlength')) {
      return `El campo solo acepta ${this.Nombre_MaxLength} caracteres`;
    }
    if (this.formAdd.get('calle')?.hasError('minlength')) {
      return `El campo debe tener al menos ${this.Nombre_MinLength} caracteres`;
    }
    return
  }

  //Mensajes de error para el campo Numero
  get numero_Error() {
    if (this.formAdd.get('numero')?.hasError('maxlength')) {
      return 'El campo solo acepta 10 caracteres';
    }

    return
  }

  //Mensajes de error para el campo Zona
  get zona_Error() {
    if (this.formAdd.get('zona')?.hasError('maxlength')) {
      return 'El campo solo acepta 30 caracteres';
    }

    return
  }

  //Mensajes de error para el campo Coordenadas
  get coordenadas_Error() {
    if (this.formAdd.get('coordenadas')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }

    return
  }

  //Mensajes de error para el campo Telefono
  get telefono_Error() {
    if (this.formAdd.get('telefono')?.hasError('minlength')) {
      return `El campo no cumple como numero de telefono fijo`;
    }

    return
  }
   //Mensajes de error para el campo Celular
   get celular_Error() {
    if (this.formAdd.get('celular')?.hasError('minlength')) {
      return `El campo no cumple como numero de celular`;
    }
    return
  }
     //Mensajes de error para el campo Celular
     get email_Error() {
      if (this.formAdd.get('email')?.hasError('email')) {
        return `Email invalido`;
      }

      if (this.formAdd.get('email')?.hasError('maxlength')) {
        return `Email demaciado largo solo se aceptan 50 caracteres`;
      }
      return
    }
}
