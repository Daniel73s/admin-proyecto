import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from 'src/app/modules/categorias/services/categoria.service';

@Component({
  selector: 'app-modificar-producto-page',
  templateUrl: './modificar-producto-page.component.html',
  styleUrls: ['./modificar-producto-page.component.scss'],
})
export class ModificarProductoPageComponent implements OnInit {
  public formmodProducto: FormGroup = new FormGroup('');
  public categorias: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private _productos: ProductosService,
    private route: ActivatedRoute,
    private _categoriasService: CategoriaService) { }
  private id: any;
  ngOnInit() {
    //recepcionanod el id que llega desde la pantalla productos
    this.id = this.route.snapshot.paramMap.get('id');
    //inicializando el formulario temporalmente con campos vacios
    this.formInit();
    //obteniendo los datos del producto de la base de datos
    this.getProducto(this.id);
  }
  
  ionViewWillEnter() {
    //obteniendo todas las categorias de la base de datos
    this.getCategorias();
  }


  private getProducto(id: string) {
    this._productos.getOneProducto(id).then((resp: any) => {
      this.formmodProducto.patchValue({
        nombre: resp.nombre,
        precio_unitario: resp.precio_unitario,
        tipo: resp.tipo,
        descripcion: resp.descripcion,
        medida: resp.medida,
        unidad_medida: resp.unidad_medida,
        id_categoria: resp.id_categoria
      });
    });
  }

  private getCategorias() {
    this._categoriasService.getCategoriasValidas().then((resp: any) => {
      this.categorias = resp;
      console.log(this.categorias);

    });
  }

  public formInit() {
    this.formmodProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precio_unitario: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      medida: [''],
      unidad_medida: [''],
      id_categoria: ['']
    });

  }

  public update() {
    const { nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria } = this.formmodProducto.getRawValue();
    this._productos.updateProducto(this.id, {
      nombre, precio_unitario, tipo, descripcion, medida, unidad_medida, id_categoria
    }).then((resp: any) => {
      this.mensaje(2000, resp.mensaje, 'checkmark-outline', 'top');
    }).catch(e => {
      this.mensaje(2000, 'ocurrio un error inesperado', 'warning-outline', 'top');
      console.log(e.message)
    }).finally(() => {
      this.router.navigate(['/dashboard/productos/listar-productos']);
    });
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
