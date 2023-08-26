import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'src/app/helpers/interfaces/menu.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  menuItems:any[]=[
    {
      title:'inicio',
      path:'/dashboard/inicio',
      icon:'home-outline'
    },
    {
      title:'Colegios',
      path:'/dashboard/colegios/listar-colegios',
      icon:'shield-half-outline'
    },
    {
      title:'Proveedores',
      path:'/dashboard/proveedores',
      icon:'people-outline'
    },
    {
      title:'Productos',
      path:'/dashboard/productos',
      icon:'fast-food-outline'
    },
    {
      title:'Informes',
      path:'/dashboard/informes',
      icon:'documents-outline'
    }

  ]


  constructor() { }

  ngOnInit() {
  }



}
