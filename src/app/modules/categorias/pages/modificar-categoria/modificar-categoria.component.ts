import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.scss'],
})
export class ModificarCategoriaComponent implements OnInit {
  @Input()
  categoria: any;
  id!: number;
  formcategoriamod!:FormGroup
  constructor(private modalCtrl: ModalController,
    private fb:FormBuilder,
    private _categoriaSevice:CategoriaService,
  private toastCtrl:ToastController) { }

  ngOnInit() { 
    this.forminit();    
  }

  close() {
    this.modalCtrl.dismiss();
  }

  forminit(){
    this.formcategoriamod=this.fb.group({
      nombre:["",[Validators.required,Validators.maxLength(30)]],
      descripcion:["",[Validators.required,Validators.maxLength(150)]]
    });

    this.formcategoriamod.patchValue(
      {nombre:this.categoria.nombre}
    );
    this.formcategoriamod.patchValue(
      {descripcion:this.categoria.descripcion}
    );
  }


  public UpdateCategoria(){
      this._categoriaSevice.updateCategoria(this.id,this.formcategoriamod.value).then((resp:any)=>{
          this.Mensaje(resp.mensaje,"top","checkmark-outline",2000);
          this.close();
      });
  }

  async Mensaje(message:string,position:"top"|"middle"|"bottom",icon:string,duration:number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      icon
    });
    toast.present();
  }
}
