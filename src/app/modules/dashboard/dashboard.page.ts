import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'src/app/helpers/interfaces/menu.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'home-outline',
      subMenuItems: [],
      subMenuOpened: false,
      url:'/dashboard/inicio'
    },
    {
      label: 'Colegios',
      icon: 'shield-half-outline',
      subMenuItems: [
        { label: 'Listar colegios', icon: 'list-outline',url: '/dashboard/colegios/listar-colegios' },
        { label: 'Crear nuevo colegio', icon: 'add-outline',url: '/dashboard/colegios/crear-colegio' }
      ],
      subMenuOpened: false
    },
    {
      label: 'Proveedores',
      icon: 'people-outline',
      subMenuItems: [
        { label: 'Listar proveedores', icon: 'list-outline',url: '/dashboard/proveedores' },
        { label: 'Crear nuevo proveedor', icon: 'add-outline',url: '/dashboard/crear-proveedor' }
      ],
      subMenuOpened: false
    },
    {
      label: 'Productos',
      icon: 'fast-food-outline',
      subMenuItems: [
        { label: 'Listar productos', icon: 'list-outline',url: '/dashboard/productos' }
      ],
      subMenuOpened: false
    },
    {
      label: 'Pedidos',
      icon: 'document-attach-outline',
      subMenuItems: [
        { label: 'Pedidos pendientes', icon: 'warning-outline',url: '/dashboard/pedidos-pendientes' },
        { label: 'Informe pedidos', icon: 'eye-outline',url: '/dashboard/informe-pedido' }
      ],
      subMenuOpened: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }


  toggleSubMenu(menuItem: MenuItem): void {
    menuItem.subMenuOpened = !menuItem.subMenuOpened;
  }

  getSubMenuIcon(menuItem: MenuItem): string {
    return menuItem.subMenuOpened ? 'chevron-up' : 'chevron-down';
  }


}
