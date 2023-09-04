import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ProveedoresService } from '../../services/proveedores.service';
@Component({
  selector: 'app-modificar-proveedor-page',
  templateUrl: './modificar-proveedor-page.component.html',
  styleUrls: ['./modificar-proveedor-page.component.scss'],
})
export class ModificarProveedorPageComponent implements OnInit {

  public formmodProveedor: FormGroup = new FormGroup('');
  readonly telefono: MaskitoOptions = {
    mask: ['(', '4', ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  readonly celular: MaskitoOptions = {
    mask: ['+', '(', '5', '9', '1', ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  private loading: any;
  private numberRegex = /^[0-9]+$/;
  constructor(private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private _proveedores: ProveedoresService,
    private route:ActivatedRoute) { }
  public readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formInit();
    this.formpatch(id);
  }

  private formInit() {
    this.formmodProveedor = this.fb.group({
      razonsocial: ['', [Validators.required]],
      nit: ['', [Validators.pattern(this.numberRegex)]],
      limite: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      cs: ['', [Validators.required]],
      telefonoFijo: [''],
      celular: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      calle: [''],
      numero: ['']
    });
  }

  public update() {
    console.log(this.formmodProveedor.getRawValue());
    this.presentLoading('Actualizando Proveedor');
    setTimeout(() => {
      this.loading.dismiss();
      this.mensaje(2000, 'Se actualizo el proveedor correctamente', 'checkmark-outline', 'top')
      this.router.navigate(['/dashboard/proveedores']);
    }, 2000);

  }

  private async formpatch(id:string | null) {
    const data = await this._proveedores.getProveedores();
    const proveedor = data.find(item => {
      return item.id===id
    });

    this.formmodProveedor.patchValue({
      razonsocial: proveedor?.razonSocial,
      nit: proveedor?.nit,
      limite: proveedor?.limite,
      cs: proveedor?.cs,
      telefonoFijo: proveedor?.telefonoFijo,
      celular:proveedor?.celular,
      zona: proveedor?.zona,
      calle: proveedor?.calle,
      numero: proveedor?.numero
    })
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'dots'
    });
    await this.loading.present();
  }

  async mensaje(duration: number, message: string, icon: string, position: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      duration,
      message,
      icon,
      position
    });
    toast.present();
  }





  //mensaje de error para los campos
  get razonSocial_Error() {
    if (this.formmodProveedor.get('razonsocial')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get nit_Error() {
    if (this.formmodProveedor.get('nit')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    return
  }

  get limite_Error() {
    if (this.formmodProveedor.get('limite')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    if (this.formmodProveedor.get('limite')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get zona_Error() {
    if (this.formmodProveedor.get('zona')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get celular_Error() {
    if (this.formmodProveedor.get('celular')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

}
