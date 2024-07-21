import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string = 'http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient) { }

  //agregar un nuevo usuario administrador
  public createUserAdministrador(usuario: string, pass: string) {
    return this.http.post(`${this.url}`, { usuario, pass, id_rol: 'db4302f9-aedc-43ce-bb6e-6064d9f3892a' }).toPromise();
  }
  //agregar un nuevo usuario proveedor
  public createUserproveedor(usuario: string, pass: string) {
    return this.http.post(`${this.url}`, { usuario, pass, id_rol: '7021ba91-2167-4300-a8d1-4db2c582ab09' }).toPromise();
  }
  //agregar un nuevo usuario colegio
  public createUserColegio(usuario: string, pass: string) {
    return this.http.post(`${this.url}`, { usuario, pass, id_rol: 'deaf992a-4f44-46f9-9b7e-255b9e9c5b2b' }).toPromise();
  }
  //actualizar el estado del usuario
  public updateEstadoUsuario(usuario: string, estado: string) {
    return this.http.put(`${this.url}/estado/${usuario}`, { estado }).toPromise();
  }

   //actualizar el password desde el administrador
   public updatePasswordUsuario(usuario:any) {
    return this.http.put(`${this.url}/updatepass`, usuario).toPromise();
  }
}
