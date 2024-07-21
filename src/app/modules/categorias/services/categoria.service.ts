import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
private url="http://localhost:8080/api/categorias";
  constructor(private http:HttpClient) { }

  public getCategorias(){
    return this.http.get(`${this.url}`).toPromise();
  }
  public getCategoriasValidas(){
    return this.http.get(`${this.url}/validas`).toPromise();
  }
  public postCategoria(categoria:any){
    return this.http.post(`${this.url}`,categoria).toPromise();
  }
  public getCategoriaById(id:number){
    return this.http.get(`${this.url}/${id}`).toPromise();
  }
  public updateCategoria(id:number,categoria:any){
        return this.http.patch(`${this.url}/${id}`,categoria).toPromise();
  }
  public updateEstadoCategoria(id:number,estado:boolean){
    return this.http.patch(`${this.url}/estado/${id}`,{estado}).toPromise();
  }
}
