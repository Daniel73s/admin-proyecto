import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss'],
})
export class CrearCategoriaComponent  implements OnInit {
  public formCategoria!:FormGroup
  constructor(private _categoriasService:CategoriaService, 
    private toastctrl:ToastController,
  public fb:FormBuilder,
private router:Router) { }

  ngOnInit() {
    this.formInit();
  }

private formInit(){
    this.formCategoria=this.fb.group({
        nombre:["",[Validators.required,Validators.maxLength(30)]],
        descripcion:["",[Validators.required,Validators.maxLength(150)]]
    });
}
  public createCategoria(){
      this._categoriasService.postCategoria(this.formCategoria.value).then((resp:any)=>{
        this.Mensaje(resp.mensaje,"checkmark-outline","top",2000,"success");
        this.router.navigate(['/dashboard/categorias/listar_categorias']);
      }).catch((e:any)=>{
        this.Mensaje(e.mensaje,"close-outline","top",2000,"danger");
      })
  }
  async Mensaje(message:string,icon:string,position:"bottom"| "middle"| "top",duration:number,color:string) {
    const toast = await this.toastctrl.create({
      message,
      position,
      icon,
      duration,
      color
    });
    toast.present();
  }
}
