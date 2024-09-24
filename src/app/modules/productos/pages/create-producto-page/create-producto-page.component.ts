import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/modules/categorias/services/categoria.service';
import { UploadsService } from 'src/app/services/uploads.service';
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from 'src/app/modules/proveedores/services/proveedores.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-producto-page',
  templateUrl: './create-producto-page.component.html',
  styleUrls: ['./create-producto-page.component.scss'],
})
export class CreateProductoPageComponent implements OnInit {
  public formProducto: FormGroup = new FormGroup('');
  public listcategorias: any[] = [];
  public listproveedores: any[] = [];
  public selectedFile!: File;
  public url: string = "";
  private loading: any;
  constructor(private fb: FormBuilder,
    private _categorias: CategoriaService,
    private _uploads: UploadsService,
    private _productos: ProductosService,
    private _proveedores: ProveedoresService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.formInit();
  }
  ionViewWillEnter() {
    //obteniendo todas las categorias de la base de datos
    this.getCategorias();
    //obteniendo todos los proveedores activos
    this.getProveedores();
  }
  public formInit() {
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precio_unitario: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      medida: ['', [Validators.required]],
      unidad_medida: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
      id_proveedor: ['', [Validators.required]]
    });

  }

  private getCategorias() {
    this._categorias.getCategoriasValidas().then((resp: any) => {
      this.listcategorias = resp;
    });
  }

  private getProveedores() {
    this._proveedores.getProveedoresActivos().then((proveedores: any) => {
      console.log("estos son los preoveedores", proveedores);
      this.listproveedores = proveedores;
    })
  }

  public load() {
    if (this.selectedFile) {
      this.presentLoading();
      const { nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria, id_proveedor } = this.formProducto.getRawValue();
      this._uploads.uploadImageCloudinary(this.selectedFile).then((imagen: any) => {
        this._productos.createProducto({
          nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria, imagen: imagen.url_image,estado:'activo'
        }).then((producto: any) => {
          this._productos.asignarProducto(producto.id_producto, id_proveedor).then((resp: any) => {
            console.log(resp.mensaje);
            this.mensaje(2000, resp.mensaje, 'checkmark-outline', 'top');
            this.formProducto.reset();
            this.loading.dismiss();
            this.router.navigate(['/dashboard/productos/listar-productos']);
          }).finally(()=>{
            this.formProducto.reset();
            this.loading.dismiss();
            this.router.navigate(['/dashboard/productos/listar-productos']);
          });
        }).catch((e: any) => {
          console.log(e.message);
          this.mensaje(2000, 'Ocurrio un error inesperado al guardar datos del producto', 'warning-outline', 'top');
        }).finally(()=>{
          this.formProducto.reset();
          this.loading.dismiss();
          this.router.navigate(['/dashboard/productos/listar-productos']);
        });
      }).catch((e: any) => {
        console.log(e.message);
        this.mensaje(2000, 'Ocurrio un error inesperado al subir la imagen', 'warning-outline', 'top');
      }).finally(()=>{
        this.formProducto.reset();
        this.loading.dismiss();
        this.router.navigate(['/dashboard/productos/listar-productos']);
      });
    } else {
      this.mensaje(2000, 'Asegurese de subir una imagen', 'warning-outline', 'top');
    }
  }

  public Error(control: string) {
    if (this.formProducto.get(control)?.hasError('required')) {
      return `Campo ${control} es obligatorio`
    }
    if (this.formProducto.get(control)?.hasError('maxLength')) {
      return `el Campo ${control} no debe sobrepasar el limite permitido`
    }
    if (this.formProducto.get(control)?.hasError('min')) {
      return `Valor no permitido `
    }
    if (this.formProducto.get(control)?.hasError('max')) {
      return `Valor no permitido `
    }
    return
  }

  public handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.url = URL.createObjectURL(this.selectedFile);
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Creando producto',
      spinner: 'crescent'
    });
    await this.loading.present();
  }
}
