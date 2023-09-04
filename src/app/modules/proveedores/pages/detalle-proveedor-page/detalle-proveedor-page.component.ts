import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';


@Component({
  selector: 'app-detalle-proveedor-page',
  templateUrl: './detalle-proveedor-page.component.html',
  styleUrls: ['./detalle-proveedor-page.component.scss'],
})
export class DetalleProveedorPageComponent  implements OnInit {
   public proveedor:FormGroup=new FormGroup('');
  constructor(private route:ActivatedRoute,private fb:FormBuilder,private _proveedores:ProveedoresService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formInit();
    this.formpatch(id);
  }

  private formInit() {
    this.proveedor = this.fb.group({
      razonsocial: [''],
      nit: [''],
      limite: [''],
      cs: [''],
      telefonoFijo: [''],
      celular: [''],
      zona: [''],
      calle: [''],
      numero: ['']
    });
  }


  private async formpatch(id:string | null) {
    const data = await this._proveedores.getProveedores();
    const proveedor = data.find(item => {
      return item.id===id
    });

    this.proveedor.patchValue({
      razonsocial: proveedor?.razonSocial,
      nit: proveedor?.nit ,
      limite: proveedor?.limite,
      cs: proveedor?.cs,
      telefonoFijo: proveedor?.telefonoFijo,
      celular:proveedor?.celular,
      zona: proveedor?.zona,
      calle: proveedor?.calle,
      numero: proveedor?.numero
    })
  }
}
