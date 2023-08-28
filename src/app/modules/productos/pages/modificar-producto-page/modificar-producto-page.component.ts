import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-producto-page',
  templateUrl: './modificar-producto-page.component.html',
  styleUrls: ['./modificar-producto-page.component.scss'],
})
export class ModificarProductoPageComponent implements OnInit {
  public formmodProducto: FormGroup = new FormGroup('');
  private loading:any;
  constructor(private fb: FormBuilder,private router:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.formInit();
  }

  public selectedImage: string = 'assets/img/default.jpg';

  handleFileChange(event: any) {
    const file = event.target.files[0];
    this.formmodProducto.patchValue({imagen:URL.createObjectURL(file)})
    this.selectedImage = URL.createObjectURL(file);
  }

  public formInit() {
    this.formmodProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      cantidad: ['', [Validators.required, Validators.min(100)]],
      precioUnitario: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      tipo: ['', [Validators.required]],
      detalle: ['', [Validators.required, Validators.maxLength(250)]],
      ingredientes: ['', [Validators.maxLength(250)]],
      comentariosAdicionales: ['', [Validators.maxLength(250)]],
      imagen: ['']
    });

    this.formmodProducto.patchValue({
      nombre:'Platano',
      cantidad:1200,
      precioUnitario:2,
      tipo:'solido',
      detalle:'Los plátanos son una excelente fuente de nutrientes esenciales. Son ricos en vitamina C, vitamina B6, potasio y fibra dietética',
      img:'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg'
    });
    this.selectedImage='https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg';
  }

  public update() {
    console.log(this.formmodProducto.getRawValue());
    this.presentLoading();
    setTimeout(() => {
      this.loading.dismiss();
      this.router.navigate(['/dashboard/productos']);
    }, 2000);
  }

  public Error(control: string) {
    if (this.formmodProducto.get(control)?.hasError('required')) {
      return `Campo ${control} es obligatorio`
    }
    if(this.formmodProducto.get(control)?.hasError('maxLength')){
      return `el Campo ${control} no debe sobrepasar el limite permitido`
    }
    if(this.formmodProducto.get(control)?.hasError('min')){
      return `Valor no permitido `
    }
    if(this.formmodProducto.get(control)?.hasError('max')){
      return `Valor no permitido `
    }
    return
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Actualizando',
      spinner: 'dots'
    });
    await this.loading.present();
  }

}
