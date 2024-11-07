import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private url: string = 'https://server-ogdr.onrender.com/api/pedidos'
  constructor(private http: HttpClient) { }

  public getAllPedidos() {
    return this.http.get(`${this.url}/getallpedidos`).toPromise();
  }

  public getPedidoById(id_pedido:string){
    return this.http.get(`${this.url}/informacionpedido/${id_pedido}`).toPromise();
  }
}
