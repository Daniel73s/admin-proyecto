import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-crear-proveedor-page',
  templateUrl: './crear-proveedor-page.component.html',
  styleUrls: ['./crear-proveedor-page.component.scss'],
})
export class CrearProveedorPageComponent implements OnInit {
  public formProveedor: FormGroup = new FormGroup('');
  readonly telefono: MaskitoOptions = {
    mask: ['(', '4', ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  readonly celular: MaskitoOptions = {
    mask: ['+', '(', '5', '9', '1', ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  private numberRegex = /^[0-9]+$/;
  constructor(private fb: FormBuilder) { }
  public readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.formProveedor = this.fb.group({
      razonsocial: ['', [Validators.required]],
      nit: ['', [Validators.pattern(this.numberRegex)]],
      limite: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      cs: ['', [Validators.required]],
      telefono: [''],
      celular: ['',[Validators.required]],
      zona: ['', [Validators.required]],
      calle: [''],
      numerodomicilio: ['']
    });
  }

  public save() {
    console.log(this.formProveedor.getRawValue());
  }

  get razonSocial_Error() {
    if (this.formProveedor.get('razonsocial')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get nit_Error() {
    if (this.formProveedor.get('nit')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    return
  }

  get limite_Error() {
    if (this.formProveedor.get('limite')?.hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }
    if (this.formProveedor.get('limite')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get zona_Error() {
    if (this.formProveedor.get('zona')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  get celular_Error() {
    if (this.formProveedor.get('celular')?.hasError('required')) {
      return 'Campo debe ser llenado';
    }
    return
  }

  
}
