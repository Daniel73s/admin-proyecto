import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url: string = 'http://localhost:8080/api/proveedores';
  constructor(private http: HttpClient) { }

  //obteniendo todos los proveedores
  public getProveedores() {
    return this.http.get(this.url).toPromise();
  }
   //obteniendo todos los proveedores activos
   public getProveedoresActivos() {
    return this.http.get(`${this.url}/activos`).toPromise();
  }
  
  public getOneProveedor(id:string) {
    return this.http.get(`${this.url}/one/${id}`).toPromise();
  }

  public addProveedor(proveedor: any) {
    return this.http.post(this.url, proveedor).toPromise()
  }
  public addUbicacionProveedor(ubicacion_proveedor: any) {
    return this.http.post(`${this.url}/ubicacion_proveedor`, ubicacion_proveedor).toPromise();
  }

  public updateEstado(id: string, estado: string) {
    return this.http.patch(`${this.url}/estado/${id}`, { estado }).toPromise();
  }

  public updateCS(id: string, certificado_sanitario: string) {
    return this.http.patch(`${this.url}/cs/${id}`, { certificado_sanitario }).toPromise();
  }

  public updateProveedor(id: string, proveedor: any) {
    return this.http.patch(`${this.url}/${id}`, proveedor).toPromise();
  }

  public updateUbicacionProveedor(id: string, ubicacion_proveedor: any) {
    return this.http.patch(`${this.url}/ubicacion/${id}`, ubicacion_proveedor).toPromise();
  }
  //asignar usuario a proveedor
  public asignarUsuarioProveedor(id: string, usuario: string) {
    return this.http.post(`${this.url}/usuario/${id}`, {usuario}).toPromise();
  }
  //asignar la imagen en la tabla proveedores
  public asignarImagenProveedor(id: string, url: string) {
    return this.http.put(`${this.url}/updateimage/${id}`, {url}).toPromise();
  }
}
