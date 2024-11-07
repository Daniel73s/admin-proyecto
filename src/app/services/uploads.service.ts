import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  private url_upload:string='https://server-ogdr.onrender.com/api/uploads';
  constructor(private http:HttpClient) { }


  public uploadImageCloudinary(file:File){
    const formData: FormData = new FormData();
    formData.append('archivo', file);
    return this.http.post(`${this.url_upload}`,formData).toPromise();
  }

  public updateImageCloudinary(id:string,file:File){
    const formData: FormData = new FormData();
    formData.append('archivo', file);
    return this.http.put(`${this.url_upload}/${id}`,formData).toPromise();
  }

}
