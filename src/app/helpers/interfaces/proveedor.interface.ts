export interface Proveedor {
    id: string;
    razonSocial: string;
    nit?: number;
    limite: number;
    cs: 'valido' | 'pendiente';
    telefonoFijo?: string;
    celular: string;
    zona: string;
    calle?:string;
    numero?:string;
    estado:'activo' | 'inactivo';
  }