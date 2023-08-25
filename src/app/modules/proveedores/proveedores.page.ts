import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public buscar(e:any){
      console.log(e.target.value);
      
  }
}
