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
  private id:any;
  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get('id');
    this.formInit();
    this.getProveedor(this.id);
  }

  private formInit() {
    this.formmodProveedor = this.fb.group({
      razon_social: ['', [Validators.required]],
      nit: ['', [Validators.pattern(this.numberRegex)]],
      limite_entregas: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      certificado_sanitario: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      calle: [''],
      referencia: ['']
    });
  }

  public update() {
    const {razon_social,nit,limite_entregas,certificado_sanitario,celular,zona,calle,referencia}=this.formmodProveedor.getRawValue();
    this._proveedores.updateProveedor(this.id,{razon_social,nit,limite_entregas,certificado_sanitario,celular}).then(()=>{
      this._proveedores.updateUbicacionProveedor(this.id,{zona,calle,referencia}).then((resp:any)=>{
        this.mensaje(2000,resp.mensaje,'checkmark-outline','top');
        this.router.navigate(['/dashboard/proveedores/listar-proveedores']);
      }).catch(e =>{
        console.log(e.message);
        this.mensaje(2000,'ocurrio un error inesperado','warning-outline','top');
      });
    }).catch(e =>{
      console.log(e.message);
      this.mensaje(2000,'ocurrio un error inesperado','warning-outline','top');
    });
  }

  private getProveedor(id:string){
    this._proveedores.getOneProveedor(id).then((resp:any)=>{
      this.formmodProveedor.patchValue({
            razon_social: resp.razon_social,
            nit: resp.nit,
            limite_entregas: resp.limite_entregas,
            certificado_sanitario: resp.certificado_sanitario,
            celular:resp.celular,
            zona: resp.zona,
            calle: resp.calle,
            referencia: resp.referencia
          });
    });
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
