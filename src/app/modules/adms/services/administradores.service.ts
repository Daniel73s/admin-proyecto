import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {
  private url: string = 'https://server-ogdr.onrender.com/api/administradores';

  constructor(private http: HttpClient) { }

  public getAdministradores() {
    return this.http.get(this.url).toPromise();
  }
  //crear ubicacion del adminitrador
  public postUbicacionAdministrador(ubicacion: any) {
    return this.http.post(`${this.url}/ubicacion`, ubicacion).toPromise();
  }
  //crear administrador 
  public postAdministrador(administrador: any) {
    return this.http.post(`${this.url}`, administrador).toPromise();
  }
  //asignar el usuario creado al administrador
  public agregarUserAdmin(usuario: string, id: string) {
    return this.http.post(`${this.url}/usuario/${id}`, { usuario }).toPromise();
  }
  //Solicitar toda la informacion de un administrador
  public getOneAdministrador(id:string){
    return this.http.get(`${this.url}/one/${id}`).toPromise();
  }
}
