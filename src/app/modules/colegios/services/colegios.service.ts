import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {
private url="http://localhost:8080/api/colegios";
  constructor(private http:HttpClient) { }

  //obteniendo todos los productos 
  async getColegios(): Promise<any[]> {
    const data: any = await this.http.get(this.url).toPromise();
    return data as any[]
  }

  //Dando de baja a Colegio
  async deleteColegio(id:string){
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

   //Habilitar Colegio
   async habilitarColegio(id:string){
    return this.http.delete(`${this.url}/habilitar/${id}`).toPromise();
  }

   //Crear colegio
   async crearColegio(colegio:any){
    return this.http.post(`${this.url}`,colegio).toPromise();
  }
  //Crear ubicacion colegio
  async ubicacionColegio(ubicacion:any){
    return this.http.post(`${this.url}/ubicacion_colegio`,ubicacion).toPromise();
  }

  //Crear contacto colegio
  async contactoColegio(contacto:any){
    return this.http.post(`${this.url}/contacto_colegio`,contacto).toPromise();
  }
}
