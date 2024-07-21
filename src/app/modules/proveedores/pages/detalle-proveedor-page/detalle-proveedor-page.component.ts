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
  public proveedor:any;
  constructor(private route:ActivatedRoute,private fb:FormBuilder,private _proveedores:ProveedoresService) { }

  ngOnInit() {
    //capturando el id que se mando desde la pantalla de proveedores
    const id = this.route.snapshot.paramMap.get('id');
    this.getProveedor(id!)
  }


  private getProveedor(id:string){
    this._proveedores.getOneProveedor(id).then((resp:any)=>{
      this.proveedor=resp;
    });
  }

}
