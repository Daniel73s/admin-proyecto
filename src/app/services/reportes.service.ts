import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
private url:string='https://server-ogdr.onrender.com/api/reportes'
  constructor(private http:HttpClient) { }

  public getInfoInicio(){
    return this.http.get(`${this.url}/inicio`).toPromise();
  }
  public getPedidosProveedorByDate(id_proveedor: string, fecha:string, estado: string) {
    return this.http.get(`${this.url}/pedidosproveedorporfecha/${id_proveedor}?fecha_entrega=${fecha}&estado=${estado}`).toPromise();
  }
  public getPedidosProveedorEntreFechas(id_proveedor: string, inicio:string,fin:string, estado: string) {
    return this.http.get(`${this.url}/pedidosproveedorentrefechas/${id_proveedor}?inicio=${inicio}&fin=${fin}&estado=${estado}`).toPromise();
  }
  
  //todos los pedidos de un proveedor dependiendo del mes y estado
  public getPedidosProveedorByMes(id_proveedor: string, anio: number, mes: number, estado: string) {
    return this.http.get(`${this.url}/pedidosproveedorpormes/${id_proveedor}?anio=${anio}&mes=${mes}&estado=${estado}`).toPromise();
  }

   //todos los pedidos de un colegio dependiendo del mes
   public getPedidosColegioByMes(id_colegio: string, anio: number, mes: number,estado:string) {
    return this.http.get(`${this.url}/pedidoscolegiopormes/${id_colegio}?anio=${anio}&mes=${mes}&estado=${estado}`).toPromise();
  }
}
