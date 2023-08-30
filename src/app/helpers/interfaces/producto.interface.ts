export interface Producto {
  id: string;
  nombre: string;
  detalle: string;
  ingredientes?: string;
  estado: 'activo' | 'inactivo';
  tipo: 'liquido' | 'solido';
  precioUnitario: number;
  imagen?: string;
  comentariosAdicionales?: string;
}