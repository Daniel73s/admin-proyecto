import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}



public pedidos = [
      {
          id: '4b1e49a7-f8b4-4c4f-aed2-0d3f0f0e8f0d',
          estado: 'pendiente',
          comentario: 'Pedido en revisión',
          fechaPedido: '2024-05-30',
          total: 150.00,
          colegio: 'Juan Pérez',
          proveedor:'proveedor 1'

      },
      {
          id: '2a3e4f90-3c9e-4a92-b2e2-6f5d7c8e2b23',
          estado: 'enviado',
          comentario: 'Pedido enviado',
          fechaPedido: '2024-05-29',
          total: 200.50,
          colegio: 'María García',
          proveedor:'proveedor 2'

      },
      {
          id: 'd2e4a1f3-5a2b-4c3e-a9e7-f6d8c7e4f2b1',
          estado: 'entregado',
          comentario: 'Pedido entregado',
          fechaPedido: '2024-05-28',
          total: 99.99,
          colegio: 'Luis Rodríguez',
          proveedor:'proveedor 3'

      },
      {
          id: 'c8e2d37f-7c3e-43d4-b9e2-f7d3f4e8d9a1',
          estado: 'cancelado',
          comentario: 'Pedido cancelado por el cliente',
          fechaPedido: '2024-05-27',
          total: 75.25,
          colegio: 'Ana López',
          proveedor:'proveedor 4'

      }
  ];
}
