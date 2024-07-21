import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-pass-pro',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss'],
})
export class UpdatePassComponent  implements OnInit {
  @Input()
  usuario!: string;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private _usuarios: UsuariosService,
    private toastCtrl: ToastController) { }
  public formpass!: FormGroup;
  ngOnInit() {
    this.formInit();
  }

  public close() {
    this.modalCtrl.dismiss();
  }

  public formInit() {
    this.formpass = this.fb.group({
      pass: ['', [Validators.required]],
      repeatpass: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('pass');
    const repeat_password = form.get('repeatpass');

    if (password && repeat_password && password.value !== repeat_password.value) {
      repeat_password.setErrors({ error: true, name: 'nada' });
    } else {
      repeat_password?.setErrors(null);
    }
    return
  }

  public updatePass() {
    const { pass } = this.formpass.getRawValue();
    if (this.formpass.valid) {
      this._usuarios.updatePasswordUsuario({ pass, usuario: this.usuario }).then((resp: any) => {
        this.mensaje(resp.mensaje,2000,'checkmark-outline','top','dark');
        this.modalCtrl.dismiss('success');
      }).catch(e => {
        console.log(e.message);
        this.mensaje('Error al actualizar, intentelo mas tarde',2000,'warning-outline','top','danger');
       
      });
    } else {
      this.mensaje('El formulario es invalido',2000,'warning-outline','top','danger');
    }
  }
  public Error(control: string) {
    if (this.formpass.get(control)?.hasError('required')) {
      return `Campo ${control} es obligatorio`
    }
    if (this.formpass.get(control)?.hasError('maxLength')) {
      return `el Campo ${control} no debe sobrepasar el limite permitido`
    }
    if (this.formpass.get(control)?.errors) {
      return `Password no coincide`
    }
    return
  }


  async mensaje(message: string, duration: number, icon: string, position: 'top' | 'bottom',color:string) {
    const toast = await this.toastCtrl.create({
      duration,
      message,
      icon,
      position,
      color
    });
    toast.present();
  }

}
