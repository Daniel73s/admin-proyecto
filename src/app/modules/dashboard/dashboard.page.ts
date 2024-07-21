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
          path: '/dashboard/proveedores/listar-proveedores',
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
      multiple: true,
      open: false,
      icon: 'fast-food-outline',
      submenu: [
        {
          title: 'Listar productos',
          path: '/dashboard/productos/listar-productos',
          icon: 'list-outline'
        },
        {
          title: 'Crear nuevo producto',
          path: '/dashboard/productos/crear-producto',
          icon: 'pencil-outline'
        }
      ]
    },
    {
      id: 5,
      title: 'Pedidos',
      multiple: false,
      open: false,
      path: '/dashboard/pedidos',
      icon: 'cart-outline'
    },
    {
      id: 6,
      title: 'Categorias',
      multiple: true,
      open: false,
      path: '/dashboard/categorias',
      icon: 'pricetags-outline',
      submenu: [
        {
          title: 'Categorias',
          path: '/dashboard/categorias/listar_categorias',
          icon: 'add-outline'
        },
        {
          title: 'Nueva Categoria',
          path: '/dashboard/categorias/crear_categoria',
          icon: 'add-outline'
        }
      ],
    },
    {
      id: 7,
      title: 'Reportes',
      multiple: false,
      open: false,
      path: '/dashboard/reportes',
      icon: 'document-text-outline'
    },
    {
      id: 8,
      title: 'Administradores',
      multiple: true,
      open: false,
      path: '/dashboard/administradores',
      icon: 'people-circle-outline',
      submenu: [
        {
          title: 'Administradores',
          path: '/dashboard/administradores/listar_administradores',
          icon: 'add-outline'
        },
        {
          title: 'Nuevo administrador',
          path: '/dashboard/administradores/nuevo_administrador',
          icon: 'add-outline'
        }
      ],
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
