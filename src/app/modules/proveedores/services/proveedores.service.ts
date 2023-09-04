import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from 'src/app/helpers/interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url:string='./assets/data/proveedores.json';
  constructor(private http:HttpClient) { }

  //obteniendo todos los productos 
  async getProveedores(): Promise<Proveedor[]> {
    const data: any = await this.http.get(this.url).toPromise();
    return data.proveedores as Proveedor[];
  }
}
