import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AdministradoresService } from '../../services/administradores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss'],
})
export class CreateUsuarioComponent implements OnInit {
  public formuser!: FormGroup;
  @Input()
  id_admin!: string;
  constructor(private modalctrl: ModalController,
    private fb: FormBuilder,
    private _administradores: AdministradoresService,
    private _usuarios: UsuariosService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.formInit();
  }

  close() {
    this.modalctrl.dismiss();
  }

  private formInit() {
    this.formuser = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      repeat_password: ['', [Validators.required, Validators.maxLength(30)]]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const repeat_password = form.get('repeat_password');

    if (password && repeat_password && password.value !== repeat_password.value) {
      repeat_password.setErrors({ error: true, name: 'nada' });
    } else {
      repeat_password?.setErrors(null);
    }
    return
  }

  public crearUsuario() {
    const { usuario, password } = this.formuser.getRawValue();
    this._usuarios.createUserAdministrador(usuario, password).then((resp: any) => {
      this._administradores.agregarUserAdmin(resp.usuario, this.id_admin).then((resp: any) => {
        this.mensaje(resp.mensaje,2000,'top','checkmark-outline','dark');
        const estado='success';
        this.modalctrl.dismiss(estado);
      }).catch(e => {
        this.mensaje('ocurrio un error inesperado intentelo nuevamente',2000,'top','warning-outline','danger');
      });
    }).catch(e =>{
      this.mensaje('ocurrio un error inesperado intentelo nuevamente',2000,'top','warning-outline','danger');
    })


  }

  public Error(control: string) {
    if (this.formuser.get(control)?.hasError('required')) {
      return `Campo ${control} es obligatorio`
    }
    if (this.formuser.get(control)?.hasError('maxLength')) {
      return `el Campo ${control} no debe sobrepasar el limite permitido`
    }
    if (this.formuser.get(control)?.errors) {
      return `Password no coincide`
    }
    return
  }

  async mensaje(message: string, duration: number, position: 'top' | 'bottom', icon: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      icon,
      color
    });
    toast.present();
  }

}
