import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/helpers/interfaces/producto.interface';

@Component({
  selector: 'app-modificar-producto-page',
  templateUrl: './modificar-producto-page.component.html',
  styleUrls: ['./modificar-producto-page.component.scss'],
})
export class ModificarProductoPageComponent implements OnInit {
  public formmodProducto: FormGroup = new FormGroup('');
  private loading: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _productos: ProductosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formInit(id);
  }

  public selectedImage?: string= 'assets/img/default.jpg';

  handleFileChange(event: any) {
    const file = event.target.files[0];
    this.formmodProducto.patchValue({ imagen: URL.createObjectURL(file) })
    this.selectedImage = URL.createObjectURL(file);
  }

  public formInit(id: string | null) {
    this.formmodProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precioUnitario: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      tipo: ['', [Validators.required]],
      detalle: ['', [Validators.required, Validators.maxLength(250)]],
      ingredientes: ['', [Validators.maxLength(250)]],
      comentariosAdicionales: ['', [Validators.maxLength(250)]],
      imagen: ['']
    });

    this.formPatch(id);
  }

  private async formPatch(id: string | null) {
    const dataRaw: Producto[] = await this._productos.getProductos();
    const data= dataRaw.find((item: Producto) => {
      return item.id === id
    });

    this.formmodProducto.patchValue({
      nombre: data?.nombre,
      precioUnitario: data?.precioUnitario,
      tipo: data?.tipo,
      detalle:data?.detalle,
      imagen: data?.imagen,
      ingredientes:data?.ingredientes,
      comentariosAdicionales:data?.comentariosAdicionales
    });
    this.selectedImage = data?.imagen
  }

  public update() {
    console.log(this.formmodProducto.getRawValue());
    this.presentLoading();
    setTimeout(() => {
      this.loading.dismiss();
      this.mensaje(2000, 'Se actualizo el producto correctamente', 'checkmark-outline', 'top')
      this.router.navigate(['/dashboard/productos']);
    }, 2000);
  }

  public Error(control: string) {
    if (this.formmodProducto.get(control)?.hasError('required')) {
      return `Campo ${control} es obligatorio`
    }
    if (this.formmodProducto.get(control)?.hasError('maxLength')) {
      return `el Campo ${control} no debe sobrepasar el limite permitido`
    }
    if (this.formmodProducto.get(control)?.hasError('min')) {
      return `Valor no permitido `
    }
    if (this.formmodProducto.get(control)?.hasError('max')) {
      return `Valor no permitido `
    }
    return
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Actualizando Producto',
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

}
