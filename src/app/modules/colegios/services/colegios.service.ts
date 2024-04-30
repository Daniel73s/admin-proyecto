import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {
  // private url = "https://server-taller.onrender.com/api/colegios";
  private url = "http://localhost:8080/api/colegios"
  constructor(private http: HttpClient) { }

  //obteniendo todos los colegios 
  async getColegios(): Promise<any[]> {
    const data: any = await this.http.get(this.url).toPromise();
    return data as any[]
  }

  //obteniendo un solo colegio
  async getOneColegio(id: string): Promise<any> {
    const data: any = await this.http.get(`${this.url}/${id}`).toPromise();
    return data as any
  }

  //Dando de baja a Colegio
  async deleteColegio(id: string) {
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

  //Habilitar Colegio
  async habilitarColegio(id: string) {
    return this.http.delete(`${this.url}/habilitar/${id}`).toPromise();
  }

  //Crear colegio
  async crearColegio(colegio: any) {
    return this.http.post(`${this.url}`, colegio).toPromise();
  }
  //Crear ubicacion colegio
  async ubicacionColegio(ubicacion: any) {
    return this.http.post(`${this.url}/ubicacion_colegio`, ubicacion).toPromise();
  }

  //Crear contacto colegio
  async contactoColegio(contacto: any) {
    return this.http.post(`${this.url}/contacto_colegio`, contacto).toPromise();
  }

  //actualizar colegio
  async updateColegio(id:string,colegio: any) {
    return this.http.patch(`${this.url}/${id}`, colegio).toPromise();
  }

   //actualizar ubicacion del colegio
   async updateUbicacion(id:string,ubicacion: any) {
    return this.http.patch(`${this.url}/updateUbicacion/${id}`, ubicacion).toPromise();
  }
  //actualizar contacto del colegio
  async updateContacto(id:string,contacto: any) {
    return this.http.patch(`${this.url}/updateContacto/${id}`, contacto).toPromise();
  }
}
