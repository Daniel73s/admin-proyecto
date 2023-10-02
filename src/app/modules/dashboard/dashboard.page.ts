import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('menuid') menuclose!: IonMenu; // Importa IonMenu y ViewChild
  
  menu: any[] = [
    {
      id: 1,
      title: 'inicio',
      multiple: false,
      open: false,
      path: '/dashboard/inicio',
      icon: 'home-outline',
    },
    {
      id: 2,
      title: 'Colegios',
      multiple: true,
      open: false,
      icon: 'shield-half-outline',
      submenu: [
        {
          title: 'Listar colegios',
          path: '/dashboard/colegios/listar-colegios',
          icon: 'list-outline'
        },
        {
          title: 'Crear nuevo colegio',
          path: '/dashboard/colegios/crear-colegio',
          icon: 'pencil-outline'
        }
      ],
    },
    {
      id: 3,
      title: 'Proveedores',
      multiple: true,
      open: false,
      icon: 'people-outline',
      submenu: [
        {
          title: 'Listar proveedores',
          path: '/dashboard/proveedores',
          icon: 'list-outline'
        },
        {
          title: 'Crear nuevo proveedor',
          path: '/dashboard/proveedores/crear-proveedor',
          icon: 'pencil-outline'
        }
      ],
    },
    {
      id: 4,
      title: 'Productos',
      multiple: false,
      open: false,
      path: '/dashboard/productos',
      icon: 'fast-food-outline'
    },
    {
      id: 5,
      title: 'Informes',
      multiple: false,
      open: false,
      path: '/dashboard/informes',
      icon: 'documents-outline'
    }

  ]


  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  public mostrar(id: number) {
    this.menu[id-1].open=!this.menu[id-1].open;
  }


  public cerrarmenu(){
    this.menuclose.close(); // Cierra el menú
  }

}
